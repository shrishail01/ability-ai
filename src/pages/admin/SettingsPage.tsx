import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const settingKeys = [
  { key: "site_title", label: "Site Title" },
  { key: "site_description", label: "Site Description" },
  { key: "contact_email", label: "Contact Email" },
  { key: "contact_phone", label: "Contact Phone" },
  { key: "office_address", label: "Office Address" },
];

export default function AdminSettings() {
  const setSetting = useMutation(api.cms.setSiteSetting);

  const handleSave = async (key: string, form: FormData) => {
    const value = form.get(key) as string;
    if (!value) return;
    try {
      await setSetting({ key, value });
      alert("Saved!");
    } catch (e) {
      alert("Error saving: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-[#8B8178] mt-1">Manage your site configuration</p>
      </div>

      <div className="space-y-4">
        {settingKeys.map((setting) => (
          <form
            key={setting.key}
            onSubmit={(e) => { e.preventDefault(); handleSave(setting.key, new FormData(e.currentTarget)); }}
            className="bg-white border border-[#E8E2DA] p-6"
          >
            <label className="block text-xs font-medium text-[#8B8178] uppercase tracking-wider mb-1.5">
              {setting.label}
            </label>
            <input
              name={setting.key}
              className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
              placeholder={`Enter ${setting.label.toLowerCase()}...`}
            />
            <button
              type="submit"
              className="mt-3 px-4 py-2 text-sm bg-[#0F1B2D] text-white hover:bg-[#0F1B2D]/90 transition-colors"
            >
              Save
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
