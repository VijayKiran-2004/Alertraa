'use client';

import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (medicineId: number, quantity: number) => void;
  onCheckout: () => void;
  isDarkMode: boolean;
}

export default function CartModal({ cart, onClose, onUpdateQuantity, onCheckout, isDarkMode }: CartModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const itemBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full flex flex-col space-y-4 max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-2"><ShoppingCart size={24} /> My Cart</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart size={48} className={secondaryTextClasses} />
            <p className={`mt-4 font-semibold ${textClasses}`}>Your cart is empty.</p>
            <p className={`text-sm ${secondaryTextClasses}`}>Add items from the store to see them here.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {cart.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg flex items-center justify-between ${itemBgClasses}`}>
                  <div className="flex-1">
                    <p className={`font-semibold ${textClasses}`}>{item.name}</p>
                    <p className={`text-sm ${secondaryTextClasses}`}>${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 rounded-full bg-slate-500/50 hover:bg-slate-500/80"><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-full bg-slate-500/50 hover:bg-slate-500/80"><Plus size={16} /></button>
                    <button onClick={() => onUpdateQuantity(item.id, 0)} className="text-red-500 hover:text-red-400 ml-2"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:opacity-90 transition-opacity animate-gradient-xy"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
