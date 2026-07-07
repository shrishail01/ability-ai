import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "name", label: "Name", type: "text" as const },
  { key: "role", label: "Role", type: "text" as const },
  { key: "bio", label: "Bio", type: "textarea" as const },
  { key: "image", label: "Image URL", type: "url" as const },
  { key: "color", label: "Color (hex)", type: "text" as const },
  { key: "twitter", label: "Twitter URL", type: "url" as const },
  { key: "linkedin", label: "LinkedIn URL", type: "url" as const },
  { key: "github", label: "GitHub URL", type: "url" as const },
];

export default function AdminTeam() {
  return (
    <ContentManager
      title="Team Members"
      fields={fields}
      listQuery={api.cms.listTeamMembers}
      createMutation={api.cms.createTeamMember}
      updateMutation={api.cms.updateTeamMember}
      deleteMutation={api.cms.deleteTeamMember}
    />
  );
}
