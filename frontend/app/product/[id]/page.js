"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react";
import { getProductById, deleteProduct } from "../../lib/api";
import CommentSection from "../../components/CommentSection";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getToken, userId } = useAuth();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        toast.error("Product not found");
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    try {
      const token = await getToken();
      await deleteProduct(id, token);
      toast.success("Product deleted");
      router.push("/my-products");
    } catch (err) {
      toast.error(err.message || "Failed to delete");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) return null;

  const isOwner = isSignedIn && userId === product.userId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-slideUp">
      <Link href="/" className="btn btn-ghost btn-sm gap-2 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Product Image */}
      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-base-200">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4 mb-10">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {isOwner && (
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/product/${id}/edit`}
                className="btn btn-outline btn-sm gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm gap-1"
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex items-center gap-4">
          {product.user && (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <Image
                    src={product.user.imageUrl || "/placeholder.png"}
                    alt={product.user.name || "User"}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
              <span className="text-sm font-medium">{product.user.name}</span>
            </div>
          )}
          {product.createdAt && (
            <div className="flex items-center gap-1 text-xs opacity-50">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>

        <p className="text-base opacity-80 leading-relaxed whitespace-pre-wrap">
          {product.description}
        </p>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Comments */}
      <CommentSection productId={product.id} comments={product.comment || []} />
    </div>
  );
}
