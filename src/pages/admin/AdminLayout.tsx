import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
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
  const promoteToAdmin = useMutation(api.cms.promoteToAdmin);
  const canPromoteData = useQuery(api.cms.canPromoteToAdmin);
  const [promoting, setPromoting] = useState(false);
  const [promoteError, setPromoteError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth?redirect=/admin");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handlePromote = async () => {
    setPromoting(true);
    setPromoteError(null);
    try {
      await promoteToAdmin();
      window.location.reload();
    } catch (e) {
      setPromoteError(e instanceof Error ? e.message : "Failed to promote");
    } finally {
      setPromoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        <div className="animate-spin h-8 w-8 border-2 border-[#B8860B] border-t-transparent rounded-full" />
      </div>
    );
  }

  // If authenticated but not admin, show promotion screen
  if (isAuthenticated && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        <div className="max-w-md w-full mx-4">
          {canPromoteData?.canPromote ? (
            <div className="bg-white border border-[#E8E2DA] p-8 text-center">
              <h1 className="text-xl font-bold tracking-tight mb-3">Welcome to the Admin Panel</h1>
              <p className="text-sm text-[#8B8178] leading-relaxed mb-6">
                You're the first user! Click below to become an administrator and start managing your website content.
              </p>
              {promoteError && (
                <p className="text-sm text-red-500 mb-4">{promoteError}</p>
              )}
              <button
                onClick={handlePromote}
                disabled={promoting}
                className="px-8 py-3 bg-[#0F1B2D] text-white text-sm font-medium hover:bg-[#0F1B2D]/90 transition-colors disabled:opacity-50"
              >
                {promoting ? "Promoting..." : "Become Admin"}
              </button>
              <button
                onClick={() => navigate("/")}
                className="block mx-auto mt-4 text-sm text-[#8B8178] hover:text-[#1A1A1A] transition-colors"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#E8E2DA] p-8 text-center">
              <h1 className="text-xl font-bold tracking-tight mb-3">Access Denied</h1>
              <p className="text-sm text-[#8B8178] leading-relaxed mb-6">
                You need admin privileges to access this panel. Contact your administrator to get access.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-[#0F1B2D] text-white text-sm font-medium hover:bg-[#0F1B2D]/90 transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Must be admin to reach this block — TS needs the guard
  if (!user) return null;

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
