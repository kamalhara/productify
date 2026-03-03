"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Package, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getAllProducts, syncUser } from "./lib/api";

export default function Home() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

  // Sync user on first sign-in
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

  // Fetch products
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
      <section className="py-20 px-4 text-center animate-slideUp">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Product Showcase Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Share Your Products,
            <br />
            <span className="text-primary">Get Real Feedback</span>
          </h1>
          <p className="text-lg opacity-70 mb-8 max-w-xl mx-auto">
            Showcase what you&apos;re building, discover new products, and
            connect with creators through meaningful feedback.
          </p>
          {!isSignedIn && (
            <Link href="/sign-in" className="btn btn-primary btn-lg gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          {isSignedIn && (
            <Link href="/create" className="btn btn-primary btn-lg gap-2">
              Share a Product
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Latest Products</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 opacity-60">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">No products yet</p>
              <p className="text-sm">Be the first to share something!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="animate-fadeIn">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
