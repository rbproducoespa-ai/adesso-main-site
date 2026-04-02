import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { createAdminSupabase } from "@/lib/supabase-admin";

// GET /api/blog — list all posts (admin: all; public: published only)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const adminView = searchParams.get("admin") === "1";

  const supabase = createAdminSupabase();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  // Public-facing requests only return published posts
  if (!adminView) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/blog — create a new post (admin only)
export async function POST(req: NextRequest) {
  // Verify session
  const authSupabase = await createServerSupabase();
  const { data: { user } } = await authSupabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, category, author, cover_image, status, seo_title, seo_description, published_at } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
  }

  const supabase = createAdminSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title, slug, excerpt, content, category, author, cover_image,
      status: status ?? "draft",
      seo_title, seo_description,
      published_at: status === "published" ? (published_at ?? new Date().toISOString()) : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
