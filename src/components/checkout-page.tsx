'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Truck } from 'lucide-react';
import SectionCard from './section-card';
import type { CartItem } from '@/types';

interface CheckoutPageProps {
  cart: CartItem[];
  onConfirmPayment: () => void;
  onBack: () => void;
  isDarkMode: boolean;
}

export default function CheckoutPage({ cart, onConfirmPayment, onBack, isDarkMode }: CheckoutPageProps) {
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };
  
  const isFormValid = () => {
    return Object.values(shippingInfo).every(v => v.trim() !== '') && Object.values(paymentInfo).every(v => v.trim() !== '');
  };

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const itemBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const inputBgClasses = isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300';
  const labelTextClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <SectionCard isDarkMode={isDarkMode}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-headline font-bold">Checkout</h1>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Shipping Information" isDarkMode={isDarkMode}>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>Full Name</label>
                <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleShippingChange} className={`w-full p-2 rounded-md ${inputBgClasses}`} />
              </div>
              <div>
                <label htmlFor="address" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>Address</label>
                <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} className={`w-full p-2 rounded-md ${inputBgClasses}`} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="city" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>City</label>
                  <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} className={`w-full p-2 rounded-md ${inputBgClasses}`} />
                </div>
                <div className="flex-1">
                  <label htmlFor="zip" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>ZIP Code</label>
                  <input type="text" id="zip" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} className={`w-full p-2 rounded-md ${inputBgClasses}`} />
                </div>
              </div>
            </form>
          </SectionCard>
          
          <SectionCard title="Payment Details" isDarkMode={isDarkMode}>
            <form className="space-y-4">
               <div>
                <label htmlFor="cardNumber" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>Card Number</label>
                <div className="relative">
                    <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${secondaryTextClasses}`} />
                    <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} placeholder="•••• •••• •••• ••••" className={`w-full p-2 pl-10 rounded-md ${inputBgClasses}`} />
                </div>
              </div>
               <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>Expiry Date</label>
                  <input type="text" id="expiry" name="expiry" value={paymentInfo.expiry} onChange={handlePaymentChange} placeholder="MM/YY" className={`w-full p-2 rounded-md ${inputBgClasses}`} />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className={`block text-sm font-medium mb-1 ${labelTextClasses}`}>CVV</label>
                  <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="•••" className={`w-full p-2 rounded-md ${inputBgClasses}`} />
                </div>
              </div>
            </form>
          </SectionCard>
        </div>

        <div className="lg:col-span-1">
          <SectionCard title="Order Summary" isDarkMode={isDarkMode}>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className={`p-3 rounded-md flex justify-between items-center ${itemBgClasses}`}>
                  <div>
                    <p className={`font-medium text-sm ${textClasses}`}>{item.name}</p>
                    <p className={`text-xs ${secondaryTextClasses}`}>Qty: {item.quantity}</p>
                  </div>
                  <p className={`text-sm font-semibold ${textClasses}`}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                 <button
                    onClick={onConfirmPayment}
                    disabled={!isFormValid()}
                    className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all animate-gradient-xy"
                  >
                   <span className="flex items-center justify-center gap-2"><Lock size={16} /> Confirm and Pay</span>
                  </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
