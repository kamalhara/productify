"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Plus, Edit, Trash2, Package } from "lucide-react";
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">My Products</h1>
        </div>
        <Link href="/create" className="btn btn-primary btn-sm gap-2">
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 animate-fadeIn">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg opacity-60 mb-4">
            You haven&apos;t created any products yet
          </p>
          <Link href="/create" className="btn btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Create Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
            >
              <figure className="relative h-40 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base font-bold line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-sm opacity-70 line-clamp-2">
                  {product.description}
                </p>
                <div className="card-actions justify-end mt-3 pt-3 border-t border-base-300">
                  <Link
                    href={`/product/${product.id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    View
                  </Link>
                  <Link
                    href={`/product/${product.id}/edit`}
                    className="btn btn-outline btn-xs gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-error btn-xs gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
