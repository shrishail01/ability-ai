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
  Trophy,
  Rocket,
  Users,
  Target,
  Zap,
  Brain,
  Code2,
  Presentation,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Lightbulb,
  Clock,
  ChevronRight,
  ChevronDown,
  Layers,
  Flame,
  Award,
  BookOpen,
  GraduationCap,
  X,
  Send,
  Loader2,
  Search,
  Compass,
  FileCheck,
} from "lucide-react";
import { Link } from "react-router";
import { useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
});

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ============================================================================
// STAGE DATA FOR THE CONTINUOUS ANIMATED HACKATHON ROADMAP
// ============================================================================
export interface RoadmapStageData {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  accentColor: string;
  badgeColor: string;
  learnings: string[];
  takeaway: string;
  centerProgress: number;
  desktopAlign: "left" | "right";
}

const journeyStages: RoadmapStageData[] = [
  {
    id: "01",
    num: 1,
    title: "DISCOVER",
    subtitle: "Understand the challenge.",
    icon: Search,
    color: "from-blue-500/20 to-indigo-500/20",
    accentColor: "text-blue-600 dark:text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    learnings: [
      "How to read a hackathon problem statement",
      "How to identify the real problem",
      "How to understand users and requirements",
      "How to research the problem",
      "How to identify constraints",
    ],
    takeaway: "A clear understanding of what needs to be solved.",
    centerProgress: 0.08,
    desktopAlign: "left",
  },
  {
    id: "02",
    num: 2,
    title: "IDEATE",
    subtitle: "Turn problems into possibilities.",
    icon: Lightbulb,
    color: "from-amber-500/20 to-yellow-500/20",
    accentColor: "text-amber-600 dark:text-amber-400",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    learnings: [
      "Brainstorm solution ideas",
      "Think beyond obvious solutions",
      "Compare different approaches",
      "Evaluate feasibility",
      "Select a strong concept",
    ],
    takeaway: "A focused solution worth building.",
    centerProgress: 0.25,
    desktopAlign: "right",
  },
  {
    id: "03",
    num: 3,
    title: "BUILD",
    subtitle: "Turn the idea into something real.",
    icon: Code2,
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    learnings: [
      "Plan the product",
      "Choose the right technology",
      "Build a working prototype",
      "Divide work within the team",
      "Manage time and priorities",
      "Test while building",
    ],
    takeaway: "A functional prototype you can demonstrate.",
    centerProgress: 0.42,
    desktopAlign: "left",
  },
  {
    id: "04",
    num: 4,
    title: "VALIDATE",
    subtitle: "Test, improve and strengthen the solution.",
    icon: Shield,
    color: "from-purple-500/20 to-indigo-500/20",
    accentColor: "text-purple-600 dark:text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    learnings: [
      "Test the product with users",
      "Fix bugs and refine performance",
      "Improve UI/UX for judge impact",
      "Remove unnecessary features",
      "Validate technical stability",
    ],
    takeaway: "A battle-tested MVP ready for evaluation.",
    centerProgress: 0.59,
    desktopAlign: "right",
  },
  {
    id: "05",
    num: 5,
    title: "SHOWCASE",
    subtitle: "Make people understand why your solution matters.",
    icon: Presentation,
    color: "from-rose-500/20 to-pink-500/20",
    accentColor: "text-rose-600 dark:text-rose-400",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    learnings: [
      "Structure your story",
      "Explain the problem clearly",
      "Present the solution",
      "Show innovation and impact",
      "Build a strong pitch deck",
      "Practice your presentation",
    ],
    takeaway: "A clear story that judges can remember.",
    centerProgress: 0.76,
    desktopAlign: "left",
  },
  {
    id: "06",
    num: 6,
    title: "FINISH",
    subtitle: "Walk into the competition prepared.",
    icon: Trophy,
    color: "from-amber-500/30 to-yellow-500/30",
    accentColor: "text-amber-500 dark:text-amber-400",
    badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/40",
    learnings: [
      "Handle judge questions",
      "Explain technical decisions",
      "Demonstrate the product",
      "Handle pressure",
      "Understand evaluation criteria",
      "Prepare the final submission",
    ],
    takeaway: "A team ready to compete with confidence.",
    centerProgress: 0.93,
    desktopAlign: "right",
  },
];

// Target Competitions Grid Data
const hackathonTargets = [
  {
    name: "Smart India Hackathon (SIH)",
    tag: "National Innovation",
    desc: "Solve grand challenge problem statements across Software & Hardware editions at nodal centers.",
    badge: "National",
  },
  {
    name: "NASA Space Apps Challenge",
    tag: "Global Open Data",
    desc: "Address Earth science and space exploration challenges using NASA open-source datasets.",
    badge: "Global",
  },
  {
    name: "Google Solution Challenge",
    tag: "UN SDGs & Cloud",
    desc: "Build solutions for UN Sustainable Development Goals using Google Cloud and web technologies.",
    badge: "Global",
  },
  {
    name: "Microsoft Imagine Cup",
    tag: "Cloud & Global Innovation",
    desc: "Transform startup ideas across Earth, Green Tech, Healthcare, and Education.",
    badge: "Global",
  },
  {
    name: "Open Innovation & Tech Hackathons",
    tag: "Emerging Tech & Web",
    desc: "Compete in cutting-edge builder hackathons, open-source challenges, and innovation sprints.",
    badge: "Open Tech",
  },
  {
    name: "College & Corporate Hackathons",
    tag: "Campus & Industry",
    desc: "Dominate tech fest hackathons at top IITs, NITs, universities, and corporate innovation challenges.",
    badge: "Campus & Corporate",
  },
];

// Program Offerings
const cohortPrograms = [
  {
    name: "First Hackathon Cohort",
    level: "Beginner Track",
    desc: "Perfect for students starting out. Focuses on core hackathon mechanics, team building, rapid MVP creation, and basic pitching.",
    highlights: ["Team Formation & Matching", "Problem Selection Basics", "Rapid Scaffolding Starter Kits", "First Mock Hackathon"],
    recommended: false,
  },
  {
    name: "Innovation Sprint Cohort",
    level: "Full-Stack Builder Track",
    desc: "Designed for builders eager to create complete end-to-end solutions: clean APIs, modern UIs, robust backends, and live deployments.",
    highlights: ["Scalable System Architecture", "Rapid UI + Service Integration", "Database & API Contract Setup", "Jury Presentation Practice"],
    recommended: true,
  },
  {
    name: "Advanced Hackathon Cohort",
    level: "Pro Competitor Track",
    desc: "For experienced hackathon teams aiming for top podium finishes in national & international prize-pool hackathons.",
    highlights: ["Podium-Winning Case Studies", "Advanced Architecture Optimization", "Live Demo Defense Grilling", "1-on-1 Jury Reviews"],
    recommended: false,
  },
  {
    name: "College / Institution Cohort",
    level: "Campus Program Track",
    desc: "Tailored cohort conducted for engineering colleges and universities to train student batches for SIH & major hackathons.",
    highlights: ["Custom Campus Schedule", "Internal Hackathon Screening", "Faculty & Mentor Alignment", "Dedicated Cohort Leader"],
    recommended: false,
  },
];

// ============================================================================
// CONTINUOUS SCROLL-DRIVEN STAGE CONTENT CARD
// ============================================================================
function ContinuousStageCard({
  stage,
  smoothProgress,
}: {
  stage: RoadmapStageData;
  smoothProgress: any;
}) {
  const IconComp = stage.icon;
  const p = stage.centerProgress;

  // Continuous interpolation: opacity, translateY, scale
  const opacity = useTransform(
    smoothProgress,
    [p - 0.14, p - 0.04, p + 0.04, p + 0.14],
    [0, 1, 1, 0]
  );

  const translateY = useTransform(
    smoothProgress,
    [p - 0.14, p, p + 0.14],
    [35, 0, -35]
  );

  const scale = useTransform(
    smoothProgress,
    [p - 0.14, p, p + 0.14],
    [0.93, 1, 0.93]
  );

  const borderGlow = useTransform(
    smoothProgress,
    [p - 0.08, p, p + 0.08],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity, y: translateY, scale }}
      className={`p-7 rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl space-y-4 max-w-md w-full relative transition-colors ${
        stage.desktopAlign === "left" ? "mr-auto text-left" : "ml-auto text-left"
      }`}
    >
      {/* Glow highlight */}
      <motion.div
        style={{ opacity: borderGlow }}
        className="absolute -inset-px rounded-2xl border-2 border-primary pointer-events-none shadow-[0_0_25px_rgba(15,27,45,0.4)]"
      />

      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${stage.badgeColor}`}>
            STAGE {stage.id}
          </span>
          <h3 className="text-xl font-bold text-foreground tracking-wide">
            {stage.title}
          </h3>
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <IconComp className="h-5 w-5" />
        </div>
      </div>

      <p className="text-sm font-medium text-muted-foreground italic">
        "{stage.subtitle}"
      </p>

      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground">
          WHAT YOU'LL LEARN:
        </div>
        <ul className="space-y-2">
          {stage.learnings.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border/60"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10">
        <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
          TAKEAWAY
        </div>
        <div className="text-xs font-bold text-foreground">
          {stage.takeaway}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN SCROLL-DRIVEN HACKATHON ROADMAP COMPONENT (600VH STICKY VIEWPORT)
// ============================================================================
function ScrollDrivenJourneyRoadmap({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Outer Scroll Area (600vh distance for generous continuous scroll range)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Active Index tracker
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (val) => {
      let current = 0;
      if (val >= 0.85) current = 5;
      else if (val >= 0.69) current = 4;
      else if (val >= 0.52) current = 3;
      else if (val >= 0.35) current = 2;
      else if (val >= 0.18) current = 1;
      else current = 0;

      if (current !== activeIdx) {
        setActiveIdx(current);
      }
    });
    return () => unsub();
  }, [smoothProgress, activeIdx]);

  // Marker Y transform along path (10% to 90%)
  const markerYPercent = useTransform(smoothProgress, [0, 1], [10, 90]);

  // Release CTA opacity near end (progress > 0.85)
  const finalCtaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const finalCtaY = useTransform(smoothProgress, [0.85, 0.95], [20, 0]);

  if (shouldReduceMotion) {
    return (
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="eyebrow text-primary">THE HACKATHON ROADMAP</span>
            <h2 className="text-3xl font-bold">THE HACKATHON JOURNEY</h2>
            <p className="text-muted-foreground text-sm">
              From the first problem statement to the final pitch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeyStages.map((stg) => {
              const IconComponent = stg.icon;
              return (
                <div key={stg.id} className="p-6 rounded-2xl border border-border bg-card space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-mono text-xs font-bold text-primary">STAGE {stg.id}</span>
                    <h3 className="font-bold text-lg">{stg.title}</h3>
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{stg.subtitle}"</p>
                  <ul className="space-y-2">
                    {stg.learnings.map((l, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground/90 bg-background p-2 rounded border border-border">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-bold">
                    TAKEAWAY: {stg.takeaway}
                  </div>
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
      id="hackathon-journey-roadmap"
      ref={containerRef}
      className="relative min-h-[600vh] bg-background border-b border-border/60"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-8 lg:px-12 bg-background/95 backdrop-blur-sm z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 z-30 shrink-0 pt-2">
          <span className="eyebrow text-amber-600 dark:text-amber-400 font-mono font-bold tracking-widest text-xs uppercase">
            THE HACKATHON ROADMAP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground uppercase">
            THE HACKATHON JOURNEY
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            From the first problem statement to the final pitch. Follow the journey. Learn what matters. Build with confidence.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VISUAL ROADMAP (PATH + NODES + CONTINUOUS STAGE CARD) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center h-full max-w-7xl mx-auto w-full py-4 relative z-20">
          {/* Left / Right Active Content Card Display */}
          <div className="col-span-5 flex flex-col justify-center space-y-4 pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={journeyStages[activeIdx].id}
                initial={{ opacity: 0, x: -25, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 25, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-7 rounded-2xl border border-primary/40 bg-card shadow-2xl space-y-5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${journeyStages[activeIdx].badgeColor}`}>
                      STAGE {journeyStages[activeIdx].id}
                    </span>
                    <h3 className="text-xl font-bold text-foreground tracking-wide">
                      {journeyStages[activeIdx].title}
                    </h3>
                  </div>
                  {journeyStages[activeIdx].id === "06" ? (
                    <Trophy className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Search className="h-5 w-5 text-primary" />
                  )}
                </div>

                <p className="text-sm font-semibold text-muted-foreground italic">
                  "{journeyStages[activeIdx].subtitle}"
                </p>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                    WHAT YOU'LL LEARN:
                  </h4>
                  <ul className="space-y-2">
                    {journeyStages[activeIdx].learnings.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border/60"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                    TAKEAWAY
                  </div>
                  <div className="text-xs font-bold text-foreground">
                    {journeyStages[activeIdx].takeaway}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Animated Glowing Path & Nodes */}
          <div className="col-span-2 relative h-full flex flex-col items-center justify-between py-8">
            {/* Background Path Line */}
            <div className="absolute top-8 bottom-8 w-1.5 bg-border/60 rounded-full" />

            {/* Scroll-Driven Progress Line */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="absolute top-8 bottom-8 w-1.5 bg-gradient-to-b from-blue-500 via-amber-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(15,27,45,0.5)]"
            />

            {/* 6 Destination Nodes along the Path */}
            {journeyStages.map((stg, idx) => {
              const isActive = activeIdx === idx;
              const isPassed = activeIdx >= idx;
              const DestIcon = stg.icon;

              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative z-20 flex flex-col items-center group transition-transform duration-300 ${
                    isActive ? "scale-125" : "scale-100"
                  }`}
                >
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                      isActive
                        ? "bg-primary text-primary-foreground border-amber-500 ring-4 ring-amber-500/20 shadow-lg"
                        : isPassed
                        ? "bg-card text-foreground border-primary"
                        : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    {idx === 5 ? (
                      <Trophy className="h-5 w-5 text-amber-400" />
                    ) : (
                      <DestIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`mt-1 font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-all ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                        : "bg-background text-muted-foreground border border-border"
                    }`}
                  >
                    {stg.id} {stg.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Trail Overview & Status */}
          <div className="col-span-5 flex flex-col justify-center space-y-4 pl-4">
            <div className="p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                  HACKATHON JOURNEY // STAGE {journeyStages[activeIdx].id} OF 06
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  SCROLL ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {journeyStages.map((stg, i) => {
                  const isCurrent = activeIdx === i;
                  const isDone = activeIdx > i;
                  return (
                    <div
                      key={stg.id}
                      onClick={() => setActiveIdx(i)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? "border-amber-500/60 bg-amber-500/10 shadow-sm"
                          : isDone
                          ? "border-border bg-background/50 text-foreground"
                          : "border-border/40 bg-background/20 text-muted-foreground opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                          {stg.id}
                        </span>
                        <div>
                          <div className="font-bold text-xs text-foreground">{stg.title}</div>
                          <div className="text-[10px] text-muted-foreground">{stg.subtitle}</div>
                        </div>
                      </div>
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
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

              {/* Release Banner at STAGE 06 (FINISH) */}
              {activeIdx === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-primary/20 text-center space-y-2 mt-3"
                >
                  <div className="inline-flex p-2 rounded-full bg-amber-500/20 text-amber-400">
                    <Trophy className="h-5 w-5 animate-bounce" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground uppercase">
                    READY TO COMPETE.
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Build smarter. Pitch better. Compete with confidence.
                  </p>
                  <button
                    onClick={onOpenModal}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
                  >
                    JOIN THE COHORT &rarr;
                  </button>
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
            {journeyStages.map((stage, idx) => {
              const isActive = activeIdx === idx;
              const StageIcon = stage.icon;
              return (
                <div key={stage.id} className="relative">
                  {/* Node Circle */}
                  <div
                    onClick={() => setActiveIdx(idx)}
                    className={`absolute -left-[31px] top-0 h-8 w-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-amber-500 ring-2 ring-amber-500/20"
                        : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    {idx === 5 ? <Trophy className="h-4 w-4 text-amber-400" /> : <StageIcon className="h-4 w-4" />}
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
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        STAGE {stage.id}
                      </span>
                      <span className="font-bold text-sm text-foreground">{stage.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{stage.subtitle}</div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3 pt-2 border-t border-border/60"
                      >
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                            WHAT YOU'LL LEARN:
                          </div>
                          {stage.learnings.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground bg-background/60 p-2 rounded border border-border/40">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                            TAKEAWAY
                          </div>
                          <div className="text-xs font-bold text-foreground">
                            {stage.takeaway}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Final CTA */}
          <div className="p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-primary/10 text-center space-y-3 mt-4">
            <Trophy className="h-7 w-7 text-amber-500 mx-auto" />
            <h3 className="font-bold text-base text-foreground uppercase">
              READY TO COMPETE.
            </h3>
            <p className="text-xs text-muted-foreground">
              Build smarter. Pitch better. Compete with confidence.
            </p>
            <button
              onClick={onOpenModal}
              className="w-full py-3 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
            >
              JOIN THE COHORT
            </button>
          </div>
        </div>

        {/* Scroll Helper Prompt */}
        <div className="text-center text-[11px] font-mono text-muted-foreground shrink-0 flex items-center justify-center gap-2 pt-2 z-20">
          <span>SCROLL DOWN TO ADVANCE ROADMAP</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-amber-500" />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT: HACKATHON COHORT
// ============================================================================
export default function HackathonCohort() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    role: "Developer",
    experience: "Beginner",
    programInterest: "Innovation Sprint Cohort",
    message: "",
  });

  const saveMessage = useMutation(api.cms.saveContactMessage);
  const sendEmail = useAction(api.cms.sendContactEmail);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fullMessage = `[HACKATHON COHORT APPLICATION]
Phone/WhatsApp: ${formData.phone}
College/Org: ${formData.college}
Primary Role: ${formData.role}
Experience Level: ${formData.experience}
Cohort Track: ${formData.programInterest}

Additional Details:
${formData.message || "No additional message provided."}`;

      // Save to Convex
      await saveMessage({
        name: formData.name,
        email: formData.email,
        company: `${formData.college} (${formData.role})`,
        service: `Hackathon Cohort - ${formData.programInterest}`,
        message: fullMessage,
      });

      // Send Email notification
      try {
        await sendEmail({
          name: formData.name,
          email: formData.email,
          company: `${formData.college} (${formData.role})`,
          service: `Hackathon Cohort - ${formData.programInterest}`,
          message: fullMessage,
          companyEmail: "support@aibility.co.in",
        });
      } catch (err) {
        console.warn("Email notice sent to admin inbox directly.", err);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting cohort application:", err);
      alert("Submission error. Please try again or reach out via WhatsApp/Email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      role: "Developer",
      experience: "Beginner",
      programInterest: "Innovation Sprint Cohort",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ========================================================================= */}
      {/* 01. HERO — START THE JOURNEY */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 overflow-hidden border-b border-border/60">
        {/* Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div variants={fadeUp(0)}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                  AIBILITY ACADEMY & INCUBATION
                </span>
              </motion.div>

              <motion.div variants={fadeUp(1)} className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground uppercase leading-[1.05]">
                  BUILD. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-primary to-indigo-500">
                    COMPETE.
                  </span>{" "}
                  CREATE.
                </h1>
                <p className="eyebrow text-amber-600 dark:text-amber-400 font-bold text-sm tracking-widest uppercase">
                  LEARN TOGETHER. BUILD TOGETHER. COMPETE BETTER.
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp(2)}
                className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl"
              >
                Aibility Hackathon Cohort is a structured training program where students join as a cohort and are guided through the <strong>COMPLETE hackathon journey</strong> — from problem discovery and team alignment to rapid building, deck storytelling, and live jury defense.
              </motion.p>

              <motion.div
                variants={fadeUp(3)}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 flex items-center gap-2.5 group"
                >
                  JOIN THE COHORT
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#hackathon-journey-roadmap"
                  className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-foreground border border-border bg-card hover:bg-accent/10 transition-colors duration-300 flex items-center gap-2"
                >
                  EXPLORE THE JOURNEY
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </motion.div>

              {/* Quick Stat Badges */}
              <motion.div
                variants={fadeUp(4)}
                className="pt-6 grid grid-cols-3 gap-4 border-t border-border/60 max-w-lg"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">6 Stages</div>
                  <div className="text-xs text-muted-foreground">Complete Roadmap</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">100%</div>
                  <div className="text-xs text-muted-foreground">Hands-on Building</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">1-on-1</div>
                  <div className="text-xs text-muted-foreground">Mentor Reviews</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Visual Node Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">COHORT_PIPELINE // ACTIVE</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                    FULL-STACK JOURNEY
                  </span>
                </div>

                <div className="relative py-8 px-2 flex flex-col items-center justify-center space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-slate-900 text-primary-foreground shadow-xl border border-primary-foreground/20 text-center max-w-xs"
                  >
                    <div className="inline-flex p-2 rounded-xl bg-amber-500/20 text-amber-300 mb-2">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-base tracking-wide">AIBILITY COHORT HUB</h3>
                    <p className="text-xs text-primary-foreground/80 mt-1">
                      Complete Hackathon Journey Framework
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-amber-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                        <Search className="h-4 w-4" />
                        <span>01. Discover</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Problem decoding & user research</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-blue-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400 font-semibold text-xs">
                        <Compass className="h-4 w-4" />
                        <span>02. Ideate</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Brainstorm & concept selection</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-purple-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-purple-600 dark:text-purple-400 font-semibold text-xs">
                        <Sparkles className="h-4 w-4" />
                        <span>03. Build & Validate</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Prototype development & MVP test</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-emerald-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        <Presentation className="h-4 w-4" />
                        <span>04. Pitch & Compete</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Deck story & live jury defense</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Targeted Competitions: SIH, Space Apps, Imagine Cup & Innovation Hacks</span>
                  <span className="font-semibold text-primary cursor-pointer" onClick={() => setIsModalOpen(true)}>Apply Now &rarr;</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. JOURNEY INTRO — THE HACKATHON EXPERIENCE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-card/40 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400 uppercase">
              THE HACKATHON EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              More Than Coding. A Complete Competition Journey.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Hackathons are not won on code alone. They are won on problem statement selection, strategy, rapid prototyping, storytelling, and defense under pressure. The Aibility Cohort guides you through every step of this journey.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. ANIMATED ROADMAP & STAGE EXPERIENCES (600VH CONTINUOUS STICKY VIEWPORT) */}
      {/* ========================================================================= */}
      <ScrollDrivenJourneyRoadmap onOpenModal={() => setIsModalOpen(true)} />

      {/* ========================================================================= */}
      {/* 04. PROGRAM TRACKS & TARGET COMPETITIONS */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 space-y-16">
          {/* Section 1: Tracks */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="eyebrow text-amber-600 dark:text-amber-400">PROGRAM TRACKS</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Tailored Cohort Offerings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cohortPrograms.map((prog) => (
                <div
                  key={prog.name}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    prog.recommended
                      ? "border-amber-500 bg-card shadow-xl ring-2 ring-amber-500/20"
                      : "border-border bg-card shadow-sm"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                      {prog.level}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{prog.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{prog.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, programInterest: prog.name }));
                        setIsModalOpen(true);
                      }}
                      className="w-full py-2.5 rounded-lg text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90"
                    >
                      Apply &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Target Competitions */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="eyebrow text-amber-600 dark:text-amber-400">VERSATILE PREPARATION</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                One Cohort, Many Hackathons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathonTargets.map((target) => (
                <div
                  key={target.name}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {target.badge}
                    </span>
                    <Trophy className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{target.name}</h3>
                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400">{target.tag}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{target.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl border border-border bg-card/60 text-center max-w-3xl mx-auto text-xs text-muted-foreground">
              <strong className="text-foreground">Disclaimer Note:</strong> Aibility Hackathon Cohort is an independent training program. Mention of specific competitions (SIH, Space Apps, Imagine Cup) is for illustrative purposes to demonstrate target hackathon preparation scope.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. MENTORSHIP & MOCK HACKATHON SIMULATION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/30 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-primary-foreground p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-mono font-semibold text-amber-300 uppercase">
                  <Flame className="h-3.5 w-3.5" />
                  HACKATHON SIMULATION
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight">
                  READY BEFORE <br />
                  <span className="text-amber-400">THE CLOCK STARTS.</span>
                </h2>

                <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Our cohort culminates in a <strong>24-Hour Mock Hackathon Simulation</strong> where your team builds, debugs, presents to a live jury, and faces realistic Q&A grilling before entering your official competition.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Trophy className="h-16 w-16 text-amber-400 mb-4 animate-bounce" />
                <h3 className="font-bold text-xl mb-2">Simulated Scorecard</h3>
                <p className="text-xs text-primary-foreground/80 mb-6">
                  Explicit numerical scoring on Feasibility, Tech Complexity, UI/UX, and Pitch Delivery.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg"
                >
                  Join Simulation Cohort
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/60 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center space-y-8">
          <span className="eyebrow text-amber-600 dark:text-amber-400">READY TO BUILD SOMETHING REAL?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase">
            YOUR NEXT HACKATHON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-primary">
              STARTS HERE.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Join the next Aibility Hackathon Cohort. Build smarter. Pitch better. Compete with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl text-sm font-bold tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 shadow-xl transition-all flex items-center gap-3"
            >
              JOIN THE COHORT
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl text-sm font-bold tracking-wider text-foreground border border-border bg-card hover:bg-accent/10 transition-colors"
            >
              TALK TO AIBILITY
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APPLICATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 my-8"
            >
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Application Received!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Thank you for applying to the <strong>Aibility Hackathon Cohort</strong>. Our team will review your application details and get in touch with you shortly.
                  </p>
                  <button
                    onClick={resetModal}
                    className="w-full py-3 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-6 space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                      ENROLLMENT & INQUIRY
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      Join Aibility Hackathon Cohort
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Fill in your details below to apply for the upcoming cohort session.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-medium mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alex@college.edu"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">College / Organization</label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="e.g. SRM / IIT / Company"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Primary Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Developer">Developer / Coder</option>
                          <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                          <option value="UI/UX Designer">UI/UX Designer</option>
                          <option value="Pitch Presenter">Pitch Presenter / Lead</option>
                          <option value="Team Leader">Team Leader</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Experience Level</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Beginner">First-time Hacker</option>
                          <option value="Intermediate">1-2 Hackathons</option>
                          <option value="Experienced">Experienced Competitor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1">Cohort Track</label>
                        <select
                          name="programInterest"
                          value={formData.programInterest}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="First Hackathon Cohort">First Hackathon Cohort</option>
                          <option value="Innovation Sprint Cohort">Innovation Sprint Cohort</option>
                          <option value="Advanced Hackathon Cohort">Advanced Hackathon Cohort</option>
                          <option value="College / Institution Cohort">College Campus Cohort</option>
                          <option value="Custom Hackathon Preparation">Custom 1-on-1 Preparation</option>
                          <option value="Campus Workshop Request">Campus Workshop Request</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1">Message / Target Hackathon (Optional)</label>
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your team or target hackathon (e.g. preparing for SIH 2026)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Cohort Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
