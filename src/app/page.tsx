import { HeroSection }       from "@/components/sections/Hero";
import { ShowsStrip }        from "@/components/sections/ShowsStrip";
import { DivisionsSection }  from "@/components/sections/Divisions";
import { CaseStudiesSection }from "@/components/sections/CaseStudies";
import { FeaturedSection }   from "@/components/sections/Featured";
import { WhyAdessoSection }  from "@/components/sections/WhyAdesso";
import { FounderSection }    from "@/components/sections/Founder";
import { CTABanner }         from "@/components/sections/CTABanner";
import { Testimonials }      from "@/components/sections/Testimonials";
import { getPageContent, getContent } from "@/lib/content";

export default async function HomePage() {
  const c = await getPageContent("main", "home");
  const g = (section: string, key: string) => getContent(c, "home", section, key);

  // Parse shows list from comma-separated string
  const showsRaw = g("shows", "list");
  const showsList = showsRaw ? showsRaw.split(",").map(s => s.trim()).filter(Boolean) : undefined;

  return (
    <>
      <HeroSection
        image={g("hero", "image")}
        eyebrow={g("hero", "eyebrow")}
        location={g("hero", "location")}
        title1={g("hero", "title1")}
        title2={g("hero", "title2")}
        accent={g("hero", "accent")}
        subtitle={g("hero", "subtitle")}
        ctaPrimary={g("hero", "cta_primary")}
        ctaSecondary={g("hero", "cta_secondary")}
        projectTitle={g("hero", "project_title")}
        projectServices={g("hero", "project_services")}
        projectShow={g("hero", "project_show")}
      />
      <ShowsStrip showsList={showsList} />
      <DivisionsSection />
      <CaseStudiesSection />
      <FeaturedSection />
      <WhyAdessoSection />
      <Testimonials
        t1_photo={g("testimonials", "t1_photo")}
        t1_name={g("testimonials", "t1_name")}
        t1_company={g("testimonials", "t1_company")}
        t1_text={g("testimonials", "t1_text")}
        t2_photo={g("testimonials", "t2_photo")}
        t2_name={g("testimonials", "t2_name")}
        t2_company={g("testimonials", "t2_company")}
        t2_text={g("testimonials", "t2_text")}
        t3_photo={g("testimonials", "t3_photo")}
        t3_name={g("testimonials", "t3_name")}
        t3_company={g("testimonials", "t3_company")}
        t3_text={g("testimonials", "t3_text")}
      />
      <FounderSection
        image={g("founder", "image")}
        name={g("founder", "name")}
        bio={g("founder", "bio")}
        whatsapp={g("founder", "whatsapp")}
      />
      <CTABanner
        image={g("cta_banner", "image")}
        eyebrow={g("cta_banner", "eyebrow")}
        title={g("cta_banner", "title")}
        subtitle={g("cta_banner", "subtitle")}
        button={g("cta_banner", "button")}
      />
    </>
  );
}
