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
  Layers,
  Flame,
  Award,
  BookOpen,
  GraduationCap,
  MessageSquare,
  X,
  Send,
  Loader2,
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

// Configurable Cohort Timeline Data (Easily expandable/modifiable)
const cohortTimeline = [
  {
    weeks: "Week 01 - 02",
    phase: "Phase 1: Discovery & Alignment",
    title: "Foundation, Team Alignment & Hackathon Selection",
    icon: Users,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-600 dark:text-blue-400",
    description: "Understand hackathon dynamics, form cross-functional teams, choose target competitions (SIH, Global, AI), and decode winning problem statements.",
    milestones: [
      "Hackathon ecosystem overview & judging mechanics",
      "Skill mapping & team matching (Dev + UI + AI + Pitch)",
      "Problem statement selection matrix & market validation",
      "Goal setting & target hackathon roadmap creation",
    ],
  },
  {
    weeks: "Week 03 - 04",
    phase: "Phase 2: Ideation & System Design",
    title: "Ideation, Problem Refinement & Tech Architecture",
    icon: Brain,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    accentColor: "text-purple-600 dark:text-purple-400",
    description: "Transform raw ideas into high-scoring problem formulations. Design system architecture, component schemas, and define your Unique Value Proposition (UVP).",
    milestones: [
      "10x innovation framing & UVP definition",
      "System architecture & tech stack selection (AI/Web/Mobile)",
      "Database schema & API contract design",
      "Feasibility testing & MVP scope boundary setting",
    ],
  },
  {
    weeks: "Week 05 - 06",
    phase: "Phase 3: Rapid Execution",
    title: "Rapid Prototyping, AI-First Building & MVP Development",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-600 dark:text-amber-400",
    description: "Build 5x faster using modern AI-assisted coding tools, component libraries, pre-built backend integrations, and clean user interfaces.",
    milestones: [
      "AI-assisted code generation & rapid scaffolding",
      "Core MVP feature development & API integrations",
      "Polished UI/UX design & micro-interactions",
      "Deployment to live staging URLs with zero downtime",
    ],
  },
  {
    weeks: "Week 07",
    phase: "Phase 4: Pitch & Storytelling",
    title: "Presentation, PPT/Demo Creation & Storytelling",
    icon: Presentation,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    description: "Craft judge-ready 3-minute pitch decks, compelling video walkthroughs, and high-impact demo scripts that captivate juries instantly.",
    milestones: [
      "Judge-aligned 10-slide deck design",
      "The 3-minute high-converting pitch narrative formula",
      "Screen recording, video editing & demo walkthroughs",
      "Interactive prototype polish & backup fail-safes",
    ],
  },
  {
    weeks: "Week 08",
    phase: "Phase 5: Competition Readiness",
    title: "Mock Hackathon Simulation & Jury Review",
    icon: Trophy,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-600 dark:text-amber-400",
    description: "Experience a 24-hour mock hackathon under clock pressure. Present live to expert mentors, defend tech choices under grilling Q&A, and finalize submission.",
    milestones: [
      "Timed 24-hour mock hackathon simulation",
      "Live presentation to external mentor jury panel",
      "Technical defense Q&A grilling session",
      "Final submission package (GitHub + README + Deck + Video)",
    ],
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
    desc: "Develop 10x solutions using novelty matrices and market gap analysis so your project stands out immediately.",
    icon: Lightbulb,
    badge: "Innovation",
  },
  {
    id: 3,
    title: "Team Strategy & Role Allocation",
    desc: "Structure roles cleanly across tech lead, frontend builder, AI developer, and pitch presenter for maximum output.",
    icon: Users,
    badge: "Leadership",
  },
  {
    id: 4,
    title: "Rapid Prototyping & Architecture",
    desc: "Design scalable system architectures and working MVPs that can be coded cleanly in under 24-48 hours.",
    icon: Layers,
    badge: "Engineering",
  },
  {
    id: 5,
    title: "AI-Powered Speed Development",
    desc: "Leverage LLMs, code assistance tools, and automated backend generators to build 5x faster than traditional teams.",
    icon: Zap,
    badge: "AI Native",
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
    desc: "Build solutions for UN Sustainable Development Goals using Google Cloud, Firebase, and AI technologies.",
    color: "from-emerald-600/10 to-teal-600/10 border-emerald-500/20",
    badge: "Global",
  },
  {
    name: "Microsoft Imagine Cup",
    tag: "AI & Azure Innovation",
    desc: "Transform startup ideas across Earth, Green Tech, Healthcare, and Education using Azure AI.",
    color: "from-purple-600/10 to-pink-600/10 border-purple-500/20",
    badge: "Global",
  },
  {
    name: "AI & Open-Source Hackathons",
    tag: "Agentic AI & LLMs",
    desc: "Compete in cutting-edge AI builder hackathons, model fine-tuning competitions, and agentic challenges.",
    color: "from-amber-600/10 to-orange-600/10 border-amber-500/20",
    badge: "AI Native",
  },
  {
    name: "College & Corporate Hackathons",
    tag: "Campus & Industry",
    desc: "Dominate tech fest hackathons at top IITs, NITs, universities, and corporate innovation hackathons.",
    color: "from-rose-600/10 to-red-600/10 border-rose-500/20",
    badge: "Campus & Corporate",
  },
];

// Cohort Experience Cards
const experienceCards = [
  {
    title: "Live Interactive Sessions",
    desc: "Weekly live cohort masterclasses, project teardowns, and interactive breakdown of past winning hackathon solutions.",
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
    desc: "Weekly office hours with past SIH winners, startup founders, and senior AI engineers who critique your progress.",
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
    title: "AI Enthusiasts",
    desc: "Engineers interested in leveraging AI APIs, LLM agents, and full-stack AI templates to build high-scoring apps.",
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
    highlights: ["Team Formation & Matching", "Problem Selection Basics", "AI Scaffolding Starter Kits", "First Mock Hackathon"],
    recommended: false,
  },
  {
    name: "AI Hackathon Cohort",
    level: "AI-Native Track",
    desc: "Designed for builders eager to create AI-first solutions: LLMs, RAG pipelines, vision models, and agentic workflows.",
    highlights: ["AI APIs & Agent Architectures", "Rapid UI + AI Integration", "RAG & Vector Database Setup", "AI Jury Presentation"],
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
  const [selectedWeek, setSelectedWeek] = useState(0);
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
    programInterest: "AI Hackathon Cohort",
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
      programInterest: "AI Hackathon Cohort",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 overflow-hidden border-b border-border/60">
        {/* Ambient Glow & Grid Background */}
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
                Aibility Hackathon Cohort is a structured training program where students join as a cohort and are guided through the <strong>COMPLETE hackathon journey</strong> — from team formation and problem statement selection to rapid AI building, judge-ready slide decks, and live demo defense.
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
                  href="#cohort-journey"
                  className="px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide text-foreground border border-border bg-card hover:bg-accent/10 transition-colors duration-300 flex items-center gap-2"
                >
                  EXPLORE THE PROGRAM
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </motion.div>

              {/* Quick Stat Badges */}
              <motion.div
                variants={fadeUp(4)}
                className="pt-6 grid grid-cols-3 gap-4 border-t border-border/60 max-w-lg"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">8 Weeks</div>
                  <div className="text-xs text-muted-foreground">Structured Roadmap</div>
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

            {/* Right Interactive Visual: Connected Builder Network Node Graphic */}
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
                    <span className="text-xs font-mono text-muted-foreground">COHORT_NETWORK // ACTIVE</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                    AI-FIRST PIPELINE
                  </span>
                </div>

                {/* Interactive Node Graph */}
                <div className="relative py-8 px-2 flex flex-col items-center justify-center space-y-6">
                  {/* Central Node */}
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
                      Central Guidance & Competition Accelerator
                    </p>
                  </motion.div>

                  {/* Radiating Nodes Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-amber-500/50 transition-all text-left group/node shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                        <Brain className="h-4 w-4" />
                        <span>01. Ideation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Problem decoding & UVP matrix</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-blue-500/50 transition-all text-left group/node shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400 font-semibold text-xs">
                        <Zap className="h-4 w-4" />
                        <span>02. AI Building</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rapid code & API integration</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-purple-500/50 transition-all text-left group/node shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-purple-600 dark:text-purple-400 font-semibold text-xs">
                        <Sparkles className="h-4 w-4" />
                        <span>03. UI/UX MVP</span>
                      </div>
                      <p className="text-xs text-muted-foreground">High-impact live interfaces</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-background/80 hover:border-emerald-500/50 transition-all text-left group/node shadow-sm">
                      <div className="flex items-center gap-2 mb-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        <Presentation className="h-4 w-4" />
                        <span>04. Pitch Defense</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Judge Q&A & slide decks</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Targeted Competitions: SIH, Space Apps, Imagine Cup & AI Hacks</span>
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
              Most students fail hackathons not because they lack coding skill, but because they pick weak problem statements, build incomplete MVPs, or deliver unconvincing pitches. The Aibility Cohort solves this end-to-end.
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
                Connect with compatible builders. Form balanced squads combining technical coders, AI engineers, UI designers, and strong presenters.
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
              <h3 className="text-xl font-bold mb-3">AI-First Speed Acceleration</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Master modern AI tools, LLM APIs, and rapid prototyping workflows to build in 24 hours what used to take weeks.
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
                Design judge-focused 10-slide decks, structure 3-minute pitch stories, and create flawless live demo walkthroughs.
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
      {/* 3. THE COHORT JOURNEY (TIMELINE) SECTION */}
      {/* ========================================================================= */}
      <section id="cohort-journey" className="py-24 relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="eyebrow text-amber-600 dark:text-amber-400">STRUCTURED ROADMAP</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
                The Cohort Journey
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                A step-by-step 8-week structured roadmap (configurable duration) designed to take you from zero idea to competition-winning team.
              </p>
            </div>

            {/* Timeline Week Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {cohortTimeline.map((item, idx) => (
                <button
                  key={item.weeks}
                  onClick={() => setSelectedWeek(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    selectedWeek === idx
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.weeks}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Week Detailed Card View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Week List Navigation */}
            <div className="lg:col-span-5 space-y-4">
              {cohortTimeline.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = selectedWeek === idx;
                return (
                  <motion.div
                    key={item.weeks}
                    onClick={() => setSelectedWeek(idx)}
                    whileHover={{ x: 4 }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card/60 hover:bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-lg border bg-background ${
                            isSelected ? "border-primary text-primary" : "border-border text-muted-foreground"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                            {item.weeks}
                          </span>
                          <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          isSelected ? "rotate-90 text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Stage Detail Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWeek}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-2xl border border-border bg-card shadow-xl space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                      {cohortTimeline[selectedWeek].phase}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {cohortTimeline[selectedWeek].weeks}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">
                    {cohortTimeline[selectedWeek].title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cohortTimeline[selectedWeek].description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Key Deliverables & Milestones:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cohortTimeline[selectedWeek].milestones.map((m, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/90 bg-background/60 p-3 rounded-lg border border-border/60">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Ready for this stage?</span>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2 rounded-lg text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                    >
                      Join Next Cohort &rarr;
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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

          {/* Organization Disclaimer Note */}
          <div className="mt-12 p-4 rounded-xl border border-border bg-card/60 text-center max-w-4xl mx-auto text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer & Context Note:</strong> Aibility Hackathon Cohort is an independent training and incubation program. Mention of specific hackathons (e.g. Smart India Hackathon, NASA Space Apps, Google Solution Challenge, Microsoft Imagine Cup) is purely for illustrative purposes to demonstrate target hackathon formats, problem types, and preparation scope, and does not imply official partnership, endorsement, or sponsorship by these entities.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COHORT EXPERIENCE (5 INTERACTIVE CARDS) SECTION */}
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
            {experienceCards.map((card, idx) => {
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
              <h3 className="font-bold text-base">AI-First Approach</h3>
              <p className="text-xs text-muted-foreground">Build 5x faster using state-of-the-art AI developer tools.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="font-mono text-2xl font-bold text-purple-500">03</div>
              <h3 className="font-bold text-base">Structured Roadmap</h3>
              <p className="text-xs text-muted-foreground">Clear weekly objectives from ideation to final submission.</p>
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
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Stop guessing. Join the Aibility Hackathon Cohort, build with experienced mentors, and enter your next competition ready to win.
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
                          <option value="AI Engineer">AI / ML Engineer</option>
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
                          <option value="AI Hackathon Cohort">AI Hackathon Cohort</option>
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
