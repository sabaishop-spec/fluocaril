"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductImage({ 
  src, 
  alt, 
  className,
  priority
}: { 
  src: string; 
  alt: string; 
  className?: string;
  priority?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
      )}
      <Image
        src={src}
        alt={alt || "Product image"}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-all duration-700 z-10",
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
