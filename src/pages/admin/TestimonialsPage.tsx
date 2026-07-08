import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "name", label: "Name", type: "text" as const },
  { key: "role", label: "Role", type: "text" as const },
  { key: "company", label: "Company", type: "text" as const },
  { key: "content", label: "Content", type: "textarea" as const },
  { key: "avatar", label: "Avatar", type: "image" as const },
  { key: "rating", label: "Rating (1-5)", type: "number" as const },
];

export default function AdminTestimonials() {
  return (
    <ContentManager
      title="Testimonials"
      fields={fields}
      listQuery={api.cms.listTestimonials}
      createMutation={api.cms.createTestimonial}
      updateMutation={api.cms.updateTestimonial}
      deleteMutation={api.cms.deleteTestimonial}
    />
  );
}
