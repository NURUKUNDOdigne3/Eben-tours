import SectionHeader from "../components/SectionHeader";

function BlogsLoadingSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className="animate-pulse"
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(30,86,49,0.08)",
        border: "1px solid rgba(30,86,49,0.08)",
      }}
    >
      <div style={{ height: "190px", background: "rgba(30,86,49,0.10)" }} />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: "14px",
            width: "75%",
            background: "rgba(30,86,49,0.12)",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "100%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "92%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "14px",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              height: "10px",
              width: "30%",
              background: "rgba(30,86,49,0.12)",
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              height: "10px",
              width: "20%",
              background: "rgba(30,86,49,0.12)",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  ));
}

export default function Loading() {
  return (
    <>
      <SectionHeader
        title="Latest from our Journal"
        note="Our Journal"
        description=""
      />

      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <BlogsLoadingSkeleton />
        </div>
      </div>
    </>
  );
}
