import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, PaymentMethod, OnlineProvider } from '../types';
import { supabase } from '../lib/supabase';

interface AppContextType {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  login: (identifier: string, name: string) => void;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  placeOrder: (items: CartItem[], paymentMethod: PaymentMethod, onlineProvider?: OnlineProvider) => void;
  cancelOrder: (orderId: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sh_theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sh_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sh_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('sh_theme', theme);
  }, [theme]);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        handleUserSync(session.user);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Use setTimeout to prevent deadlocks
      setTimeout(async () => {
        if (session?.user) {
          handleUserSync(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('sh_user');
        }
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSync = (supabaseUser: any) => {
    const history = {
      timestamp: new Date().toISOString(),
      device: navigator.platform,
      browser: 'Secure Browser'
    };

    const newUser: User = {
      identifier: supabaseUser.email || '',
      name: supabaseUser.user_metadata.full_name || supabaseUser.user_metadata.name || 'Valued Customer',
      loginHistory: [history]
    };

    setUser(newUser);
    localStorage.setItem('sh_user', JSON.stringify(newUser));
  };

  useEffect(() => {
    localStorage.setItem('sh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sh_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const login = (identifier: string, name: string) => {
    const history = {
      timestamp: new Date().toISOString(),
      device: navigator.platform,
      browser: 'Secure Browser'
    };
    const newUser = { identifier, name, loginHistory: [history] };
    setUser(newUser);
    localStorage.setItem('sh_user', JSON.stringify(newUser));
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Google Auth Error:', error.message);
      alert(`Authentication Error: ${error.message}. Please ensure Google Provider is enabled in Supabase Dashboard.`);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCart([]);
    localStorage.removeItem('sh_user');
  };

  const placeOrder = (items: CartItem[], paymentMethod: PaymentMethod, onlineProvider?: OnlineProvider) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.12;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: [...items],
      total: subtotal + tax,
      paymentMethod,
      onlineProvider,
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' as const } : order
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      user, cart, orders, theme, toggleTheme, addToCart, removeFromCart, 
      updateQuantity, login, signInWithGoogle, logout, placeOrder, cancelOrder, clearCart 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
