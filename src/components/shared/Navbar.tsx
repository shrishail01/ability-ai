import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { services } from "../../data/services";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    megaMenu: true,
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-lg shadow-black/5"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">Ability</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.megaMenu && setMegaMenuOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                      isActive(link.href)
                        ? "text-white bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {link.label}
                    {link.megaMenu && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          megaMenuOpen && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {link.megaMenu && (
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 top-full mt-2 w-[700px] origin-top-left"
                        >
                          <div className="glass-card p-6 rounded-2xl border border-white/10 shadow-2xl">
                            <div className="grid grid-cols-2 gap-3">
                              {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                  <Link
                                    key={service.id}
                                    to={`/services#${service.id}`}
                                    className="flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/5 group/item"
                                  >
                                    <div
                                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                                      style={{
                                        background: `${service.color}15`,
                                        color: service.color,
                                      }}
                                    >
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                                        {service.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/contact"
                className={cn(
                  "hidden sm:inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/25 hover:brightness-110",
                  "active:scale-[0.97]",
                )}
              >
                Get in Touch
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative mx-4 mt-2 glass-card rounded-2xl border border-white/10 shadow-2xl max-h-[70vh] overflow-y-auto">
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive(link.href)
                        ? "text-white bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white"
                  >
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
