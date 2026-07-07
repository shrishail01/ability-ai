export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export const openRoles: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a senior frontend engineer to build beautiful, performant interfaces for our clients' products. You'll work on diverse projects ranging from AI dashboards to consumer applications.",
    requirements: [
      "5+ years of experience with React",
      "Expert knowledge of TypeScript",
      "Experience with animation libraries (Framer Motion preferred)",
      "Strong understanding of web performance optimization",
      "Experience with responsive design and accessibility",
      "Portfolio of impressive projects",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-friendly environment",
      "Annual learning budget",
      "Latest equipment and tools",
    ],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "AI",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Join our AI team to build cutting-edge machine learning solutions for enterprise clients. You'll work on LLM integration, computer vision, and predictive analytics.",
    requirements: [
      "MS/PhD in Computer Science, ML, or related field",
      "3+ years of experience in ML engineering",
      "Proficiency in Python and ML frameworks",
      "Experience with LLMs and NLP",
      "Strong mathematical and statistical skills",
      "Published research or notable projects",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-friendly environment",
      "Conference attendance budget",
      "GPU compute access",
    ],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We need a talented UX designer to create intuitive, beautiful experiences for our diverse range of clients. You'll own the design process from research to pixel-perfect delivery.",
    requirements: [
      "4+ years of UX/UI design experience",
      "Expert proficiency in Figma",
      "Strong portfolio demonstrating UX process",
      "Experience with design systems",
      "Understanding of motion design",
      "Excellent communication and presentation skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Creative workspace",
      "Design conference budget",
      "Creative tools subscription",
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're seeking a versatile full-stack developer who can build end-to-end solutions. You'll work on diverse projects spanning web, mobile, and cloud.",
    requirements: [
      "4+ years of full-stack development",
      "Proficiency in React and Node.js",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Database design and optimization skills",
      "API design and development experience",
      "Strong problem-solving abilities",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Fully remote",
      "Home office stipend",
      "Annual team retreats",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Help us build and maintain the infrastructure that powers our clients' applications. You'll focus on automation, CI/CD, and cloud architecture.",
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Expert knowledge of Docker and Kubernetes",
      "Experience with Terraform or Pulumi",
      "Strong scripting skills (Python, Bash)",
      "Experience with monitoring and observability",
      "AWS or GCP certification preferred",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-friendly",
      "On-call compensation",
      "Conference budget",
    ],
  },
];

export const benefits = [
  {
    title: "Competitive Compensation",
    description: "Top-tier salary, equity packages, and performance bonuses.",
    icon: "Sparkles",
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
    icon: "Heart",
  },
  {
    title: "Flexible Work",
    description: "Remote-friendly culture with flexible hours and unlimited PTO.",
    icon: "Clock",
  },
  {
    title: "Growth & Learning",
    description: "Annual learning budget, conferences, and mentorship programs.",
    icon: "BookOpen",
  },
  {
    title: "Latest Tools",
    description: "Top-of-the-line equipment and all the software licenses you need.",
    icon: "Monitor",
  },
  {
    title: "Team Retreats",
    description: "Annual company retreats and regular team-building events.",
    icon: "Users",
  },
];
