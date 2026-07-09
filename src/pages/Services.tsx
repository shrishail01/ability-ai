import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { services as fallbackServices } from "../data/services";
import { getImageUrl } from "../lib/utils";

export default function Services() {
  const cmsServices = useQuery(api.cms.listServices);
  const displayServices = cmsServices !== undefined ? cmsServices : fallbackServices;

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
              Our Services
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            End-to-End{" "}
            <span className="text-gradient">Digital Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            From AI-powered platforms to stunning websites, we deliver comprehensive 
            digital solutions that drive real business results.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayServices.map((service: any, i: number) => {
              const Icon = (typeof service.icon === "string"
                ? (Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle)
                : Icons.HelpCircle) as any;
              const serviceId = service._id || service.id;
              return (
                <motion.div
                  key={serviceId}
                  id={serviceId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-300 group scroll-mt-28"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${service.color}15`, color: service.color }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Service Image */}
                      {service.image && (
                        <div className="mb-6 relative overflow-hidden rounded-xl border border-white/5 bg-black/5 w-full">
                          <img
                            src={getImageUrl(service.image)}
                            alt={service.title}
                            className="w-full h-auto object-contain group-hover:scale-102 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Benefits */}
                      {service.benefits && service.benefits.filter((b: string) => b && b.trim() !== "").length > 0 && (
                        <div className="mb-5">
                          <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                            Key Benefits
                          </p>
                          <ul className="space-y-2">
                            {service.benefits.filter((b: string) => b && b.trim() !== "").map((benefit: string) => (
                              <li
                                key={benefit}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle2
                                  className="h-4 w-4 shrink-0 mt-0.5"
                                  style={{ color: service.color }}
                                />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      {service.technologies && service.technologies.filter((t: string) => t && t.trim() !== "").length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.filter((t: string) => t && t.trim() !== "").map((tech: string) => (
                              <span
                                key={tech}
                                className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 text-sm max-w-xl mx-auto">
              Every business is unique. Let's discuss your specific needs and build 
              something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
