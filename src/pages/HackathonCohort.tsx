import { useRef, useState } from "react";
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
// STAGE DATA FOR THE HACKATHON JOURNEY
// ============================================================================
export interface RoadmapStageData {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  icon: any;
  learnings: string[];
  takeaway: string;
  accentColor: string;
  borderColor: string;
}

const journeyStages: RoadmapStageData[] = [
  {
    id: "01",
    num: 1,
    title: "DISCOVER",
    subtitle: "Understand the challenge.",
    icon: Search,
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/40",
    learnings: [
      "How to read a hackathon problem statement",
      "How to identify the real problem",
      "How to understand users and requirements",
      "How to research the problem",
      "How to identify constraints",
    ],
    takeaway: "A clear understanding of what needs to be solved.",
  },
  {
    id: "02",
    num: 2,
    title: "IDEATE",
    subtitle: "Turn problems into possibilities.",
    icon: Lightbulb,
    accentColor: "text-blue-500",
    borderColor: "border-blue-500/40",
    learnings: [
      "Brainstorm solution ideas",
      "Think beyond obvious solutions",
      "Compare different approaches",
      "Evaluate feasibility",
      "Select a strong concept",
    ],
    takeaway: "A focused solution worth building.",
  },
  {
    id: "03",
    num: 3,
    title: "BUILD",
    subtitle: "Turn the idea into something real.",
    icon: Code2,
    accentColor: "text-emerald-500",
    borderColor: "border-emerald-500/40",
    learnings: [
      "Plan the product",
      "Choose the right technology",
      "Build a working prototype",
      "Divide work within the team",
      "Manage time and priorities",
      "Test while building",
    ],
    takeaway: "A functional prototype you can demonstrate.",
  },
  {
    id: "04",
    num: 4,
    title: "VALIDATE",
    subtitle: "Test, improve and strengthen the solution.",
    icon: Shield,
    accentColor: "text-purple-500",
    borderColor: "border-purple-500/40",
    learnings: [
      "Test the product with users",
      "Fix bugs and refine performance",
      "Improve UI/UX for judge impact",
      "Remove unnecessary features",
      "Validate technical stability",
    ],
    takeaway: "A battle-tested MVP ready for evaluation.",
  },
  {
    id: "05",
    num: 5,
    title: "SHOWCASE",
    subtitle: "Make people understand why your solution matters.",
    icon: Presentation,
    accentColor: "text-rose-500",
    borderColor: "border-rose-500/40",
    learnings: [
      "Structure your story",
      "Explain the problem clearly",
      "Present the solution",
      "Show innovation and impact",
      "Build a strong pitch deck",
      "Practice your presentation",
    ],
    takeaway: "A clear story that judges can remember.",
  },
  {
    id: "06",
    num: 6,
    title: "FINISH",
    subtitle: "Walk into the competition prepared.",
    icon: Trophy,
    accentColor: "text-amber-400",
    borderColor: "border-amber-400/50",
    learnings: [
      "Handle judge questions",
      "Explain technical decisions",
      "Demonstrate the product",
      "Handle pressure",
      "Understand evaluation criteria",
      "Prepare the final submission",
    ],
    takeaway: "A team ready to compete with confidence.",
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
// STAGE ITEM WITH SCROLL-DRIVEN CONTINUOUS FADE-IN & FADE-OFF
// ============================================================================
function StageItemWithFade({ stage, idx }: { stage: RoadmapStageData; idx: number }) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Calculate scroll position relative to this individual stage element
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 95%", "start 35%", "end 35%", "end 5%"],
  });

  // Continuous interpolation: smooth fade-in as stage enters viewport, smooth fade-off as stage leaves viewport (scrolling up or down)
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [35, 0, 0, -35]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95]);
  const IconComp = stage.icon;

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y: translateY, scale }}
      className="relative flex flex-col md:flex-row md:items-start justify-between gap-8 pb-4"
    >
      {/* Node Circle along vertical path */}
      <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] top-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-card border-2 border-amber-500 text-amber-500 shadow-md flex items-center justify-center font-mono font-extrabold text-sm sm:text-base z-20">
        {stage.id}
      </div>

      {/* Main Content Area (Clean typography, NO box cards!) */}
      <div className="space-y-4 max-w-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-amber-500 tracking-wider">
              STAGE {stage.id}
            </span>
            <div className="h-px w-16 bg-border/60" />
            <IconComp className="h-4 w-4 text-muted-foreground" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase">
            {stage.title}
          </h3>
          <p className="text-sm font-medium text-muted-foreground italic">
            "{stage.subtitle}"
          </p>
        </div>

        {/* Learnings List */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
            WHAT YOU'LL LEARN:
          </div>
          <div className="space-y-2">
            {stage.learnings.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-1.5 border-b border-border/40 text-xs sm:text-sm text-foreground/90"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Takeaway */}
        <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm font-semibold">
          <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
            TAKEAWAY
          </span>
          <span className="text-foreground">{stage.takeaway}</span>
        </div>
      </div>

      {/* Right Side Stage Visual Badge */}
      <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl border border-border/60 bg-card/50 text-center w-56 shrink-0 self-start mt-2">
        <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 mb-2">
          <IconComp className="h-6 w-6" />
        </div>
        <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
          PHASE {stage.id} // ACTIVE
        </span>
        <span className="text-xs font-bold text-foreground mt-1">
          {stage.title}
        </span>
      </div>
    </motion.div>
  );
}

// ============================================================================
// IN-FLOW NATURAL SCROLL ROADMAP (ZERO GAP, ALL STAGES VISIBLE IN SEQUENCE)
// ============================================================================
function InFlowJourneyRoadmap({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate continuous scroll progress across the section for the road line fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="hackathon-journey-roadmap"
      ref={containerRef}
      className="py-20 relative bg-background border-b border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-amber-500 font-mono font-bold tracking-widest text-xs uppercase">
            THE HACKATHON ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground uppercase">
            THE HACKATHON JOURNEY
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From the first problem statement to the final pitch. Follow the journey. Learn what matters. Build with confidence.
          </p>
        </div>

        {/* NATURAL VERTICAL JOURNEY TIMELINE (NO STICKY GAP!) */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 space-y-16 text-left">
          {/* Continuous Background Line */}
          <div className="absolute left-[15px] sm:left-[23px] md:left-[27px] top-6 bottom-6 w-1 bg-border/60 rounded-full pointer-events-none" />

          {/* Scroll-Driven Animated Line Fill */}
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="absolute left-[15px] sm:left-[23px] md:left-[27px] top-6 bottom-6 w-1 bg-gradient-to-b from-amber-500 via-blue-500 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)] pointer-events-none"
          />

          {/* All 6 Stages Flowing Sequentially with Scroll-Driven Fade-In & Fade-Off */}
          {journeyStages.map((stage, idx) => (
            <StageItemWithFade key={stage.id} stage={stage} idx={idx} />
          ))}
        </div>

        {/* SECTION FOOTER CTA (Flows directly into Program Tracks with NO gap!) */}
        <div className="pt-8 text-center border-t border-border/60">
          <button
            onClick={onOpenModal}
            className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl transition-all inline-flex items-center gap-2.5"
          >
            JOIN THE COHORT NOW
            <ArrowRight className="h-4 w-4" />
          </button>
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
    branch: "",
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
College/Org: ${formData.college || "Not specified"}
Branch of Studying: ${formData.branch || "Not specified"}

Additional Details:
${formData.message || "No additional message provided."}`;

      // Save to Convex Database
      await saveMessage({
        name: formData.name,
        email: formData.email,
        company: `${formData.college || "Student"} (${formData.branch || "N/A"})`,
        service: `Hackathon Cohort Application`,
        message: fullMessage,
      });

      // Send Email Notification to support@aibility.co.in
      try {
        await sendEmail({
          name: formData.name,
          email: formData.email,
          company: `${formData.college || "Student"} (${formData.branch || "N/A"})`,
          service: `Hackathon Cohort Application`,
          message: fullMessage,
          companyEmail: "support@aibility.co.in",
        });
      } catch (err) {
        console.warn("Email notice sent directly.", err);
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
      branch: "",
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
      {/* 03. IN-FLOW SCROLL ROADMAP (WITH SCROLL-DRIVEN FADE-IN & FADE-OFF!) */}
      {/* ========================================================================= */}
      <InFlowJourneyRoadmap onOpenModal={() => setIsModalOpen(true)} />

      {/* ========================================================================= */}
      {/* 04. PROGRAM TRACKS & TARGET COMPETITIONS */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 space-y-16">


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
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-3 text-left"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
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
                  <div className="mb-6 space-y-1 text-left">
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
                        <label className="block text-xs font-medium mb-1">College / Organization *</label>
                        <input
                          type="text"
                          name="college"
                          required
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="e.g. SRM / IIT / University"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Branch of Studying *</label>
                        <input
                          type="text"
                          name="branch"
                          required
                          value={formData.branch}
                          onChange={handleInputChange}
                          placeholder="e.g. CSE / AI & ML / ECE / IT"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
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
