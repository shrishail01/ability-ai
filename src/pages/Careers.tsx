import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Briefcase,
  Heart,
  Clock,
  BookOpen,
  Monitor,
  Users,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { openRoles, benefits } from "../data/careers";

const benefitIcons: Record<string, typeof Heart> = {
  Sparkles,
  Heart,
  Clock,
  BookOpen,
  Monitor,
  Users,
};

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
              Join Our Team
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Build the Future{" "}
            <span className="text-gradient">With Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Join a team of passionate builders, designers, and problem-solvers 
            creating the next generation of AI-first software.
          </motion.p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-10 md:p-16 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Our Culture
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  At Aibility, we believe in the power of collaboration, innovation, and 
                  continuous learning. We're a diverse team of builders who are passionate 
                  about using technology to solve real problems. We value autonomy, 
                  encourage experimentation, and celebrate wins together.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {["Innovation", "Collaboration", "Growth", "Impact"].map((value) => (
                  <div
                    key={value}
                    className="rounded-2xl bg-white/5 p-5 text-center border border-white/5"
                  >
                    <p className="text-lg font-bold text-gradient">{value}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-muted-foreground text-sm">
              We take care of our team so they can do their best work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefitIcons[benefit.icon] || Heart;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-sm">
              Find your next challenge at Aibility.
            </p>
          </motion.div>

          <div className="space-y-4">
            {openRoles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/5"
              >
                <button
                  onClick={() =>
                    setSelectedRole(selectedRole === role.id ? null : role.id)
                  }
                  className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {role.location}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-primary font-medium shrink-0">
                    {selectedRole === role.id ? "Show Less" : "View Details"}
                  </span>
                </button>

                {selectedRole === role.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 border-t border-white/5 pt-4"
                  >
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {role.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                      <ul className="space-y-1.5">
                        {role.requirements.map((req) => (
                          <li
                            key={req}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Benefits</h4>
                      <ul className="space-y-1.5">
                        {role.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRole(null);
                        setTimeout(() => {
                          document
                            .getElementById("application-form")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 scroll-mt-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply Now</h2>
            <p className="text-muted-foreground text-sm">
              Ready to join us? Fill out the form below and we'll get back to you.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-10 border border-primary/20 text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground text-sm">
                Thanks for applying. We'll review your application and get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 border border-white/5 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Position</label>
                <select
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a position</option>
                  {openRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Cover Letter</label>
                <textarea
                  rows={5}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Portfolio / Resume Link</label>
                <input
                  type="url"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="https://..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <Send className="h-4 w-4" />
                Submit Application
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
