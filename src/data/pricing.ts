export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for startups and small projects",
    price: "$5K",
    period: "Starting at",
    features: [
      "Custom website or landing page",
      "Responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "1 revision round",
      "30-day support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    description: "Ideal for growing businesses and mid-size projects",
    price: "$15K",
    period: "Starting at",
    features: [
      "Complex web application or platform",
      "Custom UI/UX design",
      "Full SEO strategy & implementation",
      "Third-party integrations",
      "Database & backend development",
      "Analytics & reporting setup",
      "3 revision rounds",
      "90-day support",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For large-scale systems and AI solutions",
    price: "$50K+",
    period: "Starting at",
    features: [
      "Full product development lifecycle",
      "AI/ML integration & custom models",
      "Scalable cloud infrastructure",
      "Multi-tenant architecture",
      "Advanced security & compliance",
      "Dedicated project manager",
      "Unlimited revision rounds",
      "Priority 24/7 support",
    ],
    highlighted: false,
    cta: "Contact Us",
  },
];
