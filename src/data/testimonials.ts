export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Jennifer Adams",
    role: "CEO",
    company: "NexusAI",
    content: "Ability transformed our vision into reality. Their AI expertise and design thinking delivered a platform that exceeded our expectations. The team's dedication to quality is unmatched.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "CTO",
    company: "DataStream Inc.",
    content: "Working with Ability was a game-changer. They built our analytics platform from the ground up, and the performance has been outstanding. Truly world-class engineering.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Product",
    company: "ShopWave",
    content: "The team at Ability doesn't just build software—they build businesses. Our e-commerce platform has seen record growth since launch. Their strategic input was invaluable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Michael Torres",
    role: "Founder",
    company: "MediView Health",
    content: "Finding a team that understands both healthcare compliance and modern UX was nearly impossible until we found Ability. They delivered a HIPAA-compliant platform that our users love.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Director of Engineering",
    company: "GreenLife",
    content: "Ability brought our sustainability vision to life with a website that tells our story beautifully. The animations and interactive elements are stunning. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Head of Digital",
    company: "AssistBot",
    content: "Our AI chatbot project was complex, but Ability delivered beyond expectations. The NLP capabilities they implemented are impressive, and our customers love the experience.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=face",
    rating: 5,
  },
];
