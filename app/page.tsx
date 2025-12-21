import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DestinationSection from "./components/DestinationSection";
import CtaSection from "./components/CtaSection";
import Link from "next/link";
import SinglePackage from "./components/SinglePackage";
import PartnersSection from "./components/PartnersSection";
import SingleBlog from "./components/SingleBlog";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { blogPosts, type BlogPost } from "./blogs/blogsData";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <main className="container" id="home">
        <h2
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "60px",
            marginBottom: "30px",
            fontWeight: "600",
            fontSize: "36px",
          }}
        >
          Our Major Destinations
        </h2>
        <DestinationSection />
      </main>

      <CtaSection />

      <main className="container mb-[70px]!" id="home">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-col">
            <h2
              style={{
                position: "relative",
                zIndex: 10,
                fontWeight: "600",
                fontSize: "36px",
              }}
            >
              Eben Safaris Packages
            </h2>
            <p>Browse for more packages</p>
          </div>
          <Link
            href="/packages"
            className="hover:translate-x-2"
            style={{
              fontWeight: 700,
              color: "var(--color-primary)",
              fontSize: "15px",
              transition: "all 0.3s ease",
            }}
          >
            View all Packages →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
        </div>
      </main>

      {/* Testimonials */}
      <main className="container mb-[70px]!" id="home">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-col">
            <h2
              style={{
                position: "relative",
                zIndex: 10,
                fontWeight: "600",
                fontSize: "36px",
              }}
            >
              What our guests say
            </h2>
            <p>Real reviews from Google - See what travelers think</p>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "28px",
            borderRadius: "14px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-956a7f1b-131c-40ea-8f4f-0bfe763eba98"
            data-elfsight-app-lazy
          ></div>
        </div>
      </main>

      {/* Partners */}
      <main className="container mb-[70px]!" id="home">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-col">
            <h2
              style={{
                position: "relative",
                zIndex: 10,
                fontWeight: "600",
                fontSize: "36px",
              }}
            >
              Our Partners
            </h2>
          </div>
        </div>

        <PartnersSection />
      </main>

      {/* blog section */}
      <main className="container mb-[70px]!" id="home">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-col">
            <h2
              style={{
                position: "relative",
                zIndex: 10,
                fontWeight: "600",
                fontSize: "36px",
              }}
            >
              Latest from our Journal
            </h2>
            <p>Stories, tips, and insights from the trail</p>
          </div>
          <Link
            href="/blogs"
            className="hover:translate-x-2"
            style={{
              fontWeight: 700,
              color: "var(--color-primary)",
              fontSize: "15px",
              transition: "all 0.3s ease",
            }}
          >
            View all Articles →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {blogPosts.map((post) => (
            <SingleBlog key={post.id} post={post} />
          ))}
        </div>
      </main>

      <ContactForm />
    </>
  );
}
