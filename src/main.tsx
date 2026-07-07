import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";
import { BackToTop } from "./components/shared/BackToTop";
import { LoadingScreen } from "./components/shared/LoadingScreen";
import { CookieConsent } from "./components/shared/CookieConsent";
import { WhatsAppButton } from "./components/shared/WhatsAppButton";
import "./index.css";
import "./types/global.d.ts";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const AdminServices = lazy(() => import("./pages/admin/ServicesPage.tsx"));
const AdminProjects = lazy(() => import("./pages/admin/ProjectsPage.tsx"));
const AdminBlog = lazy(() => import("./pages/admin/BlogPage.tsx"));
const AdminTeam = lazy(() => import("./pages/admin/TeamPage.tsx"));
const AdminTestimonials = lazy(() => import("./pages/admin/TestimonialsPage.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/SettingsPage.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <ThemeProvider>
          <BrowserRouter>
            <LoadingScreen />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Layout><Landing /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/careers" element={<Layout><Careers /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);
