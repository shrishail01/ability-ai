import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/10">
      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">You're subscribed!</h3>
          <p className="text-muted-foreground text-sm">
            Thanks for joining. We'll send you the latest insights and updates.
          </p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">Stay in the Loop</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Get the latest on AI, development, and design delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>
        </>
      )}
    </div>
  );
}
