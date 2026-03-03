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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Product Title</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Description</span>
        </label>
        <textarea
          name="description"
          placeholder="Describe your product..."
          className="textarea textarea-bordered w-full h-32 resize-none"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Image URL</span>
        </label>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://example.com/image.png"
          className="input input-bordered w-full"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      {/* Image preview */}
      {formData.imageUrl && (
        <div className="rounded-xl overflow-hidden border border-base-300 relative h-48 bg-base-200">
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}

      {!formData.imageUrl && (
        <div className="rounded-xl border-2 border-dashed border-base-300 h-48 flex flex-col items-center justify-center opacity-40">
          <ImageIcon className="w-10 h-10 mb-2" />
          <p className="text-sm">Image preview will appear here</p>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : isEditing ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
}
