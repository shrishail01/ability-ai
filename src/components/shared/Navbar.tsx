import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "../../lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled ? "editorial-nav" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                Ability<span className="text-gold">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors duration-300",
                    isActive(link.href)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-4 px-5 py-2 text-sm tracking-wide font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-16 z-40 md:hidden"
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <nav className="relative p-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "block text-lg tracking-wide transition-colors",
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 text-sm tracking-wide font-medium text-primary-foreground bg-primary"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
