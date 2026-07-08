import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { services as fallbackServices } from "../data/services";
import { testimonials as fallbackTestimonials } from "../data/testimonials";
import { projects as fallbackProjects } from "../data/projects";
import { faqItems } from "../data/faq";
import { getImageUrl } from "../lib/utils";
import * as Icons from "lucide-react";
import { ThreeHero } from "../components/home/ThreeHero";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

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
  
  // Load site settings and CMS content from Convex CMS (with fallback to defaults)
  const siteSettings = useQuery(api.cms.getAllSiteSettings);
  const settings = siteSettings ?? {};

  const cmsServices = useQuery(api.cms.listServices);
  const cmsProjects = useQuery(api.cms.listProjects);
  const cmsTestimonials = useQuery(api.cms.listTestimonials);

  const displayServices = cmsServices !== undefined ? cmsServices : fallbackServices;
  const displayProjects = cmsProjects !== undefined ? cmsProjects : fallbackProjects;
  const displayTestimonials = cmsTestimonials !== undefined ? cmsTestimonials : fallbackTestimonials;
  
  const companyTagline = settings.company_tagline ?? "AI-First Software Company";
  const heroTitle = settings.hero_title ?? "We Build the Future of Software";
  const heroAccent = settings.hero_title_accent ?? "Future";
  const heroSubtitle = settings.hero_subtitle ?? "We design and develop AI-first websites, mobile apps, SaaS platforms, and enterprise software that transform businesses.";
  const ctaPrimary = settings.hero_cta_primary ?? "Start Your Project";
  const ctaSecondary = settings.hero_cta_secondary ?? "View Our Work";
  const ctaPrimaryLink = settings.hero_cta_primary_link ?? "/contact";
  const ctaSecondaryLink = settings.hero_cta_secondary_link ?? "/portfolio";
  const servicesTitle = settings.services_title ?? "What We Build";
  const servicesSubtitle = settings.services_subtitle ?? "From AI-powered platforms to elegant websites, we deliver end-to-end digital solutions.";
  const portfolioTitle = settings.portfolio_title ?? "Featured Projects";
  const portfolioSubtitle = settings.portfolio_subtitle ?? "Showcasing our best work across industries and technologies.";
  const aboutLink = settings.about_headline ?? "About Us";
  const trustedCompanies = (settings.trusted_companies ?? "NexusAI, DataStream, ShopWave, MediView, GreenLife").split(", ");

  return (
    <div className="bg-background">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Geometric Background */}
        <ThreeHero />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2D] via-[#0F1B2D]/95 to-[#0F1B2D]/85 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-transparent to-transparent z-[1]" />

        {/* Animated gold line accent above hero */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 w-32 h-px bg-gold/40 z-10 origin-left"
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs tracking-[0.15em] uppercase font-semibold text-white/50 mb-6"
              >
                {companyTagline}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-editorial-lg mb-8 text-white"
              >
                {heroTitle.includes(heroAccent) ? (
                  (() => {
                    const [before, after] = heroTitle.split(heroAccent);
                    const parts = before.split("\n");
                    return (
                      <>
                        {parts[0]}
                        {parts.length > 1 && <><br />{parts[1]}</>}
                        <span className="text-gold">{heroAccent}</span>
                        {after}
                      </>
                    );
                  })()
                ) : (
                  heroTitle
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10"
              >
                {heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link
                  to={ctaPrimaryLink}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-300"
                >
                  {ctaPrimary}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to={ctaSecondaryLink}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide font-medium text-white/80 border border-white/20 hover:border-white/50 transition-colors duration-300"
                >
                  {ctaSecondary}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-20"
              >
                <p className="text-xs tracking-[0.15em] uppercase font-semibold text-white/50 mb-6">Trusted By</p>
                <div className="flex flex-wrap gap-10 md:gap-14">
                  {trustedCompanies.map((name) => (
                    <span key={name} className="text-sm font-semibold tracking-wide text-white/40">
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
            <span className="text-[10px] tracking-widest uppercase text-white/30">Scroll</span>
            <div className="h-6 w-px bg-white/20" />
          </motion.div>
        </motion.div>

        {/* Bottom decorative gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* ===== SHOWCASE STRIP ===== */}
      <section className="bg-[#0F1B2D] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayProjects.slice(0, 4).map((project: any) => (
              <motion.a
                key={project._id || project.id}
                href={project._id ? `/portfolio?project=${project._id}` : project.liveUrl || "#"}
                className="aspect-[4/5] relative group overflow-hidden border border-white/5 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] to-transparent" />
                <p className="absolute bottom-2 left-3 text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                  {project.title}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>



      {/* ===== SERVICES ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Our Services</SectionLabel>
            <SectionTitle>{servicesTitle}</SectionTitle>
            <SectionDescription>
              {servicesSubtitle}
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {displayServices.slice(0, 6).map((service: any, i: number) => {
              const Icon = typeof service.icon === "string"
                ? (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle)
                : service.icon;
              const serviceId = service._id || service.id;
              return (
                <motion.div
                  key={serviceId}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-background p-8 md:p-10 group"
                >
                  <Link to={`/services#${serviceId}`} className="block">
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

      {/* ===== WHY AIBILITY ===== */}
      <section className="py-20 md:py-28 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <SectionLabel>Why Aibility</SectionLabel>
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
            <SectionTitle>{portfolioTitle}</SectionTitle>
            <SectionDescription>
              {portfolioSubtitle}
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {displayProjects.slice(0, 6).map((project: any, i: number) => {
              const projectId = project._id || project.id;
              return (
                <motion.div
                  key={projectId}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-card p-8 md:p-10 group"
                >
                  <Link to={project._id ? `/portfolio?project=${project._id}` : `/portfolio#${project.id}`} className="block group">
                    <div className="relative overflow-hidden mb-5 bg-background/50 border border-border">
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-sm font-semibold text-white">{project.title}</p>
                        <p className="text-xs text-white/70 mt-0.5">{project.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-[11px] text-muted-foreground uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
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
            {displayTestimonials.slice(0, 3).map((t: any, i: number) => (
              <motion.div
                key={t._id || t.name}
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
                <div className="flex items-center gap-3">
                  <img
                    src={getImageUrl(t.avatar)}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
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
