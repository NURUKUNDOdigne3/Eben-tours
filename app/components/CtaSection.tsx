import styles from "./CtaSection.module.css";
export default function CtaSection() {
  return (
    <section className={styles.hero} aria-label="Main hero - feel the nature">
      <video className={styles["hero-video"]} autoPlay muted loop playsInline>
        <source src="/vids/Web_vidd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className={styles.overlay}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7,18,20,0.4), rgba(0,0,0,0.6))",
          zIndex: 1,
        }}
      />

      <svg
        style={{ color: "white" }}
        className={`${styles.leaf} ${styles["leaf--one"]}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 21s6-5 10-7c4-2 9-6 9-10 0 0-6 1-11 4C6 12 2 17 2 21z"
          fill="#2ea36b"
          opacity="0.95"
        />
      </svg>
      <svg
        className={`${styles.leaf} ${styles["leaf--two"]}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 19s5-4 9-6c4-2 8-6 8-9 0 0-5 1-9 4C7 12 3 17 3 19z"
          fill="#1f8a4c"
          opacity="0.9"
        />
      </svg>

      <div className={styles.container}>
        <div className={styles["hero-content"]}>
          <span className={styles.eyebrow}>Nature • Calm • Adventure</span>
          <h1 className={styles.title}>Feel the Nature</h1>
          <p className={styles.lead}>
            Pure. Calm. Beautiful. Discover green landscapes, quiet trails, and
            places that restore the spirit. Your journey to peace begins with
            one step.
          </p>

          <div className={styles["cta-row"]}>
            <button
              className={`${styles.btn} ${styles["btn-primary"]}`}
              id="exploreBtn"
              aria-label="Explore nature"
            >
              Explore Nature
            </button>
            <button
              className={`${styles.btn} ${styles["btn-ghost"]}`}
              id="learnBtn"
              aria-label="Learn more about experiences"
            >
              Learn More
            </button>
          </div>
        </div>

        <aside className={styles.card} aria-hidden="false">
          <h3>Quick Picks</h3>
          <div className={styles.feature}>
            <div className={styles.dot}>1</div>
            <div>
              <strong>Guided Nature Tours</strong>
              <p className={styles["muted-small"]}>
                Local guides, small groups, and authentic experiences.
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.dot}>2</div>
            <div>
              <strong>Eco Stays</strong>
              <p className={styles["muted-small"]}>
                Comfortable, low-impact accommodations near scenic spots.
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.dot}>3</div>
            <div>
              <strong>Photography Spots</strong>
              <p className={styles["muted-small"]}>
                Sunrise and sunset locations hand-picked by our team.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
