import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const siteSettings = useQuery(api.cms.getAllSiteSettings);
  const settings = siteSettings ?? {};
  
  const contactEmail = settings.contact_email ?? "hello@aibility.ai";
  const contactPhone = settings.contact_phone ?? "+1 (555) 123-4567";
  const officeAddress = settings.office_address ?? "123 Innovation Drive, San Francisco, CA 94105";
  const twitterUrl = settings.social_twitter ?? "#";
  const linkedinUrl = settings.social_linkedin ?? "#";
  const githubUrl = settings.social_github ?? "#";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
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
              Get in Touch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Let's Build Something{" "}
            <span className="text-gradient">Amazing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Have a project in mind? We'd love to hear about it. Send us a message 
            and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: contactEmail,
                  href: `mailto:${contactEmail}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: contactPhone,
                  href: `tel:${contactPhone.replace(/\D/g, "")}`,
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: officeAddress,
                  href: "#",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Mon-Fri: 9AM - 6PM PST",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-2xl p-5 border border-white/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-5 border border-white/5"
              >
                <p className="text-sm font-medium mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { label: "Twitter", href: twitterUrl },
                    { label: "LinkedIn", href: linkedinUrl },
                    { label: "GitHub", href: githubUrl },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-white/5 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-2xl p-10 border border-primary/20 text-center"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl p-8 border border-white/5 space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Name</label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Company</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Service Interested In</label>
                      <select
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select a service</option>
                        <option>Website Development</option>
                        <option>Mobile App Development</option>
                        <option>AI Solutions</option>
                        <option>SaaS Development</option>
                        <option>UI/UX Design</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Budget Range</label>
                      <select
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select budget range</option>
                        <option>$5K - $15K</option>
                        <option>$15K - $50K</option>
                        <option>$50K - $100K</option>
                        <option>$100K+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl overflow-hidden border border-white/5 h-64 md:h-80 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">San Francisco, CA</p>
              <p className="text-xs text-muted-foreground mt-1">Interactive map would render here</p>
            </div>
          </motion.div>
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
              Prefer a Quick Call?
            </h2>
            <p className="text-muted-foreground mb-8 text-sm max-w-xl mx-auto">
              Schedule a free 30-minute consultation to discuss your project.
            </p>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              <Phone className="h-4 w-4" />
              +1 (234) 567-890
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
