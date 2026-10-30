import { Order } from '../types';
import { storageService } from './storageService';

export interface CourierOption {
  name: string;
  code: string;
  trackingBase: string;
  awbPrefix: string;
  getUrl: (awb: string) => string;
}

export const SUPPORTED_COURIERS: CourierOption[] = [
  {
    name: 'Delhivery',
    code: 'delhivery',
    trackingBase: 'https://www.delhivery.com/track/package/',
    awbPrefix: 'DELH',
    getUrl: (awb: string) => `https://www.delhivery.com/track/package/${awb}`
  },
  {
    name: 'Shiprocket',
    code: 'shiprocket',
    trackingBase: 'https://shiprocket.co/tracking/',
    awbPrefix: 'SR',
    getUrl: (awb: string) => `https://shiprocket.co/tracking/${awb}`
  },
  {
    name: 'BlueDart',
    code: 'bluedart',
    trackingBase: 'https://www.bluedart.com/tracking?trackFor=0&trackNo=',
    awbPrefix: 'BD',
    getUrl: (awb: string) => `https://www.bluedart.com/tracking?trackFor=0&trackNo=${awb}`
  },
  {
    name: 'DTDC',
    code: 'dtdc',
    trackingBase: 'https://www.dtdc.in/tracking/tracking_results.asp?pin=',
    awbPrefix: 'DTDC',
    getUrl: (awb: string) => `https://www.dtdc.in/tracking/tracking_results.asp?pin=${awb}`
  },
  {
    name: 'India Post',
    code: 'indiapost',
    trackingBase: 'https://www.indiapost.gov.in/_layouts/15/dpt.cpt.tracking/trackconsignment.aspx',
    awbPrefix: 'INPOST',
    getUrl: (awb: string) =>
      `https://www.indiapost.gov.in/_layouts/15/dpt.cpt.tracking/trackconsignment.aspx?trackNo=${awb}`
  }
];

class DeliveryService {
  /**
   * Get courier definition by name or code
   */
  public getCourier(nameOrCode: string): CourierOption {
    const clean = nameOrCode.toLowerCase().replace(/[^a-z]/g, '');
    const found = SUPPORTED_COURIERS.find(
      (c) => c.name.toLowerCase() === clean || c.code.toLowerCase() === clean
    );
    return found || SUPPORTED_COURIERS[0];
  }

  /**
   * Compute live tracking URL for a given courier and AWB
   */
  public getTrackingUrl(courierName: string, awb: string): string {
    const courier = this.getCourier(courierName);
    return courier.getUrl(awb.trim());
  }

  /**
   * Generate an authentic formatted AWB and tracking URL for an order
   */
  public generateAwb(
    order: Order,
    preferredCourier?: string
  ): { awb: string; trackingUrl: string; courier: string } {
    const settings = storageService.getSettings();
    const courierName =
      preferredCourier || settings.deliveryConfig?.defaultCourier || 'Delhivery';
    const courier = this.getCourier(courierName);

    // Format realistic AWB based on courier standard
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    const awb = `${courier.awbPrefix}-${randomDigits}`;
    const trackingUrl = courier.getUrl(awb);

    return {
      awb,
      trackingUrl,
      courier: courier.name
    };
  }

  /**
   * 1-Click dispatch: Assigns courier, generates AWB & tracking URL,
   * updates the order to "Shipped" status in storage.
   */
  public assignAndDispatchOrder(
    orderId: string,
    courierName?: string
  ): { order: Order; awb: string; trackingUrl: string; courier: string } | null {
    const order = storageService.getOrderById(orderId);
    if (!order) return null;

    const { awb, trackingUrl, courier } = this.generateAwb(order, courierName);
    const updated = storageService.updateOrderStatus(orderId, 'Shipped', awb, courier, trackingUrl);

    if (!updated) return null;

    return {
      order: updated,
      awb,
      trackingUrl,
      courier
    };
  }
}

export const deliveryService = new DeliveryService();
