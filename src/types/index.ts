export type Category = 
  | 'Electronics' | 'Mobiles' | 'Gadgets' | 'Home Appliances' 
  | 'Grocery' | 'Toys' | 'Backpack' | 'Sports' 
  | 'Footwear' | 'Fashion Products' | 'Hair Care Products' 
  | 'Skin Products' | 'Makeup Products' | 'Food Items' | 'Chocolates'
  | 'Books' | 'Stationary';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  userReviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface LoginHistory {
  timestamp: string;
  device: string;
  browser: string;
}

export type OnlineProvider = 'UPI' | 'GPay' | 'PhonePe' | 'Card';
export type PaymentMethod = 'Online Payment' | 'Cash on Delivery';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  onlineProvider?: OnlineProvider;
  status: OrderStatus;
}

export interface User {
  identifier: string;
  name: string;
  loginHistory: LoginHistory[];
}
