import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, CheckCircle2, MapPin, Smartphone, SmartphoneNfc, Wallet, QrCode, ExternalLink, ShieldCheck } from 'lucide-react';
import { CartItem, PaymentMethod, OnlineProvider } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onConfirm: (paymentMethod: PaymentMethod, provider?: OnlineProvider) => void;
  onTrackOrder?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onConfirm, onTrackOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online Payment');
  const [onlineProvider, setOnlineProvider] = useState<OnlineProvider>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleStartPayment = () => {
    if (paymentMethod === 'Online Payment') {
      setShowGateway(true);
    } else {
      processOrder();
    }
  };

  const processOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onConfirm(paymentMethod, paymentMethod === 'Online Payment' ? onlineProvider : undefined);
    }, 1500);
  };

  const handleFinalConfirm = () => {
    setIsSuccess(false);
    setShowGateway(false);
    onClose();
  };

  const providers: { id: OnlineProvider; name: string; icon: any }[] = [
    { id: 'UPI', name: 'UPI ID', icon: Smartphone },
    { id: 'GPay', name: 'Google Pay', icon: SmartphoneNfc },
    { id: 'PhonePe', name: 'PhonePe', icon: Wallet },
    { id: 'Card', name: 'Credit Card', icon: CreditCard },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-black mb-2">Order Placed!</h2>
                <p className="text-slate-500 font-medium mb-8">Your ShopHub order is confirmed and being prepared.</p>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      onTrackOrder?.();
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <MapPin className="w-5 h-5" /> Track My Order
                  </button>
                  <button 
                    onClick={handleFinalConfirm}
                    className="w-full text-slate-400 font-bold py-2 hover:text-slate-600 transition-colors"
                  >
                    Back to Store
                  </button>
                </div>
              </div>
            ) : showGateway ? (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Gateway</span>
                  </div>
                  <button onClick={() => setShowGateway(false)} className="text-xs font-bold text-indigo-600">Change Method</button>
                </div>

                <div className="text-center mb-8">
                  <p className="text-slate-500 font-bold mb-1">Paying to ShopHub</p>
                  <h3 className="text-4xl font-black">₹{total.toLocaleString()}</h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 mb-8 flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                  {onlineProvider === 'UPI' ? (
                    <>
                      <QrCode className="w-32 h-32 text-slate-900 dark:text-white mb-4" />
                      <p className="text-sm font-bold">Scan QR to pay with any UPI app</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                        {onlineProvider === 'GPay' ? <SmartphoneNfc className="text-white w-8 h-8" /> : <Wallet className="text-white w-8 h-8" />}
                      </div>
                      <p className="text-sm font-bold">Opening {onlineProvider} App...</p>
                      <button className="mt-4 text-indigo-600 text-xs font-black flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Retry Redirect
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={processOrder}
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "I have completed the payment"
                  )}
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <div>
                    <h2 className="text-xl font-black">Checkout</h2>
                    <p className="text-xs font-bold text-slate-400">Secure Payment Gateway</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Order Summary</h3>
                    <div className="space-y-2 max-h-24 overflow-y-auto pr-2 no-scrollbar">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="font-bold text-slate-600 dark:text-slate-400">{item.name} <span className="text-indigo-500">x{item.quantity}</span></span>
                          <span className="font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t dark:border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span>GST (12%)</span>
                        <span>₹{tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-black text-2xl">
                        <span>Total</span>
                        <span className="text-indigo-600">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod('Online Payment')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          paymentMethod === 'Online Payment'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10'
                            : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                        }`}
                      >
                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'Online Payment' ? 'text-indigo-500' : 'text-slate-400'}`} />
                        <span className="text-xs font-black">Online</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('Cash on Delivery')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          paymentMethod === 'Cash on Delivery'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10'
                            : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                        }`}
                      >
                        <Banknote className={`w-6 h-6 ${paymentMethod === 'Cash on Delivery' ? 'text-indigo-500' : 'text-slate-400'}`} />
                        <span className="text-xs font-black">Cash</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {paymentMethod === 'Online Payment' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-8 overflow-hidden"
                      >
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Select Provider</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {providers.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setOnlineProvider(p.id)}
                              className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                                onlineProvider === p.id
                                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                                  : 'border-slate-100 dark:border-slate-800 text-slate-400'
                              }`}
                            >
                              <p.icon className="w-5 h-5" />
                              <span className="text-[8px] font-black uppercase">{p.id}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleStartPayment}
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      paymentMethod === 'Online Payment' ? "Proceed to Payment" : `Confirm Order • ₹${total.toLocaleString()}`
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
