import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full glass transition-colors hover:bg-white/10",
        className,
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </motion.button>
  );
}
