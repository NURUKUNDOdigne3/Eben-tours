export default function SingleBlog() {
  return (
    <article className="card">
      <img
        src="/gorila.jpg"
        alt="What to pack for a volcano trek"
        loading="lazy"
      />
      <div>
        <h3>What to pack for a volcano trek</h3>
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            lineHeight: 1.5,
            margin: 0,
            flex: 1,
          }}
        >
          Essential gear and clothing recommendations to stay comfortable and
          safe during your mountain adventure.
        </p>
        <p className="meta">
          <i
            className="fas fa-clock"
            style={{ color: "var(--color-primary)" }}
          ></i>{" "}
          5 min read <span style={{ color: "#ccc" }}>•</span>{" "}
          <i
            className="fas fa-shield-alt"
            style={{ color: "var(--color-primary)" }}
          ></i>{" "}
          Safety tips
        </p>
        <a href="#" className="read-more">
          Read Article
        </a>
      </div>
    </article>
  );
}
