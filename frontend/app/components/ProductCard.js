"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block card-hover">
      {/* Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-card mb-3">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-text-primary mb-1 line-clamp-1 group-hover:text-text-secondary transition-colors duration-200">
        {product.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
        {product.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {product.user?.imageUrl && (
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 ring-2 ring-surface-card">
              <Image
                src={product.user.imageUrl}
                alt={product.user.name || "User"}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="text-xs text-text-muted font-medium">
            {product.user?.name || "Anonymous"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <MessageCircle className="w-3.5 h-3.5" />
          {product.comment?.length || 0}
        </div>
      </div>
    </Link>
  );
}
