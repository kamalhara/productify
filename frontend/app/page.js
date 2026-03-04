"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Package, ArrowRight, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getAllProducts, syncUser } from "./lib/api";

export default function Home() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 animate-slideUp">
          <div className="max-w-4xl">
            <h1 className="heading-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 text-text-primary">
              SHARE PRODUCTS
              <br />
              THAT DEFINE
              <br />
              YOUR CRAFT
            </h1>
            <p className="text-sm xs:text-base md:text-lg text-text-secondary max-w-lg mb-6 xs:mb-8 md:mb-10 leading-relaxed">
              Showcase what you&apos;re building, discover new products, and
              connect with creators through meaningful feedback.
            </p>
            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200 w-full xs:w-auto justify-center xs:justify-start"
              >
                Get Started
                <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5" />
              </Link>
            ) : (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200 w-full xs:w-auto justify-center xs:justify-start"
              >
                Share a Product
                <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 xs:py-8">
          <div className="grid grid-cols-3 gap-2 xs:gap-4 divide-x divide-white/20">
            <div className="text-center px-2 xs:px-4">
              <p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light">
                {products.length}+
              </p>
              <p className="text-xs text-white/60 mt-0.5 xs:mt-1 leading-tight">
                Products Shared
              </p>
            </div>
            <div className="text-center px-2 xs:px-4">
              <p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light">
                100+
              </p>
              <p className="text-xs text-white/60 mt-0.5 xs:mt-1 leading-tight">
                Active Creators
              </p>
            </div>
            <div className="text-center px-2 xs:px-4">
              <p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-text-light">
                500+
              </p>
              <p className="text-xs text-white/60 mt-0.5 xs:mt-1 leading-tight">
                Feedback Given
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 xs:py-12 md:py-16 lg:py-24">
        <h2 className="heading-display text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-center mb-8 xs:mb-10 md:mb-12 text-text-primary">
          LATEST PRODUCTS
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner w-8 h-8" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 mx-auto mb-4 text-text-muted" />
            <p className="text-lg text-text-secondary">No products yet</p>
            <p className="text-sm text-text-muted mt-1">
              Be the first to share something!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <div key={product.id} className="animate-fadeIn">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Browse Categories / CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-8 xs:pb-12 md:pb-16 lg:pb-24">
        <div className="bg-surface-card rounded-2xl xs:rounded-3xl p-6 xs:p-8 md:p-10 lg:p-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-display text-2xl xs:text-3xl md:text-4xl lg:text-5xl mb-3 xs:mb-4 text-text-primary">
              READY TO BUILD?
            </h2>
            <p className="text-xs xs:text-sm md:text-base text-text-secondary mb-6 xs:mb-8 max-w-md mx-auto">
              Join our community of makers and start sharing your creations with
              the world.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2 xs:gap-3 md:gap-4">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200 w-full xs:w-auto justify-center"
                >
                  Join Now
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5" />
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200 w-full xs:w-auto justify-center"
                >
                  Create Product
                  <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5" />
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 xs:px-6 md:px-8 py-2 xs:py-3 md:py-4 text-xs xs:text-sm md:text-base font-medium bg-surface-white text-text-primary border border-border-default rounded-full hover:bg-surface-card transition-colors duration-200 w-full xs:w-auto justify-center"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xl font-extrabold tracking-tight uppercase">
              PRODUCTIFY
            </p>
            <p className="text-sm text-text-muted">
              © 2026 Productify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
