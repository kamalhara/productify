"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductForm from "../../../components/ProductForm";
import { getProductById } from "../../../lib/api";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        if (data.userId !== userId) {
          toast.error("You can only edit your own products");
          router.push("/");
          return;
        }
        setProduct(data);
      } catch (err) {
        toast.error("Product not found");
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, userId, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 animate-slideUp">
        <div className="skeleton w-36 h-8 rounded-lg mb-6" />
        <div className="skeleton w-48 h-10 rounded-lg mb-8" />
        <div className="bg-surface-white p-6 md:p-8 rounded-3xl space-y-5">
          <div className="skeleton skeleton-text-lg w-24 mb-2" />
          <div className="skeleton h-12 rounded-xl" />
          <div className="skeleton skeleton-text-lg w-20 mb-2" />
          <div className="skeleton h-32 rounded-xl" />
          <div className="skeleton skeleton-text-lg w-20 mb-2" />
          <div className="skeleton h-12 rounded-xl" />
          <div className="skeleton aspect-video rounded-2xl" />
          <div className="skeleton h-14 rounded-full" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slideUp">
      <Link
        href={`/product/${id}`}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Product
      </Link>

      <h1 className="heading-display text-3xl md:text-4xl mb-8 text-text-primary">
        EDIT PRODUCT
      </h1>

      <div className="bg-surface-white p-6 md:p-8 rounded-3xl">
        <ProductForm product={product} isEditing />
      </div>
    </div>
  );
}
