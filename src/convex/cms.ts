import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, action, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Helper: check if user is admin
async function requireAdmin(ctx: MutationCtx | QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  const user = await ctx.db.get(userId);
  if (user?.role !== "admin") throw new Error("Not authorized");
  return userId;
}

// Helper to resolve potential multiple images separated by commas
async function resolveImageField(ctx: any, fieldValue: any): Promise<string> {
  if (typeof fieldValue !== "string") return "";
  const parts = fieldValue.split(",");
  const resolvedParts = await Promise.all(
    parts.map(async (part) => {
      const trimmed = part.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("http") || trimmed.startsWith("/") || trimmed.startsWith("data:")) {
        return trimmed;
      }
      try {
        const url = await ctx.storage.getUrl(trimmed);
        return url || trimmed;
      } catch (e) {
        return trimmed;
      }
    })
  );
  return resolvedParts.filter(Boolean).join(",");
}

// ==================== SERVICES ====================

export const listServices = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("cms_services").order("asc").collect();
    return await Promise.all(
      services.map(async (service) => {
        const imageUrl = await resolveImageField(ctx, service.image);
        return { ...service, image: imageUrl };
      })
    );
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
    image: v.optional(v.string()),
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
    image: v.optional(v.string()),
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
    const projects = await ctx.db.query("cms_projects").order("asc").collect();
    return await Promise.all(
      projects.map(async (project) => {
        const imageUrl = await resolveImageField(ctx, project.image);
        return { ...project, image: imageUrl };
      })
    );
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
    const posts = await ctx.db.query("cms_blog_posts").order("asc").collect();
    return await Promise.all(
      posts.map(async (post) => {
        const imageUrl = await resolveImageField(ctx, post.image);
        return { ...post, image: imageUrl };
      })
    );
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
    const members = await ctx.db.query("cms_team_members").order("asc").collect();
    return await Promise.all(
      members.map(async (member) => {
        const imageUrl = await resolveImageField(ctx, member.image);
        return { ...member, image: imageUrl };
      })
    );
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
    const testimonials = await ctx.db.query("cms_testimonials").order("asc").collect();
    return await Promise.all(
      testimonials.map(async (testimonial) => {
        const avatarUrl = await resolveImageField(ctx, testimonial.avatar);
        return { ...testimonial, avatar: avatarUrl };
      })
    );
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

// All editable site settings with their defaults
export const ALL_SETTING_KEYS = [
  // Company
  { key: "company_name", label: "Company Name", type: "text", defaultValue: "Aibility", section: "Company" },
  { key: "company_tagline", label: "Company Tagline", type: "text", defaultValue: "AI-First Software Company", section: "Company" },
  { key: "company_description", label: "Company Description", type: "textarea", defaultValue: "We design and develop AI-first websites, mobile apps, SaaS platforms, and enterprise software that transform businesses.", section: "Company" },
  
  // Hero
  { key: "hero_title", label: "Hero Title", type: "text", defaultValue: "We Build the Future of Software", section: "Hero" },
  { key: "hero_title_accent", label: "Hero Accent Word", type: "text", defaultValue: "Future", section: "Hero" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea", defaultValue: "We design and develop AI-first websites, mobile apps, SaaS platforms, and enterprise software that transform businesses.", section: "Hero" },
  { key: "hero_cta_primary", label: "Hero CTA Primary", type: "text", defaultValue: "Start Your Project", section: "Hero" },
  { key: "hero_cta_secondary", label: "Hero CTA Secondary", type: "text", defaultValue: "View Our Work", section: "Hero" },
  { key: "hero_cta_primary_link", label: "Hero CTA Primary Link", type: "text", defaultValue: "/contact", section: "Hero" },
  { key: "hero_cta_secondary_link", label: "Hero CTA Secondary Link", type: "text", defaultValue: "/portfolio", section: "Hero" },
  
  // Trusted Companies (comma-separated)
  { key: "trusted_companies", label: "Trusted Companies", type: "text", defaultValue: "NexusAI, DataStream, ShopWave, MediView, GreenLife", section: "Social Proof" },
  
  // Services
  { key: "services_title", label: "Services Section Title", type: "text", defaultValue: "What We Build", section: "Services" },
  { key: "services_subtitle", label: "Services Section Subtitle", type: "textarea", defaultValue: "From AI-powered platforms to elegant websites, we deliver end-to-end digital solutions.", section: "Services" },
  
  // Portfolio
  { key: "portfolio_title", label: "Portfolio Section Title", type: "text", defaultValue: "Featured Projects", section: "Portfolio" },
  { key: "portfolio_subtitle", label: "Portfolio Section Subtitle", type: "textarea", defaultValue: "Showcasing our best work across industries and technologies.", section: "Portfolio" },
  
  // About
  { key: "about_headline", label: "About Page Headline", type: "text", defaultValue: "We're on a Mission to Redefine Software", section: "About" },
  { key: "about_story", label: "About Company Story", type: "textarea", defaultValue: "Founded in 2019, Aibility has grown from a small team of visionaries into a leading AI-first software company, delivering transformative digital solutions to clients worldwide.", section: "About" },
  { key: "timeline_events", label: "Timeline (JSON array of {year, event})", type: "textarea", defaultValue: '[{"year":"2020","event":"Company founded"},{"year":"2022","event":"First major client"},{"year":"2024","event":"Expanded globally"},{"year":"2026","event":"Industry leader"}]', section: "About" },
  // Contact
  { key: "contact_email", label: "Contact Email", type: "text", defaultValue: "hello@aibility.ai", section: "Contact" },
  { key: "contact_phone", label: "Contact Phone", type: "text", defaultValue: "+1 (555) 123-4567", section: "Contact" },
  { key: "office_address", label: "Office Address", type: "textarea", defaultValue: "123 Innovation Drive, San Francisco, CA 94105", section: "Contact" },
  { key: "social_twitter", label: "Twitter URL", type: "text", defaultValue: "#", section: "Contact" },
  { key: "social_linkedin", label: "LinkedIn URL", type: "text", defaultValue: "#", section: "Contact" },
  { key: "social_github", label: "GitHub URL", type: "text", defaultValue: "#", section: "Contact" },
  { key: "social_instagram", label: "Instagram URL", type: "text", defaultValue: "#", section: "Contact" },
  
  // SEO
  { key: "seo_meta_title", label: "Meta Title", type: "text", defaultValue: "Aibility — Premium AI Software Company", section: "SEO" },
  { key: "seo_meta_description", label: "Meta Description", type: "textarea", defaultValue: "Aibility is an AI-first software company building websites, mobile apps, AI solutions, and SaaS platforms that transform businesses.", section: "SEO" },
  { key: "seo_meta_keywords", label: "Meta Keywords", type: "text", defaultValue: "AI, software development, web development, mobile apps, SaaS", section: "SEO" },
  
  // Footer
  { key: "footer_tagline", label: "Footer Tagline", type: "textarea", defaultValue: "Building the future of software with AI-powered solutions.", section: "Footer" },
  { key: "footer_copyright", label: "Footer Copyright", type: "text", defaultValue: "© 2026 Aibility. All rights reserved.", section: "Footer" },
];

export const getSiteSetting = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("cms_site_settings").withIndex("by_key", (q) => q.eq("key", args.key)).first();
  },
});

// Get all settings as a flat map with defaults
export const getAllSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("cms_site_settings").collect();
    const settings: Record<string, string> = {};
    // Start with defaults
    for (const setting of ALL_SETTING_KEYS) {
      settings[setting.key] = setting.defaultValue;
    }
    // Override with any saved values
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return settings;
  },
});

export const setSiteSetting = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const trimmedValue = args.value.trim();
    const existing = await ctx.db.query("cms_site_settings").withIndex("by_key", (q) => q.eq("key", args.key)).first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: trimmedValue });
    } else {
      await ctx.db.insert("cms_site_settings", { key: args.key, value: trimmedValue });
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

// ==================== ADMIN PROMOTION ====================

// Promote the calling user to admin (only works if no admin exists yet)
export const promoteToAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    // Check if any admin already exists
    const allUsers = await ctx.db.query("users").collect();
    const existingAdmin = allUsers.find(u => u.role === "admin");
    if (existingAdmin) {
      throw new Error("An admin already exists. Contact your existing admin to promote new users.");
    }
    
    await ctx.db.patch(userId, { role: "admin" as const });
    return { success: true };
  },
});

// Check if promotion is available (no admin exists yet)
export const canPromoteToAdmin = query({
  args: {},
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("users").collect();
    const hasAdmin = allUsers.some(u => u.role === "admin");
    const userId = await getAuthUserId(ctx);
    return {
      canPromote: !hasAdmin && userId !== null,
      isAuthenticated: userId !== null,
    };
  },
});

// Verify credentials and promote calling user to admin
export const verifyAndPromoteToAdmin = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    if (args.username !== expectedUsername || args.password !== expectedPassword) {
      throw new Error("Invalid admin credentials");
    }
    
    await ctx.db.patch(userId, { role: "admin" as const });
    return { success: true };
  },
});

// Generate file upload URL for Convex storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

// Clear all default/mock CMS data from database
export const clearAllCmsData = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    // Clear services
    const services = await ctx.db.query("cms_services").collect();
    for (const item of services) {
      await ctx.db.delete(item._id);
    }
    
    // Clear projects
    const projects = await ctx.db.query("cms_projects").collect();
    for (const item of projects) {
      await ctx.db.delete(item._id);
    }
    
    // Clear blog posts
    const blogs = await ctx.db.query("cms_blog_posts").collect();
    for (const item of blogs) {
      await ctx.db.delete(item._id);
    }
    
    // Clear testimonials
    const testimonials = await ctx.db.query("cms_testimonials").collect();
    for (const item of testimonials) {
      await ctx.db.delete(item._id);
    }
    
    // Clear contacts
    const contacts = await ctx.db.query("cms_contacts").collect();
    for (const item of contacts) {
      await ctx.db.delete(item._id);
    }
    
    return { success: true };
  },
});

// ==================== CONTACT MESSAGES ====================

export const saveContactMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cms_contacts", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});

export const listContactMessages = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("cms_contacts").order("desc").collect();
  },
});

export const deleteContactMessage = mutation({
  args: { id: v.id("cms_contacts") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});


// ==================== SEND EMAIL VIA RESEND ====================

export const sendContactEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    message: v.string(),
    companyEmail: v.string(),
  },
  handler: async (_ctx, args): Promise<{ success: boolean; id: string }> => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

    const companyEmail: string = args.companyEmail.trim() || "support@aibility.co.in";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">via Aibility Website</p>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${args.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${args.email}" style="color: #667eea;">${args.email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${args.company || "Not specified"}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${args.service || "Not specified"}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #333; white-space: pre-wrap;">${args.message}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f0f4ff; border-radius: 8px; border-left: 4px solid #667eea;">
            <p style="margin: 0; color: #555; font-size: 13px;">💡 Reply directly to this email to respond to <strong>${args.name}</strong> at <a href="mailto:${args.email}" style="color: #667eea;">${args.email}</a></p>
          </div>
        </div>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aibility <support@aibility.co.in>",
        to: [companyEmail],
        reply_to: args.email,
        subject: `New Enquiry from ${args.name} — Aibility`,
        html: htmlBody,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`);
    }
    return { success: true, id: (data as any).id };
  },
});


