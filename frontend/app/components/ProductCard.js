"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group card-hover block">
      {/* Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-card dark:bg-neutral-800 mb-3">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Info */}
      <h3 className="text-base font-bold text-text-primary dark:text-white mb-1 line-clamp-1 group-hover:text-text-secondary dark:group-hover:text-neutral-300 transition-colors duration-200">
        {product.title}
      </h3>
      <p className="text-sm text-text-secondary dark:text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
        {product.description}
      </p>

      {/* Author */}
      {product.user && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-surface-card dark:bg-neutral-700 shrink-0 ring-2 ring-surface-card dark:ring-neutral-700">
            <Image
              src={product.user.imageUrl || "/placeholder.png"}
              alt={product.user.name || "User"}
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-muted dark:text-neutral-500 truncate">
            {product.user.name}
          </span>
        </div>
      )}
    </Link>
  );
}
