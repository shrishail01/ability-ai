import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    const timer = setTimeout(() => setVisible(false), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]"
        >
          <div className="text-center w-full max-w-xs px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              {/* Logo with Sweep Shine Effect */}
              <div className="relative overflow-hidden group p-4 rounded-xl">
                <img
                  src={logo}
                  alt="Aibility Logo"
                  className="h-10 md:h-12 w-auto object-contain relative z-10 brightness-0 invert"
                />

                {/* Glowing Aura Behind Logo */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary/20 blur-2xl rounded-full z-0"
                />

                {/* Laser/Shine Sweep Animation */}
                <motion.div
                  animate={{
                    x: ["-150%", "150%"],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.2
                  }}
                  className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-20"
                />
              </div>

              {/* Progress and Animated Interface */}
              <div className="w-full flex flex-col items-center gap-3">
                <div className="flex justify-between w-full text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                  <span>Aibility AI</span>
                  <span>{progress}%</span>
                </div>

                {/* Custom animated progress bar */}
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary via-blue-500 to-indigo-500 rounded-full"
                  />
                </div>

                {/* Futuristic loading description */}
                <p className="text-[9px] uppercase tracking-[0.35em] text-primary/70 font-bold mt-1">
                  Initializing Core Systems
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
