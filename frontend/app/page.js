"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Package,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getAllProducts, syncUser } from "./lib/api";

/* ── Animated counter component ── */
function AnimatedCounter({ target, suffix = "+", duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="animate-scaleIn">
      <div className="skeleton skeleton-card aspect-square mb-3" />
      <div className="skeleton skeleton-text-lg w-3/4 mb-2" />
      <div className="skeleton skeleton-text w-full mb-1.5" />
      <div className="skeleton skeleton-text w-2/3 mb-3" />
      <div className="flex items-center gap-2">
        <div className="skeleton skeleton-circle w-6 h-6" />
        <div className="skeleton skeleton-text w-20" />
      </div>
    </div>
  );
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-commented", label: "Most Commented" },
  { value: "a-z", label: "A → Z" },
];

export default function Home() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    async function sync() {
      if (isSignedIn && user && !synced) {
        try {
          const token = await getToken();
          await syncUser(
            {
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName || user.firstName,
              imageUrl: user.imageUrl,
            },
            token,
          );
          setSynced(true);
        } catch (err) {
          console.error("User sync failed:", err);
        }
      }
    }
    sync();
  }, [isSignedIn, user, synced, getToken]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Close sort menu when clicking outside
  useEffect(() => {
    if (!showSortMenu) return;
    const handleClick = () => setShowSortMenu(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showSortMenu]);

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.user?.name || "").toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "most-commented":
        result.sort(
          (a, b) => (b.comment?.length || 0) - (a.comment?.length || 0),
        );
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, searchQuery, sortBy]);

  const productCount = products.length > 0 ? products.length : 50;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-surface-white dark:bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-blue-50/40 dark:from-blue-950/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-purple-50/30 dark:from-purple-950/20 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 animate-slideUp relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card dark:bg-neutral-800 border border-border-default dark:border-neutral-700 mb-6 xs:mb-8 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-text-secondary dark:text-neutral-400" />
              <span className="text-xs font-medium text-text-secondary dark:text-neutral-400 tracking-wide">
                DISCOVER & SHARE
              </span>
            </div>

            <h1 className="heading-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 text-text-primary dark:text-white">
              SHARE PRODUCTS
              <br />
              THAT DEFINE
              <br />
              YOUR CRAFT
            </h1>
            <p className="text-sm xs:text-base md:text-lg text-text-secondary dark:text-neutral-400 max-w-lg mb-6 xs:mb-8 md:mb-10 leading-relaxed">
              Showcase what you&apos;re building, discover new products, and
              connect with creators through meaningful feedback.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="group inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark dark:bg-white text-text-light dark:text-black rounded-full hover:bg-surface-dark-soft dark:hover:bg-neutral-200 transition-all duration-300 w-full xs:w-auto justify-center xs:justify-start hover:shadow-lg hover:shadow-black/10"
                >
                  Get Started
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="group inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark dark:bg-white text-text-light dark:text-black rounded-full hover:bg-surface-dark-soft dark:hover:bg-neutral-200 transition-all duration-300 w-full xs:w-auto justify-center xs:justify-start hover:shadow-lg hover:shadow-black/10"
                >
                  Share a Product
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-transparent text-text-primary dark:text-white border border-border-default dark:border-neutral-700 rounded-full hover:bg-surface-card dark:hover:bg-neutral-800 transition-all duration-300 w-full xs:w-auto justify-center xs:justify-start"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-7 xs:py-10 relative z-10">
          <div className="grid grid-cols-3 gap-2 xs:gap-4 divide-x divide-white/10">
            <div className="text-center px-2 xs:px-4">
              <p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light animate-countUp">
                <AnimatedCounter target={productCount} />
              </p>
              <p className="text-[10px] xs:text-xs text-white/50 mt-1 xs:mt-2 leading-tight uppercase tracking-wider font-medium">
                Products Shared
              </p>
            </div>
            <div className="text-center px-2 xs:px-4">
              <p
                className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light animate-countUp"
                style={{ animationDelay: "150ms" }}
              >
                <AnimatedCounter target={100} />
              </p>
              <p className="text-[10px] xs:text-xs text-white/50 mt-1 xs:mt-2 leading-tight uppercase tracking-wider font-medium">
                Active Creators
              </p>
            </div>
            <div className="text-center px-2 xs:px-4">
              <p
                className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light animate-countUp"
                style={{ animationDelay: "300ms" }}
              >
                <AnimatedCounter target={500} />
              </p>
              <p className="text-[10px] xs:text-xs text-white/50 mt-1 xs:mt-2 leading-tight uppercase tracking-wider font-medium">
                Feedback Given
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 lg:px-8 py-8 xs:py-12 md:py-16 lg:py-24"
      >
        <div className="flex flex-col items-center mb-8 xs:mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card dark:bg-neutral-800 border border-border-default dark:border-neutral-700 mb-4">
            <TrendingUp className="w-3 h-3 text-text-muted dark:text-neutral-500" />
            <span className="text-[10px] xs:text-xs font-medium text-text-muted dark:text-neutral-500 uppercase tracking-wider">
              Trending Now
            </span>
          </div>
          <h2 className="heading-display text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-center text-text-primary dark:text-white">
            LATEST PRODUCTS
          </h2>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col xs:flex-row gap-3 mb-6 xs:mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-neutral-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-surface-white dark:bg-neutral-900 border border-border-default dark:border-neutral-700 rounded-full text-text-primary dark:text-white placeholder-text-muted dark:placeholder-neutral-500 focus:border-text-primary dark:focus:border-neutral-400 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSortMenu(!showSortMenu);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-text-secondary dark:text-neutral-400 bg-surface-white dark:bg-neutral-900 border border-border-default dark:border-neutral-700 rounded-full hover:bg-surface-card dark:hover:bg-neutral-800 transition-colors cursor-pointer w-full xs:w-auto justify-center"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-surface-white dark:bg-neutral-900 border border-border-default dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden z-20 animate-slideDown">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      sortBy === option.value
                        ? "bg-surface-card dark:bg-neutral-800 text-text-primary dark:text-white font-medium"
                        : "text-text-secondary dark:text-neutral-400 hover:bg-surface-card dark:hover:bg-neutral-800 hover:text-text-primary dark:hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6 lg:gap-8 stagger-children">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-surface-card dark:bg-neutral-800 flex items-center justify-center">
              <Package className="w-8 h-8 text-text-muted dark:text-neutral-500" />
            </div>
            <p className="text-lg font-semibold text-text-primary dark:text-white">
              {searchQuery ? "No matching products" : "No products yet"}
            </p>
            <p className="text-sm text-text-muted dark:text-neutral-500 mt-1">
              {searchQuery
                ? "Try a different search term"
                : "Be the first to share something!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6 lg:gap-8 stagger-children">
            {filteredAndSorted.map((product) => (
              <div key={product.id} className="animate-fadeIn">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-8 xs:pb-12 md:pb-16 lg:pb-24">
        <div className="bg-surface-dark dark:bg-white rounded-2xl xs:rounded-3xl p-6 xs:p-8 md:p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/3 dark:bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/2 dark:bg-black/3 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-black/10 mb-5 xs:mb-6">
              <Sparkles className="w-3 h-3 text-white/60 dark:text-black/60" />
              <span className="text-[10px] xs:text-xs font-medium text-white/60 dark:text-black/60 uppercase tracking-wider">
                Join the Community
              </span>
            </div>
            <h2 className="heading-display text-2xl xs:text-3xl md:text-4xl lg:text-5xl mb-3 xs:mb-4 text-text-light dark:text-black">
              READY TO BUILD?
            </h2>
            <p className="text-xs xs:text-sm md:text-base text-white/60 dark:text-black/50 mb-6 xs:mb-8 max-w-md mx-auto leading-relaxed">
              Join our community of makers and start sharing your creations with
              the world.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2 xs:gap-3 md:gap-4">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="group inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-text-light dark:bg-black text-surface-dark dark:text-white rounded-full hover:bg-white/90 dark:hover:bg-neutral-900 transition-all duration-300 w-full xs:w-auto justify-center hover:shadow-lg"
                >
                  Join Now
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="group inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-text-light dark:bg-black text-surface-dark dark:text-white rounded-full hover:bg-white/90 dark:hover:bg-neutral-900 transition-all duration-300 w-full xs:w-auto justify-center hover:shadow-lg"
                >
                  Create Product
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2.5 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-transparent text-text-light dark:text-black border border-white/20 dark:border-black/20 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 w-full xs:w-auto justify-center"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default dark:border-neutral-800 bg-surface-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 xs:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-xl font-extrabold tracking-tight uppercase text-text-primary dark:text-white">
                PRODUCTIFY
              </p>
              <p className="text-xs text-text-muted dark:text-neutral-500">
                Share & discover products that matter.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-xs text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/create"
                className="text-xs text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white transition-colors"
              >
                Create
              </Link>
              <Link
                href="/sign-in"
                className="text-xs text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border-default dark:border-neutral-800 flex flex-col xs:flex-row items-center justify-between gap-2">
            <p className="text-xs text-text-muted dark:text-neutral-500">
              © 2026 Productify. All rights reserved.
            </p>
            <p className="text-[10px] text-text-muted dark:text-neutral-500">
              Built with ♥ for creators
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
