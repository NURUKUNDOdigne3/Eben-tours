interface ISingleService {
  title: string;
  description: string;
  icon: any;
  notes: string[];
}

export default function SingleService({
  title,
  description,
  icon,
  notes,
}: ISingleService) {
  return (
    <div
      style={{
        padding: "40px",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 247, 244, 0.9))",
        borderRadius: "18px",
        border: "1.5px solid rgba(30, 86, 49, 0.12)",
        boxShadow: "0 10px 35px rgba(30, 86, 49, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background:
            "linear-gradient(135deg, rgba(30, 86, 49, 0.08), transparent)",
          borderRadius: "50%",
          opacity: 0.5,
        }}
      ></div>
      <div
        style={{
          width: 60,
          height: 60,
          background:
            "linear-gradient(135deg, rgba(30, 86, 49, 0.18), rgba(41, 81, 53, 0.12))",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          border: "1.5px solid rgba(30, 86, 49, 0.2)",
        }}
      >
        {icon}
        {/* <i style={{ color: "var(--color-primary)", fontSize: "32px" }}></i> */}
      </div>
      <h3
        style={{
          fontSize: "22px",
          color: "var(--color-secondary)",
          margin: "0 0 14px 0",
          fontWeight: 800,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0",
          fontSize: "14px",
          lineHeight: 1.8,
          color: "var(--muted)",
          fontWeight: 500,
        }}
      >
        {description}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {notes.map((note) => (
          <span
            key={note}
            style={{
              display: "inline-block",
              padding: "4px 10px",
              background: "rgba(30, 86, 49, 0.08)",
              borderRadius: "6px",
              fontSize: "12px",
              color: "var(--color-primary)",
              fontWeight: 600,
            }}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
