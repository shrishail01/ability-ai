import { useState } from "react";
import { useMutation } from "convex/react";
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
  Lock,
  User,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";

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
  const { isLoading, isAuthenticated, user, signIn, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const verifyAndPromoteToAdmin = useMutation(api.cms.verifyAndPromoteToAdmin);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      // 1. Authenticate anonymously if not already signed in
      if (!isAuthenticated) {
        await signIn("anonymous");
      }
      
      // 2. Call the verify and promote mutation
      await verifyAndPromoteToAdmin({
        username: usernameInput,
        password: passwordInput,
      });

      toast.success("Welcome back, Administrator!");
    } catch (e) {
      setLoginError(e instanceof Error ? e.message : "Failed to login as admin");
      toast.error(e instanceof Error ? e.message : "Failed to login as admin");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        <div className="animate-spin h-8 w-8 border-2 border-[#B8860B] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show login form if not authenticated OR if not an admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1] py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          <div className="bg-white border border-[#E8E2DA] p-8 rounded-none shadow-none transition-all duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#FAF6F1] text-[#B8860B] mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F1B2D]">
                Admin Authentication
              </h2>
              <p className="text-sm text-[#8B8178] mt-2">
                Please enter your administrator credentials
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-[#8B8178]">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-[#8B8178]" />
                  <Input
                    id="username"
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin username"
                    className="pl-10 h-11 border-[#E8E2DA] focus-visible:ring-[#B8860B] rounded-none bg-[#FAF6F1]/50 placeholder:text-[#8B8178]/50"
                    disabled={isLoggingIn}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-[#8B8178]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-[#8B8178]" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 h-11 border-[#E8E2DA] focus-visible:ring-[#B8860B] rounded-none bg-[#FAF6F1]/50 placeholder:text-[#8B8178]/50"
                    disabled={isLoggingIn}
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 text-center rounded-none font-medium">
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-11 bg-[#0F1B2D] text-white hover:bg-[#0F1B2D]/90 rounded-none transition-all cursor-pointer font-medium text-sm flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying Credentials...
                  </>
                ) : (
                  "Access Admin Panel"
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#E8E2DA] pt-4 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#8B8178] hover:text-[#0F1B2D] transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Return to Home Page
              </Link>
            </div>
          </div>
        </motion.div>
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
