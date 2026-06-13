import { Product } from '../types';

export const products: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'MacBook Pro M3 Max',
    price: 349900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    stockStatus: 'In Stock',
    description: 'The ultimate power for pros. M3 Max chip, 14-inch Liquid Retina XDR display, and up to 128GB of unified memory.'
  },
  {
    id: 'e2',
    name: 'Sony WH-1000XM5',
    price: 29990,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 245,
    stockStatus: 'In Stock',
    description: 'Industry-leading noise cancellation and magnificent sound quality with 30-hour battery life.'
  },
  {
    id: 'e3',
    name: 'iPad Pro 12.9" M2',
    price: 112900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 312,
    stockStatus: 'In Stock',
    description: 'Liquid Retina XDR display. M2 chip. Superfast 5G. The ultimate iPad experience.'
  },
  {
    id: 'e4',
    name: 'Samsung Odyssey G9',
    price: 145000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 89,
    stockStatus: 'In Stock',
    description: '49-inch Dual QHD Curved Gaming Monitor with 240Hz refresh rate and 1ms response time.'
  },
  {
    id: 'e5',
    name: 'Logitech MX Master 3S',
    price: 10995,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1540,
    stockStatus: 'In Stock',
    description: 'Quiet clicks and 8K DPI tracking on any surface. The most advanced mouse for creators.'
  },
  {
    id: 'e6',
    name: 'Sony Alpha a7 IV',
    price: 212990,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 420,
    stockStatus: 'In Stock',
    description: 'Full-frame mirrorless camera with 33MP sensor and 4K 60p video recording.'
  },
  {
    id: 'e7',
    name: 'Bose QuietComfort Ultra',
    price: 35900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 180,
    stockStatus: 'In Stock',
    description: 'World-class noise cancellation and spatial audio for an immersive listening experience.'
  },
  {
    id: 'e8',
    name: 'Keychron Q1 Pro',
    price: 18500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 95,
    stockStatus: 'In Stock',
    description: 'Fully customizable mechanical keyboard with wireless connectivity and aluminum body.'
  },

  // Mobiles
  {
    id: 'mo1',
    name: 'iPhone 15 Pro Titanium',
    price: 134900,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 540,
    stockStatus: 'Limited Stock',
    description: 'Forged in titanium. A17 Pro chip. A game-changing camera system with 48MP resolution.'
  },
  {
    id: 'mo2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 312,
    stockStatus: 'In Stock',
    description: 'Galaxy AI is here. Epic camera with 200MP resolution and built-in S Pen.'
  },
  {
    id: 'mo3',
    name: 'Google Pixel 8 Pro',
    price: 106999,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 189,
    stockStatus: 'In Stock',
    description: 'The all-pro Google phone. Best Pixel camera yet with advanced AI features.'
  },
  {
    id: 'mo4',
    name: 'OnePlus 12 5G',
    price: 64999,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 210,
    stockStatus: 'In Stock',
    description: 'Smooth Beyond Belief. Snapdragon 8 Gen 3 and 4th Gen Hasselblad Camera.'
  },
  {
    id: 'mo5',
    name: 'Nothing Phone (2)',
    price: 44999,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1689085383531-31495379e96e?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: 156,
    stockStatus: 'In Stock',
    description: 'The iconic Glyph Interface. Nothing OS 2.0. A giant leap forward in performance.'
  },

  // Gadgets
  {
    id: 'g1',
    name: 'Apple Watch Ultra 2',
    price: 89900,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81846?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 120,
    stockStatus: 'In Stock',
    description: 'The most rugged and capable Apple Watch ever. Designed for the extremes.'
  },
  {
    id: 'g2',
    name: 'Meta Quest 3',
    price: 49999,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 85,
    stockStatus: 'In Stock',
    description: 'Breakthrough mixed reality. Transform your home into a virtual playground.'
  },
  {
    id: 'g3',
    name: 'DJI Mini 4 Pro',
    price: 95000,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 64,
    stockStatus: 'In Stock',
    description: 'Ultra-lightweight drone with 4K HDR video and omnidirectional obstacle sensing.'
  },
  {
    id: 'g4',
    name: 'Anker 737 Power Bank',
    price: 12999,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 450,
    stockStatus: 'In Stock',
    description: '24,000mAh capacity with 140W fast charging for laptops and phones.'
  },

  // Home Appliances
  {
    id: 'ha1',
    name: 'Dyson V15 Detect',
    price: 65900,
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 230,
    stockStatus: 'In Stock',
    description: 'The most powerful, intelligent cordless vacuum. Laser reveals microscopic dust.'
  },
  {
    id: 'ha2',
    name: 'Nespresso Vertuo Pop',
    price: 15999,
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 145,
    stockStatus: 'In Stock',
    description: 'Versatile coffee and espresso machine with one-touch brewing technology.'
  },
  {
    id: 'ha3',
    name: 'Philips Air Purifier 3000i',
    price: 24500,
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 310,
    stockStatus: 'In Stock',
    description: 'Removes 99.9% of viruses and aerosols from the air. Smart app control.'
  },
  {
    id: 'ha4',
    name: 'KitchenAid Artisan Mixer',
    price: 48990,
    category: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 560,
    stockStatus: 'In Stock',
    description: 'The iconic stand mixer for every culinary challenge. 10 speeds and 59 touchpoints.'
  },

  // Grocery
  {
    id: 'gr1',
    name: 'Organic Manuka Honey',
    price: 3450,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 88,
    stockStatus: 'In Stock',
    description: 'Premium MGO 400+ Manuka honey from New Zealand. Pure and potent.'
  },
  {
    id: 'gr2',
    name: 'Ceremonial Matcha Powder',
    price: 2850,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 124,
    stockStatus: 'In Stock',
    description: 'Stone-ground green tea powder from Uji, Japan. Vibrant and smooth.'
  },
  {
    id: 'gr3',
    name: 'Extra Virgin Olive Oil',
    price: 1850,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 210,
    stockStatus: 'In Stock',
    description: 'First cold-pressed organic olive oil from Tuscany. Rich and peppery.'
  },

  // Toys
  {
    id: 't1',
    name: 'LEGO Star Wars Millennium Falcon',
    price: 14999,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1585366119957-e57332321c7c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 450,
    stockStatus: 'In Stock',
    description: 'Detailed LEGO model of the iconic Corellian freighter. 1,351 pieces.'
  },
  {
    id: 't2',
    name: 'DJI Tello Ryze Drone',
    price: 9999,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1524143902220-eac236a000c1?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 180,
    stockStatus: 'In Stock',
    description: 'The perfect starter drone. Perform aerial stunts and shoot 5MP photos.'
  },
  {
    id: 't3',
    name: 'Catan Board Game',
    price: 3499,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1200,
    stockStatus: 'In Stock',
    description: 'The classic strategy game of trade, build, and settle on the island of Catan.'
  },

  // Backpack
  {
    id: 'b1',
    name: 'Peak Design Everyday 20L',
    price: 24500,
    category: 'Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eebec4c971?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 340,
    stockStatus: 'In Stock',
    description: 'The award-winning backpack for everyday and photo carry. Weatherproof and durable.'
  },
  {
    id: 'b2',
    name: 'Herschel Little America',
    price: 8999,
    category: 'Backpack',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 850,
    stockStatus: 'In Stock',
    description: 'Iconic mountaineering style with modern functionality and a padded laptop sleeve.'
  },
  {
    id: 'b3',
    name: 'Osprey Farpoint 40',
    price: 14500,
    category: 'Backpack',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 560,
    stockStatus: 'In Stock',
    description: 'The ultimate carry-on travel backpack. Comfortable harness and large main opening.'
  },

  // Sports
  {
    id: 's1',
    name: 'Lululemon Reversible Mat',
    price: 6800,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1592432676556-2820351c479d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 210,
    stockStatus: 'In Stock',
    description: '5mm thick natural rubber mat with ultimate grip for sweaty yoga sessions.'
  },
  {
    id: 's2',
    name: 'Bowflex SelectTech 552',
    price: 45000,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1638533166064-3355164bb10c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1450,
    stockStatus: 'Limited Stock',
    description: 'Adjustable dumbbells that replace 15 sets of weights. Space-saving fitness.'
  },
  {
    id: 's3',
    name: 'Wilson Pro Staff 97',
    price: 22500,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1617083275226-6220763463b2?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 85,
    stockStatus: 'In Stock',
    description: 'The choice of pros. Precision and feel for advanced tennis players.'
  },

  // Footwear
  {
    id: 'f1',
    name: 'Nike Air Jordan 1 Retro',
    price: 16500,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 1200,
    stockStatus: 'Limited Stock',
    description: 'The sneaker that started it all. Iconic style and premium leather construction.'
  },
  {
    id: 'f2',
    name: 'Adidas Ultraboost Light',
    price: 18999,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 640,
    stockStatus: 'In Stock',
    description: 'Epic energy return and lightweight comfort for your daily run.'
  },
  {
    id: 'f3',
    name: 'Dr. Martens 1460 Boot',
    price: 14999,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 890,
    stockStatus: 'In Stock',
    description: 'The original 8-eye boot. Durable leather and iconic yellow stitching.'
  },

  // Fashion Products
  {
    id: 'fa1',
    name: 'Ray-Ban Aviator Classic',
    price: 12500,
    category: 'Fashion Products',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 450,
    stockStatus: 'In Stock',
    description: 'The worlds most iconic sunglasses. Timeless design and superior clarity.'
  },
  {
    id: 'fa2',
    name: 'Fossil Heritage Watch',
    price: 18995,
    category: 'Fashion Products',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 210,
    stockStatus: 'In Stock',
    description: 'Classic automatic watch with stainless steel bracelet and exhibition caseback.'
  },
  {
    id: 'fa3',
    name: 'Levi\'s Sherpa Trucker',
    price: 7999,
    category: 'Fashion Products',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 320,
    stockStatus: 'In Stock',
    description: 'The original denim jacket with a warm sherpa lining. A seasonal essential.'
  },

  // Hair Care Products
  {
    id: 'h1',
    name: 'Dyson Airwrap Multi-styler',
    price: 49900,
    category: 'Hair Care Products',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 850,
    stockStatus: 'In Stock',
    description: 'Curl, shape, and smooth with no extreme heat. Coanda effect styling.'
  },
  {
    id: 'h2',
    name: 'Olaplex No. 3 Hair Perfector',
    price: 2950,
    category: 'Hair Care Products',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 15400,
    stockStatus: 'In Stock',
    description: 'A weekly at-home treatment that reduces breakage and visibly strengthens hair.'
  },
  {
    id: 'h3',
    name: 'Moroccanoil Treatment',
    price: 3450,
    category: 'Hair Care Products',
    image: 'https://images.unsplash.com/photo-1626783416763-67a92fe5bb7a?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 5600,
    stockStatus: 'In Stock',
    description: 'The original foundation for hairstyling. Infused with antioxidant-rich argan oil.'
  },

  // Skin Products
  {
    id: 'sk1',
    name: 'La Mer Crème de la Mer',
    price: 28500,
    category: 'Skin Products',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 420,
    stockStatus: 'In Stock',
    description: 'The legendary moisturizer that started it all. Heals dryness and restores radiance.'
  },
  {
    id: 'sk2',
    name: 'EltaMD UV Clear SPF 46',
    price: 3850,
    category: 'Skin Products',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 2100,
    stockStatus: 'In Stock',
    description: 'Dermatologist-recommended sunscreen for acne-prone and sensitive skin.'
  },
  {
    id: 'sk3',
    name: 'Laneige Lip Sleeping Mask',
    price: 1450,
    category: 'Skin Products',
    image: 'https://images.unsplash.com/photo-1590156221122-c748e7898a0a?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 8900,
    stockStatus: 'In Stock',
    description: 'A leave-on lip mask that soothes and moisturizes for smoother, more supple lips.'
  },

  // Makeup Products
  {
    id: 'm1',
    name: 'Velvet Matte Lipstick Set',
    price: 3500,
    category: 'Makeup Products',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 89,
    stockStatus: 'In Stock',
    description: 'Long-lasting matte finish with a creamy feel. Set of 5 iconic shades.'
  },
  {
    id: 'm2',
    name: 'Nude Eyeshadow Palette',
    price: 4200,
    category: 'Makeup Products',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 215,
    stockStatus: 'In Stock',
    description: '12 highly pigmented shades from soft mattes to shimmers for every look.'
  },
  {
    id: 'm3',
    name: 'Full Coverage Foundation',
    price: 2850,
    category: 'Makeup Products',
    image: 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 312,
    stockStatus: 'In Stock',
    description: '24-hour wear with a natural finish. Breathable and transfer-resistant.'
  },
  {
    id: 'm4',
    name: 'Fenty Beauty Highlighter',
    price: 3200,
    category: 'Makeup Products',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 540,
    stockStatus: 'In Stock',
    description: 'Killawatt Freestyle Highlighter for a supercharged glow that lasts all day.'
  },

  // Food Items
  {
    id: 'fi1',
    name: 'Truffle Tagliatelle',
    price: 1850,
    category: 'Food Items',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 86,
    stockStatus: 'Limited Stock',
    description: 'Artisanal Italian pasta infused with black truffles for a gourmet experience.'
  },
  {
    id: 'fi2',
    name: 'Cold Pressed Avocado Oil',
    price: 1450,
    category: 'Food Items',
    image: 'https://images.unsplash.com/photo-1560811636-9676de7bde66?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 112,
    stockStatus: 'In Stock',
    description: '100% pure avocado oil for high-heat cooking and healthy dressing.'
  },
  {
    id: 'fi3',
    name: 'Himalayan Saffron 5g',
    price: 2499,
    category: 'Food Items',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 45,
    stockStatus: 'In Stock',
    description: 'Grade A organic saffron strands from the Kashmir valley. Pure and aromatic.'
  },
  {
    id: 'fi4',
    name: 'Aged Balsamic Vinegar',
    price: 3200,
    category: 'Food Items',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 64,
    stockStatus: 'In Stock',
    description: 'Traditional balsamic vinegar from Modena, aged for 12 years in wooden barrels.'
  },

  // Chocolates
  {
    id: 'ch1',
    name: 'Belgian Dark Truffles',
    price: 2450,
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 312,
    stockStatus: 'In Stock',
    description: 'Assorted 70% cacao dark chocolate truffles with a velvety smooth center.'
  },
  {
    id: 'ch2',
    name: 'Swiss Milk Gold Bar',
    price: 850,
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 540,
    stockStatus: 'In Stock',
    description: 'Classic creamy Swiss milk chocolate with roasted hazelnuts and honey.'
  },
  {
    id: 'ch3',
    name: 'Matcha Green Tea Bar',
    price: 1250,
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 89,
    stockStatus: 'In Stock',
    description: 'White chocolate infused with ceremonial grade matcha and puffed rice.'
  },
  {
    id: 'ch4',
    name: 'Ruby Berry Chocolate',
    price: 1450,
    category: 'Chocolates',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 42,
    stockStatus: 'In Stock',
    description: 'Naturally pink ruby chocolate with dried raspberries and strawberries.'
  },

  // Books
  {
    id: 'bk1',
    name: 'Atomic Habits',
    price: 450,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 15400,
    stockStatus: 'In Stock',
    description: 'An easy and proven way to build good habits and break bad ones. James Clear.'
  },
  {
    id: 'bk2',
    name: 'The Psychology of Money',
    price: 399,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 8900,
    stockStatus: 'In Stock',
    description: 'Timeless lessons on wealth, greed, and happiness. Morgan Housel.'
  },
  {
    id: 'bk3',
    name: 'Ikigai: The Japanese Secret',
    price: 350,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 12000,
    stockStatus: 'In Stock',
    description: 'The Japanese secret to a long and happy life. Discover your purpose.'
  },
  {
    id: 'bk4',
    name: 'The Great Gatsby',
    price: 299,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1543005128-d1b82fe337e5?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 5600,
    stockStatus: 'In Stock',
    description: 'A classic novel of the Jazz Age. F. Scott Fitzgerald masterpiece.'
  },
  {
    id: 'bk5',
    name: 'Thinking, Fast and Slow',
    price: 599,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 4200,
    stockStatus: 'In Stock',
    description: 'Daniel Kahneman explores the two systems that drive the way we think.'
  },

  // Stationary
  {
    id: 'st1',
    name: 'Premium Leather Journal',
    price: 1250,
    category: 'Stationary',
    image: 'https://images.unsplash.com/photo-1516414917003-4c8fc664815a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 320,
    stockStatus: 'In Stock',
    description: 'Handcrafted genuine leather journal with cream-colored archival paper.'
  },
  {
    id: 'st2',
    name: 'Gold Plated Fountain Pen',
    price: 2499,
    category: 'Stationary',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 156,
    stockStatus: 'Limited Stock',
    description: 'Elegant fountain pen with 18K gold-plated nib and smooth ink flow.'
  },
  {
    id: 'st3',
    name: 'Minimalist Desk Organizer',
    price: 899,
    category: 'Stationary',
    image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 450,
    stockStatus: 'In Stock',
    description: 'Sleek aluminum desk organizer for pens, clips, and your smartphone.'
  },
  {
    id: 'st4',
    name: 'Aesthetic Washi Tape Set',
    price: 450,
    category: 'Stationary',
    image: 'https://images.unsplash.com/photo-1586075010633-2442dc3d6334?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 890,
    stockStatus: 'In Stock',
    description: 'Set of 10 decorative washi tapes with pastel gradients and floral patterns.'
  },
  {
    id: 'st5',
    name: 'Pastel Dual-Tip Highlighters',
    price: 350,
    category: 'Stationary',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 2100,
    stockStatus: 'In Stock',
    description: 'Set of 6 mild pastel highlighters with dual tips for broad and fine lines.'
  }
];
