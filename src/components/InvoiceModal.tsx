import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  // Derive subtotal and tax from the total (which already includes tax)
  const finalTotal = order.total;
  const subtotal = finalTotal / 1.12;
  const tax = finalTotal - subtotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden print:shadow-none print:rounded-none"
          >
            {/* Header */}
            <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 print:bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">ShopHub</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Tax Invoice</p>
                </div>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <button onClick={handlePrint} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-colors">
                  <Printer className="w-5 h-5" />
                </button>
                <button onClick={onClose} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 overflow-y-auto max-h-[70vh] no-scrollbar print:max-h-none">
              <div className="flex justify-between mb-12">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Billed To</p>
                  <p className="font-bold text-lg">Valued Customer</p>
                  <p className="text-slate-500 text-sm">ShopHub Elite Member</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Order Details</p>
                  <p className="font-mono font-bold text-indigo-600">#{order.id.toUpperCase()}</p>
                  <p className="text-slate-500 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b dark:border-slate-800">
                    <th className="text-left py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Item Description</th>
                    <th className="text-center py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Qty</th>
                    <th className="text-right py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="text-right py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-800">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.category}</p>
                      </td>
                      <td className="py-6 text-center font-bold">{item.quantity}</td>
                      <td className="py-6 text-right font-bold">₹{item.price.toLocaleString()}</td>
                      <td className="py-6 text-right font-black">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-4">
                  <div className="flex justify-between text-slate-500 font-bold">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-bold">
                    <span>GST (12%)</span>
                    <span>₹{tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="pt-6 border-t-2 dark:border-slate-800 flex justify-between text-3xl font-black">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t dark:border-slate-800 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 font-black text-sm uppercase tracking-widest mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Paid via {order.paymentMethod}
                </div>
                <p className="text-slate-400 text-xs font-medium">Thank you for choosing ShopHub Excellence.</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex gap-4 print:hidden">
              <button 
                onClick={handlePrint}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
              >
                <Download className="w-5 h-5" /> Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
