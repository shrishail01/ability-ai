import { ContentManager } from "./ContentManager";
import { api } from "../../convex/_generated/api";

const fields = [
  { key: "title", label: "Title", type: "text" as const },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const },
  { key: "category", label: "Category", type: "text" as const },
  { key: "author", label: "Author", type: "text" as const },
  { key: "authorRole", label: "Author Role", type: "text" as const },
  { key: "date", label: "Date", type: "text" as const },
  { key: "readTime", label: "Read Time", type: "text" as const },
  { key: "image", label: "Image URL", type: "url" as const },
  { key: "tags", label: "Tags", type: "array" as const },
  { key: "featured", label: "Featured", type: "boolean" as const },
  { key: "content", label: "Content", type: "textarea" as const },
];

export default function AdminBlog() {
  return (
    <ContentManager
      title="Blog Posts"
      fields={fields}
      listQuery={api.cms.listBlogPosts}
      createMutation={api.cms.createBlogPost}
      updateMutation={api.cms.updateBlogPost}
      deleteMutation={api.cms.deleteBlogPost}
    />
  );
}
