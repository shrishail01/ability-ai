import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // CMS Tables for Admin Panel
    cms_services: defineTable({
      title: v.string(),
      description: v.string(),
      icon: v.string(),
      benefits: v.array(v.string()),
      technologies: v.array(v.string()),
      color: v.string(),
      order: v.number(),
      image: v.optional(v.string()),
    }).index("by_order", ["order"]),

    cms_projects: defineTable({
      title: v.string(),
      category: v.string(),
      description: v.string(),
      longDescription: v.string(),
      image: v.string(),
      color: v.string(),
      technologies: v.array(v.string()),
      liveUrl: v.optional(v.string()),
      githubUrl: v.optional(v.string()),
      results: v.array(v.string()),
      year: v.string(),
      featured: v.boolean(),
      order: v.number(),
    }).index("by_order", ["order"]),

    cms_blog_posts: defineTable({
      title: v.string(),
      excerpt: v.string(),
      content: v.string(),
      author: v.string(),
      authorRole: v.string(),
      date: v.string(),
      readTime: v.string(),
      category: v.string(),
      image: v.string(),
      tags: v.array(v.string()),
      featured: v.boolean(),
      order: v.number(),
    }).index("by_order", ["order"]),

    cms_team_members: defineTable({
      name: v.string(),
      role: v.string(),
      bio: v.string(),
      image: v.string(),
      color: v.string(),
      twitter: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      github: v.optional(v.string()),
      order: v.number(),
    }).index("by_order", ["order"]),

    cms_testimonials: defineTable({
      name: v.string(),
      role: v.string(),
      company: v.string(),
      content: v.string(),
      avatar: v.string(),
      rating: v.number(),
      order: v.number(),
    }).index("by_order", ["order"]),

    cms_site_settings: defineTable({
      key: v.string(),
      value: v.string(),
    }).index("by_key", ["key"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
