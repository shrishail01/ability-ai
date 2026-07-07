import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Briefcase, FolderKanban, FileText, Users, MessageSquare } from "lucide-react";

const statCards = [
  { key: "services", label: "Services", icon: Briefcase, color: "#B8860B" },
  { key: "projects", label: "Projects", icon: FolderKanban, color: "#0F1B2D" },
  { key: "blogs", label: "Blog Posts", icon: FileText, color: "#8B8178" },
  { key: "team", label: "Team Members", icon: Users, color: "#1A1A1A" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, color: "#B8860B" },
];

export default function AdminDashboard() {
  const stats = useQuery(api.cms.getAdminStats);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#8B8178] mt-1">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const count = stats?.[card.key as keyof typeof stats] ?? 0;
          return (
            <div key={card.key} className="bg-white border border-[#E8E2DA] p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-5 w-5" style={{ color: card.color }} />
              </div>
              <p className="text-3xl font-bold tracking-tight">{count}</p>
              <p className="text-xs text-[#8B8178] mt-1 uppercase tracking-wider">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-white border border-[#E8E2DA] p-8">
        <h2 className="text-lg font-semibold mb-2">Welcome to the Admin Panel</h2>
        <p className="text-sm text-[#8B8178] leading-relaxed">
          Use the sidebar to manage your website content. You can add, edit, and delete
          services, projects, blog posts, team members, testimonials, and site settings.
        </p>
      </div>
    </div>
  );
}
