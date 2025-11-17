"use client";
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Star, Eye, Heart, ChevronRight, Zap, Shield, Truck } from 'lucide-react';

const ElectronicsStore = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showQuickView, setShowQuickView] = useState(null);

  const categories = [
    { name: 'Smartphones', icon: '📱', count: 156 },
    { name: 'Laptops', icon: '💻', count: 89 },
    { name: 'Headphones', icon: '🎧', count: 234 },
    { name: 'Cameras', icon: '📷', count: 67 },
    { name: 'Smart Watch', icon: '⌚', count: 145 },
    { name: 'Gaming', icon: '🎮', count: 198 }
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 134900,
      originalPrice: 159900,
      rating: 4.8,
      reviews: 1253,
      image: 'https://images.unsplash.com/photo-1695048064998-7f8e4d3c03f3?w=500',
      badge: 'Bestseller',
      specs: ['A17 Pro Chip', '256GB', '6.7" Display']
    },
    {
      id: 2,
      name: 'MacBook Pro 14"',
      price: 199900,
      originalPrice: 239900,
      rating: 4.9,
      reviews: 856,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      badge: 'New',
      specs: ['M3 Pro', '16GB RAM', '512GB SSD']
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 29990,
      originalPrice: 34990,
      rating: 4.7,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500',
      badge: 'Deal',
      specs: ['30h Battery', 'ANC', 'Premium Sound']
    },
    {
      id: 4,
      name: 'Canon EOS R6 Mark II',
      price: 224990,
      originalPrice: 249990,
      rating: 4.9,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      badge: 'Pro',
      specs: ['24.2MP', '4K 60fps', 'IBIS']
    },
    {
      id: 5,
      name: 'Apple Watch Ultra 2',
      price: 89900,
      originalPrice: 99900,
      rating: 4.8,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      badge: 'Hot',
      specs: ['49mm Titanium', 'GPS + Cellular', '36h Battery']
    },
    {
      id: 6,
      name: 'PS5 Digital Edition',
      price: 44990,
      originalPrice: 49990,
      rating: 4.6,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
      badge: 'Gaming',
      specs: ['825GB SSD', '4K 120fps', 'Ray Tracing']
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };

  const QuickViewModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </div>
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-lg">Key Specifications:</h3>
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <Truck className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-xs">Free Delivery</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <Shield className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-xs">1 Year Warranty</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <Zap className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-xs">Fast Shipping</p>
              </div>
            </div>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Add to Cart - ₹{product.price.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechVault
              </h1>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Deals</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Support</a>
              </nav>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm mb-4">
                🔥 Limited Time Offer
              </span>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Premium Electronics at Unbeatable Prices
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Up to 40% off on top brands. Free delivery on orders above ₹2,999
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all">
                  Shop Now
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
                  View Deals
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600"
                alt="Featured Product"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold mb-8">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h4 className="font-semibold mb-1">{cat.name}</h4>
              <p className="text-sm text-gray-500">{cat.count} items</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold">Featured Products</h3>
          <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all group overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  {product.badge}
                </span>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowQuickView(product)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Free Shipping</h4>
              <p className="text-gray-600">On orders above ₹2,999</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Secure Payment</h4>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Same-day in metro cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal product={showQuickView} onClose={() => setShowQuickView(null)} />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TechVault</h3>
              <p className="text-gray-400">Your trusted electronics destination</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Get the latest deals</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectronicsStore;