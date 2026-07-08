import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "title", label: "Title", type: "text" as const },
  { key: "category", label: "Category", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "year", label: "Year", type: "text" as const },
  { key: "image", label: "Image", type: "image" as const },
  { key: "color", label: "Color (hex)", type: "text" as const },
  { key: "technologies", label: "Technologies", type: "array" as const },
  { key: "results", label: "Results", type: "array" as const },
  { key: "liveUrl", label: "Live URL", type: "url" as const },
  { key: "githubUrl", label: "GitHub URL", type: "url" as const },
  { key: "featured", label: "Featured", type: "boolean" as const },
  { key: "longDescription", label: "Full Description", type: "textarea" as const },
];

export default function AdminProjects() {
  return (
    <ContentManager
      title="Projects"
      fields={fields}
      listQuery={api.cms.listProjects}
      createMutation={api.cms.createProject}
      updateMutation={api.cms.updateProject}
      deleteMutation={api.cms.deleteProject}
    />
  );
}
