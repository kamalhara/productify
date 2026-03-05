"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getMyProducts, deleteProduct } from "../lib/api";
import toast from "react-hot-toast";

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="animate-scaleIn">
      <div className="skeleton skeleton-card aspect-square mb-3" />
      <div className="skeleton skeleton-text-lg w-3/4 mb-2" />
      <div className="skeleton skeleton-text w-full mb-1.5" />
      <div className="skeleton skeleton-text w-2/3 mb-4" />
      <div className="flex gap-2">
        <div className="skeleton flex-1 h-9 rounded-full" />
        <div className="skeleton flex-1 h-9 rounded-full" />
      </div>
    </div>
  );
}

export default function MyProductsPage() {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = await getToken();
        const data = await getMyProducts(token);
        setProducts(data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [getToken]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = await getToken();
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 xs:py-6 md:py-8 animate-slideUp">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 xs:gap-0 mb-8 xs:mb-10">
        <h1 className="heading-display text-2xl xs:text-3xl md:text-4xl text-text-primary">
          MY PRODUCTS
        </h1>
        <Link
          href="/create"
          className="group inline-flex items-center justify-center gap-2 px-4 xs:px-6 py-2 xs:py-3 text-xs xs:text-sm font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-all duration-200 w-full xs:w-auto hover:shadow-md hover:shadow-black/10"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 md:gap-6 lg:gap-8 stagger-children">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 xs:py-24">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-surface-card flex items-center justify-center">
            <Package className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-base xs:text-lg font-semibold text-text-primary">
            No products yet
          </p>
          <p className="text-xs xs:text-sm text-text-muted mt-1 mb-4 xs:mb-6">
            Create your first product to get started!
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-4 xs:px-6 py-2 xs:py-3 text-xs xs:text-sm font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Create Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 md:gap-6 lg:gap-8 stagger-children">
          {products.map((product) => (
            <div key={product.id} className="group animate-fadeIn card-hover">
              {/* Image */}
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-card mb-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              </Link>

              {/* Content */}
              <Link href={`/product/${product.id}`}>
                <h2 className="text-base font-bold text-text-primary mb-1 line-clamp-1 hover:text-text-secondary transition-colors duration-200">
                  {product.title}
                </h2>
              </Link>
              <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/product/${product.id}/edit`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-surface-white border border-border-default text-text-primary rounded-full hover:bg-surface-card transition-all duration-200 hover:shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-surface-white border border-border-default text-text-primary rounded-full hover:bg-red-50 hover:text-danger hover:border-danger transition-all duration-200 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
