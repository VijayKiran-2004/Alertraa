'use client';

import { X, CheckCircle2 } from 'lucide-react';

interface PaymentConfirmationModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function PaymentConfirmationModal({ onClose, isDarkMode }: PaymentConfirmationModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const textMutedClasses = isDarkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-4 text-center ${modalBgClasses}`}>
        <div className="flex justify-center text-emerald-500 mb-2">
          <CheckCircle2 size={64} className="animate-beat" />
        </div>
        <h2 className="text-2xl font-headline font-bold">Payment Successful!</h2>
        <p className={`${textMutedClasses}`}>
          Your order has been placed. You will receive a confirmation email shortly.
        </p>
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:opacity-90 transition-opacity animate-gradient-xy"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
