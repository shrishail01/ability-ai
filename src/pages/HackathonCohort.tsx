import { motion, AnimatePresence } from "framer-motion";
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
  MessageSquare,
  X,
  Send,
  Loader2,
  Search,
  Compass,
  FileCheck,
  Cpu,
} from "lucide-react";
import { useState } from "react";
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
// 10 HACKATHON ROADMAP PHASES (REPLACES WEEK-BY-WEEK TIMELINE)
// ============================================================================
export interface RoadmapPhase {
  id: string;
  num: number;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  borderColor: string;
  accentColor: string;
  activities: string[];
  message?: string;
  output: string;
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: "01",
    num: 1,
    name: "DISCOVER",
    tagline: "Understand the Challenge",
    icon: Search,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-600 dark:text-blue-400",
    activities: [
      "Decode the problem statement",
      "Understand the requirements",
      "Research the domain",
      "Identify users and stakeholders",
      "Understand constraints",
      "Study judging criteria",
    ],
    output: "A clear understanding of the challenge.",
  },
  {
    id: "02",
    num: 2,
    name: "DEFINE",
    tagline: "Find the Right Problem",
    icon: Target,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    accentColor: "text-cyan-600 dark:text-cyan-400",
    activities: [
      "Identify the core problem",
      "Validate the problem",
      "Understand user pain points",
      "Define the scope",
      "Identify what actually needs to be solved",
    ],
    output: "A focused problem statement.",
  },
  {
    id: "03",
    num: 3,
    name: "IDEATE",
    tagline: "Turn Problems Into Solutions",
    icon: Lightbulb,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-600 dark:text-amber-400",
    activities: [
      "Brainstorm solutions",
      "Explore multiple approaches",
      "Compare ideas",
      "Evaluate feasibility",
      "Identify innovation opportunities",
      "Select the strongest concept",
    ],
    output: "A clear and validated solution idea.",
  },
  {
    id: "04",
    num: 4,
    name: "STRATEGIZE",
    tagline: "Build the Game Plan",
    icon: Compass,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    accentColor: "text-purple-600 dark:text-purple-400",
    activities: [
      "Form the team",
      "Assign responsibilities",
      "Choose the technology stack",
      "Break the project into tasks",
      "Prioritize features",
      "Plan development around the deadline",
    ],
    output: "A realistic execution plan.",
  },
  {
    id: "05",
    num: 5,
    name: "BUILD",
    tagline: "Turn Ideas Into Reality",
    icon: Code2,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    activities: [
      "Design the architecture",
      "Develop the core product",
      "Build the frontend",
      "Build the backend",
      "Integrate required services",
      "Create the MVP",
      "Connect the complete workflow",
    ],
    output: "A functional prototype.",
  },
  {
    id: "06",
    num: 6,
    name: "ACCELERATE",
    tagline: "Work Smarter",
    icon: Zap,
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    activities: [
      "Research assistance",
      "Faster ideation",
      "Coding assistance",
      "Debugging",
      "Design exploration",
      "Documentation",
      "Productivity workflows",
    ],
    message: "Use the right tools to move faster without compromising your own thinking.",
    output: "Faster iteration and better productivity.",
  },
  {
    id: "07",
    num: 7,
    name: "REFINE",
    tagline: "Make It Competition-Ready",
    icon: Shield,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    accentColor: "text-orange-600 dark:text-orange-400",
    activities: [
      "Test the product",
      "Fix bugs",
      "Improve usability",
      "Improve UI/UX",
      "Validate the solution",
      "Gather feedback",
      "Remove unnecessary features",
      "Strengthen the core experience",
    ],
    output: "A polished and reliable prototype.",
  },
  {
    id: "08",
    num: 8,
    name: "PITCH",
    tagline: "Tell the Story",
    icon: Presentation,
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    accentColor: "text-rose-600 dark:text-rose-400",
    activities: [
      "Define the problem",
      "Explain the solution",
      "Explain the innovation",
      "Show the impact",
      "Explain the technology",
      "Create the pitch deck",
      "Practice the presentation",
    ],
    output: "A clear and memorable pitch.",
  },
  {
    id: "09",
    num: 9,
    name: "DEMO",
    tagline: "Show What You Built",
    icon: Flame,
    color: "from-violet-500/20 to-indigo-500/20",
    borderColor: "border-violet-500/30",
    accentColor: "text-violet-600 dark:text-violet-400",
    activities: [
      "Create the demo flow",
      "Prepare the product walkthrough",
      "Practice the live demonstration",
      "Prepare backup plans",
      "Handle technical issues",
      "Practice likely questions",
    ],
    output: "A confident product demonstration.",
  },
  {
    id: "10",
    num: 10,
    name: "COMPETE",
    tagline: "Face the Judges",
    icon: Trophy,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-600 dark:text-amber-400",
    activities: [
      "Understand evaluation criteria",
      "Prepare for questions",
      "Defend technical decisions",
      "Explain impact",
      "Handle pressure",
      "Complete final submission",
      "Prepare the final checklist",
    ],
    output: "A team ready for the competition.",
  },
];

// 10 Core Learning Focus Cards
const learningModules = [
  {
    id: 1,
    title: "Problem Selection & Decoding",
    desc: "Analyze problem statements like a judge. Identify hidden constraints, high-impact pain points, and evaluation criteria.",
    icon: Target,
    badge: "Strategy",
  },
  {
    id: 2,
    title: "Ideation & UVP",
    desc: "Develop viable solutions using novelty matrices and market gap analysis so your project stands out immediately.",
    icon: Lightbulb,
    badge: "Innovation",
  },
  {
    id: 3,
    title: "Team Strategy & Role Allocation",
    desc: "Structure roles cleanly across tech lead, frontend builder, full-stack developer, and pitch presenter for maximum output.",
    icon: Users,
    badge: "Leadership",
  },
  {
    id: 4,
    title: "Rapid Prototyping & Architecture",
    desc: "Design scalable system architectures and working MVPs that can be coded cleanly under competition deadlines.",
    icon: Layers,
    badge: "Engineering",
  },
  {
    id: 5,
    title: "Smart Workflows & Rapid Building",
    desc: "Utilize modern developer tools, API integrations, and rapid scaffolding to build faster without compromising quality.",
    icon: Zap,
    badge: "Productivity",
  },
  {
    id: 6,
    title: "UI/UX & High-Impact Demos",
    desc: "Design sleek, intuitive interfaces that hook judges in the first 10 seconds of your presentation.",
    icon: Sparkles,
    badge: "Design",
  },
  {
    id: 7,
    title: "Storytelling & Pitching to Judges",
    desc: "Master the 3-minute pitch structure: Hook, Problem, Solution, Live Demo, Traction, and Impact.",
    icon: Presentation,
    badge: "Communication",
  },
  {
    id: 8,
    title: "Live Demo Defense & Q&A",
    desc: "Handle tough judge grilling, technical inquiries, scalability questions, and edge-case defenses with confidence.",
    icon: Shield,
    badge: "Mastery",
  },
  {
    id: 9,
    title: "Judging Criteria Alignment",
    desc: "Explicitly map every feature in your code and slide deck to jury rubrics (Feasibility, Novelty, UX, Business Viability).",
    icon: Award,
    badge: "Scoring",
  },
  {
    id: 10,
    title: "Final Submission Optimization",
    desc: "Polish GitHub repositories, README documentation, demo video edits, and final presentation slide submissions.",
    icon: CheckCircle2,
    badge: "Execution",
  },
];

// Target Competitions Grid
const hackathonTargets = [
  {
    name: "Smart India Hackathon (SIH)",
    tag: "National Innovation",
    desc: "Solve grand challenge problem statements across Software & Hardware editions at nodal centers.",
    color: "from-blue-600/10 to-indigo-600/10 border-blue-500/20",
    badge: "National",
  },
  {
    name: "NASA Space Apps Challenge",
    tag: "Global Open Data",
    desc: "Address Earth science and space exploration challenges using NASA open-source datasets.",
    color: "from-cyan-600/10 to-blue-600/10 border-cyan-500/20",
    badge: "Global",
  },
  {
    name: "Google Solution Challenge",
    tag: "UN SDGs & Cloud",
    desc: "Build solutions for UN Sustainable Development Goals using Google Cloud and web technologies.",
    color: "from-emerald-600/10 to-teal-600/10 border-emerald-500/20",
    badge: "Global",
  },
  {
    name: "Microsoft Imagine Cup",
    tag: "Cloud & Global Innovation",
    desc: "Transform startup ideas across Earth, Green Tech, Healthcare, and Education.",
    color: "from-purple-600/10 to-pink-600/10 border-purple-500/20",
    badge: "Global",
  },
  {
    name: "Open Innovation & Tech Hackathons",
    tag: "Emerging Tech & Web",
    desc: "Compete in cutting-edge builder hackathons, open-source challenges, and innovation sprints.",
    color: "from-amber-600/10 to-orange-600/10 border-amber-500/20",
    badge: "Open Tech",
  },
  {
    name: "College & Corporate Hackathons",
    tag: "Campus & Industry",
    desc: "Dominate tech fest hackathons at top IITs, NITs, universities, and corporate innovation challenges.",
    color: "from-rose-600/10 to-red-600/10 border-rose-500/20",
    badge: "Campus & Corporate",
  },
];

// Cohort Experience Cards
const experienceCards = [
  {
    title: "Live Interactive Sessions",
    desc: "Interactive cohort masterclasses, project teardowns, and tactical breakdown of past winning hackathon solutions.",
    icon: BookOpen,
    color: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Hands-on Building & Coding",
    desc: "Real-time collaborative pair coding, starter architecture kits, and production-grade code reviews.",
    icon: Code2,
    color: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Team Collaboration Hub",
    desc: "Access to private cohort Discord community, team finder network, resource vaults, and code snippet libraries.",
    icon: Users,
    color: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Expert Mentor Guidance",
    desc: "Weekly office hours with past SIH winners, startup founders, and senior engineers who critique your progress.",
    icon: Brain,
    color: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Realistic Mock Hackathons",
    desc: "Compete in timed simulation hackathons complete with countdown pressure, jury grilling, and scorecard breakdowns.",
    icon: Flame,
    color: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400",
  },
];

// Target Personas
const targetPersonas = [
  {
    title: "First-time Hackers",
    desc: "Students who have never participated in a hackathon before and want a clear, guided path to build their first MVP.",
    icon: GraduationCap,
  },
  {
    title: "Student Builders",
    desc: "Developers, coders, and UI designers who want to sharpen their rapid prototyping skills and build faster.",
    icon: Code2,
  },
  {
    title: "Existing Teams",
    desc: "Already formed hackathon teams wanting to refine their problem selection, pitch quality, and win top prizes.",
    icon: Users,
  },
  {
    title: "Tech & Product Enthusiasts",
    desc: "Engineers interested in leveraging modern stacks, web services, and full-stack templates to build high-scoring apps.",
    icon: Zap,
  },
  {
    title: "College Communities",
    desc: "Student clubs, E-Cells, and coding societies seeking structured cohort training for their campus members.",
    icon: BookOpen,
  },
];

// Tailored Cohort Program Offerings
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
  {
    name: "Custom Preparation Track",
    level: "1-on-1 Dedicated Team Track",
    desc: "Dedicated 1-on-1 sprint coaching for a specific upcoming hackathon final or national competition.",
    highlights: ["Targeted Problem Statement Review", "Custom MVP Audit & Refinement", "Slide Deck Polish & Scripting", "Direct Mentor Office Hours"],
    recommended: false,
  },
];

export default function HackathonCohort() {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);
  const [expandedMobilePhase, setExpandedMobilePhase] = useState<number | null>(0);

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

  const activePhase = roadmapPhases[selectedPhaseIndex];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 overflow-hidden border-b border-border/60">
        {/* Ambient Background Lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.08]">
                  YOUR HACKATHON <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-primary to-indigo-600 dark:from-amber-400 dark:via-primary dark:to-indigo-400">
                    STARTS BEFORE
                  </span>{" "}
                  THE HACKATHON.
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
                  href="#hackathon-roadmap"
                  className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-foreground border border-border bg-card hover:bg-accent/10 transition-colors duration-300 flex items-center gap-2"
                >
                  EXPLORE THE ROADMAP
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </motion.div>

              {/* Quick Pillars Badges */}
              <motion.div
                variants={fadeUp(4)}
                className="pt-6 grid grid-cols-3 gap-4 border-t border-border/60 max-w-lg"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">10 Phases</div>
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

            {/* Right Visual Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">COHORT_FRAMEWORK // ACTIVE</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                    FULL-STACK PIPELINE
                  </span>
                </div>

                {/* Node Network Graphic */}
                <div className="relative py-8 px-2 flex flex-col items-center justify-center space-y-6">
                  {/* Central Hub */}
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
                      Complete Hackathon Preparation Framework
                    </p>
                  </motion.div>

                  {/* Radiating Nodes */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-amber-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                        <Search className="h-4 w-4" />
                        <span>01. Discovery</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Problem decoding & user research</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-blue-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400 font-semibold text-xs">
                        <Compass className="h-4 w-4" />
                        <span>02. Strategy & MVP</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Architecture & feature game plan</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-purple-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-purple-600 dark:text-purple-400 font-semibold text-xs">
                        <Sparkles className="h-4 w-4" />
                        <span>03. Design & Code</span>
                      </div>
                      <p className="text-xs text-muted-foreground">UI/UX polish & sprint execution</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-emerald-500/50 transition-all text-left shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        <Presentation className="h-4 w-4" />
                        <span>04. Pitch & Demo</span>
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
      {/* 2. WHAT IS THE COHORT? SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 bg-card/40 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">
              MORE THAN TRAINING. A COMPLETE HACKATHON JOURNEY.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              What is the Aibility Hackathon Cohort?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Most teams fail hackathons not because they lack technical talent, but because they pick weak problem statements, build incomplete MVPs, or deliver unconvincing presentations. The Aibility Cohort solves this end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Team Formation & Skill Alignment</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with compatible builders. Form balanced squads combining technical coders, full-stack builders, UI designers, and strong pitch presenters.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Problem Statement Decoding</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Learn how to evaluate competition themes and problem statements to pick high-scoring, high-feasibility ideas that impress juries.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Work Smarter & Accelerate</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leverage modern developer workflows, API integrations, and smart tooling to build in 24 hours what used to take weeks.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Presentation className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pitch Deck & Demo Mastery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Design judge-focused slide decks, structure 3-minute pitch stories, and create flawless live demo walkthroughs.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">24-Hour Mock Simulation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Experience clock pressure and jury grilling before entering your actual competition so you are battle-tested and ready.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1-on-1 Mentor Audits</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get direct code reviews, slide deck feedback, and mock presentation grilling from experienced hackathon mentors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE HACKATHON ROADMAP (INTERACTIVE 10 PHASES) */}
      {/* ========================================================================= */}
      <section id="hackathon-roadmap" className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">
              ONE HACKATHON. TEN PHASES. ONE COMPLETE JOURNEY.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              THE HACKATHON ROADMAP
            </h2>
            <p className="text-xl font-semibold text-primary uppercase tracking-wide">
              FROM PROBLEM TO PITCH.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Every hackathon is different. The fundamentals of preparation remain the same.
            </p>
          </div>

          {/* DESKTOP ROADMAP NODE NAVIGATION (Hidden on mobile) */}
          <div className="hidden lg:block mb-12">
            <div className="grid grid-cols-5 gap-3 mb-3">
              {roadmapPhases.slice(0, 5).map((phase, idx) => {
                const isSelected = selectedPhaseIndex === idx;
                const IconComp = phase.icon;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseIndex(idx)}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                        : "border-border bg-card hover:bg-accent/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        {phase.id}
                      </span>
                      <IconComp className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="font-bold text-sm text-foreground">{phase.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{phase.tagline}</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-5 gap-3">
              {roadmapPhases.slice(5, 10).map((phase, idx) => {
                const actualIdx = idx + 5;
                const isSelected = selectedPhaseIndex === actualIdx;
                const IconComp = phase.icon;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseIndex(actualIdx)}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                        : "border-border bg-card hover:bg-accent/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        {phase.id}
                      </span>
                      <IconComp className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="font-bold text-sm text-foreground">{phase.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{phase.tagline}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESKTOP SELECTED PHASE DISPLAY CARD (Hidden on mobile) */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-2xl space-y-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-extrabold px-3 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      PHASE {activePhase.id}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground tracking-wide">
                      {activePhase.name}
                    </h3>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground italic">
                    "{activePhase.tagline}"
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Key Activities:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activePhase.activities.map((act, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 bg-background/80 p-3.5 rounded-xl border border-border/60"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Message Highlight for Phase 06 (Accelerate) */}
                {activePhase.message && (
                  <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm font-medium leading-relaxed">
                    <strong>Note:</strong> {activePhase.message}
                  </div>
                )}

                {/* Expected Output Box */}
                <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                      EXPECTED OUTPUT
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {activePhase.output}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Apply for Cohort &rarr;
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE EXPANDABLE VERTICAL TIMELINE ROADMAP (Visible on mobile & tablet) */}
          <div className="lg:hidden space-y-4">
            {roadmapPhases.map((phase, idx) => {
              const isExpanded = expandedMobilePhase === idx;
              const IconComp = phase.icon;
              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedMobilePhase(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded bg-amber-500/10">
                        {phase.id}
                      </span>
                      <div>
                        <div className="font-bold text-base text-foreground">{phase.name}</div>
                        <div className="text-xs text-muted-foreground">{phase.tagline}</div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 pt-2 border-t border-border/60 space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                            Key Activities:
                          </div>
                          <div className="space-y-2">
                            {phase.activities.map((act, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs text-foreground/90 bg-background/60 p-2.5 rounded-lg border border-border/60"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {phase.message && (
                          <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs font-medium text-indigo-900 dark:text-indigo-200">
                            {phase.message}
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                          <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                            EXPECTED OUTPUT
                          </div>
                          <div className="text-xs font-bold text-foreground">
                            {phase.output}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT YOU WILL LEARN (10 CARDS) SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/30 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">CURRICULUM FOCUS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              What You Will Learn
            </h2>
            <p className="text-muted-foreground text-base">
              10 specialized modules targeting the exact skills required to win competitive hackathons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {learningModules.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                    Module #{String(item.id).padStart(2, "0")}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ONE COHORT, MANY HACKATHONS SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">VERSATILE PREPARATION</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              One Cohort, Many Hackathons
            </h2>
            <p className="text-muted-foreground text-base">
              The cohort trains you for multiple high-stakes innovation competitions, both national and international.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonTargets.map((target) => (
              <motion.div
                key={target.name}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-2xl border bg-gradient-to-br ${target.color} backdrop-blur-sm space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-background/80 text-foreground border border-border">
                    {target.badge}
                  </span>
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{target.name}</h3>
                <p className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                  {target.tag}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{target.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Context Note */}
          <div className="mt-12 p-4 rounded-xl border border-border bg-card/60 text-center max-w-4xl mx-auto text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer & Context Note:</strong> Aibility Hackathon Cohort is an independent training and incubation program. Mention of specific hackathons (e.g. Smart India Hackathon, NASA Space Apps, Google Solution Challenge, Microsoft Imagine Cup) is purely for illustrative purposes to demonstrate target hackathon formats, problem types, and preparation scope, and does not imply official partnership, endorsement, or sponsorship by these entities.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COHORT EXPERIENCE SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/30 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">IMMERSIVE ENVIRONMENT</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              The Cohort Experience
            </h2>
            <p className="text-muted-foreground text-base">
              Interactive building formats structured to maximize collaboration and practical learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-2xl border ${card.color} transition-all space-y-4 shadow-sm`}
                >
                  <div className="h-12 w-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HACKATHON SIMULATION SPOTLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-primary-foreground p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

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
                  Don't let your first high-pressure pitch happen at the official hackathon. Our cohort culminates in a <strong>24-Hour Mock Hackathon Simulation</strong> where your team builds, debugs, presents to a live jury, and faces realistic Q&A grilling.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <Clock className="h-5 w-5 text-amber-400 mb-2" />
                    <div className="font-bold text-sm">24-Hour Clock</div>
                    <div className="text-xs text-primary-foreground/70">Timed sprint pressure</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <Presentation className="h-5 w-5 text-amber-400 mb-2" />
                    <div className="font-bold text-sm">Live Jury Panel</div>
                    <div className="text-xs text-primary-foreground/70">Mock pitch presentation</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <Shield className="h-5 w-5 text-amber-400 mb-2" />
                    <div className="font-bold text-sm">Q&A Grilling</div>
                    <div className="text-xs text-primary-foreground/70">Technical defense audit</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Trophy className="h-16 w-16 text-amber-400 mb-4 animate-bounce" />
                <h3 className="font-bold text-xl mb-2">Simulated Scorecard</h3>
                <p className="text-xs text-primary-foreground/80 mb-6">
                  Get explicit numerical scoring on Feasibility, Tech Complexity, UI/UX, and Pitch Delivery.
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
      {/* 8. WHO SHOULD JOIN? SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/30 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">ELIGIBILITY & PERSONAS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Who Should Join?
            </h2>
            <p className="text-muted-foreground text-base">
              Whether you are an individual developer or an intact team, the cohort adapts to your level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {targetPersonas.map((persona) => {
              const IconComponent = persona.icon;
              return (
                <motion.div
                  key={persona.title}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary transition-all text-left space-y-3"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-base text-foreground">{persona.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{persona.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. COHORT PROGRAMS SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">TAILORED TRACKS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Cohort Program Tracks
            </h2>
            <p className="text-muted-foreground text-base">
              Choose the program track that best fits your goals and current expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cohortPrograms.map((prog) => (
              <motion.div
                key={prog.name}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-2xl border transition-all flex flex-col justify-between relative ${
                  prog.recommended
                    ? "border-amber-500 bg-card shadow-xl ring-2 ring-amber-500/20"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                {prog.recommended && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                    {prog.level}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">{prog.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prog.desc}</p>

                  <div className="pt-4 border-t border-border/60 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Track Highlights:
                    </span>
                    {prog.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, programInterest: prog.name }));
                      setIsModalOpen(true);
                    }}
                    className={`w-full py-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      prog.recommended
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Apply for {prog.name} &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FEATURED WORKSHOP HIGHLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/40 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="eyebrow text-amber-600 dark:text-amber-400">FEATURED SPECIAL WORKSHOP</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                FIRST HACKATHON SURVIVAL TRAINING
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                An intensive kickoff masterclass focused on the <strong>winning formula for hackathon newcomers</strong>. Learn the 7 critical mistakes that disqualify 80% of teams before judging even starts.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Problem Statement Selection Secrets
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  30-Minute MVP Scope Boundary Formula
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  15-Second Slide Deck Hook Design
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Live Judge Q&A Defense Tactics
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-background border border-border text-center space-y-4">
              <Sparkles className="h-10 w-10 text-amber-500" />
              <div className="font-bold text-base">Register Campus Workshop</div>
              <p className="text-xs text-muted-foreground">
                Want to bring this workshop to your college or student club?
              </p>
              <button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    programInterest: "Campus Workshop Request",
                  }));
                  setIsModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90"
              >
                Request Workshop &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. WHY AIBILITY? SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow text-amber-600 dark:text-amber-400">THE AIBILITY ADVANTAGE</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Why Aibility Hackathon Cohort?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-amber-500">01</div>
              <h3 className="font-bold text-base">Practical & Hands-On</h3>
              <p className="text-xs text-muted-foreground">100% project building. Zero theoretical lectures.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-blue-500">02</div>
              <h3 className="font-bold text-base">Smart Workflows</h3>
              <p className="text-xs text-muted-foreground">Build faster with modern developer tools and API contracts.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-purple-500">03</div>
              <h3 className="font-bold text-base">Structured Roadmap</h3>
              <p className="text-xs text-muted-foreground">10 clear phases from problem discovery to final presentation.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-emerald-500">04</div>
              <h3 className="font-bold text-base">Collaborative Network</h3>
              <p className="text-xs text-muted-foreground">Join an active builder community of ambitious hackers.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-rose-500">05</div>
              <h3 className="font-bold text-base">Tested Strategies</h3>
              <p className="text-xs text-muted-foreground">Refined frameworks derived from winning hackathon solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL CTA SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-card/60 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center space-y-8">
          <span className="eyebrow text-amber-600 dark:text-amber-400">READY TO BUILD & COMPETE?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase">
            YOUR NEXT HACKATHON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-primary">
              STARTS HERE.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-medium">
            FROM THE FIRST PROBLEM STATEMENT TO THE FINAL PRESENTATION. <br className="hidden sm:inline" />
            <span className="text-foreground font-bold">WE PREPARE YOU FOR THE JOURNEY IN BETWEEN.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl text-sm font-bold tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 shadow-xl transition-all flex items-center gap-3"
            >
              JOIN THE NEXT COHORT
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
      {/* APPLICATION / INQUIRY MODAL */}
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
