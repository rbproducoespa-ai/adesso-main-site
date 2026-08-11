export function SectionHead({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className="section-head">
      <h2 className="h-section">{title}</h2>
      {aside ? <span className="label ml-auto hidden shrink-0 sm:inline">{aside}</span> : null}
    </div>
  );
}
