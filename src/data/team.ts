export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  color: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in AI and software engineering. Previously led engineering at major tech companies.",
    image: "",
    color: "#0066FF",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    bio: "AI researcher and full-stack architect. PhD in Machine Learning with expertise in deploying production AI systems.",
    image: "",
    color: "#7C3AED",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Marcus Johnson",
    role: "Head of Design",
    bio: "Award-winning designer specializing in AI-first interfaces. Creates intuitive, beautiful experiences that users love.",
    image: "",
    color: "#00D4FF",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Lead Engineer",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture. Passionate about clean, maintainable code.",
    image: "",
    color: "#A78BFA",
    socials: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "David Kim",
    role: "AI Engineer",
    bio: "Specializes in NLP and LLM integration. Built conversational AI systems serving millions of users.",
    image: "",
    color: "#4D94FF",
    socials: {
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emma Williams",
    role: "Project Manager",
    bio: "Certified PMP with a track record of delivering complex projects on time and within budget. Agile methodology expert.",
    image: "",
    color: "#0066FF",
    socials: {
      linkedin: "#",
    },
  },
];
