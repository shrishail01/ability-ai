import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Flame, Trophy, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export interface AnnouncementItem {
  _id?: string;
  badge: string;
  title: string;
  description: string;
  link: string;
  ctaText: string;
  active?: boolean;
}

const defaultAnnouncements: AnnouncementItem[] = [
  {
    badge: "FEATURED COHORT 🏆",
    title: "Aibility Hackathon Cohort 2026 is Live!",
    description: "Master problem statement decoding, rapid building, and live jury pitch defense. Join the cohort!",
    link: "/hackathon-cohort",
    ctaText: "Join Cohort",
  },
  {
    badge: "COMING SOON 🚀",
    title: "Aibility AI Builder Suite",
    description: "Next-gen automated web & app scaffolding for rapid production deployment.",
    link: "/services",
    ctaText: "Explore Products",
  },
  {
    badge: "NEW INNOVATION ⚡",
    title: "Aibility Campus & Enterprise Programs",
    description: "Tailored hackathon incubation and tech training for colleges and tech companies.",
    link: "/contact",
    ctaText: "Get Started",
  },
];

export function HeroAnnouncementBanner() {
  const cmsAnnouncements = useQuery(api.cms.listAnnouncements);

  const activeAnnouncements: AnnouncementItem[] =
    cmsAnnouncements && cmsAnnouncements.length > 0
      ? cmsAnnouncements.filter((a: any) => a.active !== false)
      : defaultAnnouncements;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate slides every 4.5 seconds
  useEffect(() => {
    if (activeAnnouncements.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeAnnouncements.length, isPaused]);

  if (!activeAnnouncements || activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[currentIndex % activeAnnouncements.length];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-4xl mx-auto my-6 px-2 sm:px-4 z-20"
    >
      {/* Outer Glowing Border Box */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/50 via-primary to-indigo-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] overflow-hidden">
        <div className="rounded-[15px] bg-card/90 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left relative z-10">
          {/* Animated Slide Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id || current.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                    {current.badge}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                    // ANNOUNCEMENT {currentIndex + 1} OF {activeAnnouncements.length}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-foreground truncate">
                  {current.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action CTA Button & Controls */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0">
            <Link
              to={current.link}
              className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all flex items-center gap-2 group"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Slider Dots / Nav Controls */}
            {activeAnnouncements.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length
                    )
                  }
                  className="p-1 rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1 px-1">
                  {activeAnnouncements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex ? "w-4 bg-amber-500" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length)}
                  className="p-1 rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
