import { Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import logo from "../../assets/logo.png";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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
  const instagramUrl = settings.social_instagram ?? "#";

  const connectLinks: { label: string; href: string }[] = [];
  if (twitterUrl && twitterUrl !== "#" && twitterUrl.trim() !== "") {
    connectLinks.push({ label: "Twitter", href: twitterUrl });
  }
  if (linkedinUrl && linkedinUrl !== "#" && linkedinUrl.trim() !== "") {
    connectLinks.push({ label: "LinkedIn", href: linkedinUrl });
  }
  if (githubUrl && githubUrl !== "#" && githubUrl.trim() !== "") {
    connectLinks.push({ label: "GitHub", href: githubUrl });
  }
  if (instagramUrl && instagramUrl !== "#" && instagramUrl.trim() !== "") {
    connectLinks.push({ label: "Instagram", href: instagramUrl });
  }

  // If no links are configured, show contact details
  if (connectLinks.length === 0) {
    connectLinks.push({ label: contactEmail, href: `mailto:${contactEmail}` });
    connectLinks.push({ label: contactPhone, href: `tel:${contactPhone.replace(/\D/g, "")}` });
  }

  const cmsServices = useQuery(api.cms.listServices);
  const servicesLinks = cmsServices !== undefined
    ? cmsServices.map((s: any) => ({
        label: s.title,
        href: `/services#${s._id || s.id}`
      }))
    : [
        { label: "Website Development", href: "/services#web-development" },
        { label: "Mobile App Development", href: "/services#mobile-development" },
        { label: "AI Solutions", href: "/services#ai-solutions" },
        { label: "SaaS Development", href: "/services#saas-development" },
        { label: "UI/UX Design", href: "/services#ui-ux-design" },
        { label: "E-commerce", href: "/services#ecommerce" },
      ];

  const columns = [
    { title: "Services", links: servicesLinks },
    { title: "Company", links: companyLinks },
    { title: "Connect", links: connectLinks },
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
          {columns.map((col) => {
            if (col.links.length === 0) return null;
            return (
              <div key={col.title}>
                <h3 className="eyebrow mb-5">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:") || link.href.startsWith("tel:");
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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
