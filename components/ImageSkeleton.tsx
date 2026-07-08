"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function ImageSkeleton({ className, alt, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      <Image
        {...props}
        alt={alt || ""}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={(e) => {
          setIsLoading(false);
          if (props.onLoad) props.onLoad(e);
        }}
      />
    </div>
  );
}
