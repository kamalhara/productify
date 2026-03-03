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
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slideUp">
      <Link href={`/product/${id}`} className="btn btn-ghost btn-sm gap-2 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Product
      </Link>

      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <div className="bg-base-200 p-6 md:p-8 rounded-2xl">
        <ProductForm product={product} isEditing />
      </div>
    </div>
  );
}
