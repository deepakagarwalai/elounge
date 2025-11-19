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
      name: "MacBook Pro 14” M3",
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
            <h1 className="text-4xl font-bold tracking-tight text-blue-700">
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

                    <div className="rounded-2xl bg-blue-50 p-4 flex flex-col justify-between">
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
              <Search className="w-6 h-6 text-gray-700" />
              <Heart className="w-6 h-6" />
              <ShoppingCart className="w-6 h-6" />
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
        <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 reveal-on-scroll">
          <div className="absolute inset-0 bg-blue-100/40 rounded-[50px] blur-3xl -z-10"></div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl font-light leading-tight mb-8">
                Elevate your{" "}
                <span className="font-semibold text-blue-700">
                  Tech Lifestyle
                </span>
              </h2>

              <p className="text-gray-600 text-xl mb-12">
                Explore a curated selection of premium electronics crafted for
                minimalism and modern living.
              </p>

              <button className="px-10 py-4 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition text-lg">
                Shop Now
              </button>
            </div>

            <motion.img
              src="https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg"
              className="rounded-[40px] shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </section>

        {/* MARQUEE */}
        <section className="bg-blue-50 py-6 overflow-hidden">
          <div className="marquee flex gap-12 text-sm text-blue-600 font-medium">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                <span>Free shipping above ₹2,999</span>
                <span>24/7 premium customer support</span>
                <span>Exclusive member-only launches</span>
                <span>Secure online payments</span>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll">
          <h3 className="text-3xl font-semibold mb-8 text-blue-900">
            Shop by Category
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Audio", icon: Sparkles },
              { name: "Wearables", icon: Cpu },
              { name: "Accessories", icon: Zap },
              { name: "Gaming", icon: Star },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group bg-white border rounded-3xl p-10 shadow-sm hover:shadow-xl cursor-pointer transition"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-4 bg-blue-50 rounded-xl mb-4 w-fit"
                  >
                    <Icon className="w-7 h-7 text-blue-700" />
                  </motion.div>
                  <h4 className="text-xl text-blue-900 font-medium">
                    {c.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TOP PICKS CAROUSEL */}
        <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-semibold text-blue-900">
              Top Picks For You
            </h3>
            <span className="text-sm text-blue-600 font-medium">
              Curated from our best-sellers
            </span>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
          >
            {products.slice(0, 6).map((p) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="bg-white border rounded-2xl shadow-md overflow-hidden"
                >
                  <img
                    src={p.image}
                    className="w-full h-60 object-cover"
                    alt={p.name}
                  />
                  <div className="p-6">
                    <p className="text-xs uppercase text-blue-500 mb-1">
                      {p.category}
                    </p>

                    <h4 className="text-lg font-medium mb-1">{p.name}</h4>

                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {p.rating.toFixed(1)}
                    </div>

                    <p className="text-xl font-semibold mb-4 text-blue-900">
                      ₹{formatPrice(p.price)}
                    </p>

                    <button className="w-full py-2.5 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* FEATURED PRODUCTS GRID (small Flipkart style cards) */}
        <section className="max-w-7xl mx-auto px-6 py-24 reveal-on-scroll">
          <h3 className="text-3xl font-semibold mb-8 text-blue-900">
            Featured Products
          </h3>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full border transition whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-blue-700 border-blue-700 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={p.image}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h4 className="font-medium text-sm line-clamp-2">{p.name}</h4>

                  <div className="flex items-center gap-2 text-xs mt-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {p.rating.toFixed(1)}
                  </div>

                  <p className="font-semibold text-blue-900 text-lg">
                    ₹{formatPrice(p.price)}
                  </p>

                  <button className="mt-3 w-full py-2 bg-blue-700 text-white text-sm rounded-full hover:bg-blue-800 transition">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-7xl mx-auto px-6 py-28 reveal-on-scroll">
          <div className="bg-blue-700 text-white p-16 rounded-3xl text-center shadow-lg">
            <h3 className="text-3xl mb-4 font-semibold">Stay Updated</h3>
            <p className="text-blue-100 mb-8">
              Get exclusive deals, launches & offers.
            </p>

            <div className="max-w-xl mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-black"
              />
              <button className="px-8 py-3 bg-black rounded-xl text-white font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-blue-900 text-blue-100 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
            <div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                elounge
              </h3>
              <p className="text-blue-200">
                Curated premium electronics for modern living—quality,
                performance, and fast delivery.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer transition">
                  New Arrivals
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Best Sellers
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Trending Products
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Gift Cards
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Warranty</li>
                <li className="hover:text-white cursor-pointer">
                  Order Tracking
                </li>
                <li className="hover:text-white cursor-pointer">Returns</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-blue-200 text-sm mb-3">
                Subscribe to receive offers.
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-800 text-white border border-blue-700 text-sm"
                />
                <button className="px-5 py-3 bg-white text-blue-900 rounded-xl text-sm font-semibold">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-blue-300 text-sm mt-10 border-t border-blue-800 pt-6">
            © 2025 elounge — All rights reserved.
          </div>
        </footer>
      </div>

      {/* GLOBAL CSS */}
      <style jsx global>{`
        .marquee {
          animation: marquee 20s linear infinite;
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
      `}</style>
    </>
  );
}
