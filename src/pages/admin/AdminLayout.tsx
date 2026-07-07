import { useAuth } from "../../hooks/use-auth";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const { isLoading, isAuthenticated, user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/auth?redirect=/admin");
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        <div className="animate-spin h-8 w-8 border-2 border-[#B8860B] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E8E2DA] flex flex-col">
        <div className="p-6 border-b border-[#E8E2DA]">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#B8860B]" />
            <span className="font-bold tracking-tight">
              Ability<span className="text-[#B8860B]">.</span>
            </span>
          </Link>
          <p className="text-xs text-[#8B8178] mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-[#0F1B2D] text-white"
                    : "text-[#8B8178] hover:text-[#1A1A1A] hover:bg-[#F5F0EB]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E8E2DA]">
          <div className="flex items-center gap-3 mb-3 px-4">
            <div className="h-8 w-8 rounded-full bg-[#0F1B2D] flex items-center justify-center text-xs font-bold text-white">
              {user.name?.[0] || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name || "Admin"}</p>
              <p className="text-xs text-[#8B8178]">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#8B8178] hover:text-[#1A1A1A] transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
