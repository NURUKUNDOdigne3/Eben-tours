export default function Filter() {
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "50px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="filter-btn active"
          style={{
            padding: "12px 28px",
            border: "2px solid var(--color-primary)",
            background: "var(--color-primary)",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          <i className="fas fa-earth-africa" style={{ marginRight: "8px" }}></i>
          All Destinations
        </button>
        <button
          className="filter-btn"
          style={{
            padding: "12px 28px",
            border: "2px solid var(--color-primary)",
            background: "#fff",
            color: "var(--color-primary)",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          <i className="fas fa-flag" style={{ marginRight: "8px" }}></i>Rwanda
        </button>
        <button
          className="filter-btn"
          style={{
            padding: "12px 28px",
            border: "2px solid var(--color-primary)",
            background: "#fff",
            color: "var(--color-primary)",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          <i className="fas fa-flag" style={{ marginRight: "8px" }}></i>Kenya
        </button>
        <button
          className="filter-btn"
          style={{
            padding: "12px 28px",
            border: "2px solid var(--color-primary)",
            background: "#fff",
            color: "var(--color-primary)",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          <i className="fas fa-flag" style={{ marginRight: "8px" }}></i>
          Tanzania
        </button>
        <button
          className="filter-btn"
          style={{
            padding: "12px 28px",
            border: "2px solid var(--color-primary)",
            background: "#fff",
            color: "var(--color-primary)",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          <i className="fas fa-flag" style={{ marginRight: "8px" }}></i>Uganda
        </button>
      </div>
    </div>
  );
}
