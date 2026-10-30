import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Check,
  Download,
  Upload,
  RefreshCw,
  Shield,
  CreditCard,
  MessageCircle,
  Truck,
  Globe,
  Zap,
  ExternalLink,
  Send,
  Eye,
  EyeOff,
  AlertTriangle,
  History,
  Lock
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { deliveryService, SUPPORTED_COURIERS } from '../../services/deliveryService';
import { whatsappService, WhatsAppLogEntry } from '../../services/whatsappService';
import { razorpayService } from '../../services/razorpayService';
import { seoService } from '../../services/seoService';
import { SiteSettings, RazorpaySettings, WhatsAppSettings, DeliverySettings } from '../../types';

interface AdminSettingsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());
  const [activeTab, setActiveTab] = useState<'channels' | 'razorpay' | 'whatsapp' | 'logistics' | 'backup'>('channels');

  // Channels Form
  const [instagram, setInstagram] = useState(settings.socialLinks.instagram);
  const [whatsapp, setWhatsapp] = useState(settings.socialLinks.whatsapp);
  const [email, setEmail] = useState(settings.socialLinks.email);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);

  // Razorpay Form
  const [rzpEnabled, setRzpEnabled] = useState(settings.razorpay?.enabled ?? true);
  const [rzpLiveMode, setRzpLiveMode] = useState(settings.razorpay?.isLiveMode ?? false);
  const [rzpKeyId, setRzpKeyId] = useState(settings.razorpay?.keyId || 'rzp_test_pasaava_demo');
  const [rzpKeySecret, setRzpKeySecret] = useState(settings.razorpay?.keySecret || 'secret_test_pasaava_demo');
  const [rzpWebhookSecret, setRzpWebhookSecret] = useState(settings.razorpay?.webhookSecret || 'whsec_demo_pasaava');
  const [showSecret, setShowSecret] = useState(false);

  // WhatsApp Form
  const [waEnabled, setWaEnabled] = useState(settings.whatsappConfig?.enabled ?? true);
  const [waOwnerPhone, setWaOwnerPhone] = useState(settings.whatsappConfig?.ownerPhone || '+919876543210');
  const [waProvider, setWaProvider] = useState<'direct_wa' | 'twilio' | 'business_api'>(
    settings.whatsappConfig?.provider || 'direct_wa'
  );
  const [waApiKey, setWaApiKey] = useState(settings.whatsappConfig?.apiKey || '');
  const [waPhoneNumberId, setWaPhoneNumberId] = useState(settings.whatsappConfig?.phoneNumberId || '');
  const [waNotifyOrder, setWaNotifyOrder] = useState(settings.whatsappConfig?.notifyOnNewOrder ?? true);
  const [waNotifyShipment, setWaNotifyShipment] = useState(settings.whatsappConfig?.notifyOnShipment ?? true);
  const [waLogs, setWaLogs] = useState<WhatsAppLogEntry[]>(() => whatsappService.getLogs());

  // Logistics Form
  const [defaultCourier, setDefaultCourier] = useState<
    'Delhivery' | 'Shiprocket' | 'BlueDart' | 'DTDC' | 'India Post'
  >(settings.deliveryConfig?.defaultCourier || 'Delhivery');
  const [delhiveryApiKey, setDelhiveryApiKey] = useState(settings.deliveryConfig?.delhiveryApiKey || '');
  const [delhiveryClientId, setDelhiveryClientId] = useState(settings.deliveryConfig?.delhiveryClientId || '');
  const [shiprocketEmail, setShiprocketEmail] = useState(settings.deliveryConfig?.shiprocketEmail || '');
  const [shiprocketPassword, setShiprocketPassword] = useState(settings.deliveryConfig?.shiprocketPassword || '');
  const [autoAwbOnPacking, setAutoAwbOnPacking] = useState(settings.deliveryConfig?.autoAwbOnPacking ?? true);

  // Status
  const [saved, setSaved] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      const s = storageService.getSettings();
      setSettings(s);
      setInstagram(s.socialLinks.instagram);
      setWhatsapp(s.socialLinks.whatsapp);
      setEmail(s.socialLinks.email);
      setAnnouncementText(s.announcementText);

      if (s.razorpay) {
        setRzpEnabled(s.razorpay.enabled);
        setRzpLiveMode(s.razorpay.isLiveMode);
        setRzpKeyId(s.razorpay.keyId);
        setRzpKeySecret(s.razorpay.keySecret);
        setRzpWebhookSecret(s.razorpay.webhookSecret || '');
      }

      if (s.whatsappConfig) {
        setWaEnabled(s.whatsappConfig.enabled);
        setWaOwnerPhone(s.whatsappConfig.ownerPhone);
        setWaProvider(s.whatsappConfig.provider);
        setWaApiKey(s.whatsappConfig.apiKey || '');
        setWaPhoneNumberId(s.whatsappConfig.phoneNumberId || '');
        setWaNotifyOrder(s.whatsappConfig.notifyOnNewOrder);
        setWaNotifyShipment(s.whatsappConfig.notifyOnShipment);
      }

      if (s.deliveryConfig) {
        setDefaultCourier(s.deliveryConfig.defaultCourier);
        setDelhiveryApiKey(s.deliveryConfig.delhiveryApiKey || '');
        setDelhiveryClientId(s.deliveryConfig.delhiveryClientId || '');
        setShiprocketEmail(s.deliveryConfig.shiprocketEmail || '');
        setShiprocketPassword(s.deliveryConfig.shiprocketPassword || '');
        setAutoAwbOnPacking(s.deliveryConfig.autoAwbOnPacking);
      }

      setWaLogs(whatsappService.getLogs());
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedSettings = storageService.updateSettings({
      announcementText: announcementText.trim(),
      socialLinks: {
        instagram: instagram.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim()
      },
      razorpay: {
        enabled: rzpEnabled,
        isLiveMode: rzpLiveMode,
        keyId: rzpKeyId.trim(),
        keySecret: rzpKeySecret.trim(),
        webhookSecret: rzpWebhookSecret.trim()
      },
      whatsappConfig: {
        enabled: waEnabled,
        ownerPhone: waOwnerPhone.trim(),
        provider: waProvider,
        apiKey: waApiKey.trim(),
        phoneNumberId: waPhoneNumberId.trim(),
        notifyOnNewOrder: waNotifyOrder,
        notifyOnShipment: waNotifyShipment
      },
      deliveryConfig: {
        defaultCourier,
        delhiveryApiKey: delhiveryApiKey.trim(),
        delhiveryClientId: delhiveryClientId.trim(),
        shiprocketEmail: shiprocketEmail.trim(),
        shiprocketPassword: shiprocketPassword.trim(),
        autoAwbOnPacking
      }
    });

    setSaved(true);
    showNotification('All settings saved and applied to storefront');
    setTimeout(() => setSaved(false), 2000);
  };

  // Test Razorpay Popup
  const handleTestRazorpay = () => {
    handleSaveAll();
    razorpayService.launchCheckout({
      amountInRupees: 999,
      orderNo: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      itemCount: 1,
      customer: {
        name: 'PASAAVA Admin Test',
        email: 'test@pasaava.com',
        phone: '+91 98765 43210',
        address: 'Flagship Atelier',
        city: 'Mumbai',
        pincode: '400001'
      },
      onSuccess: (data) => {
        showNotification(`Razorpay Test Successful! Payment ID: ${data.razorpay_payment_id}`);
      },
      onError: (errMsg) => {
        showNotification(`Razorpay Error: ${errMsg}`);
      }
    });
  };

  // Test WhatsApp Notification to Owner
  const handleTestWhatsApp = () => {
    handleSaveAll();
    const testOrder = {
      id: 'test-order-sample',
      orderNo: 'PAS-DEMO1',
      items: [
        {
          productId: 'drop-1',
          productSlug: 'spikeball-pearl-chain',
          title: 'Spikeball Pearl Chain',
          image: '/images/drop-spikeball-pearl.jpg',
          price: 999,
          quantity: 1
        }
      ],
      customer: {
        name: 'Arjun Mehta',
        phone: '+91 98765 43210',
        email: 'arjun@example.com',
        address: '42 Marine Drive',
        city: 'Mumbai',
        pincode: '400020'
      },
      amount: 999,
      subtotal: 999,
      shippingFee: 0,
      paymentMethod: 'Razorpay' as const,
      paymentStatus: 'Paid' as const,
      orderStatus: 'New' as const,
      razorpayPaymentId: 'pay_test_verified',
      createdAt: new Date().toISOString()
    };

    const result = whatsappService.notifyOwnerOnNewOrder(testOrder);
    window.open(result.url, '_blank');
    setWaLogs(whatsappService.getLogs());
    showNotification('Test WhatsApp notification generated & opened in WhatsApp');
  };

  // Test Delivery AWB Generation
  const handleTestAwbGeneration = () => {
    handleSaveAll();
    const mockOrder = {
      id: 'test-awb-ord',
      orderNo: 'PAS-AWBTEST',
      items: [],
      customer: {
        name: 'Test Customer',
        phone: '+91 98765 43210',
        email: 'test@pasaava.com',
        address: 'Test Lane',
        pincode: '400001'
      },
      amount: 1499,
      subtotal: 1499,
      shippingFee: 0,
      paymentMethod: 'Razorpay' as const,
      paymentStatus: 'Paid' as const,
      orderStatus: 'New' as const,
      createdAt: new Date().toISOString()
    };

    const res = deliveryService.generateAwb(mockOrder, defaultCourier);
    showNotification(`Generated sample AWB for ${res.courier}: ${res.awb}`);
  };

  const handleExportBackup = () => {
    const jsonStr = storageService.exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PASAAVA_Store_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Database backup downloaded');
  };

  const handleDownloadSitemap = () => {
    const products = storageService.getProducts();
    const categories = storageService.getCategories();
    const xml = seoService.generateSitemapXml(products, categories);
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sitemap_${new Date().toISOString().slice(0, 10)}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Sitemap XML exported successfully!');
  };

  const handleDownloadRobots = () => {
    const txt = `# robots.txt for PASAAVA Men's Jewellery
User-agent: *
Disallow: /admin
Disallow: /admin/
Disallow: /#/admin
Disallow: /#/admin/
Disallow: /review/
Disallow: /#/review/
Allow: /

Sitemap: https://pasaava.growithcp.live/sitemap.xml
`;
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Robots.txt downloaded successfully!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storageService.importData(content);
        if (success) {
          showNotification('Store data restored successfully!');
        } else {
          showNotification('Invalid backup JSON file');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'WARNING: This will reset all products, orders, categories, and settings back to default atelier seeds. Continue?'
      )
    ) {
      storageService.resetToDefaults();
      showNotification('Store data reset to default seed state');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            System & External Integrations
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">Integrations & Settings</h2>
          <p className="text-xs text-gray-500">
            Configure Razorpay Gateway, WhatsApp business notifications, logistics, and store channels.
          </p>
        </div>

        <button
          onClick={() => handleSaveAll()}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-all cursor-pointer shadow-sm"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('channels')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Social & Concierge</span>
        </button>

        <button
          onClick={() => setActiveTab('razorpay')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'razorpay'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Razorpay Gateway</span>
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'whatsapp'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'logistics'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Delivery & Couriers</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'backup'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Database & Backups</span>
        </button>
      </div>

      {/* Tab 1: Channels & Social */}
      {activeTab === 'channels' && (
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-5 shadow-xs max-w-2xl">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Globe className="w-4 h-4 text-black" />
            <h3 className="text-sm font-bold text-[#111111]">Store Social & Concierge Channels</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Announcement Ticker Text
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Free express shipping across India on orders over ₹999"
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Displayed in the top marquee ticker and storefront banner.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Instagram Official Handle URL
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/pasaava"
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Linked in the storefront footer, navbar, and social proof reels.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                WhatsApp Concierge Support Phone
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Used for customer support buttons, footer chat, and order inquiries.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Atelier Concierge Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="atelier@pasaava.com"
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Displayed on the Contact Us concierge page and order invoices.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Save Social Channels
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Razorpay Payment Gateway */}
      {activeTab === 'razorpay' && (
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-5 shadow-xs max-w-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-700" />
              <h3 className="text-sm font-bold text-[#111111]">Razorpay Payment Gateway</h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                rzpLiveMode ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {rzpLiveMode ? 'LIVE MODE' : 'TEST / SANDBOX'}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rzpEnabled}
                  onChange={(e) => setRzpEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <div>
                  <div className="font-bold text-gray-900 text-xs">Enable Razorpay</div>
                  <div className="text-[10px] text-gray-500">Allow customers to pay via Razorpay</div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rzpLiveMode}
                  onChange={(e) => setRzpLiveMode(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <div>
                  <div className="font-bold text-gray-900 text-xs">Production Live Mode</div>
                  <div className="text-[10px] text-gray-500">Use live API keys for real charges</div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                value={rzpKeyId}
                onChange={(e) => setRzpKeyId(e.target.value)}
                placeholder="rzp_test_... or rzp_live_..."
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Found in your Razorpay Dashboard → Settings → API Keys.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-gray-700">
                  Razorpay Key Secret
                </label>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-[10px] text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecret ? 'Hide Secret' : 'Show Secret'}</span>
                </button>
              </div>
              <input
                type={showSecret ? 'text' : 'password'}
                value={rzpKeySecret}
                onChange={(e) => setRzpKeySecret(e.target.value)}
                placeholder="Enter Razorpay Secret..."
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Webhook Secret (Optional)
              </label>
              <input
                type="text"
                value={rzpWebhookSecret}
                onChange={(e) => setRzpWebhookSecret(e.target.value)}
                placeholder="whsec_..."
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Used to verify webhook payloads for payment.captured events.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestRazorpay}
                className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test Razorpay Checkout</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Save Razorpay Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: WhatsApp Store Owner Alerts */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-[#111111]">WhatsApp Alerts & Automation</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-800">
                On every paid order, the atelier owner receives an instant structured WhatsApp alert
                with customer details, purchased items, and delivery address.
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Store Owner Notification Mobile Phone
                </label>
                <input
                  type="text"
                  value={waOwnerPhone}
                  onChange={(e) => setWaOwnerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Include country code (e.g. +91 for India).
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  WhatsApp Dispatch Provider
                </label>
                <select
                  value={waProvider}
                  onChange={(e) => setWaProvider(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="direct_wa">Direct WhatsApp Web/App Link (No API fees)</option>
                  <option value="twilio">Twilio Programmable WhatsApp API</option>
                  <option value="business_api">Meta WhatsApp Cloud Business API</option>
                </select>
              </div>

              {waProvider !== 'direct_wa' && (
                <div className="space-y-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                      API Key / Auth Token
                    </label>
                    <input
                      type="password"
                      value={waApiKey}
                      onChange={(e) => setWaApiKey(e.target.value)}
                      placeholder="Enter provider API token..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                      Phone Number ID / Twilio Sender
                    </label>
                    <input
                      type="text"
                      value={waPhoneNumberId}
                      onChange={(e) => setWaPhoneNumberId(e.target.value)}
                      placeholder="e.g. 104928372091 or whatsapp:+14155238886"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Notification Triggers */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waNotifyOrder}
                    onChange={(e) => setWaNotifyOrder(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Notify Owner on New Paid Order</div>
                    <div className="text-[10px] text-gray-400">
                      Dispatches order summary to owner phone immediately
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waNotifyShipment}
                    onChange={(e) => setWaNotifyShipment(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Enable Customer Dispatch WhatsApp button</div>
                    <div className="text-[10px] text-gray-400">
                      Pre-populates courier name, AWB, and live parcel tracking link
                    </div>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestWhatsApp}
                  className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Alert to Owner Phone</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveAll()}
                  className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                >
                  Save WhatsApp Settings
                </button>
              </div>
            </div>
          </div>

          {/* Outbound WhatsApp Logs Audit Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-gray-500" />
                <h4 className="text-xs font-bold text-gray-900">Outbound Message Audit Log</h4>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Last 50 messages</span>
            </div>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {waLogs.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  No WhatsApp notifications recorded yet.
                </div>
              ) : (
                waLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{log.recipientPhone}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-emerald-700">
                      {log.type === 'new_order_alert'
                        ? `📦 Order #${log.orderNo} Alert`
                        : log.type === 'dispatch_update'
                        ? `🚚 Dispatch #${log.orderNo}`
                        : `⭐ Review Invite #${log.orderNo}`}
                    </div>
                    <p className="text-[10.5px] text-gray-500 line-clamp-2 italic font-mono">
                      {log.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Delivery & Courier Logistics */}
      {activeTab === 'logistics' && (
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-5 shadow-xs max-w-2xl">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Truck className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-[#111111]">Delivery Partners & Logistics Automation</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Default Courier Partner
              </label>
              <select
                value={defaultCourier}
                onChange={(e) => setDefaultCourier(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                {SUPPORTED_COURIERS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} (Prefix: {c.awbPrefix})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-gray-400 mt-1">
                Used as the default shipping partner when auto-generating airway bills.
              </p>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAwbOnPacking}
                  onChange={(e) => setAutoAwbOnPacking(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <div>
                  <div className="font-bold text-blue-900 text-xs">Auto-Generate AWB on Packaging</div>
                  <div className="text-[10.5px] text-blue-700">
                    Automatically assigns AWB and tracking URL when marking order as Packed or Shipped
                  </div>
                </div>
              </label>
            </div>

            {/* Courier API Credentials */}
            <div className="space-y-3 pt-2">
              <div className="font-bold text-gray-900 text-xs">Partner API Configurations</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                    Delhivery API Token
                  </label>
                  <input
                    type="password"
                    value={delhiveryApiKey}
                    onChange={(e) => setDelhiveryApiKey(e.target.value)}
                    placeholder="Enter Delhivery Token..."
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                    Delhivery Client ID
                  </label>
                  <input
                    type="text"
                    value={delhiveryClientId}
                    onChange={(e) => setDelhiveryClientId(e.target.value)}
                    placeholder="e.g. PASAAVADELH"
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                    Shiprocket Account Email
                  </label>
                  <input
                    type="email"
                    value={shiprocketEmail}
                    onChange={(e) => setShiprocketEmail(e.target.value)}
                    placeholder="logistics@pasaava.com"
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 mb-1">
                    Shiprocket Password / Token
                  </label>
                  <input
                    type="password"
                    value={shiprocketPassword}
                    onChange={(e) => setShiprocketPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestAwbGeneration}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test AWB Generation</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Save Logistics Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Database Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-6 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Shield className="w-4 h-4 text-black" />
              <h3 className="text-sm font-bold text-[#111111]">Zero-DB Reactive Storage Backup</h3>
            </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            All catalogue items, categories, reviews, settings, and customer orders are stored
            persistently in browser storage. Export a complete JSON snapshot to backup your entire
            store anytime, or restore it on any device.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-black rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON Backup</span>
            </button>

            <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-black rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs">
              <Upload className="w-4 h-4" />
              <span>Restore JSON Backup</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-900">Reset to Factory Seeds</div>
              <div className="text-[11px] text-gray-400">Restore original 31 hardware pieces and categories</div>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* SEO, Sitemap & Robots.txt Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#EBEBEB] space-y-6 shadow-xs max-w-2xl mt-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Globe className="w-4 h-4 text-black" />
            <h3 className="text-sm font-bold text-[#111111]">SEO, Sitemap & Robots Management</h3>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Generate and export dynamic standard XML sitemaps containing all active catalogue pieces,
            categories, and canonical storefront routes. Download and inspect the robots.txt crawler policy.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownloadSitemap}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#111111] hover:bg-black text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Sitemap.xml</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadRobots}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-black rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Robots.txt</span>
            </button>
          </div>

          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-gray-200 text-xs font-mono text-gray-600 flex items-center justify-between">
            <span className="truncate">Public XML Endpoint: /sitemap.xml</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-semibold hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
