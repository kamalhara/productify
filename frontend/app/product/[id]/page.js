"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react";
import { getProductById, deleteProduct } from "../../lib/api";
import CommentSection from "../../components/CommentSection";
import ShareButtons from "../../components/ShareButtons";
import ConfirmModal from "../../components/ConfirmModal";
import toast from "react-hot-toast";

/* ── Skeleton Loader ── */
function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 xs:py-6 md:py-8 animate-slideUp">
      <div className="skeleton w-20 h-8 rounded-lg mb-4 xs:mb-6" />
      <div className="skeleton aspect-video rounded-2xl xs:rounded-3xl mb-6 xs:mb-8" />
      <div className="space-y-4">
        <div className="skeleton skeleton-text-lg w-2/3 h-8" />
        <div className="flex items-center gap-3">
          <div className="skeleton skeleton-circle w-8 h-8" />
          <div className="skeleton skeleton-text w-24" />
          <div className="skeleton skeleton-text w-20" />
        </div>
        <div className="space-y-2">
          <div className="skeleton skeleton-text w-full" />
          <div className="skeleton skeleton-text w-full" />
          <div className="skeleton skeleton-text w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getToken, userId } = useAuth();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setDeleting(true);
    try {
      const token = await getToken();
      await deleteProduct(id, token);
      toast.success("Product deleted");
      router.push("/my-products");
    } catch (err) {
      toast.error(err.message || "Failed to delete");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return null;

  const isOwner = isSignedIn && userId === product.userId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 xs:py-6 md:py-8 animate-slideUp">
      <div className="flex items-center justify-between mb-4 xs:mb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800"
        >
          <ArrowLeft className="w-3.5 xs:w-4 h-3.5 xs:h-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>

        <ShareButtons title={product.title} />
      </div>

      {/* Product Image */}
      <div className="relative aspect-video rounded-2xl xs:rounded-3xl overflow-hidden mb-6 xs:mb-8 bg-surface-card dark:bg-neutral-800 shadow-sm">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3 xs:space-y-5 mb-8 xs:mb-10">
        <div className="flex items-start justify-between gap-3 xs:gap-4 flex-col xs:flex-row">
          <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-text-primary dark:text-white">
            {product.title}
          </h1>
          {isOwner && (
            <div className="flex gap-2 shrink-0 w-full xs:w-auto">
              <Link
                href={`/product/${id}/edit`}
                className="flex-1 xs:flex-none inline-flex items-center justify-center xs:justify-start gap-1.5 px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-text-primary dark:text-white bg-surface-white dark:bg-neutral-900 border border-border-default dark:border-neutral-700 rounded-full hover:bg-surface-card dark:hover:bg-neutral-800 transition-all duration-200 hover:shadow-sm"
              >
                <Edit className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 xs:flex-none inline-flex items-center justify-center xs:justify-start gap-1.5 px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-white bg-danger rounded-full hover:bg-danger-hover transition-all duration-200 cursor-pointer hover:shadow-sm"
              >
                <Trash2 className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
          {product.user && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-card dark:bg-neutral-800 shrink-0 ring-2 ring-surface-card dark:ring-neutral-700">
                <Image
                  src={product.user.imageUrl || "/placeholder.png"}
                  alt={product.user.name || "User"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs xs:text-sm font-medium text-text-primary dark:text-white">
                {product.user.name}
              </span>
            </div>
          )}
          {product.createdAt && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted dark:text-neutral-500">
              <Calendar className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>

        <p className="text-sm xs:text-base text-text-secondary dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
          {product.description}
        </p>
      </div>

      <div className="divider-line dark:bg-neutral-800! my-6 xs:my-8" />

      <CommentSection productId={product.id} comments={product.comment || []} />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}
