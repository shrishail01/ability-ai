import React, { useState, useRef, MouseEvent } from "react";
import { HTMLMotionProps, motion, useSpring, useTransform } from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Rotation motion values (starts at 0)
  const rotateX = useSpring(0, { damping: 25, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 25, stiffness: 200 });

  // Glare position motion values
  const glareX = useSpring(0, { damping: 25, stiffness: 200 });
  const glareY = useSpring(0, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Tilt angle max: 12 degrees
    rotateX.set(-mouseY * 24);
    rotateY.set(mouseX * 24);

    // Glare position percentage (0% to 100%)
    glareX.set(((e.clientX - rect.left) / width) * 100);
    glareY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 0.15 : 0,
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255, 255, 255, 0.8), transparent)`
          ),
        }}
      />
      {/* Dynamic 3D depth wrapper for child contents */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
