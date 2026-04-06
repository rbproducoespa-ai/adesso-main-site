interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
  size?: number;   // height in px, default 32
  dark?: boolean;  // true = white version
}

export function Logo({ variant = "full", className = "", size = 32, dark = false }: LogoProps) {
  const markH = size;
  const markW = Math.round(size * (900 / 750));
  const color = dark ? "#ffffff" : "#1A1A1A";

  const mark = (
    <svg
      width={markW}
      height={markH}
      viewBox="0 0 900 750"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Small separate element — upper left */}
      <polygon points="148,215 318,215 232,445" fill={color} />
      {/* Left leg of A */}
      <polygon points="330,185 488,185 358,650 188,650" fill={color} />
      {/* Right leg of A */}
      <polygon points="488,185 658,185 795,650 612,650" fill={color} />
    </svg>
  );

  if (variant === "mark") {
    return <span className={`inline-flex items-center ${className}`}>{mark}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {mark}
      <span
        style={{
          fontFamily: "var(--font-geist-sans), Geist, system-ui, sans-serif",
          fontSize: Math.round(size * 0.46),
          fontWeight: 800,
          letterSpacing: "0.18em",
          color,
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        ADESSO
      </span>
    </span>
  );
}
