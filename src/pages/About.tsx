import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Users,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { getImageUrl } from "../lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible with technology.",
    color: "#0066FF",
  },
  {
    icon: Shield,
    title: "Quality Obsession",
    description: "Every line of code, every pixel, every interaction is crafted with care.",
    color: "#7C3AED",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We don't just build for you—we build with you, as true partners.",
    color: "#00D4FF",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Every decision starts with the end-user experience and their needs.",
    color: "#A78BFA",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We build software that makes a difference, reaching users worldwide.",
    color: "#4D94FF",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by the tangible business impact we create.",
    color: "#0066FF",
  },
];

const defaultTimeline = [
  { year: "2020", event: "Aibility founded" },
  { year: "2022", event: "First major client project" },
  { year: "2024", event: "Expanded to global markets" },
  { year: "2026", event: "Industry recognition" },
];

export default function About() {
  const cmsTeam = useQuery(api.cms.listTeamMembers);
  const teamMembers = (cmsTeam && cmsTeam.length > 0) ? cmsTeam : [];
  
  const siteSettings = useQuery(api.cms.getAllSiteSettings);
  const settings = siteSettings ?? {};
  const aboutHeadline = settings.about_headline ?? "We're on a Mission to Redefine Software";
  const aboutStory = settings.about_story ?? "Founded, Aibility has grown from a small team into a leading AI-first software company.";
  
  // Parse timeline from CMS settings
  let timeline = defaultTimeline;
  try {
    if (settings.timeline_events) {
      const parsed = JSON.parse(settings.timeline_events);
      if (Array.isArray(parsed) && parsed.length > 0) {
        timeline = parsed;
      }
    }
  } catch (e) {
    // Use default if JSON is invalid
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              About Us
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {aboutHeadline.includes(" ") ? (
              <>{aboutHeadline.split("to").length > 1 ? (
                <>{aboutHeadline.split("to")[0]}to <span className="text-gradient">{aboutHeadline.split("to")[1]}</span></>
              ) : (
                aboutHeadline
              )}</>
            ) : (
              aboutHeadline
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {aboutStory}
          </motion.p>
        </div>
      </section>

      {/* Story, Vision, Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                content: "To be the world's most trusted partner for AI-first software development, setting the standard for innovation, quality, and user experience.",
                color: "#0066FF",
              },
              {
                icon: Target,
                title: "Our Mission",
                content: "Empower businesses with cutting-edge AI and software solutions that drive growth, efficiency, and exceptional user experiences.",
                color: "#7C3AED",
              },
              {
                icon: Heart,
                title: "Our Purpose",
                content: "Make sophisticated technology accessible and impactful for every business, regardless of size or industry.",
                color: "#00D4FF",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 border border-white/5"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              These principles guide every decision we make and every project we deliver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ background: `${value.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-sm">
              From startup to industry leader — our story so far.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-purple-500 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                    <span className="text-xs font-bold text-primary">{item.year}</span>
                    <p className="text-sm text-muted-foreground mt-1">{item.event}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground text-sm">
              Talented people building the future of software.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member: any, i: number) => {
              // Normalize CMS and static data shapes
              const socials = member.socials || { twitter: member.twitter, linkedin: member.linkedin, github: member.github };
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-6 border border-white/5 text-center group"
                >
                  <div className="mx-auto h-20 w-20 rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    {socials.twitter && (
                      <a href={socials.twitter} className="text-muted-foreground hover:text-primary transition-colors text-xs">
                        Twitter
                      </a>
                    )}
                    {socials.linkedin && (
                      <a href={socials.linkedin} className="text-muted-foreground hover:text-primary transition-colors text-xs">
                        LinkedIn
                      </a>
                    )}
                    {socials.github && (
                      <a href={socials.github} className="text-muted-foreground hover:text-primary transition-colors text-xs">
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Let's build something amazing together. Get in touch today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
