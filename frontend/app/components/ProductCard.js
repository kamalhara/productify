"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="card bg-base-100 border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
        <figure className="relative h-48 overflow-hidden bg-base-200">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
        <div className="card-body p-4 gap-2">
          <h2 className="card-title text-base font-bold line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-base-content/70 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-base-300">
            <div className="flex items-center gap-2">
              {product.user?.imageUrl && (
                <div className="avatar">
                  <div className="w-6 h-6 rounded-full">
                    <Image
                      src={product.user.imageUrl}
                      alt={product.user.name || "User"}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              )}
              <span className="text-xs text-base-content/60">
                {product.user?.name || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-base-content/50">
              <MessageCircle className="w-3.5 h-3.5" />
              {product.comment?.length || 0}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
