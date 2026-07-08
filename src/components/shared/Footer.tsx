import { Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import logo from "../../assets/logo.png";

const footerLinks = {
  Services: [
    { label: "Website Development", href: "/services#web-development" },
    { label: "Mobile App Development", href: "/services#mobile-development" },
    { label: "AI Solutions", href: "/services#ai-solutions" },
    { label: "SaaS Development", href: "/services#saas-development" },
    { label: "UI/UX Design", href: "/services#ui-ux-design" },
    { label: "E-commerce", href: "/services#ecommerce" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export function Footer() {
  const siteSettings = useQuery(api.cms.getAllSiteSettings);
  const settings = siteSettings ?? {};
  
  const companyName = settings.company_name ?? "Aibility";
  const footerTagline = settings.footer_tagline ?? "We design and develop software that transforms businesses.";
  const footerCopyright = settings.footer_copyright ?? `\u00A9 ${new Date().getFullYear()} Aibility. All rights reserved.`;
  const contactEmail = settings.contact_email ?? "hello@aibility.ai";
  const contactPhone = settings.contact_phone ?? "+1 (555) 123-4567";
  const twitterUrl = settings.social_twitter ?? "#";
  const linkedinUrl = settings.social_linkedin ?? "#";
  const githubUrl = settings.social_github ?? "#";

  const connectLinks = [
    { label: "Twitter", href: twitterUrl },
    { label: "LinkedIn", href: linkedinUrl },
    { label: "GitHub", href: githubUrl },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Aibility Logo" className="h-6 md:h-7 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              {footerTagline}
            </p>
            <div className="space-y-2.5">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {contactEmail}
              </a>
              <a
                href={`tel:${contactPhone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {contactPhone}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="eyebrow mb-5">{title}</h3>
              <ul className="space-y-3">
                {(title === "Connect" ? connectLinks : links).map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {footerCopyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
