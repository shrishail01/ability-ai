import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/") || path.startsWith("data:")) {
    return path;
  }
  const convexUrl = (import.meta.env.VITE_CONVEX_URL as string) || "";
  return `${convexUrl}/api/storage/${path}`;
}

