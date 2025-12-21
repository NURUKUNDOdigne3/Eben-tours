interface IDestinationCard {
  bg: string;
  flag: string;
  isFeatured: boolean;
  title: string;
  description: string;
  peakSeason: string;
  href?: string;
}
export default function DestinationCard({
  bg,
  flag,
  isFeatured,
  title,
  description,
  peakSeason,
  href = "#",
}: IDestinationCard) {
  return (
    <div
      className="destination-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(30,86,49,0.12)",
        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        className="destination-image"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "280px",
          background: "linear-gradient(135deg, #1E5631 0%, #295135 100%)",
          transition: "all 0.6s ease",
        }}
      >
        <img
          src={bg}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.6s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(135deg, rgba(30,86,49,0.4), rgba(30,86,49,0.6))",
            transition: "all 0.4s ease",
          }}
        ></div>

        {isFeatured && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255,255,255,0.95)",
              padding: "8px 14px",
              borderRadius: "999px",
              fontWeight: "700",
              fontSize: "12px",
              color: "var(--color-primary)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Featured
          </div>
        )}
      </div>

      <div className="destination-content" style={{ padding: "28px" }}>
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: "24px",
            fontWeight: "700",
            color: "var(--color-primary)",
            fontFamily: "var(--font-serif)",
          }}
        >
          <img
            src={flag}
            alt={title + " Flag"}
            style={{
              width: "28px",
              height: "auto",
              marginRight: "8px",
              display: "inline-block",
              verticalAlign: "middle",
              borderRadius: "4px",
            }}
          />
          {title}
        </h3>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "14px",
            lineHeight: "1.6",
            margin: "0 0 16px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            margin: "16px 0",
            padding: "12px 0",
            borderTop: "1px solid rgba(30,86,49,0.1)",
            borderBottom: "1px solid rgba(30,86,49,0.1)",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            <i
              className="fas fa-info-circle"
              style={{ color: "var(--color-primary)", marginRight: "6px" }}
            ></i>
            Peak Season: {peakSeason}
          </span>
        </div>

        <a
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-primary)",
            fontWeight: "700",
            textDecoration: "none",
            transition: "all 0.3s ease",
            fontSize: "14px",
          }}
        >
          Explore <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}
