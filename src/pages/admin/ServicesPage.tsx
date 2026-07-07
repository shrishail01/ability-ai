import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "title", label: "Title", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "icon", label: "Icon Name", type: "text" as const },
  { key: "color", label: "Color (hex)", type: "text" as const },
  { key: "benefits", label: "Benefits", type: "array" as const },
  { key: "technologies", label: "Technologies", type: "array" as const },
];

export default function AdminServices() {
  return (
    <ContentManager
      title="Services"
      fields={fields}
      listQuery={api.cms.listServices}
      createMutation={api.cms.createService}
      updateMutation={api.cms.updateService}
      deleteMutation={api.cms.deleteService}
    />
  );
}
