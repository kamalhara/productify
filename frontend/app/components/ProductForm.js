"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { createProduct, updateProduct } from "../lib/api";
import toast from "react-hot-toast";

export default function ProductForm({ product, isEditing = false }) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.imageUrl) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      if (isEditing) {
        await updateProduct(product.id, formData, token);
        toast.success("Product updated!");
      } else {
        await createProduct(formData, token);
        toast.success("Product created!");
      }
      router.push("/my-products");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          Product Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          className="w-full px-5 py-3.5 text-sm bg-surface-input border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:border-text-primary focus:outline-none transition-colors duration-200"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Describe your product..."
          className="w-full px-5 py-3.5 text-sm bg-surface-input border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:border-text-primary focus:outline-none transition-colors duration-200 resize-none h-32 leading-relaxed"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://example.com/image.png"
          className="w-full px-5 py-3.5 text-sm bg-surface-input border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:border-text-primary focus:outline-none transition-colors duration-200"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      {/* Image preview */}
      {formData.imageUrl ? (
        <div className="rounded-2xl overflow-hidden relative aspect-video bg-surface-card">
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      ) : (
        <div className="rounded-2xl bg-surface-card aspect-video flex flex-col items-center justify-center text-text-muted">
          <ImageIcon className="w-10 h-10 mb-2" />
          <p className="text-sm">Image preview will appear here</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 text-sm font-semibold bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <div className="spinner w-5 h-5 mx-auto border-white/30 border-t-white" />
        ) : isEditing ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
}
