"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  { id: "stand_design", label: "Stand Concept Design", division: "Exhibition" },
  { id: "3d_visualisation", label: "3D Visualisation", division: "Exhibition" },
  { id: "cinematic_renders", label: "Cinematic Renders", division: "Exhibition" },
  { id: "full_stand_package", label: "Full Stand Package", division: "Exhibition" },
  { id: "event_production", label: "Event Production & Support", division: "Exhibition" },
  { id: "automation", label: "Business Process Automation", division: "Automation" },
  { id: "lead_database", label: "Lead Database (Custom)", division: "Intelligence" },
];

const sidebarLinks = [
  { label: "Overview", href: "/account" },
  { label: "Submit a Brief", href: "/account/new-project" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Downloads", href: "/account/orders" },
  { label: "Profile", href: "/account/profile" },
];

const fieldsByService: Record<string, { name: string; type: "text" | "textarea" | "select"; label: string; placeholder?: string; options?: string[] }[]> = {
  stand_design: [
    { name: "show_name", type: "text", label: "Show / Exhibition Name", placeholder: "e.g. Hannover Messe 2026" },
    { name: "show_date", type: "text", label: "Show Dates", placeholder: "e.g. April 22–26, 2026" },
    { name: "stand_size", type: "text", label: "Stand Size (sqm)", placeholder: "e.g. 36sqm, 6x6m" },
    { name: "stand_type", type: "select", label: "Stand Type", options: ["Shell Scheme", "Space Only", "Island Stand", "Corner Stand", "Not sure yet"] },
    { name: "budget", type: "text", label: "Approximate Budget", placeholder: "e.g. £5,000–£10,000" },
    { name: "style", type: "textarea", label: "Brand / Style Notes", placeholder: "Describe your brand aesthetic, colours, tone..." },
    { name: "objectives", type: "textarea", label: "Objectives", placeholder: "What do you want visitors to feel/do at your stand?" },
    { name: "notes", type: "textarea", label: "Additional Notes", placeholder: "Anything else we should know..." },
  ],
  "3d_visualisation": [
    { name: "show_name", type: "text", label: "Show / Exhibition Name", placeholder: "e.g. Hannover Messe 2026" },
    { name: "stand_size", type: "text", label: "Stand Size (sqm)", placeholder: "e.g. 36sqm" },
    { name: "existing_design", type: "textarea", label: "Existing Design / Floor Plan", placeholder: "Describe what you have — or attach a file below" },
    { name: "render_count", type: "select", label: "Number of Renders Needed", options: ["1–2", "3–5", "6–10", "10+", "Not sure"] },
    { name: "style", type: "textarea", label: "Style References", placeholder: "Describe the look you want, or reference examples..." },
    { name: "deadline", type: "text", label: "Deadline", placeholder: "When do you need the renders?" },
    { name: "notes", type: "textarea", label: "Additional Notes", placeholder: "Anything else..." },
  ],
  cinematic_renders: [
    { name: "show_name", type: "text", label: "Show / Exhibition Name", placeholder: "e.g. Hannover Messe 2026" },
    { name: "stand_size", type: "text", label: "Stand Size (sqm)", placeholder: "e.g. 36sqm" },
    { name: "format", type: "select", label: "Output Format", options: ["Still images (4K)", "Short video loop (15s)", "Full cinematic video (30–60s)", "All of the above"] },
    { name: "mood", type: "textarea", label: "Mood / Style Brief", placeholder: "Describe the atmosphere, lighting, camera angle preferences..." },
    { name: "deadline", type: "text", label: "Deadline", placeholder: "When do you need the renders?" },
    { name: "notes", type: "textarea", label: "Additional Notes", placeholder: "Anything else..." },
  ],
  full_stand_package: [
    { name: "show_name", type: "text", label: "Show / Exhibition Name", placeholder: "e.g. Hannover Messe 2026" },
    { name: "show_date", type: "text", label: "Show Dates", placeholder: "e.g. April 22–26, 2026" },
    { name: "stand_size", type: "text", label: "Stand Size (sqm)", placeholder: "e.g. 36sqm, 6x6m" },
    { name: "stand_type", type: "select", label: "Stand Type", options: ["Shell Scheme", "Space Only", "Island Stand", "Corner Stand", "Not sure yet"] },
    { name: "budget", type: "text", label: "Total Budget (design + production)", placeholder: "e.g. £15,000–£30,000" },
    { name: "included", type: "select", label: "What do you need?", options: ["Design + 3D renders only", "Design + renders + event support", "Full package incl. on-site management"] },
    { name: "objectives", type: "textarea", label: "Objectives & Brand Notes", placeholder: "What do you want to achieve at this show?" },
    { name: "notes", type: "textarea", label: "Additional Notes", placeholder: "Anything else we should know..." },
  ],
  event_production: [
    { name: "show_name", type: "text", label: "Show / Exhibition Name", placeholder: "e.g. Hannover Messe 2026" },
    { name: "show_date", type: "text", label: "Show Dates", placeholder: "e.g. April 22–26, 2026" },
    { name: "location", type: "text", label: "Venue & Location", placeholder: "e.g. Messe Frankfurt, Germany" },
    { name: "support_type", type: "select", label: "Support Type Needed", options: ["On-site management only", "Contractor coordination", "Logistics & shipping", "Full event support", "Post-show reporting"] },
    { name: "team_size", type: "text", label: "Your Team Size On-site", placeholder: "e.g. 2 staff members" },
    { name: "notes", type: "textarea", label: "Brief & Requirements", placeholder: "Tell us what you need from us on the ground..." },
  ],
  automation: [
    { name: "company_size", type: "select", label: "Company Size", options: ["1–10", "11–50", "51–200", "200+"] },
    { name: "tools", type: "text", label: "Tools / Software You Use", placeholder: "e.g. HubSpot, Notion, Google Sheets, Xero..." },
    { name: "problem", type: "textarea", label: "What Process Do You Want Automated?", placeholder: "Describe the workflow, what triggers it, and what the desired output is..." },
    { name: "volume", type: "text", label: "Volume / Frequency", placeholder: "e.g. ~200 leads/month, daily reports..." },
    { name: "budget", type: "text", label: "Approximate Budget", placeholder: "e.g. £500–£2,000 one-time build" },
    { name: "notes", type: "textarea", label: "Additional Notes", placeholder: "Anything else..." },
  ],
  lead_database: [
    { name: "sector", type: "text", label: "Target Sector / Industry", placeholder: "e.g. Automotive, Food & Beverage, Medical Devices..." },
    { name: "geography", type: "text", label: "Target Geography", placeholder: "e.g. UK, DACH, Benelux, Europe-wide..." },
    { name: "show", type: "text", label: "Target Show / Event (if applicable)", placeholder: "e.g. Interpack 2026, visitors only" },
    { name: "job_titles", type: "text", label: "Target Job Titles", placeholder: "e.g. Marketing Manager, Procurement Director, Head of Operations..." },
    { name: "volume", type: "select", label: "Volume Needed", options: ["Up to 500", "500–1,000", "1,000–5,000", "5,000+", "Not sure"] },
    { name: "format", type: "select", label: "Delivery Format", options: ["CSV", "Excel", "Google Sheets", "CRM import (specify below)"] },
    { name: "notes", type: "textarea", label: "Additional Requirements", placeholder: "Any other filters, enrichment needs, or context..." },
  ],
};

export default function NewProjectPage() {
  const [service, setService] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const fields = service ? (fieldsByService[service] ?? []) : [];

  function handleField(name: string, value: string) {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service) { setError("Please select a service."); return; }
    setLoading(true);
    setError("");

    const payload = new FormData();
    payload.append("service", service);
    payload.append("fields", JSON.stringify(formData));
    if (files) {
      Array.from(files).forEach(f => payload.append("files", f));
    }

    try {
      const res = await fetch("/api/brief", { method: "POST", body: payload });
      if (!res.ok) throw new Error("Failed to submit");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <main>
        <section className="section-pad bg-white border-b border-[#E2DFDA]">
          <div className="container-xl max-w-xl text-center">
            <span className="eyebrow">Brief Received</span>
            <h1 className="headline-display mb-4">We&apos;ll be in touch.</h1>
            <p className="body-base text-[#5C5C5C] mb-8">Your project brief has been submitted. We&apos;ll review it and respond within 24 hours.</p>
            <Link href="/account" className="btn-primary">Back to Dashboard</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display">Submit a Brief</h1>
          <p className="body-lead max-w-xl">Tell us what you need. Select a service and fill in the details — we&apos;ll come back to you within 24 hours.</p>
        </div>
      </section>

      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-1">
              {sidebarLinks.map((l) => (
                <Link key={l.label} href={l.href}
                  className={"flex items-center justify-between px-4 py-3 text-[13px] font-medium border transition-all " +
                    (l.href === "/account/new-project"
                      ? "bg-white border-[#E2DFDA] text-[#111111]"
                      : "text-[#5C5C5C] hover:text-[#111111] hover:bg-white border-transparent hover:border-[#E2DFDA]")}>
                  {l.label}
                  <span className="text-[#E2DFDA]">→</span>
                </Link>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-9">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3">{error}</p>}

                {/* Service selector */}
                <div className="bg-white border border-[#E2DFDA] p-8">
                  <h2 className="headline-md mb-6">1. Select a Service</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button key={s.id} type="button"
                        onClick={() => { setService(s.id); setFormData({}); }}
                        className={"text-left px-5 py-4 border transition-all " +
                          (service === s.id
                            ? "border-[#8C7355] bg-[#8C7355]/5"
                            : "border-[#E2DFDA] hover:border-[#8C7355] bg-white")}>
                        <p className={"text-[11px] font-semibold tracking-[0.15em] uppercase mb-1 " +
                          (service === s.id ? "text-[#8C7355]" : "text-[#B0A898]")}>{s.division}</p>
                        <p className={"text-[14px] font-semibold " +
                          (service === s.id ? "text-[#111111]" : "text-[#5C5C5C]")}>{s.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic fields */}
                {service && fields.length > 0 && (
                  <div className="bg-white border border-[#E2DFDA] p-8">
                    <h2 className="headline-md mb-6">2. Project Details</h2>
                    <div className="space-y-5">
                      {fields.map((f) => (
                        <div key={f.name}>
                          <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">{f.label}</label>
                          {f.type === "textarea" ? (
                            <textarea rows={4} placeholder={f.placeholder}
                              value={formData[f.name] ?? ""}
                              onChange={e => handleField(f.name, e.target.value)}
                              className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors resize-none" />
                          ) : f.type === "select" ? (
                            <select value={formData[f.name] ?? ""}
                              onChange={e => handleField(f.name, e.target.value)}
                              style={{ appearance: "none" }}
                              className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] focus:outline-none focus:border-[#8C7355] transition-colors">
                              <option value="">Select an option</option>
                              {f.options?.map(o => <option key={o}>{o}</option>)}
                            </select>
                          ) : (
                            <input type="text" placeholder={f.placeholder}
                              value={formData[f.name] ?? ""}
                              onChange={e => handleField(f.name, e.target.value)}
                              className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* File upload */}
                {service && (
                  <div className="bg-white border border-[#E2DFDA] p-8">
                    <h2 className="headline-md mb-2">3. Attachments <span className="text-[#8B8B8B] text-[14px] font-normal normal-case tracking-normal">(optional)</span></h2>
                    <p className="body-sm text-[#8B8B8B] mb-5">Upload floor plans, renders, brand guidelines, reference images, or any files that help us understand your project.</p>
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-[#E2DFDA] hover:border-[#8C7355] transition-colors p-8 text-center">
                        <p className="text-[13px] font-medium text-[#5C5C5C] mb-1">
                          {files && files.length > 0
                            ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                            : "Click to upload files"}
                        </p>
                        <p className="text-[11px] text-[#B0B0B0]">PDF, PNG, JPG, DWG, DXF, ZIP — max 20MB each</p>
                      </div>
                      <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.zip,.ai,.eps"
                        onChange={e => setFiles(e.target.files)}
                        className="sr-only" />
                    </label>
                    {files && files.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {Array.from(files).map(f => (
                          <li key={f.name} className="text-[12px] text-[#5C5C5C] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#8C7355] flex-shrink-0" />
                            {f.name} <span className="text-[#B0B0B0]">({(f.size / 1024 / 1024).toFixed(1)}MB)</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {service && (
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 py-4 text-[12px]">
                    {loading ? "Submitting..." : "Submit Brief"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
