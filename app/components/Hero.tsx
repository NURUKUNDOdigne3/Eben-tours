import "./Hero.module.css";
export default function Hero() {
  return (
    <section
      className="video-hero"
      style={{ position: "relative", overflow: "hidden", minHeight: "90vh" }}
    >
      <div
        className="video-carousel"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <video
          className="carousel-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.6)",
          }}
          src="/vids/Web_vidd.mp4"
        ></video>
        <video
          className="carousel-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
            filter: "brightness(0.6)",
          }}
          src="/vids/4911905_Gorilla_Wildlife_1920x1080.mp4"
        ></video>
        <video
          className="carousel-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
            filter: "brightness(0.6)",
          }}
          src="/vids/463059_Elephant_Elephants_1920x1080.mp4"
        ></video>
        <video
          className="carousel-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
            filter: "brightness(0.6)",
          }}
          src="/vids/giraffe.mp4"
        ></video>
      </div>
      <div
        className="video-hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "520px",
          padding: "80px 20px 60px 20px",
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "48px",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          The Ultimate Bespoke African Safari Experience Let the Adventure Begin
        </h1>

        <div
          className="mt-12"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <a
            href="#packages"
            className="cta-primary transition-all hover:opacity-80 cursor-pointer"
            style={{
              flex: 1,
              background:
                "linear-gradient(135deg,rgba(30, 86, 49, 0.8),rgba(41, 81, 53, 0.8))",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              letterSpacing: "0.3px",
              backdropFilter: "blur(10px)",
              fontSize: "18px",
            }}
          >
            View Packages
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Contact Guide
          </a>
        </div>
      </div>

      <div className="overlay"></div>

      <div className="carousel-indicators" id="carouselIndicators">
        <span className="indicator active"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
      </div>
    </section>
  );
}
