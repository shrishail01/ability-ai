import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Star,
  Play,
} from "lucide-react";
import { Link } from "react-router";
import { services } from "../data/services";
import { stats } from "../data/stats";
import { testimonials } from "../data/testimonials";
import { projects } from "../data/projects";
import { faqItems } from "../data/faq";
import { pricingPlans } from "../data/pricing";
import { AnimatedCounter } from "../components/shared/AnimatedCounter";
import { Newsletter } from "../components/shared/Newsletter";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
          <Sparkles className="h-3 w-3" />
          {label}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// Aurora Hero Background Component
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: "-15s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] animate-aurora" style={{ animationDelay: "-30s" }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            x: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AuroraBackground />
        <FloatingParticles />
        
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                AI-First Software Company
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
            >
              We Build the{" "}
              <span className="text-gradient">Future</span>
              <br />
              of Software
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              We design and develop AI-first websites, mobile apps, SaaS platforms, 
              and enterprise software that transform businesses and delight users.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-primary/80 to-purple-500 animate-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                <Play className="h-4 w-4" />
                View Our Work
              </Link>
            </motion.div>

            {/* Trusted by / Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
                Trusted by Innovative Companies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
                {["NexusAI", "DataStream", "ShopWave", "MediView", "GreenLife"].map(
                  (name) => (
                    <span
                      key={name}
                      className="text-sm font-bold tracking-tight text-foreground"
                    >
                      {name}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Scroll</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-10 md:p-16 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-5xl font-bold text-gradient mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title="What We Build"
            description="From AI-powered platforms to stunning websites, we deliver end-to-end digital solutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <Link
                    to={`/services#${service.id}`}
                    className="block h-full glass-card rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${service.color}15`, color: service.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ChevronRight className="h-3 w-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/5 transition-all"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY ABILITY ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Ability"
            title="Built Different"
            description="We combine cutting-edge AI with exceptional design to deliver software that stands out."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-First Approach",
                description: "Every solution we build leverages AI to deliver smarter, faster, and more personalized experiences.",
                color: "#0066FF",
              },
              {
                title: "Design Excellence",
                description: "Our designs are crafted with precision, combining aesthetics with usability for unforgettable experiences.",
                color: "#7C3AED",
              },
              {
                title: "Technical Mastery",
                description: "Modern tech stack, clean architecture, and scalable infrastructure built by expert engineers.",
                color: "#00D4FF",
              },
              {
                title: "Results-Driven",
                description: "We measure success by the impact we create: growth, efficiency, and user satisfaction.",
                color: "#A78BFA",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                  style={{ background: `${item.color}15` }}
                >
                  <CheckCircle2 className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Process"
            title="How We Work"
            description="A proven methodology that delivers exceptional results, every time."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discover",
                description: "We dive deep into your business, goals, and vision to lay the foundation.",
              },
              {
                step: "02",
                title: "Design",
                description: "We craft beautiful, user-centered designs that align with your brand.",
              },
              {
                step: "03",
                title: "Build",
                description: "We develop using modern stacks, with agile sprints and continuous delivery.",
              },
              {
                step: "04",
                title: "Launch",
                description: "We deploy, test, and optimize to ensure a flawless launch and beyond.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center group"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            description="Showcasing our best work across industries and technologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={`/portfolio#${project.id}`}
                  className="block glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  {/* Project Image Placeholder */}
                  <div
                    className="h-48 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}
                  >
                    <div className="text-center p-6">
                      <p className="text-lg font-bold text-foreground/80">{project.title}</p>
                      <span
                        className="inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium"
                        style={{ background: `${project.color}20`, color: project.color }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-sm font-medium flex items-center gap-1">
                        View Project <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/5 transition-all"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Don't take our word for it. Here's what our clients have to say."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 border border-white/5"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${i === 0 ? "#0066FF" : i === 1 ? "#7C3AED" : "#00D4FF"}, ${i === 0 ? "#4D94FF" : i === 1 ? "#A78BFA" : "#4D94FF"})` }}
                  >
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Pricing"
            title="Simple, Transparent Pricing"
            description="Choose the plan that fits your project. All plans include our quality guarantee."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative glass-card rounded-2xl p-8 border ${
                  plan.highlighted
                    ? "border-primary/30 shadow-xl shadow-primary/10"
                    : "border-white/5"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center rounded-xl py-3 text-sm font-medium transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:shadow-lg hover:shadow-primary/25"
                      : "border border-white/10 text-foreground hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Got questions? We've got answers."
          />

          <div className="space-y-4">
            {faqItems.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl overflow-hidden border border-white/5 group"
              >
                <details className="group/details">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-sm font-medium pr-4">{item.question}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open/details:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-purple-500/10 border border-primary/20 p-10 md:p-16 text-center"
          >
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Ready to Build the{" "}
                <span className="text-gradient">Future</span>?
              </h2>
              <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
                Let's discuss your project and explore how we can bring your vision to life.
                Free consultation, no strings attached.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 text-sm font-medium text-foreground hover:bg-white/5 transition-all"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
