import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { services } from "../data/services";
import { stats } from "../data/stats";
import { testimonials } from "../data/testimonials";
import { projects } from "../data/projects";
import { faqItems } from "../data/faq";
import { AnimatedCounter } from "../components/shared/AnimatedCounter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="eyebrow mb-5"
    >
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-editorial mb-6"
    >
      {children}
    </motion.h2>
  );
}

function SectionDescription({ children }: { children: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed"
    >
      {children}
    </motion.p>
  );
}

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div className="bg-background">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="w-full pt-24 pb-20 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="eyebrow mb-6"
              >
                AI-First Software Company
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-editorial-lg mb-8"
              >
                We Build the
                <br />
                <span className="text-gold">Future</span> of Software
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed mb-10"
              >
                We design and develop AI-first websites, mobile apps, SaaS platforms, 
                and enterprise software that transform businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-300"
                >
                  Start Your Project
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide font-medium text-foreground border border-border hover:border-foreground/30 transition-colors duration-300"
                >
                  View Our Work
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-20"
              >
                <p className="eyebrow mb-6">Trusted By</p>
                <div className="flex flex-wrap gap-10 md:gap-14">
                  {["NexusAI", "DataStream", "ShopWave", "MediView", "GreenLife"].map((name) => (
                    <span key={name} className="text-sm font-semibold tracking-wide text-muted-foreground">
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
            <div className="h-6 w-px bg-border" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="border border-border p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1.5">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Our Services</SectionLabel>
            <SectionTitle>What We Build</SectionTitle>
            <SectionDescription>
              From AI-powered platforms to elegant websites, we deliver end-to-end digital solutions.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.slice(0, 6).map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-background p-8 md:p-10 group"
                >
                  <Link to={`/services#${service.id}`} className="block">
                    <Icon className="h-6 w-6 text-gold mb-5" />
                    <h3 className="text-lg font-semibold mb-2.5 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="text-xs tracking-wider uppercase text-muted-foreground group-hover:text-gold transition-colors duration-300 flex items-center gap-1">
                      Learn More <ChevronRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm tracking-wide font-medium text-foreground border-b border-border hover:border-foreground/50 transition-colors duration-300 pb-0.5"
            >
              View All Services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY ABILITY ===== */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Why Ability</SectionLabel>
            <SectionTitle>Built Different</SectionTitle>
            <SectionDescription>
              We combine cutting-edge AI with exceptional design to deliver software that stands out.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "AI-First Approach",
                description: "Every solution we build leverages AI to deliver smarter, faster, and more personalized experiences.",
              },
              {
                title: "Design Excellence",
                description: "Our designs are crafted with precision, combining aesthetics with usability for unforgettable experiences.",
              },
              {
                title: "Technical Mastery",
                description: "Modern tech stack, clean architecture, and scalable infrastructure built by expert engineers.",
              },
              {
                title: "Results-Driven",
                description: "We measure success by the impact we create: growth, efficiency, and user satisfaction.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="border border-border p-8 md:p-10 editorial-card"
              >
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Work</SectionTitle>
            <SectionDescription>
              A proven methodology that delivers exceptional results, every time.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { step: "01", title: "Discover", description: "We dive deep into your business, goals, and vision." },
              { step: "02", title: "Design", description: "We craft beautiful, user-centered designs." },
              { step: "03", title: "Build", description: "We develop using modern stacks with agile sprints." },
              { step: "04", title: "Launch", description: "We deploy, test, and optimize for a flawless launch." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-10"
              >
                <span className="text-2xl font-bold text-gold mb-4 block">{item.step}</span>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Portfolio</SectionLabel>
            <SectionTitle>Featured Projects</SectionTitle>
            <SectionDescription>
              Showcasing our best work across industries and technologies.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-card p-8 md:p-10 group"
              >
                <Link to={`/portfolio#${project.id}`} className="block">
                  <div className="border border-border p-6 mb-5 bg-background/50">
                    <p className="text-sm font-semibold">{project.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{project.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm tracking-wide font-medium text-foreground border-b border-border hover:border-foreground/50 transition-colors duration-300 pb-0.5"
            >
              View All Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionTitle>What Our Clients Say</SectionTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-background p-8 md:p-10"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-20 md:py-28 bg-card border-y border-border">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>

          <div className="divide-y divide-border">
            {faqItems.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <details className="group py-5 cursor-pointer">
                  <summary className="flex items-center justify-between list-none">
                    <span className="text-sm font-medium pr-4">{item.question}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="pt-4 pb-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="border border-border p-10 md:p-16 text-center max-w-3xl mx-auto"
          >
            <p className="eyebrow mb-5">Get in Touch</p>
            <h2 className="text-editorial-sm mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
              Let&apos;s discuss your project and explore how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-wide font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-300"
              >
                Start Your Project <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-wide font-medium text-foreground border border-border hover:border-foreground/30 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
