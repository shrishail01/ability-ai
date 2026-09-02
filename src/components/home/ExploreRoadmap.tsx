import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  BookOpen,
  Code2,
  Users,
  Presentation,
  Trophy,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router";

export interface ExploreDestination {
  id: string;
  num: number;
  name: string;
  tagline: string;
  icon: any;
  points: string[];
  desktopAlign: "left" | "right";
  centerProgress: number; // 0 to 1 progress position
}

const destinations: ExploreDestination[] = [
  {
    id: "01",
    num: 1,
    name: "DISCOVER",
    tagline: "Understand where to start.",
    icon: Search,
    points: [
      "Identify the right problem",
      "Research effectively",
      "Understand users",
      "Find direction",
    ],
    desktopAlign: "left",
    centerProgress: 0.08,
  },
  {
    id: "02",
    num: 2,
    name: "LEARN",
    tagline: "Build the skills you need.",
    icon: BookOpen,
    points: [
      "Core concepts",
      "Practical skills",
      "Tools and workflows",
      "Better ways to learn",
    ],
    desktopAlign: "right",
    centerProgress: 0.25,
  },
  {
    id: "03",
    num: 3,
    name: "BUILD",
    tagline: "Turn knowledge into something real.",
    icon: Code2,
    points: [
      "Project planning",
      "Prototyping",
      "Development",
      "Testing",
    ],
    desktopAlign: "left",
    centerProgress: 0.42,
  },
  {
    id: "04",
    num: 4,
    name: "EXPERIENCE",
    tagline: "Put your skills into practice.",
    icon: Users,
    points: [
      "Real-world challenges",
      "Team collaboration",
      "Problem solving",
      "Iteration",
    ],
    desktopAlign: "right",
    centerProgress: 0.59,
  },
  {
    id: "05",
    num: 5,
    name: "SHOWCASE",
    tagline: "Show what you've built.",
    icon: Presentation,
    points: [
      "Presentation",
      "Demonstration",
      "Portfolio building",
      "Communication",
    ],
    desktopAlign: "left",
    centerProgress: 0.76,
  },
  {
    id: "06",
    num: 6,
    name: "GROW",
    tagline: "Take the next step.",
    icon: Trophy,
    points: [
      "Improve your skills",
      "Build bigger projects",
      "Explore opportunities",
      "Keep creating",
    ],
    desktopAlign: "right",
    centerProgress: 0.93,
  },
];

// Single Destination Card Component driven by continuous scroll interpolation
function ContinuousStageCard({
  dest,
  smoothProgress,
}: {
  dest: ExploreDestination;
  smoothProgress: any;
}) {
  const IconComp = dest.icon;
  const p = dest.centerProgress;

  // Continuous interpolation curves: opacity, translateY, scale
  // Active window is [p - 0.12, p, p + 0.12]
  const opacity = useTransform(
    smoothProgress,
    [p - 0.14, p - 0.04, p + 0.04, p + 0.14],
    [0, 1, 1, 0]
  );

  const translateY = useTransform(
    smoothProgress,
    [p - 0.14, p, p + 0.14],
    [40, 0, -40]
  );

  const scale = useTransform(
    smoothProgress,
    [p - 0.14, p, p + 0.14],
    [0.92, 1, 0.92]
  );

  // Border glow opacity
  const glowOpacity = useTransform(
    smoothProgress,
    [p - 0.08, p, p + 0.08],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity, y: translateY, scale }}
      className={`p-7 rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl space-y-4 max-w-md w-full relative transition-colors ${
        dest.desktopAlign === "left" ? "mr-auto text-left" : "ml-auto text-left"
      }`}
    >
      {/* Subtle Blue Glow Border Accent when active */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -inset-px rounded-2xl border-2 border-primary pointer-events-none shadow-[0_0_20px_rgba(15,27,45,0.3)]"
      />

      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
            DESTINATION {dest.id}
          </span>
          <h3 className="text-xl font-bold text-foreground tracking-wide">
            {dest.name}
          </h3>
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <IconComp className="h-5 w-5" />
        </div>
      </div>

      <p className="text-sm font-medium text-muted-foreground italic">
        "{dest.tagline}"
      </p>

      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground">
          WHAT YOU'LL EXPLORE:
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dest.points.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border/60"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ExploreRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across tall section (320vh for smooth scroll range)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for continuous movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Transform marker position along path (0% to 100%)
  const markerYPercent = useTransform(smoothProgress, [0, 1], [4, 96]);

  // Transform marker X coordinate for desktop curved S-path
  const markerXPercent = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [50, 75, 50, 25, 50]
  );

  // Final CTA visibility transform near GROW (progress > 0.88)
  const finalCtaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const finalCtaY = useTransform(smoothProgress, [0.85, 0.95], [30, 0]);

  // Reduced motion accessible fallback
  if (shouldReduceMotion) {
    return (
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="eyebrow text-primary">EXPLORE ROADMAP</span>
            <h2 className="text-3xl font-bold">YOUR JOURNEY STARTS HERE.</h2>
            <p className="text-muted-foreground text-sm">
              Explore the path from learning the fundamentals to building, creating and growing with Aibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => {
              const IconComp = dest.icon;
              return (
                <div
                  key={dest.id}
                  className="p-6 rounded-2xl border border-border bg-card space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-mono text-xs font-bold text-primary">
                      {dest.id}
                    </span>
                    <h3 className="font-bold text-lg">{dest.name}</h3>
                    <IconComp className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    "{dest.tagline}"
                  </p>
                  <ul className="space-y-2">
                    {dest.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-foreground/90 bg-background p-2 rounded border border-border"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="explore-roadmap"
      ref={containerRef}
      className="relative min-h-[320vh] bg-background border-b border-border/60"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-8 px-4 sm:px-8 lg:px-12 bg-background/95 backdrop-blur-sm z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-2 z-20 shrink-0">
          <span className="eyebrow text-primary font-mono font-bold tracking-widest text-xs uppercase">
            EXPLORE ROADMAP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground uppercase">
            YOUR JOURNEY STARTS HERE.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Explore the path from learning the fundamentals to building, creating and growing with Aibility.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (WIDE S-CURVE SVG ROAD & CONTINUOUS CARDS) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center h-full max-w-7xl mx-auto w-full py-4 relative">
          {/* Background SVG Road Path */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full text-border/40"
              viewBox="0 0 1000 600"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Path */}
              <path
                d="M 500,20 C 750,120 750,220 500,300 C 250,380 250,480 500,580"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="8 8"
              />

              {/* Scroll-Animated Path Reveal */}
              <motion.path
                d="M 500,20 C 750,120 750,220 500,300 C 250,380 250,480 500,580"
                stroke="var(--color-primary, #0F1B2D)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {/* Continuous Stage Cards Layer (Alternating Left & Right) */}
          <div className="col-span-12 relative z-20 h-full flex flex-col justify-center items-center">
            {destinations.map((dest) => (
              <div key={dest.id} className="absolute inset-0 flex items-center px-6 pointer-events-none">
                <div className="w-full pointer-events-auto">
                  <ContinuousStageCard
                    dest={dest}
                    smoothProgress={smoothProgress}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (VERTICAL ROAD & CONTINUOUS CARDS) */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex-1 relative flex flex-col justify-center items-center py-4 px-2">
          {/* Vertical Road Line */}
          <div className="absolute left-6 top-4 bottom-4 w-1 bg-border/60 rounded-full" />
          
          {/* Scroll-Driven Progress Line */}
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="absolute left-6 top-4 bottom-4 w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(15,27,45,0.4)]"
          />

          {/* Mobile Moving Marker */}
          <motion.div
            style={{ top: `${markerYPercent.get()}%` }}
            className="absolute left-6 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-primary ring-4 ring-primary/20 shadow-lg z-30 pointer-events-none"
          >
            <div className="h-2 w-2 rounded-full bg-white animate-ping m-1" />
          </motion.div>

          {/* Mobile Cards Container */}
          <div className="w-full pl-12 pr-2 relative z-20">
            {destinations.map((dest) => (
              <div key={dest.id} className="absolute inset-0 flex items-center pl-10 pr-2 pointer-events-none">
                <div className="w-full pointer-events-auto">
                  <ContinuousStageCard
                    dest={dest}
                    smoothProgress={smoothProgress}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FINAL DESTINATION (GROW) CTA RELEASE BANNER */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: finalCtaOpacity, y: finalCtaY }}
          className="z-30 shrink-0 text-center pt-2 pb-2"
        >
          <div className="max-w-xl mx-auto p-4 rounded-2xl border border-primary/30 bg-card/90 shadow-xl backdrop-blur-md flex items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                READY FOR THE NEXT STEP?
              </div>
              <p className="text-xs text-muted-foreground">
                Explore what Aibility has to offer.
              </p>
            </div>
            <Link
              to="/services"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2 shrink-0"
            >
              EXPLORE AIBILITY
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Scroll Helper Prompt */}
        <div className="text-center text-[11px] font-mono text-muted-foreground shrink-0 flex items-center justify-center gap-2">
          <span>SCROLL DOWN TO ADVANCE THE ROADMAP</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-primary" />
        </div>
      </div>
    </section>
  );
}
