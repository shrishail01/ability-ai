export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "future-of-ai-development",
    title: "The Future of AI Development: Trends Shaping 2026",
    excerpt: "Explore the key trends defining AI development in 2026, from agentic AI to edge computing and beyond.",
    content: "AI development continues to evolve at an unprecedented pace. In 2026, we're seeing several transformative trends that are reshaping how businesses leverage artificial intelligence...",
    author: "Dr. Sarah Mitchell",
    authorRole: "CTO at Ability",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "",
    tags: ["AI", "Machine Learning", "Technology Trends"],
    featured: true,
  },
  {
    id: "building-scalable-saas",
    title: "Building Scalable SaaS Platforms: Architecture Best Practices",
    excerpt: "A comprehensive guide to building SaaS platforms that scale from hundreds to millions of users.",
    content: "Scalability is the cornerstone of successful SaaS platforms. In this guide, we explore architectural patterns and best practices for building systems that grow with your user base...",
    author: "Priya Patel",
    authorRole: "Lead Engineer at Ability",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    category: "Engineering",
    image: "",
    tags: ["SaaS", "Architecture", "Scalability", "Cloud"],
    featured: false,
  },
  {
    id: "ui-ux-trends-2026",
    title: "UI/UX Design Trends That Will Define 2026",
    excerpt: "From glassmorphism to AI-driven interfaces, discover the design trends shaping digital experiences this year.",
    content: "User interface design is entering an exciting new era. As AI capabilities expand and user expectations evolve, designers are pushing boundaries with innovative approaches to digital experiences...",
    author: "Marcus Johnson",
    authorRole: "Head of Design at Ability",
    date: "Dec 15, 2025",
    readTime: "6 min read",
    category: "Design",
    image: "",
    tags: ["UI/UX", "Design", "Trends", "Innovation"],
    featured: true,
  },
  {
    id: "llm-integration-guide",
    title: "A Practical Guide to LLM Integration for Enterprise Applications",
    excerpt: "Learn how to effectively integrate large language models into your enterprise applications.",
    content: "Large Language Models have become essential tools for modern applications. However, integrating them effectively requires careful consideration of architecture, cost, and user experience...",
    author: "David Kim",
    authorRole: "AI Engineer at Ability",
    date: "Nov 20, 2025",
    readTime: "10 min read",
    category: "AI & Technology",
    image: "",
    tags: ["LLM", "OpenAI", "Enterprise", "Integration"],
    featured: false,
  },
  {
    id: "mobile-app-performance",
    title: "Optimizing Mobile App Performance: A Developer's Checklist",
    excerpt: "Essential strategies for building high-performance mobile applications that users love.",
    content: "Performance is not a feature—it's an expectation. Users today expect apps to launch instantly, respond immediately, and never stutter. Here's our comprehensive checklist for mobile app optimization...",
    author: "Alex Chen",
    authorRole: "CEO at Ability",
    date: "Oct 10, 2025",
    readTime: "7 min read",
    category: "Engineering",
    image: "",
    tags: ["Mobile", "Performance", "React Native", "Optimization"],
    featured: false,
  },
  {
    id: "startup-tech-stack",
    title: "Choosing the Right Tech Stack for Your Startup in 2026",
    excerpt: "A founder's guide to selecting technology that balances speed, scalability, and cost.",
    content: "One of the most critical decisions founders face is choosing the right technology stack. The choices you make early on can significantly impact your speed of development, ability to scale, and long-term costs...",
    author: "Alex Chen",
    authorRole: "CEO at Ability",
    date: "Sep 5, 2025",
    readTime: "9 min read",
    category: "Business",
    image: "",
    tags: ["Startup", "Tech Stack", "Business", "Strategy"],
    featured: false,
  },
];

export const blogCategories = [
  "All",
  "AI & Technology",
  "Engineering",
  "Design",
  "Business",
];
