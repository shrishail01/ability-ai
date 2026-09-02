import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
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
  nodeTopPercent: number; // Y position in %
  nodeLeftPercent: number; // X position in %
  rangeStart: number;
  rangeEnd: number;
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
    nodeTopPercent: 12,
    nodeLeftPercent: 30,
    rangeStart: 0,
    rangeEnd: 0.18,
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
    nodeTopPercent: 28,
    nodeLeftPercent: 70,
    rangeStart: 0.18,
    rangeEnd: 0.35,
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
    nodeTopPercent: 44,
    nodeLeftPercent: 30,
    rangeStart: 0.35,
    rangeEnd: 0.52,
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
    nodeTopPercent: 60,
    nodeLeftPercent: 70,
    rangeStart: 0.52,
    rangeEnd: 0.69,
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
    nodeTopPercent: 76,
    nodeLeftPercent: 30,
    rangeStart: 0.69,
    rangeEnd: 0.85,
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
    nodeTopPercent: 90,
    nodeLeftPercent: 70,
    rangeStart: 0.85,
    rangeEnd: 1.0,
  },
];

export function ExploreRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across tall section (280vh range)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Physics spring for continuous smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Track active stage index (0 to 5) continuously
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (val) => {
      let found = 0;
      for (let i = 0; i < destinations.length; i++) {
        if (val >= destinations[i].rangeStart) {
          found = i;
        }
      }
      setActiveIdx(found);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const activeDest = destinations[activeIdx];

  // Marker top percent along vertical path (10% to 92%)
  const markerYPercent = useTransform(smoothProgress, [0, 1], [10, 92]);

  // Reduced Motion Fallback
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
      className="relative min-h-[280vh] bg-background border-b border-border/60"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-8 lg:px-12 bg-background/95 backdrop-blur-sm z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 z-30 shrink-0 pt-2">
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
        {/* DESKTOP LAYOUT (VISIBLE PATH + DESTINATION NODES + ACTIVE CARD DISPLAY) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center h-full max-w-7xl mx-auto w-full py-4 relative z-20">
          {/* Left Column: Active Stage Content Card */}
          <div className="col-span-5 flex flex-col justify-center space-y-4 pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, x: -25, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 25, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-7 rounded-2xl border border-primary/40 bg-card shadow-2xl space-y-5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      DESTINATION {activeDest.id}
                    </span>
                    <h3 className="text-xl font-bold text-foreground tracking-wide">
                      {activeDest.name}
                    </h3>
                  </div>
                  <activeDest.icon className="h-5 w-5 text-primary" />
                </div>

                <p className="text-sm font-semibold text-muted-foreground italic">
                  "{activeDest.tagline}"
                </p>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                    WHAT YOU'LL EXPLORE:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeDest.points.map((pt, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-foreground/90 bg-background/80 p-2.5 rounded-xl border border-border/60"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Animated Road & Destination Nodes */}
          <div className="col-span-2 relative h-full flex flex-col items-center justify-between py-8">
            {/* Background Path Line */}
            <div className="absolute top-8 bottom-8 w-1.5 bg-border/60 rounded-full" />

            {/* Scroll-Driven Animated Progress Line */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="absolute top-8 bottom-8 w-1.5 bg-gradient-to-b from-primary via-blue-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(15,27,45,0.5)]"
            />

            {/* 6 Destination Nodes along the Path */}
            {destinations.map((dest, idx) => {
              const isActive = activeIdx === idx;
              const isPassed = activeIdx >= idx;
              const DestIcon = dest.icon;

              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative z-20 flex flex-col items-center group transition-transform duration-300 ${
                    isActive ? "scale-125" : "scale-100"
                  }`}
                >
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20 shadow-lg"
                        : isPassed
                        ? "bg-card text-foreground border-primary"
                        : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    <DestIcon className="h-5 w-5" />
                  </div>
                  <span
                    className={`mt-1 font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-extrabold shadow-sm"
                        : "bg-background text-muted-foreground border border-border"
                    }`}
                  >
                    {dest.id} {dest.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Destination Trail & Status Overview */}
          <div className="col-span-5 flex flex-col justify-center space-y-4 pl-4">
            <div className="p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                  AIBILITY ROADMAP // {activeIdx + 1} OF 6 DESTINATIONS
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                  SCROLL ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {destinations.map((dest, i) => {
                  const isCurrent = activeIdx === i;
                  const isDone = activeIdx > i;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => setActiveIdx(i)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? "border-primary bg-primary/10 shadow-sm"
                          : isDone
                          ? "border-border bg-background/50 text-foreground"
                          : "border-border/40 bg-background/20 text-muted-foreground opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-primary">
                          {dest.id}
                        </span>
                        <div>
                          <div className="font-bold text-xs text-foreground">{dest.name}</div>
                          <div className="text-[10px] text-muted-foreground">{dest.tagline}</div>
                        </div>
                      </div>
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : isCurrent ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-muted-foreground">NEXT</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Release Banner at GROW (Destination 06) */}
              {activeIdx === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-primary/40 bg-gradient-to-br from-primary/20 to-card text-center space-y-2 mt-3"
                >
                  <div className="inline-flex p-2 rounded-full bg-primary/20 text-primary">
                    <Trophy className="h-5 w-5 animate-bounce" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground uppercase">
                    READY FOR THE NEXT STEP?
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Explore what Aibility has to offer.
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-md"
                  >
                    EXPLORE AIBILITY &rarr;
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (VERTICAL TIMELINE & EXPANDING CARDS) */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex-1 overflow-y-auto py-4 px-2 space-y-4 z-20">
          <div className="relative border-l-2 border-primary/40 pl-6 space-y-5">
            {destinations.map((dest, idx) => {
              const isActive = activeIdx === idx;
              const DestIcon = dest.icon;
              return (
                <div key={dest.id} className="relative">
                  {/* Node Circle */}
                  <div
                    onClick={() => setActiveIdx(idx)}
                    className={`absolute -left-[31px] top-0 h-8 w-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                        : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    <DestIcon className="h-4 w-4" />
                  </div>

                  {/* Stage Card */}
                  <div
                    onClick={() => setActiveIdx(idx)}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-primary bg-card shadow-md"
                        : "border-border bg-card/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-primary">
                        {dest.id}
                      </span>
                      <span className="font-bold text-sm text-foreground">{dest.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{dest.tagline}</div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2 pt-2 border-t border-border/60"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                          WHAT YOU'LL EXPLORE:
                        </div>
                        <div className="space-y-1.5">
                          {dest.points.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs text-muted-foreground bg-background/60 p-2 rounded border border-border/40"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Release CTA Banner */}
          <div className="p-5 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-card text-center space-y-3 mt-4">
            <Trophy className="h-7 w-7 text-primary mx-auto" />
            <h3 className="font-bold text-base text-foreground uppercase">
              READY FOR THE NEXT STEP?
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore what Aibility has to offer.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-primary-foreground bg-primary hover:bg-primary/90 shadow-md"
            >
              EXPLORE AIBILITY &rarr;
            </Link>
          </div>
        </div>

        {/* Scroll Helper Prompt */}
        <div className="text-center text-[11px] font-mono text-muted-foreground shrink-0 flex items-center justify-center gap-2 pt-2 z-20">
          <span>SCROLL DOWN TO ADVANCE ROADMAP</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-primary" />
        </div>
      </div>
    </section>
  );
}
