// Server-only content fetching utilities
import { createServerSupabase } from "./supabase-server";
import { CONTENT_SCHEMA } from "./content-schema";
export type { ContentType, ContentField, ContentSection, ContentPage } from "./content-schema";
export { CONTENT_SCHEMA } from "./content-schema";

export async function getPageContent(app: string, page: string): Promise<Record<string, Record<string, string>>> {
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("site_content")
      .select("section, key, value")
      .eq("app", app)
      .eq("page", page);

    const result: Record<string, Record<string, string>> = {};
    for (const row of data ?? []) {
      if (!result[row.section]) result[row.section] = {};
      result[row.section][row.key] = row.value;
    }
    return result;
  } catch {
    return {};
  }
}

export function getContent(
  overrides: Record<string, Record<string, string>>,
  page: string,
  section: string,
  key: string
): string {
  return (
    overrides?.[section]?.[key] ??
    CONTENT_SCHEMA[page]?.sections[section]?.fields[key]?.default ??
    ""
  );
}
