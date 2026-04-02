// Admin loading skeleton — shown during page transitions within /admin
export default function AdminLoading() {
  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Breadcrumb skeleton */}
      <div style={{
        width: "140px", height: "10px",
        background: "#1E1E1E", borderRadius: "4px",
        marginBottom: "8px", animation: "pulse 1.5s ease-in-out infinite",
      }} />
      {/* Title skeleton */}
      <div style={{
        width: "240px", height: "22px",
        background: "#1E1E1E", borderRadius: "4px",
        marginBottom: "28px", animation: "pulse 1.5s ease-in-out infinite",
      }} />

      {/* Stats cards skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <div style={{ width: "80px", height: "9px", background: "#1E1E1E", borderRadius: "3px", marginBottom: "10px" }} />
            <div style={{ width: "56px", height: "28px", background: "#1E1E1E", borderRadius: "3px" }} />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: "16px", padding: "10px 16px", borderBottom: "1px solid #1A1A1A" }}>
          {[120, 80, 100, 60, 80].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: "9px", background: "#1E1E1E", borderRadius: "3px" }} />
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{
            display: "flex", gap: "16px", padding: "12px 16px",
            borderBottom: "1px solid #181818",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}>
            <div style={{ width: "180px", height: "12px", background: "#1A1A1A", borderRadius: "3px" }} />
            <div style={{ width: "80px", height: "12px", background: "#1A1A1A", borderRadius: "3px" }} />
            <div style={{ width: "100px", height: "12px", background: "#1A1A1A", borderRadius: "3px" }} />
            <div style={{ width: "60px", height: "12px", background: "#1A1A1A", borderRadius: "3px" }} />
            <div style={{ width: "80px", height: "12px", background: "#1A1A1A", borderRadius: "3px" }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
