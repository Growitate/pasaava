import { Order } from '../types';
import { storageService } from './storageService';

export interface WhatsAppLogEntry {
  id: string;
  timestamp: string;
  recipientPhone: string;
  recipientType: 'store_owner' | 'customer';
  type: 'new_order_alert' | 'dispatch_update' | 'review_invite' | 'custom_chat';
  orderNo: string;
  message: string;
  status: 'sent' | 'simulated' | 'failed';
}

const WHATSAPP_LOGS_KEY = 'pasaava_whatsapp_logs';

class WhatsAppNotificationService {
  /**
   * Get all outbound WhatsApp notification history
   */
  public getLogs(): WhatsAppLogEntry[] {
    try {
      const raw = localStorage.getItem(WHATSAPP_LOGS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveLog(entry: Omit<WhatsAppLogEntry, 'id' | 'timestamp'>) {
    const logs = this.getLogs();
    const newEntry: WhatsAppLogEntry = {
      ...entry,
      id: `walog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newEntry);
    localStorage.setItem(WHATSAPP_LOGS_KEY, JSON.stringify(logs.slice(0, 50)));
  }

  /**
   * Build clean international WhatsApp phone number
   */
  public cleanPhone(phone: string): string {
    const digits = phone.replace(/[^0-9]/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
  }

  /**
   * Generate direct WhatsApp web/app URL
   */
  public buildWhatsAppUrl(phone: string, message: string): string {
    const clean = this.cleanPhone(phone);
    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Alert the store owner when a new order is placed
   */
  public notifyOwnerOnNewOrder(order: Order): { url: string; message: string } {
    const settings = storageService.getSettings();
    const ownerPhone = settings.whatsappConfig?.ownerPhone || '+919876543210';

    const itemsSummary = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
      )
      .join('\n');

    const message = [
      `🔔 *NEW PASAAVA ORDER: ${order.orderNo}*`,
      `━━━━━━━━━━━━━━━━━━`,
      `💰 *Total Amount:* ₹${order.amount}`,
      `💳 *Payment:* ${order.paymentMethod} (${order.paymentStatus})`,
      order.razorpayPaymentId ? `🆔 *Payment ID:* ${order.razorpayPaymentId}` : '',
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer:* ${order.customer.name}`,
      `📞 *Phone:* ${order.customer.phone}`,
      `📍 *Delivery:* ${order.customer.address}, ${order.customer.city || ''} ${order.customer.state || ''} - ${order.customer.pincode}`,
      `━━━━━━━━━━━━━━━━━━`,
      `📦 *Ordered Pieces:*`,
      itemsSummary,
      `━━━━━━━━━━━━━━━━━━`,
      `Atelier Admin: https://pasaava.growithcp.live/#/admin/orders`
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = this.buildWhatsAppUrl(ownerPhone, message);

    this.saveLog({
      recipientPhone: ownerPhone,
      recipientType: 'store_owner',
      type: 'new_order_alert',
      orderNo: order.orderNo,
      message,
      status: 'simulated'
    });

    return { url: waUrl, message };
  }

  /**
   * Send customer dispatch confirmation with AWB and live tracking link
   */
  public notifyCustomerDispatch(order: Order): { url: string; message: string } {
    const courier = order.courier || 'Delhivery';
    const awb = order.awb || 'Pending';
    const tracking = order.trackingUrl || `https://www.google.com/search?q=track+${awb}`;

    const message = [
      `✨ *PASAAVA Atelier Dispatch Notification*`,
      `Hello ${order.customer.name},`,
      `Your bespoke jewellery order *${order.orderNo}* has been packaged and handed over to *${courier}*.`,
      ``,
      `📦 *Airway Bill (AWB):* ${awb}`,
      `🚚 *Courier Partner:* ${courier}`,
      `🔗 *Live Tracking:* ${tracking}`,
      ``,
      `Your parcel is fully insured with tamper-proof seal. If you have any questions, reply to this message.`,
      `Thank you for choosing PASAAVA.`
    ].join('\n');

    const waUrl = this.buildWhatsAppUrl(order.customer.phone, message);

    this.saveLog({
      recipientPhone: order.customer.phone,
      recipientType: 'customer',
      type: 'dispatch_update',
      orderNo: order.orderNo,
      message,
      status: 'simulated'
    });

    return { url: waUrl, message };
  }

  /**
   * Send single-use review invite link to verified buyer
   */
  public notifyCustomerReviewInvite(
    order: Order,
    reviewToken: string
  ): { url: string; message: string } {
    const reviewUrl = `${window.location.origin}/#/review/${reviewToken}`;

    const message = [
      `💎 *PASAAVA Craftsmanship Experience*`,
      `Hi ${order.customer.name},`,
      `We hope your PASAAVA jewellery arrived safely and elevates your everyday style.`,
      ``,
      `As a verified owner, your feedback shapes our next drops. Please take 60 seconds to share your review and photos:`,
      `👉 ${reviewUrl}`,
      ``,
      `Your review will earn a Verified Buyer badge on our official catalogue.`,
      `Best regards,`,
      `The PASAAVA Atelier Team`
    ].join('\n');

    const waUrl = this.buildWhatsAppUrl(order.customer.phone, message);

    this.saveLog({
      recipientPhone: order.customer.phone,
      recipientType: 'customer',
      type: 'review_invite',
      orderNo: order.orderNo,
      message,
      status: 'simulated'
    });

    return { url: waUrl, message };
  }
}

export const whatsappService = new WhatsAppNotificationService();
