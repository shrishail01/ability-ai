import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ability-cookie-consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ability-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("ability-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-50 w-[90vw] max-w-lg"
        >
          <div className="glass-card rounded-2xl p-5 border border-white/10 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium mb-1">
                  We use cookies
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This site uses cookies to improve your experience. By continuing, you agree to our use of cookies.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={accept}
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:brightness-110 transition-all"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={decline}
                    className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <button
                onClick={decline}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
