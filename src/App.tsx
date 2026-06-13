import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  History, 
  LogOut, 
  X,
  ShoppingCart,
  PackageCheck,
  ShieldCheck,
  MapPin,
  ArrowRight,
  ChevronRight,
  BellRing,
  Truck,
  Map,
  Sun,
  Moon
} from 'lucide-react';
import { products } from './data/products';
import { Category } from './types';
import { useAppContext } from './context/AppContext';
import { ProductCard } from './components/ProductCard';
import { OrderTracker } from './components/OrderTracker';
import { CheckoutModal } from './components/CheckoutModal';
import { motion, AnimatePresence } from 'framer-motion';

const categories: Category[] = [
  'Electronics', 'Mobiles', 'Gadgets', 'Home Appliances', 
  'Grocery', 'Toys', 'Backpack', 'Sports', 
  'Footwear', 'Fashion Products', 'Hair Care Products', 
  'Skin Products', 'Makeup Products', 'Food Items', 'Chocolates',
  'Books', 'Stationary'
];

function App() {
  const { user, cart, orders, theme, toggleTheme, logout, login, signInWithGoogle, updateQuantity, removeFromCart, placeOrder, clearCart } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'home' | 'orders' | 'tracking' | 'profile' | 'cart'>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIdentifier, setAuthIdentifier] = useState('');
  const [authReason, setAuthReason] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const cartTotal = subtotal + tax;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authIdentifier.trim()) {
      login(authIdentifier, 'Valued Customer');
      setIsAuthModalOpen(false);
      setAuthIdentifier('');
      setPassword('');
      setAuthReason(null);
    }
  };

  const triggerAuth = (reason: string) => {
    setAuthReason(reason);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <button onClick={() => setView('home')} className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-110">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <span className="text-xl lg:text-2xl font-black tracking-tighter">ShopHub</span>
            </button>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 flex-1 max-w-md border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-600 dark:text-slate-300 transition-all"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* My Orders Button */}
            <button 
              onClick={() => setView('orders')}
              className={`px-3 py-2.5 lg:px-4 rounded-xl transition-all flex items-center gap-2 group relative ${
                view === 'orders' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600'
              }`}
            >
              <History className={`w-5 h-5 ${view === 'orders' ? 'text-white' : 'text-indigo-500'}`} />
              <span className="hidden md:inline font-black text-sm uppercase tracking-wider">My Orders</span>
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setView('cart')}
              className={`p-3 rounded-xl relative transition-all ${view === 'cart' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-2 ml-2 relative group">
                <button 
                  className="flex items-center gap-3 p-2 pl-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  <span className="text-sm font-bold hidden sm:inline">{user.name}</span>
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
                    {user.name[0]}
                  </div>
                </button>
                
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                  <button 
                    onClick={() => setView('profile')}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <UserIcon className="w-4 h-4 text-indigo-500" /> Profile
                  </button>
                  <button 
                    onClick={() => setView('orders')}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <PackageCheck className="w-4 h-4 text-indigo-500" /> My Orders
                  </button>
                  <button 
                    onClick={() => setView('tracking')}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Map className="w-4 h-4 text-indigo-500" /> Track Order
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthReason(null);
                  setIsAuthModalOpen(true);
                }}
                className="ml-2 lg:ml-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 lg:px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg text-sm lg:text-base"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Hero Section */}
              <section className="mb-12 relative rounded-[48px] overflow-hidden bg-slate-900 h-[450px] flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  alt="ShopHub Hero"
                />
                <div className="relative z-10 px-8 lg:px-12 max-w-2xl">
                  <span className="bg-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">
                    Premium Shopping Hub
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter">ShopHub Excellence.</h1>
                  <p className="text-slate-200 text-base lg:text-lg mb-10 font-medium">Discover a curated world of premium electronics, gourmet food, and luxury essentials delivered to your doorstep.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => {
                      const el = document.getElementById('product-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }} className="bg-white text-slate-900 px-8 lg:px-10 py-4 lg:py-5 rounded-[24px] font-black text-base lg:text-lg hover:scale-105 transition-all shadow-2xl">
                      Shop Now
                    </button>
                    <button 
                      onClick={() => setView('tracking')}
                      className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 lg:px-10 py-4 lg:py-5 rounded-[24px] font-black text-base lg:text-lg hover:bg-white/20 transition-all flex items-center gap-3"
                    >
                      <Truck className="w-5 h-5" /> Track Orders
                    </button>
                  </div>
                </div>
              </section>

              {/* Categories */}
              <div className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all ${
                    activeCategory === 'All' 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500'
                  }`}
                >
                  All Items
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all ${
                      activeCategory === cat 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' 
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAuthRequired={triggerAuth} />
                ))}
              </div>
            </motion.div>
          )}

          {(view === 'orders' || view === 'tracking') && (
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OrderTracker 
                orders={orders} 
                onStartShopping={() => setView('home')} 
                mode={view === 'orders' ? 'history' : 'tracking'}
              />
            </motion.div>
          )}

          {view === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl font-black mb-10 tracking-tight">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[48px] border border-dashed border-slate-200 dark:border-slate-800">
                  <ShoppingCart className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                  <p className="text-slate-500 font-bold text-xl mb-6">Your cart is feeling light</p>
                  <button onClick={() => setView('home')} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold">Start Shopping</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] flex flex-col sm:flex-row gap-8 items-center border border-slate-100 dark:border-slate-800">
                        <img src={item.image} className="w-32 h-32 rounded-2xl object-cover" alt={item.name} />
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.category}</p>
                              <h3 className="font-bold text-xl">{item.name}</h3>
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center font-bold hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">-</button>
                              <span className="w-10 text-center font-black">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center font-bold hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-indigo-600 text-sm font-black uppercase tracking-widest transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[48px] h-fit border border-slate-100 dark:border-slate-800 sticky top-28 shadow-sm">
                    <h3 className="text-2xl font-black mb-8">Summary</h3>
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-slate-500 font-bold">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-bold">
                        <span>Shipping</span>
                        <span className="text-green-600">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-bold">
                        <span>GST (12%)</span>
                        <span>₹{tax.toLocaleString()}</span>
                      </div>
                      <div className="pt-6 border-t dark:border-slate-800 flex justify-between text-3xl font-black">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (!user) {
                          triggerAuth("Please sign in to complete your checkout.");
                        } else {
                          setIsCheckoutOpen(true);
                        }
                      }}
                      className="w-full bg-indigo-600 text-white py-6 rounded-[24px] font-black text-xl shadow-2xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] transition-all"
                    >
                      Checkout Now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'profile' && user && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[48px] p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 text-center sm:text-left">
                  <div className="w-32 h-32 bg-indigo-600 rounded-[40px] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-indigo-200 dark:shadow-none">
                    {user.name[0]}
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">{user.name}</h2>
                    <p className="text-slate-500 font-bold text-lg">{user.identifier}</p>
                    <div className="flex justify-center sm:justify-start gap-4 mt-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Verified Member</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-indigo-600" />
                    Security & History
                  </h3>
                  <div className="grid gap-4">
                    {user.loginHistory.map((h, i) => (
                      <div key={i} className="p-6 rounded-[24px] bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 border border-transparent hover:border-slate-200 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                            <History className="w-6 h-6 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-black text-sm">{h.device} • {h.browser}</p>
                            <p className="text-xs font-bold text-slate-400">{new Date(h.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white dark:bg-slate-900 rounded-[40px] p-10 w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black tracking-tighter">Welcome Back</h2>
                <button onClick={() => setIsAuthModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {authReason && (
                <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl flex items-center gap-3 text-indigo-600">
                  <BellRing className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold">{authReason}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Google Login Trigger */}
                <button 
                  onClick={signInWithGoogle}
                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all mb-2 shadow-sm group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs font-black uppercase tracking-widest">
                    <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Or use email</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email or Phone</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. user@hub.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-4 font-bold transition-all outline-none"
                      value={authIdentifier}
                      onChange={(e) => setAuthIdentifier(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
                    <input 
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-4 font-bold transition-all outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onConfirm={(method, provider) => {
          placeOrder(cart, method, provider);
          clearCart();
        }}
        onTrackOrder={() => {
          setView('tracking');
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
}

export default App;
