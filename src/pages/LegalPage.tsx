import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    terms: {
      title: 'Terms & Conditions',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Overview & Agreement',
          body: 'This website is operated by PASAAVA. Throughout the site, the terms "we", "us" and "our" refer to PASAAVA. By visiting our site and/or purchasing from us, you engage in our "Service" and agree to be bound by the following terms and conditions.'
        },
        {
          heading: '2. Product Accuracy & Craftsmanship',
          body: 'We have made every effort to display as accurately as possible the colors, finishes, and dimensions of our products. All men\'s jewelry pieces are engineered from 316L surgical stainless steel, titanium, tungsten carbide, and vacuum PVD 18K gold.'
        },
        {
          heading: '3. Pricing & Modifications',
          body: 'Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without prior liability.'
        },
        {
          heading: '4. Warranty Policy',
          body: 'Every PASAAVA purchase includes our 2-Year Craftsmanship Guarantee covering structural defects, broken clasps, or abnormal coating wear under normal daily conditions.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'When you purchase something from our store, we collect personal information such as your name, billing address, shipping address, payment information, email address, and phone number.'
        },
        {
          heading: '2. How We Use Your Data',
          body: 'We use order information to fulfill orders placed through the site (including processing payment information, arranging shipping, and providing invoices/confirmations).'
        },
        {
          heading: '3. Data Security & Encryption',
          body: 'Your personal data is encrypted via SSL (Secure Sockets Layer) and stored using AES-256 standard bank-grade encryption.'
        }
      ]
    },
    refund: {
      title: 'Refund & Shipping Policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. 30-Day Risk-Free Returns & Size Exchanges',
          body: 'We want you to love your hardware. If you are not completely satisfied with your purchase or need a different ring or chain size, you may return or exchange it within 30 days of delivery in its original unworn condition.'
        },
        {
          heading: '2. Worldwide Shipping Times',
          body: 'Standard shipping takes 3-5 business days within the United States and United Kingdom. International delivery typically takes 6-10 business days. Orders over $75 qualify for complimentary tracked shipping.'
        },
        {
          heading: '3. Damaged or Faulty Items',
          body: 'If your piece arrives damaged or defective, please contact our concierge team at concierge@pasaava.com within 48 hours with a photo of the item for an immediate replacement.'
        }
      ]
    }
  }[type];

  return (
    <div className="py-12 sm:py-20 bg-[#f8f6f3]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Policies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
            {content.title}
          </h1>
          <p className="text-xs text-[#9a948e]">{content.updated}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e8e8e8] shadow-sm space-y-8">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c1a]">
                {sec.heading}
              </h3>
              <p className="text-sm text-[#6d6a67] leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
