import React, { useState } from 'react';
import { Star, ShoppingCart, Zap, Eye } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { CheckoutModal } from './CheckoutModal';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
  onAuthRequired: (reason: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAuthRequired }) => {
  const { user, addToCart, placeOrder } = useAppContext();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onAuthRequired("Please sign in to place your order.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div 
        onClick={() => setIsDetailOpen(true)}
        className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye className="w-4 h-4" /> View Details
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{product.category}</p>
            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
              product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {product.stockStatus}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-2xl font-black text-slate-900 dark:text-white mb-6">₹{product.price.toLocaleString()}</p>
          
          <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 text-slate-800 dark:text-white py-3.5 rounded-2xl font-bold transition-all text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
            <button 
              onClick={handleOrderClick}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold transition-all text-sm shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              <Zap className="w-4 h-4 fill-white" />
              Order
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={[{ ...product, quantity: 1 }]}
        onConfirm={(method, provider) => {
          placeOrder([{ ...product, quantity: 1 }], method, provider);
        }}
      />

      <ProductDetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={product}
        onOrderNow={(p) => {
          if (!user) {
            setIsDetailOpen(false);
            onAuthRequired("Please sign in to place your order.");
            return;
          }
          setIsDetailOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
    </>
  );
};
