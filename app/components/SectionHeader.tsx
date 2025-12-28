interface ISectionHeader {
  title: string;
  description: string;
  note: string;
}
export default function SectionHeader({
  title,
  description,
  note,
}: ISectionHeader) {
  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        marginBottom: "60px",
        marginTop: "70px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 16px",
          background:
            "linear-gradient(135deg, rgba(30,86,49,0.1), rgba(30,86,49,0.05))",
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid rgba(30,86,49,0.15)",
        }}
      >
        <p
          style={{
            color: "var(--color-primary)",
            fontWeight: "700",
            fontSize: "12px",
            letterSpacing: "1.5px",
            margin: "0",
            textTransform: "uppercase",
          }}
        >
          {note}
        </p>
      </div>
      <h2
        className="w-full sm:w-[1050px]! text-[46px] sm:text-[48px]!"
        style={{
          // margin: "16px 0",
          color: "var(--color-secondary)",
          fontFamily: "var(--font-serif)",
          margin: "0 auto",
        }}
      >
        {title}
      </h2>
      <p
        className="text-[13px] sm:text-[18px]!"
        style={{
          color: "var(--muted)",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}
