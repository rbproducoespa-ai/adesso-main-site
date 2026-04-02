interface TestimonialsProps {
  t1_photo?: string; t1_name?: string; t1_company?: string; t1_text?: string;
  t2_photo?: string; t2_name?: string; t2_company?: string; t2_text?: string;
  t3_photo?: string; t3_name?: string; t3_company?: string; t3_text?: string;
}

function Avatar({ photo, name }: { photo?: string; name: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="w-12 h-12 rounded-full bg-[#8C7355] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-[16px] font-semibold">{initial}</span>
    </div>
  );
}

function TestimonialCard({
  photo,
  name,
  company,
  text,
}: {
  photo?: string;
  name: string;
  company: string;
  text: string;
}) {
  return (
    <div className="bg-white border border-[#E2DFDA] p-8 flex flex-col gap-5">
      <div className="text-[#8C7355] text-sm tracking-wide">★★★★★</div>
      <p className="text-[#5C5C5C] italic text-[14px] leading-relaxed flex-1">
        "{text}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-[#E2DFDA]">
        <Avatar photo={photo} name={name} />
        <div>
          <p className="font-bold text-[#111111] text-[14px]">{name}</p>
          <p className="text-[12px] text-[#8B8B8B]">{company}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  t1_photo = "",
  t1_name = "Marco Bianchi",
  t1_company = "TechExpo Italy",
  t1_text = "ADESSO delivered a stand that exceeded every expectation. The 3D renders were so accurate we didn't need a single revision on-site.",
  t2_photo = "",
  t2_name = "Sarah Williams",
  t2_company = "MedTech UK",
  t2_text = "From first brief to final delivery, the process was completely transparent. Bruno was available throughout and the result was outstanding.",
  t3_photo = "",
  t3_name = "Lars Müller",
  t3_company = "IndustrialGroup DE",
  t3_text = "The lead intelligence data gave us a real edge at Hannover Messe. We had contact lists ready before competitors even started planning.",
}: TestimonialsProps) {
  return (
    <section className="bg-[#F5F4F1] border-y border-[#E2DFDA] section-pad">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#8C7355] mb-4">
            Client Testimonials
          </p>
          <h2 className="headline-section text-[#111111]">
            What our clients say.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TestimonialCard
            photo={t1_photo}
            name={t1_name}
            company={t1_company}
            text={t1_text}
          />
          <TestimonialCard
            photo={t2_photo}
            name={t2_name}
            company={t2_company}
            text={t2_text}
          />
          <TestimonialCard
            photo={t3_photo}
            name={t3_name}
            company={t3_company}
            text={t3_text}
          />
        </div>
      </div>
    </section>
  );
}
