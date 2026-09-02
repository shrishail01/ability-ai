import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "badge", label: "Badge Tag (e.g. FEATURED COHORT 🏆 / COMING SOON 🚀)", type: "text" as const, required: true },
  { key: "title", label: "Announcement Title", type: "text" as const, required: true },
  { key: "description", label: "Short Description", type: "textarea" as const, required: true },
  { key: "link", label: "Link URL (e.g. /hackathon-cohort or /services)", type: "text" as const, required: true },
  { key: "ctaText", label: "CTA Button Text (e.g. Join Cohort)", type: "text" as const, required: true },
  { key: "active", label: "Active / Visible", type: "boolean" as const },
];

export default function AdminAnnouncements() {
  return (
    <ContentManager
      title="Hero Announcements & Ad Banners"
      fields={fields}
      listQuery={api.cms.listAnnouncements}
      createMutation={api.cms.addAnnouncement}
      updateMutation={api.cms.updateAnnouncement}
      deleteMutation={api.cms.deleteAnnouncement}
    />
  );
}
