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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    bio: "AI researcher and full-stack architect. PhD in Machine Learning with expertise in deploying production AI systems.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
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
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Lead Engineer",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture. Passionate about clean, maintainable code.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
    socials: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "David Kim",
    role: "AI Engineer",
    bio: "Specializes in NLP and LLM integration. Built conversational AI systems serving millions of users.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
    socials: {
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emma Williams",
    role: "Project Manager",
    bio: "Certified PMP with a track record of delivering complex projects on time and within budget. Agile methodology expert.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face",
    color: "#B8860B",
    socials: {
      linkedin: "#",
    },
  },
];
