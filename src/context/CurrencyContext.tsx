import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
  name: string;
}

export const CURRENCIES: Record<string, Currency> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, name: 'United States Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, name: 'British Pound' }
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (priceInINR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('pasaava_currency') || 'INR';
    } catch {
      return 'INR';
    }
  });

  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;

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

  const formatPrice = (priceInINR: number): string => {
    const num = Math.round(Number(priceInINR) || 0);
    // INR formatting: ₹750 or ₹1,200
    if (currency.code === 'INR') {
      return `₹${num.toLocaleString('en-IN')}`;
    }
    const converted = num * currency.rate;
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
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
