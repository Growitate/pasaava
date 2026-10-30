import React from 'react';
import { Shield, Truck, RotateCcw, RefreshCw, FileText, Lock } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'refund' | 'warranty';

interface LegalPageProps {
  type: PolicyType;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const policiesConfig: Record<
    PolicyType,
    {
      title: string;
      icon: React.ReactNode;
      path: string;
      updated: string;
      sections: { heading: string; body: string }[];
    }
  > = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Lock className="w-4 h-4" />,
      path: '/privacy-policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'When you purchase something from our store or browse our catalog, we collect personal details including your name, billing address, shipping address, payment information, email address, and contact number to process orders seamlessly.'
        },
        {
          heading: '2. How We Use Your Information',
          body: 'We use your data strictly to fulfill orders, process secure transactions, communicate delivery tracking updates, and provide high-touch concierge support. We never sell, rent, or trade your personal information to third parties.'
        },
        {
          heading: '3. Data Security & Encryption',
          body: 'All sensitive transactional data is transmitted using modern Secure Socket Layer (SSL) technology and stored with AES-256 bank-grade encryption to ensure maximum privacy and protection.'
        },
        {
          heading: '4. Cookies & Personalization',
          body: 'We utilize standard browser cookies and local storage tokens to retain your cart items, saved favorites wishlist, and currency preferences across sessions.'
        }
      ]
    },
    terms: {
      title: 'Terms of service',
      icon: <FileText className="w-4 h-4" />,
      path: '/terms-of-service',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Overview & Agreement',
          body: 'This website is operated by PASAAVA. Throughout the site, the terms "we", "us" and "our" refer to PASAAVA. By visiting our site and/or purchasing from us, you engage in our "Service" and agree to be bound by these terms.'
        },
        {
          heading: '2. Product Accuracy & Engineering Standards',
          body: 'We strive to display our pieces with absolute precision. All men\'s jewelry pieces are engineered from 316L surgical stainless steel, aerospace titanium, tungsten carbide, and vacuum PVD 18K gold. Slight variations may naturally occur due to hand-finishing.'
        },
        {
          heading: '3. Pricing & Modifications',
          body: 'Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any design or collection without prior liability.'
        },
        {
          heading: '4. Governing Law & Dispute Resolution',
          body: 'These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with international commercial trade regulations.'
        }
      ]
    },
    shipping: {
      title: 'Shipping Policy',
      icon: <Truck className="w-4 h-4" />,
      path: '/shipping-policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Fast Worldwide Dispatch',
          body: 'Orders placed Monday through Friday before 2:00 PM EST are processed and dispatched within 24-48 hours. Orders placed over the weekend are prepared on the next business day.'
        },
        {
          heading: '2. Shipping Methods & Estimated Times',
          body: '• Standard Tracked Delivery (US/UK/EU): 3–5 business days.\n• Express Air Priority: 1–2 business days.\n• International Worldwide: 6–10 business days.\nAll packages are shipped in discreet, reinforced luxury packaging.'
        },
        {
          heading: '3. Free Shipping Thresholds',
          body: 'We offer complimentary express tracked shipping on all orders exceeding ₹999 across India. Premium air courier dispatch is applied automatically.'
        },
        {
          heading: '4. Tracking & Delivery Confirmation',
          body: 'Once your order is fulfilled, an automated confirmation email with real-time end-to-end courier tracking link will be dispatched.'
        }
      ]
    },
    returns: {
      title: 'Returns & Exchange Policy',
      icon: <RotateCcw className="w-4 h-4" />,
      path: '/returns-exchange-policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. 30-Day Hassle-Free Window',
          body: 'We want you to be 100% confident in your hardware. You may request a return or exchange within 30 days of delivery date.'
        },
        {
          heading: '2. Free Ring & Chain Size Exchanges',
          body: 'If your ring or chain isn\'t an exact fit, we offer one complimentary size exchange per item with pre-paid return labels provided for domestic shipments.'
        },
        {
          heading: '3. Item Condition Guidelines',
          body: 'Items must be returned unworn, free from scratches, perfume, or cosmetic damage, and in the original PASAAVA presentation box with authenticity certificate included.'
        },
        {
          heading: '4. How to Initiate an Exchange or Return',
          body: 'Simply visit our Contact page or email concierge@pasaava.com with your Order Number and our support team will issue your pre-paid label within 24 hours.'
        }
      ]
    },
    refund: {
      title: 'Refund Policy',
      icon: <RefreshCw className="w-4 h-4" />,
      path: '/refund-policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Refund Eligibility',
          body: 'Upon receipt and swift quality inspection at our fulfillment facility (typically within 48 business hours), approved refunds are issued immediately.'
        },
        {
          heading: '2. Refund Processing Time',
          body: 'Refunds are credited directly back to your original payment method (Apple Pay, Google Pay, Visa, MasterCard, Amex, PayPal). Depending on your banking institution, funds appear on your statement in 3–5 business days.'
        },
        {
          heading: '3. Late or Missing Refunds',
          body: 'If you have not received your refund within 7 business days of approval notification, please check with your financial provider or reach out to our concierge at concierge@pasaava.com.'
        },
        {
          heading: '4. Non-Refundable Items',
          body: 'Gift cards, clearance final-sale items, and customized custom-engraved pieces are non-refundable unless a verified manufacturing defect is present.'
        }
      ]
    },
    warranty: {
      title: 'Warranty Policy',
      icon: <Shield className="w-4 h-4" />,
      path: '/warranty-policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. 2-Year Craftsmanship Guarantee',
          body: 'Every authentic PASAAVA piece is engineered for extreme endurance and backed by our comprehensive 2-Year Craftsmanship Warranty starting from the date of purchase.'
        },
        {
          heading: '2. What Is Covered',
          body: '• Mechanical clasp failures, broken spring rings, or hinge defects.\n• Structural integrity failures of 316L steel or titanium links.\n• Abnormal finish peeling or vacuum PVD 18K gold coating degradation under normal daily wear.'
        },
        {
          heading: '3. 100% Sweat & Waterproof Assurance',
          body: 'Our pieces will not tarnish, turn your skin green, or rust in the shower, ocean, or gym. If tarnishing occurs under regular use, we replace it free of charge.'
        },
        {
          heading: '4. Filing a Warranty Claim',
          body: 'Email concierge@pasaava.com with your order number, photo evidence of the issue, and description. Once approved, we will send an immediate replacement or repair service.'
        }
      ]
    }
  };

  const activePolicy = policiesConfig[type] || policiesConfig.terms;

  const policyKeys: PolicyType[] = [
    'privacy',
    'terms',
    'shipping',
    'returns',
    'refund',
    'warranty'
  ];

  return (
    <div className="pt-24 pb-16 sm:py-20 bg-white text-[#111111]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#EAEAEA]">
          {policyKeys.map((key) => {
            const p = policiesConfig[key];
            const isActive = key === type;
            return (
              <button
                key={key}
                onClick={() => onNavigate(p.path)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#EAEAEA] hover:text-[#111111]'
                }`}
              >
                {p.icon}
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Title Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F5F5F5] text-[#111111] mb-2">
            {activePolicy.icon}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111]">
            {activePolicy.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#777777]">{activePolicy.updated}</p>
        </div>

        {/* Policy Body Box */}
        <div className="bg-[#F8F8F8] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EAEAEA] shadow-xs space-y-8">
          {activePolicy.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2.5 pb-6 border-b border-[#EAEAEA] last:border-b-0 last:pb-0">
              <h3 className="font-sans text-base sm:text-lg font-semibold text-[#111111]">
                {sec.heading}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed whitespace-pre-line">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

