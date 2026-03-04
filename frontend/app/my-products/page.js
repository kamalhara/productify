"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getMyProducts, deleteProduct } from "../lib/api";
import toast from "react-hot-toast";

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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="heading-display text-3xl md:text-4xl text-text-primary">
          MY PRODUCTS
        </h1>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="spinner w-8 h-8" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <Package className="w-12 h-12 mx-auto mb-4 text-text-muted" />
          <p className="text-lg text-text-secondary">No products yet</p>
          <p className="text-sm text-text-muted mt-1 mb-6">
            Create your first product to get started!
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Create Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group animate-fadeIn">
              {/* Image */}
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-card mb-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>

              {/* Content */}
              <Link href={`/product/${product.id}`}>
                <h2 className="text-base font-bold text-text-primary mb-1 line-clamp-1 hover:underline">
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
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-surface-white border border-border-default text-text-primary rounded-full hover:bg-surface-card transition-colors duration-200"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-surface-white border border-border-default text-text-primary rounded-full hover:bg-red-50 hover:text-danger hover:border-danger transition-colors duration-200 cursor-pointer"
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
