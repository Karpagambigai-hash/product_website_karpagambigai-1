import React, { useState } from 'react';
import { ShoppingCart, User, Search, LogOut, Menu, X, Package, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC<{ 
  onOpenAuth: () => void; 
  onOpenCart: () => void;
  onOpenHistory: () => void;
  onOpenOrders: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}> = ({ onOpenAuth, onOpenCart, onOpenHistory, onOpenOrders, searchQuery, setSearchQuery }) => {
  const { user, cart, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black text-black tracking-tighter cursor-pointer group">
              VelvetVault<span className="text-rose-600 group-hover:animate-pulse">.</span>
            </h1>
            
            <div className="hidden lg:flex relative w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-rose-200 focus:ring-4 focus:ring-rose-50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <div className="flex items-center gap-6">
                <button onClick={onOpenOrders} className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2 transition-colors">
                  <Package className="w-4 h-4" /> Orders
                </button>
                <div className="relative group">
                  <button className="flex items-center gap-3 text-sm font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-all">
                    <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px]">
                      {user.name[0].toUpperCase()}
                    </div>
                    {user.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</p>
                      <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                    </div>
                    <button onClick={onOpenHistory} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Login History
                    </button>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2 mt-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}

            <button onClick={onOpenCart} className="relative p-2.5 bg-gray-50 rounded-full text-gray-900 hover:bg-rose-50 hover:text-rose-600 transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          <button className="md:hidden p-2 bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm"
                />
              </div>
              {user ? (
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button onClick={onOpenOrders} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl gap-2 font-bold text-sm">
                    <Package className="w-5 h-5 text-rose-600" /> Orders
                  </button>
                  <button onClick={onOpenHistory} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl gap-2 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-rose-600" /> Security
                  </button>
                  <button onClick={logout} className="col-span-2 py-3 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm">Logout</button>
                </div>
              ) : (
                <button onClick={onOpenAuth} className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm">Sign In / Register</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
