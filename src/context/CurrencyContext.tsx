import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
  name: string;
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, name: 'British Pound' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.35, name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'AU$', rate: 1.52, name: 'Australian Dollar' }
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('pasaava_currency') || localStorage.getItem('glintura_currency') || 'USD';
    } catch {
      return 'USD';
    }
  });

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const setCurrencyCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
      try {
        localStorage.setItem('pasaava_currency', code);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const formatPrice = (priceInUSD: number): string => {
    const converted = priceInUSD * currency.rate;
    // If it's a whole number or currency formatting
    return `${currency.symbol}${Math.round(converted)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
