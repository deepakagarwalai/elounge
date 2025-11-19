"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Search,
  Star,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Cpu,
  Zap,
  ChevronDown,
} from "lucide-react";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

export default function Home() {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN").format(price);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);

  // Close mega menu on mouse leave
  const handleMouseLeaveMega = (e: any) => {
    if (megaRef.current && !megaRef.current.contains(e.relatedTarget)) {
      setMegaOpen(false);
    }
  };

  const products: Product[] = [
    {
      id: 1,
      name: "AirPods Max",
      price: 59990,
      image:
        "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Audio",
    },
    {
      id: 2,
      name: "Apple Watch Ultra 2",
      price: 89900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Wearables",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 29990,
      image:
        "https://images.pexels.com/photos/3394669/pexels-photo-3394669.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Audio",
    },
    {
      id: 4,
      name: "Logitech MX Master 3S",
      price: 10990,
      image:
        "https://images.pexels.com/photos/4464829/pexels-photo-4464829.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.6,
      category: "Accessories",
    },
    {
      id: 5,
      name: "Samsung Galaxy S23 Ultra",
      price: 94999,
      image:
        "https://images.pexels.com/photos/5081921/pexels-photo-5081921.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Phones",
    },
    {
      id: 6,
      name: "MacBook Pro 14' M3",
      price: 189900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Laptops",
    },
    {
      id: 7,
      name: "iPad Pro M2",
      price: 89900,
      image:
        "https://images.pexels.com/photos/6335/man-computer-work-desk.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Tablets",
    },
    {
      id: 8,
      name: "Dell XPS 13 Laptop",
      price: 129900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Laptops",
    },
    {
      id: 9,
      name: "Nintendo Switch OLED",
      price: 33990,
      image:
        "https://images.pexels.com/photos/5961212/pexels-photo-5961212.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Gaming",
    },
    {
      id: 10,
      name: "GoPro Hero 11",
      price: 51990,
      image:
        "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Cameras",
    },
  ];

  const categories = [
    "All",
    "Audio",
    "Wearables",
    "Phones",
    "Laptops",
    "Tablets",
    "Gaming",
    "Cameras",
    "Accessories",
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal-on-scroll").forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              elounge
            </h1>

            <nav className="hidden md:flex gap-10 text-gray-700 font-semibold text-lg items-center">
              <button className="hover:text-blue-700 transition">Home</button>

              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button className="flex items-center gap-1 hover:text-blue-700 transition">
                  Products
                  <ChevronDown className="w-4 h-4" />
                </button>

                {megaOpen && (
                  <div
                    ref={megaRef}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6 z-50"
                  >
                    <div>
                      <p className="text-xs uppercase text-gray-400 mb-2">
                        Categories
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer">
                          Audio Devices
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Laptops & Desktops
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Wearables
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Gaming
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-gray-400 mb-2">
                        Collections
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer">
                          New Arrivals
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Best Sellers
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Work From Home
                        </li>
                        <li className="hover:text-blue-700 cursor-pointer">
                          Creator&apos;s Desk
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase text-gray-400 mb-2">
                          Highlight
                        </p>
                        <p className="text-sm font-medium mb-1 text-blue-900">
                          Premium Audio Sale
                        </p>
                        <p className="text-xs text-gray-600">
                          Up to 30% off on headphones & earbuds.
                        </p>
                      </div>

                      <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="hover:text-blue-700 transition">
                Categories
              </button>
              <button className="hover:text-blue-700 transition">
                Support
              </button>
            </nav>

            <div className="hidden md:flex gap-5 items-center">
              <Search className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600 transition" />
              <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition" />
              <div className="relative cursor-pointer group">
                <ShoppingCart className="w-6 h-6 group-hover:text-blue-600 transition" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden bg-white border-t px-6 py-4 space-y-3 text-lg font-medium">
              <button>Home</button>
              <button>Products</button>
              <button>Categories</button>
              <button>Support</button>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 reveal-on-scroll overflow-hidden">
          {/* Animated background gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-20 blur-sm"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full opacity-20 blur-sm"
            animate={{ 
              y: [0, 25, 0],
              x: [0, 15, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full"
              >
                ✨ New Collection 2025
              </motion.div>
              
              <h2 className="text-7xl font-light leading-tight mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Elevate your{" "}
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Lifestyle
                </span>
              </h2>

              <p className="text-gray-600 text-xl mb-12 leading-relaxed">
                Explore a curated selection of premium electronics crafted for
                minimalism and modern living.
              </p>

              <div className="flex gap-4 items-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transition text-lg font-medium group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-600 hover:text-blue-600 transition text-lg font-medium"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-16">
                {[
                  { num: '10K+', label: 'Products' },
                  { num: '50K+', label: 'Happy Customers' },
                  { num: '4.9', label: 'Rating' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.num}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src="https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg"
                  className="rounded-[40px] shadow-2xl relative z-10"
                  alt="Hero product"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] blur-2xl opacity-30 -z-10"></div>
              </motion.div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 -left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-white/90"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Premium</p>
                    <p className="font-bold text-sm">Quality</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-8 -right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-white/90"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Fast</p>
                    <p className="font-bold text-sm">Delivery</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 overflow-hidden border-y border-gray-200">
          <div className="marquee flex gap-12 text-sm font-semibold">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Free shipping above ₹2,999
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  24/7 premium customer support
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  Exclusive member-only launches
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-600" />
                  Secure online payments
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PREMIUM FEATURES */}
        <section className="max-w-7xl mx-auto px-6 py-24 reveal-on-scroll">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Fast & Free Shipping",
                description: "Free delivery on orders above ₹2,999. Get your products within 2-3 days.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                description: "100% secure transactions with bank-level encryption and fraud protection.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Handpicked products from trusted brands with certified quality assurance.",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h4 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
            >
              Shop by Category
            </motion.h3>
            <p className="text-gray-600">Discover our premium collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Audio", icon: Sparkles, color: "from-blue-500 to-cyan-500" },
              { name: "Wearables", icon: Cpu, color: "from-purple-500 to-pink-500" },
              { name: "Accessories", icon: Zap, color: "from-orange-500 to-red-500" },
              { name: "Gaming", icon: Star, color: "from-green-500 to-emerald-500" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group relative bg-white border rounded-3xl p-10 shadow-sm hover:shadow-2xl cursor-pointer transition-all overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`relative p-5 bg-gradient-to-br ${c.color} rounded-2xl mb-4 w-fit shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl text-gray-900 font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition">
                    {c.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore collection →
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TOP PICKS CAROUSEL */}
        <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
                Top Picks For You
              </h3>
              <p className="text-gray-600">Curated from our best-sellers</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            className="!pb-12"
          >
            {products.slice(0, 6).map((p, i) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="group bg-white border rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Wishlist button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>

                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={p.name}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {p.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{p.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                      {p.name}
                    </h4>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{formatPrice(p.price)}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transition font-medium relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* FEATURED PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-6 py-24 reveal-on-scroll relative">
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-gray-600">Handpicked for you</p>
          </div>

          {/* Filters with gradient effect */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 text-sm scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full border-2 transition whitespace-nowrap font-medium ${
                  activeFilter === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid with staggered animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ 
                  y: -8,
                  rotateY: 2,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="group bg-white border rounded-3xl shadow-sm hover:shadow-2xl transition-all overflow-hidden relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quick view button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <motion.button
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium text-sm"
                  >
                    Quick View
                  </motion.button>
                </div>

                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={p.name}
                  />
                  
                  {/* Badge */}
                  {i < 3 && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                      HOT
                    </span>
                  )}
                </div>
                
                <div className="p-5">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                    {p.name}
                  </h4>

                  <div className="flex items-center gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-green-600 fill-green-600" />
                      <span className="font-semibold text-green-700">{p.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{p.category}</span>
                  </div>

                  <p className="font-bold text-gray-900 text-xl mb-4">
                    ₹{formatPrice(p.price)}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full hover:shadow-lg transition font-medium"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-7xl mx-auto px-6 py-28 reveal-on-scroll">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-16 rounded-[3rem] text-center shadow-2xl overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-12 h-12 mx-auto text-yellow-300" />
              </motion.div>
              
              <h3 className="text-5xl mb-4 font-bold">Stay Updated</h3>
              <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
                Get exclusive deals, product launches & special offers delivered to your inbox.
              </p>

              <div className="max-w-xl mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-xl transition"
                >
                  Subscribe
                </motion.button>
              </div>

              <p className="text-blue-100 text-sm mt-6">
                🎁 Get 10% off on your first purchase when you subscribe
              </p>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-blue-100 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
            <div>
              <h3 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                elounge
              </h3>
              <p className="text-blue-200 leading-relaxed">
                Curated premium electronics for modern living—quality,
                performance, and fast delivery.
              </p>
              <div className="flex gap-4 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition"
                  >
                    <div className="w-4 h-4 bg-white/50 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">
                  New Arrivals
                </li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">
                  Best Sellers
                </li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">
                  Trending Products
                </li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">
                  Gift Cards
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">Help Center</li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">Warranty</li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">
                  Order Tracking
                </li>
                <li className="hover:text-white cursor-pointer transition hover:translate-x-1">Returns</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Newsletter</h4>
              <p className="text-blue-200 text-sm mb-4">
                Subscribe to receive offers.
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition placeholder:text-blue-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-white text-blue-900 rounded-xl text-sm font-semibold hover:shadow-xl transition"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </div>

          <div className="text-center text-blue-300 text-sm mt-16 border-t border-white/10 pt-8">
            <p>© 2025 elounge — All rights reserved. Made with ❤️ for tech lovers</p>
          </div>
        </footer>
      </div>

      {/* GLOBAL CSS */}
      <style jsx global>{`
        .marquee {
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom Swiper navigation styling */
        .swiper-button-next,
        .swiper-button-prev {
          background: white;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          color: #2563eb;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          background: #9333ea;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #2563eb, #9333ea);
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}