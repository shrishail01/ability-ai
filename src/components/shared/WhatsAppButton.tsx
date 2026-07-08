import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function WhatsAppButton() {
  const siteSettings = useQuery(api.cms.getAllSiteSettings);
  const contactPhone = siteSettings?.contact_phone ?? "+1 (555) 123-4567";
  const cleanPhone = contactPhone.replace(/[^\d+]/g, "");

  return (
    <motion.a
      href={`tel:${cleanPhone}`}
      className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#B8860B] text-white hover:bg-[#B8860B]/90 shadow-lg transition-colors cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Call Us"
    >
      <Phone className="h-5 w-5" />
    </motion.a>
  );
}

