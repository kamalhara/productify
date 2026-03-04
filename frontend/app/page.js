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
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-text-primary">
              SHARE PRODUCTS
              <br />
              THAT DEFINE
              <br />
              YOUR CRAFT
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-lg mb-10 leading-relaxed">
              Showcase what you&apos;re building, discover new products, and
              connect with creators through meaningful feedback.
            </p>
            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
              >
                Share a Product
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-3 divide-x divide-white/20">
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-text-light">
                {products.length}+
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Products Shared
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-text-light">
                100+
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Active Creators
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-text-light">
                500+
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Feedback Given
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <h2 className="heading-display text-3xl md:text-5xl text-center mb-12 text-text-primary">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <div key={product.id} className="animate-fadeIn">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Browse Categories / CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
        <div className="bg-surface-card rounded-3xl p-8 md:p-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-display text-3xl md:text-5xl mb-4 text-text-primary">
              READY TO BUILD?
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Join our community of makers and start sharing your creations with
              the world.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
                >
                  Join Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
                >
                  Create Product
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-surface-white text-text-primary border border-border-default rounded-full hover:bg-surface-card transition-colors duration-200"
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
