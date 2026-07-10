import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ALL_SETTING_KEYS } from "../../convex/cms";
import { CheckCircle2, Loader2 } from "lucide-react";

const sections = ["Company", "Hero", "Social Proof", "Services", "Portfolio", "About", "Contact", "SEO", "Footer"] as const;

const sectionIcons: Record<string, string> = {
  Company: "🏢",
  Hero: "🎯",
  "Social Proof": "⭐",
  Services: "⚙️",
  Portfolio: "💼",
  About: "📖",
  Contact: "📬",
  SEO: "🔍",
  Footer: "📌",
};

export default function AdminSettings() {
  const settings = useQuery(api.cms.getAllSiteSettings);
  const setSetting = useMutation(api.cms.setSiteSetting);
  const clearCmsData = useMutation(api.cms.clearAllCmsData);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleResetDatabase = async () => {
    if (!confirm("WARNING: Are you absolutely sure you want to delete ALL services, projects, testimonials, and blog posts from the database?\n\nThis action is permanent and cannot be undone.")) {
      return;
    }
    const confirmText = prompt("To confirm deletion, type 'DELETE ALL' below:");
    if (confirmText !== "DELETE ALL") {
      alert("Database reset cancelled. Confirmation text did not match.");
      return;
    }
    
    setIsClearing(true);
    try {
      await clearCmsData();
      alert("Database reset successfully! All default/mock services, projects, blog posts, and testimonials have been removed.");
    } catch (e) {
      alert("Error resetting database: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setIsClearing(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    if (!value) return;
    setSavingKey(key);
    try {
      await setSetting({ key, value });
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (e) {
      alert("Error saving: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setSavingKey(null);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#B8860B]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-sm text-[#8B8178] mt-1">Edit everything about your site — company name, taglines, hero text, contact info, and more</p>
      </div>

      {sections.map((section) => {
        const sectionSettings = ALL_SETTING_KEYS.filter(s => s.section === section);
        if (sectionSettings.length === 0) return null;

        return (
          <div key={section} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{sectionIcons[section]}</span>
              <h2 className="text-lg font-semibold tracking-tight">{section}</h2>
            </div>
            <div className="bg-white border border-[#E8E2DA] divide-y divide-[#E8E2DA]">
              {sectionSettings.map((setting) => {
                const currentValue = settings[setting.key] ?? setting.defaultValue;
                const isSaving = savingKey === setting.key;
                const isSaved = savedKey === setting.key;

                return (
                  <div key={setting.key} className="p-5 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-medium text-[#8B8178] uppercase tracking-wider mb-1.5">
                        {setting.label}
                      </label>
                      {setting.type === "textarea" ? (
                        <textarea
                          name={setting.key}
                          defaultValue={currentValue}
                          rows={3}
                          className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B] transition-colors resize-y"
                          onBlur={(e) => handleSave(setting.key, e.target.value)}
                        />
                      ) : (
                        <input
                          name={setting.key}
                          type="text"
                          defaultValue={currentValue}
                          className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B] transition-colors"
                          onBlur={(e) => handleSave(setting.key, e.target.value)}
                        />
                      )}
                      <p className="text-[10px] text-[#8B8178] mt-1">
                        Default: "{setting.defaultValue}"
                      </p>
                    </div>
                    <div className="shrink-0 pt-6">
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[#B8860B]" />
                      ) : isSaved ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <button
                          onClick={() => {
                            const input = document.querySelector(`[name="${setting.key}"]`) as HTMLInputElement | HTMLTextAreaElement;
                            if (input) handleSave(setting.key, input.value);
                          }}
                          className="text-xs text-[#B8860B] hover:text-[#8B6914] font-medium transition-colors"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Database Administration */}
      <div className="mt-12 border border-red-200 bg-red-50/30 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚠️</span>
          <h2 className="text-lg font-semibold tracking-tight text-red-900">Database Administration</h2>
        </div>
        <p className="text-sm text-[#8B8178] mb-6">
          Wipe the database to clean out all default mock data (services, projects, testimonials, and blog posts) and start fresh. Once deleted, the site will render completely fresh and empty.
        </p>
        <button
          onClick={handleResetDatabase}
          disabled={isClearing}
          className="px-6 py-2.5 text-sm bg-red-650 hover:bg-red-750 text-white transition-colors disabled:opacity-50 font-medium inline-flex items-center gap-2"
          style={{ backgroundColor: "#b91c1c" }}
        >
          {isClearing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              Resetting Database...
            </>
          ) : (
            "Reset Database (Delete All Data)"
          )}
        </button>
      </div>
    </div>
  );
}
