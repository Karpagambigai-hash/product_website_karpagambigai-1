import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, MessageSquare } from 'lucide-react';
import { Product, Review } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose, onOrderNow }) => {
  const { addToCart } = useAppContext();
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState<Review[]>([]);

  if (!product) return null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: 'You',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="md:w-1/2 relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg hover:scale-110 transition-all md:hidden"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
              <div className="hidden md:flex justify-end mb-4">
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {product.stockStatus}
                  </span>
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-4">{product.name}</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                    ))}
                    <span className="ml-2 font-bold">{product.rating}</span>
                  </div>
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-500 font-bold">{product.reviews} Global Reviews</span>
                </div>
                <p className="text-4xl font-black text-indigo-600">₹{product.price.toLocaleString()}</p>
              </div>

              <div className="space-y-6 mb-10">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <Truck className="w-5 h-5 text-indigo-500" />
                    <span className="text-xs font-bold">Free Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <RotateCcw className="w-5 h-5 text-indigo-500" />
                    <span className="text-xs font-bold">30-Day Free Returns</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => { addToCart(product); onClose(); }}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 py-5 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all"
                >
                  <ShoppingCart className="w-6 h-6" /> Add to Cart
                </button>
                <button 
                  onClick={() => onOrderNow(product)}
                  className="flex-1 bg-indigo-600 text-white py-5 rounded-[24px] font-black flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 transition-all"
                >
                  <Zap className="w-6 h-6 fill-white" /> Order Now
                </button>
              </div>

              {/* Reviews Section */}
              <div className="border-t dark:border-slate-800 pt-10">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                  Customer Experience
                </h3>

                {/* Submit Review */}
                <form onSubmit={handleAddReview} className="mb-10 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-3xl">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Share your thoughts</p>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="transition-transform hover:scale-125"
                      >
                        <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="What did you like or dislike?"
                    className="w-full bg-white dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-4 font-medium outline-none transition-all mb-4 resize-none h-24"
                  />
                  <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-black text-sm">
                    Post Review
                  </button>
                </form>

                {/* Review List */}
                <div className="space-y-6">
                  {reviews.length === 0 && (
                    <p className="text-slate-400 font-bold text-center py-4 italic">No customer reviews yet. Be the first!</p>
                  )}
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border-b dark:border-slate-800 pb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-black text-sm">{rev.userName}</p>
                        <span className="text-xs text-slate-400 font-bold">{rev.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
