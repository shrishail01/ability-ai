import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Helper: check if user is admin
async function requireAdmin(ctx: MutationCtx | QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  const user = await ctx.db.get(userId);
  if (user?.role !== "admin") throw new Error("Not authorized");
  return userId;
}

// ==================== SERVICES ====================

export const listServices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cms_services").order("asc").collect();
  },
});

export const createService = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    benefits: v.array(v.string()),
    technologies: v.array(v.string()),
    color: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("cms_services", args);
  },
});

export const updateService = mutation({
  args: {
    id: v.id("cms_services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    technologies: v.optional(v.array(v.string())),
    color: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteService = mutation({
  args: { id: v.id("cms_services") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// ==================== PROJECTS ====================

export const listProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cms_projects").order("asc").collect();
  },
});

export const createProject = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("cms_projects", args);
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("cms_projects"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    longDescription: v.optional(v.string()),
    image: v.optional(v.string()),
    color: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    results: v.optional(v.array(v.string())),
    year: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("cms_projects") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// ==================== BLOG POSTS ====================

export const listBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cms_blog_posts").order("asc").collect();
  },
});

export const createBlogPost = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("cms_blog_posts", args);
  },
});

export const updateBlogPost = mutation({
  args: {
    id: v.id("cms_blog_posts"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    author: v.optional(v.string()),
    authorRole: v.optional(v.string()),
    date: v.optional(v.string()),
    readTime: v.optional(v.string()),
    category: v.optional(v.string()),
    image: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteBlogPost = mutation({
  args: { id: v.id("cms_blog_posts") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// ==================== TEAM MEMBERS ====================

export const listTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cms_team_members").order("asc").collect();
  },
});

export const createTeamMember = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    image: v.string(),
    color: v.string(),
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("cms_team_members", args);
  },
});

export const updateTeamMember = mutation({
  args: {
    id: v.id("cms_team_members"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    bio: v.optional(v.string()),
    image: v.optional(v.string()),
    color: v.optional(v.string()),
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteTeamMember = mutation({
  args: { id: v.id("cms_team_members") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// ==================== TESTIMONIALS ====================

export const listTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cms_testimonials").order("asc").collect();
  },
});

export const createTestimonial = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    company: v.string(),
    content: v.string(),
    avatar: v.string(),
    rating: v.number(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("cms_testimonials", args);
  },
});

export const updateTestimonial = mutation({
  args: {
    id: v.id("cms_testimonials"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    content: v.optional(v.string()),
    avatar: v.optional(v.string()),
    rating: v.optional(v.number()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const deleteTestimonial = mutation({
  args: { id: v.id("cms_testimonials") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// ==================== SITE SETTINGS ====================

export const getSiteSetting = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("cms_site_settings").withIndex("by_key", (q) => q.eq("key", args.key)).first();
  },
});

export const setSiteSetting = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.query("cms_site_settings").withIndex("by_key", (q) => q.eq("key", args.key)).first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
    } else {
      await ctx.db.insert("cms_site_settings", args);
    }
  },
});

// ==================== ADMIN STATS ====================

export const getAdminStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const [services, projects, blogs, team, testimonials] = await Promise.all([
      ctx.db.query("cms_services").collect(),
      ctx.db.query("cms_projects").collect(),
      ctx.db.query("cms_blog_posts").collect(),
      ctx.db.query("cms_team_members").collect(),
      ctx.db.query("cms_testimonials").collect(),
    ]);
    return {
      services: services.length,
      projects: projects.length,
      blogs: blogs.length,
      team: team.length,
      testimonials: testimonials.length,
    };
  },
});
