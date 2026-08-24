import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionView } from "@/views/DivisionView";
import { divisions, getDivision } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";
import { pick } from "@/lib/i18n";

/** Only the slugs defined in content resolve; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}): Promise<Metadata> {
  const { division: slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};

  const seo = pick(division.seo, "en");
  return buildMetadata({
    locale: "en",
    path: division.slug,
    title: seo.title,
    description: seo.description,
    noindex: division.hidden,
  });
}

export default async function Page({ params }: { params: Promise<{ division: string }> }) {
  const { division: slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  return <DivisionView division={division} locale="en" />;
}
