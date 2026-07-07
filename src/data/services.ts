import {
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  ShoppingCart,
  Building2,
  Code2,
  Server,
  MessageSquare,
  Bot,
  Sparkles,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  benefits: string[];
  technologies: string[];
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Custom, high-performance websites built with cutting-edge frameworks. From landing pages to complex web applications, we deliver exceptional digital experiences.",
    icon: Globe,
    color: "#0066FF",
    benefits: [
      "Custom design tailored to your brand",
      "Blazing fast load times and Core Web Vitals optimization",
      "SEO-first architecture",
      "Fully responsive across all devices",
      "Ongoing maintenance and support",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Framer Motion"],
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android, built with modern frameworks for maximum performance.",
    icon: Smartphone,
    color: "#7C3AED",
    benefits: [
      "Cross-platform or native development",
      "Smooth animations and gestures",
      "Offline-first architecture",
      "App Store and Play Store deployment",
      "Push notifications and real-time updates",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description:
      "Enterprise-grade artificial intelligence solutions that transform your business. From custom models to integrated AI features, we make intelligence work for you.",
    icon: Brain,
    color: "#00D4FF",
    benefits: [
      "Custom ML model development",
      "Natural language processing integration",
      "Computer vision solutions",
      "Predictive analytics and forecasting",
      "AI-powered automation",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    description:
      "End-to-end SaaS platform development including multi-tenant architecture, subscription management, and scalable cloud infrastructure.",
    icon: Cloud,
    color: "#0066FF",
    benefits: [
      "Multi-tenant architecture",
      "Subscription and billing integration",
      "Scalable cloud infrastructure",
      "Analytics and reporting dashboards",
      "API-first design",
    ],
    technologies: ["Next.js", "Stripe", "AWS", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed with user-centered methodologies. We create experiences that delight users and drive business results.",
    icon: Palette,
    color: "#A78BFA",
    benefits: [
      "User research and testing",
      "Wireframing and prototyping",
      "Design systems and component libraries",
      "Accessibility-first design",
      "Interactive micro-animations",
    ],
    technologies: ["Figma", "Adobe XD", "Prototyping", "User Testing", "Design Systems"],
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    description:
      "Powerful online stores with seamless checkout experiences, inventory management, and marketing integrations optimized for conversion.",
    icon: ShoppingCart,
    color: "#4D94FF",
    benefits: [
      "Custom storefront design",
      "Secure payment integration",
      "Inventory and order management",
      "Marketing and SEO tools",
      "Mobile-optimized shopping",
    ],
    technologies: ["Shopify", "Next.js", "Stripe", "Algolia", "Sanity CMS", "Segment"],
  },
  {
    id: "crm-erp",
    title: "CRM & ERP Systems",
    description:
      "Custom CRM and ERP solutions that streamline operations, manage customer relationships, and provide actionable business intelligence.",
    icon: Building2,
    color: "#7C3AED",
    benefits: [
      "Custom workflow automation",
      "Customer relationship management",
      "Inventory and resource planning",
      "Real-time reporting and analytics",
      "Third-party integrations",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "GraphQL", "Redis", "Docker"],
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "Robust, scalable APIs designed for performance and reliability. RESTful and GraphQL APIs that power your applications and services.",
    icon: Code2,
    color: "#0066FF",
    benefits: [
      "RESTful and GraphQL APIs",
      "Comprehensive documentation",
      "Rate limiting and security",
      "API versioning and lifecycle management",
      "Performance monitoring and analytics",
    ],
    technologies: ["Node.js", "GraphQL", "OpenAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Cloud infrastructure design, migration, and management. Scalable, secure, and cost-effective cloud solutions for modern businesses.",
    icon: Server,
    color: "#00D4FF",
    benefits: [
      "Multi-cloud strategy and migration",
      "Auto-scaling infrastructure",
      "Security and compliance",
      "Cost optimization",
      "Disaster recovery and backup",
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Kubernetes", "Docker"],
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    description:
      "Intelligent conversational agents powered by large language models. Deploy custom chatbots for customer support, lead generation, and internal operations.",
    icon: MessageSquare,
    color: "#A78BFA",
    benefits: [
      "24/7 automated customer support",
      "Lead qualification and generation",
      "Multi-language support",
      "Custom knowledge base integration",
      "Seamless handoff to human agents",
    ],
    technologies: ["OpenAI", "LangChain", "Vector Databases", "React", "Node.js", "WebSockets"],
  },
  {
    id: "automation",
    title: "Business Automation",
    description:
      "Streamline operations with intelligent automation. From workflow automation to complex business process orchestration, we eliminate manual work.",
    icon: Bot,
    color: "#0066FF",
    benefits: [
      "Workflow automation and orchestration",
      "Document processing automation",
      "Email and notification automation",
      "Data synchronization across tools",
      "Custom automation dashboards",
    ],
    technologies: ["n8n", "Zapier", "Custom Scripts", "Python", "Node.js", "APIs"],
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Strategic brand identity development including logo design, visual identity, brand guidelines, and positioning for AI-native companies.",
    icon: Sparkles,
    color: "#7C3AED",
    benefits: [
      "Brand strategy and positioning",
      "Logo and visual identity design",
      "Brand guidelines documentation",
      "Marketing collateral design",
      "Brand voice and messaging",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy", "Typography", "Color Theory"],
  },
  {
    id: "seo-marketing",
    title: "SEO & Digital Marketing",
    description:
      "Data-driven SEO and digital marketing strategies that increase visibility, drive traffic, and generate qualified leads for your business.",
    icon: Search,
    color: "#00D4FF",
    benefits: [
      "Technical SEO audit and optimization",
      "Content marketing strategy",
      "Keyword research and targeting",
      "Conversion rate optimization",
      "Performance and analytics tracking",
    ],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Search Console", "Tag Manager"],
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Comprehensive maintenance and support services to keep your digital products running smoothly, securely, and up-to-date.",
    icon: Wrench,
    color: "#4D94FF",
    benefits: [
      "24/7 monitoring and incident response",
      "Security patches and updates",
      "Performance optimization",
      "Content updates and changes",
      "Technical support and training",
    ],
    technologies: ["Datadog", "Sentry", "CloudWatch", "PagerDuty", "New Relic"],
  },
];
