import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Calendar,
  CreditCard,
  FileText,
  History,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  MapPin,
  ChevronRight,
  X
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { InvoiceModal } from './InvoiceModal';
import { useAppContext } from '../context/AppContext';

interface OrderTrackerProps {
  orders: Order[];
  onStartShopping: () => void;
  mode: 'history' | 'tracking';
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders, onStartShopping, mode }) => {
  const { cancelOrder } = useAppContext();
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[48px] border border-dashed border-slate-200 dark:border-slate-800">
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3">No Orders Found</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Start your premium shopping journey at ShopHub today.</p>
        <button 
          onClick={onStartShopping}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-200"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {(mode === 'history' || (mode === 'tracking' && !trackingOrder)) ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  {mode === 'history' ? <History className="text-white w-6 h-6" /> : <Truck className="text-white w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-4xl font-black tracking-tight">
                    {mode === 'history' ? 'My Orders' : 'Track Orders'}
                  </h2>
                  <p className="text-slate-500 font-bold">
                    {mode === 'history' ? 'Your transaction history' : 'Live delivery updates'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 group hover:border-indigo-200 transition-all"
                >
                  <div className="flex flex-wrap gap-8 flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                        <p className="font-bold text-sm">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Payment</p>
                        <p className="font-bold text-sm">{order.paymentMethod === 'Online Payment' ? order.onlineProvider : 'Cash'}</p>
                      </div>
                    </div>

                    {/* Price/Rate */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                        <span className="text-indigo-600 font-black text-xs">₹</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Rate</p>
                        <p className="font-black text-lg">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {mode === 'tracking' ? (
                      <button 
                        onClick={() => setTrackingOrder(order)}
                        className="flex-1 sm:flex-none bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg shadow-indigo-100"
                      >
                        Track Process <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedOrderForInvoice(order)}
                        className="flex-1 sm:flex-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                      >
                        <FileText className="w-5 h-5" /> View Bill
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tracking-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setTrackingOrder(null)}
                className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID:</span>
                <span className="text-xs font-mono font-black text-indigo-600">#{trackingOrder?.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
                <Truck className="w-10 h-10 text-indigo-600" />
                Tracking Process
              </h2>

              {/* Stepper */}
              <div className="relative mb-16">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10" />
                <div 
                  className="absolute top-5 left-0 h-1 bg-indigo-600 transition-all duration-1000 -z-10" 
                  style={{ width: trackingOrder ? `${(getStatusStep(trackingOrder.status) - 1) * 33.33}%` : '0%' }}
                />
                
                <div className="flex justify-between">
                  {[
                    { label: 'Ordered', icon: ShoppingBag, step: 1 },
                    { label: 'Processing', icon: Clock, step: 2 },
                    { label: 'Shipped', icon: Package, step: 3 },
                    { label: 'Delivered', icon: CheckCircle2, step: 4 }
                  ].map((s) => {
                    const isActive = trackingOrder && getStatusStep(trackingOrder.status) >= s.step;
                    const isCurrent = trackingOrder && getStatusStep(trackingOrder.status) === s.step;
                    
                    return (
                      <div key={s.label} className="flex flex-col items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-110' 
                            : 'bg-white dark:bg-slate-800 text-slate-300 border-2 border-slate-100 dark:border-slate-700'
                        }`}>
                          <s.icon className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                            {s.label}
                          </p>
                          {isCurrent && <span className="text-[8px] font-bold text-green-500 animate-pulse">Live Update</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tracking Details */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Delivery Order</h3>
                  <div className="space-y-4">
                    {trackingOrder?.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-slate-400 font-bold">Qty: {item.quantity} • ₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Shipping Address</h3>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                        <div>
                          <p className="font-bold">Valued Customer</p>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            123 Premium Avenue, Tech Hub District<br />
                            Mumbai, Maharashtra - 400001<br />
                            India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setSelectedOrderForInvoice(trackingOrder)}
                      className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <FileText className="w-5 h-5" /> View Invoice
                    </button>
                    {trackingOrder?.status === 'Pending' && (
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this order?")) {
                            cancelOrder(trackingOrder.id);
                            setTrackingOrder(null);
                          }
                        }}
                        className="flex-1 bg-red-50 dark:bg-red-900/10 text-red-500 py-4 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white transition-all"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOrderForInvoice && (
          <InvoiceModal 
            isOpen={true}
            onClose={() => setSelectedOrderForInvoice(null)}
            order={selectedOrderForInvoice}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
