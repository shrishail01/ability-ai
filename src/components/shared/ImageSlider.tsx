import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../lib/utils";

interface ImageSliderProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageSlider({ src, alt, className = "" }: ImageSliderProps) {
  const imageStr = typeof src === "string" ? src : "";
  const images = imageStr.split(",").map((img) => getImageUrl(img.trim())).filter(Boolean);

  if (images.length <= 1) {
    return (
      <img
        src={images[0] || ""}
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds transition interval

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative overflow-hidden w-full flex items-center justify-center ${className}`}>
      {/* Invisible layout spacer using the first image to let the container size naturally */}
      <img src={images[0]} alt="" className="w-full h-auto max-h-[350px] object-contain opacity-0 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - Slide ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>
    </div>
  );
}
