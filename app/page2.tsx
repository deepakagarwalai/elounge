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
  Truck,
  Cpu,
  Zap,
  ChevronDown,
  Plus,
  Minus,
  Eye,
  Filter,
  TrendingUp,
  Package,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "App.css";

function App() {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const megaRef = useRef(null);

  const handleMouseLeaveMega = (e) => {
    if (megaRef.current && !megaRef.current.contains(e.relatedTarget)) {
      setMegaOpen(false);
    }
  };

  const products = [
    {
      id: 1,
      name: "AirPods Max",
      price: 59990,
      image:
        "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Audio",
      description: "Premium over-ear headphones with spatial audio",
      badge: "Trending",
    },
    {
      id: 2,
      name: "Apple Watch Ultra 2",
      price: 89900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Wearables",
      description: "Advanced fitness and adventure smartwatch",
      badge: "New",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 29990,
      image:
        "https://images.pexels.com/photos/3394669/pexels-photo-3394669.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Audio",
      description: "Industry-leading noise cancelling headphones",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Logitech MX Master 3S",
      price: 10990,
      image:
        "https://images.pexels.com/photos/4464829/pexels-photo-4464829.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.6,
      category: "Accessories",
      description: "Advanced wireless mouse for productivity",
    },
    {
      id: 5,
      name: "Samsung Galaxy S23 Ultra",
      price: 94999,
      image:
        "https://images.pexels.com/photos/5081921/pexels-photo-5081921.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Phones",
      description: "Flagship smartphone with S Pen",
      badge: "Hot",
    },
    {
      id: 6,
      name: "MacBook Pro 14\" M3",
      price: 189900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Laptops",
      description: "Professional laptop with M3 chip",
      badge: "Premium",
    },
    {
      id: 7,
      name: "iPad Pro M2",
      price: 89900,
      image:
        "https://images.pexels.com/photos/6335/man-computer-work-desk.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Tablets",
      description: "Most powerful iPad ever",
    },
    {
      id: 8,
      name: "Dell XPS 13 Laptop",
      price: 129900,
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.8,
      category: "Laptops",
      description: "Compact powerhouse ultrabook",
    },
    {
      id: 9,
      name: "Nintendo Switch OLED",
      price: 33990,
      image:
        "https://images.pexels.com/photos/5961212/pexels-photo-5961212.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.9,
      category: "Gaming",
      description: "Hybrid gaming console",
    },
    {
      id: 10,
      name: "GoPro Hero 11",
      price: 51990,
      image:
        "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1200",
      rating: 4.7,
      category: "Cameras",
      description: "Action camera for adventures",
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

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal-on-scroll").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    // Parallax effect for hero
    gsap.to(".hero-float", {
      y: -30,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 z-[100]"
        style={{ transformOrigin: "0%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
      />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            elounge
          </motion.h1>

          <nav className="hidden md:flex gap-10 text-gray-700 font-semibold text-lg items-center">
            <button className="hover:text-blue-700 transition-colors">Home</button>

            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                Products
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    ref={megaRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[680px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-8 z-50"
                  >
                    <div>
                      <p className="text-xs uppercase text-gray-400 mb-3 font-bold tracking-wider">
                        Categories
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Audio Devices</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Laptops & Desktops</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Wearables</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Gaming</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-gray-400 mb-3 font-bold tracking-wider">
                        Collections
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">New Arrivals</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Best Sellers</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Work From Home</li>
                        <li className="hover:text-blue-700 cursor-pointer transition-colors">Creator's Desk</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase text-gray-400 mb-2 font-bold tracking-wider">
                          Highlight
                        </p>
                        <p className="text-sm font-semibold mb-1 text-blue-900">
                          Premium Audio Sale
                        </p>
                        <p className="text-xs text-gray-600">
                          Up to 30% off on headphones & earbuds.
                        </p>
                      </div>
                      <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:gap-2 transition-all">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="hover:text-blue-700 transition-colors">Categories</button>
            <button className="hover:text-blue-700 transition-colors">Support</button>
          </nav>

          <div className="hidden md:flex gap-5 items-center">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Search className="w-6 h-6 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Heart className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </motion.button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden bg-white border-t px-6 py-4 space-y-3 text-lg font-medium overflow-hidden"
          >
            <button>Home</button>
            <button>Products</button>
            <button>Categories</button>
            <button>Support</button>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="hero-section relative max-w-7xl mx-auto px-6 py-24 md:py-32 reveal-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-purple-100/40 to-pink-100/60 rounded-[60px] blur-3xl -z-10"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                ✨ New Collection 2025
              </span>
              <h2 className="text-6xl md:text-7xl font-light leading-tight mb-8">
                Elevate your{" "}
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Lifestyle
                </span>
              </h2>
              <p className="text-gray-600 text-xl mb-12 leading-relaxed">
                Explore a curated selection of premium electronics crafted for
                minimalism and modern living.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transition-all text-lg font-semibold"
                >
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-full hover:border-blue-600 transition-all text-lg font-semibold"
                >
                  View Catalog
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 mt-16">
              {[
                { icon: Truck, text: "Free Shipping", sub: "On orders ₹2,999+" },
                { icon: Package, text: "Easy Returns", sub: "30-day policy" },
                { icon: CreditCard, text: "Secure Pay", sub: "100% protected" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold text-sm">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="hero-float relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-[40px] blur-2xl opacity-20"></div>
            <img
              src="https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg"
              className="rounded-[40px] shadow-2xl relative z-10"
              alt="Hero Product"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-lg">1000+</p>
                  <p className="text-xs text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 overflow-hidden">
        <div className="marquee flex gap-12 text-sm text-white font-medium">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 whitespace-nowrap">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Free shipping above ₹2,999
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> 24/7 premium customer support
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" /> Exclusive member-only launches
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Secure online payments
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h3>
            <p className="text-gray-600">Find what you're looking for</p>
          </div>
          <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Audio", icon: Sparkles, color: "from-blue-500 to-blue-600", count: "50+ Products" },
            { name: "Wearables", icon: Cpu, color: "from-purple-500 to-purple-600", count: "30+ Products" },
            { name: "Accessories", icon: Zap, color: "from-pink-500 to-pink-600", count: "100+ Products" },
            { name: "Gaming", icon: Star, color: "from-orange-500 to-orange-600", count: "25+ Products" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl cursor-pointer transition-all relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`p-4 bg-gradient-to-br ${c.color} rounded-2xl mb-4 w-fit`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-xl text-gray-900 font-semibold mb-1">
                  {c.name}
                </h4>
                <p className="text-sm text-gray-500">{c.count}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TOP PICKS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-20 reveal-on-scroll">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              Top Picks For You
            </h3>
            <p className="text-gray-600">Curated from our best-sellers</p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={24}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="top-picks-swiper"
        >
          {products.slice(0, 6).map((p) => (
            <SwiperSlide key={p.id}>
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={p.name}
                  />
                  {p.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(p.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuickView(p)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase text-blue-600 mb-2 font-bold tracking-wider">
                    {p.category}
                  </p>
                  <h4 className="text-lg font-semibold mb-2 line-clamp-1">{p.name}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(p.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{p.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{formatPrice(p.price)}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(p)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all text-sm font-semibold"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24 reveal-on-scroll">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h3>
            <p className="text-gray-600">Discover our latest collection</p>
          </div>
          <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            <Filter className="w-5 h-5" /> Filter
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full border-2 transition-all whitespace-nowrap font-semibold ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={p.name}
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                    {p.badge}
                  </span>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart
                    className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                  />
                </motion.button>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase text-blue-600 mb-1 font-bold tracking-wider">
                  {p.category}
                </p>
                <h4 className="font-semibold text-sm line-clamp-2 mb-2">{p.name}</h4>
                <div className="flex items-center gap-2 text-xs mb-3">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {p.rating.toFixed(1)}
                </div>
                <p className="font-bold text-gray-900 text-lg mb-3">
                  ₹{formatPrice(p.price)}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(p)}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full hover:shadow-lg transition-all font-semibold"
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
          whileHover={{ scale: 1.02 }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-16 rounded-[40px] text-center shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl mb-4 font-bold">Stay Updated</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Get exclusive deals, launches & offers delivered to your inbox.
            </p>
            <div className="max-w-xl mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900 rounded-2xl text-white font-semibold hover:bg-gray-800 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-blue-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
          <div>
            <h3 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              elounge
            </h3>
            <p className="text-blue-200 leading-relaxed">
              Curated premium electronics for modern living—quality,
              performance, and fast delivery.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Best Sellers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Trending Products</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gift Cards</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Warranty</li>
              <li className="hover:text-white cursor-pointer transition-colors">Order Tracking</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns</li>
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
                className="flex-1 px-4 py-3 rounded-xl bg-blue-800/50 text-white border border-blue-700 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-white text-blue-900 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all"
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        <div className="text-center text-blue-300 text-sm mt-16 border-t border-blue-800 pt-8">
          <p>© 2025 elounge — All rights reserved. Made with ❤️ for tech lovers.</p>
        </div>
      </footer>

      {/* CART SIDEBAR */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold">Shopping Cart</h3>
                <button onClick={() => setCartOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-16 text-center">
                  <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCartOpen(false)}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
                  >
                    Start Shopping
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="p-6 space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex gap-4 bg-gray-50 p-4 rounded-2xl"
                      >
                        <img
                          src={item.image}
                          className="w-24 h-24 object-cover rounded-xl"
                          alt={item.name}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">
                            ₹{formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center border"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="font-semibold">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center border"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ₹{formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 border-t sticky bottom-0 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{formatPrice(cartTotal)}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] flex items-center justify-center p-6"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img
                    src={quickView.image}
                    className="w-full h-full object-cover"
                    alt={quickView.name}
                  />
                  <button
                    onClick={() => setQuickView(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
                    {quickView.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-3">{quickView.name}</h3>
                  <p className="text-gray-600 mb-4">{quickView.description}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(quickView.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{quickView.rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">(128 reviews)</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-8">
                    ₹{formatPrice(quickView.price)}
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(quickView);
                        setQuickView(null);
                        setCartOpen(true);
                      }}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleWishlist(quickView.id)}
                      className="w-16 py-4 bg-gray-100 rounded-2xl flex items-center justify-center"
                    >
                      <Heart
                        className={`w-6 h-6 ${wishlist.includes(quickView.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;