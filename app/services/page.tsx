import {
  ArrowRight,
  Building,
  Bus,
  CalendarCheck,
  Headphones,
  Map,
  Plane,
  Star,
} from "lucide-react";
import SingleService from "../components/SingleService";

export default function page() {
  return (
    <section
      className="about-us"
      id="about"
      style={{
        padding: "80px 0",
        background:
          "linear-gradient(135deg, rgba(30, 86, 49, 0.03) 0%, rgba(41, 81, 53, 0.03) 100%)",
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "4px",
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
              borderRadius: "2px",
            }}
          />

          <h2
            style={{
              fontSize: "56px",
              color: "var(--color-secondary)",
              margin: "0 0 20px 0",
              letterSpacing: "-1px",
              fontWeight: 800,
            }}
          >
            About Eben Tours Safaris
          </h2>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "18px",
                color: "var(--muted)",
                lineHeight: 1.9,
                fontWeight: 500,
              }}
            >
              Crafting unforgettable African safari experiences with passion,
              expertise, and sustainable tourism practices. We believe every
              journey should be transformative.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3! gap-4!">
          <SingleService
            title="Transport Service"
            icon={<Bus />}
            notes={["4x4 Vehicles", "Expert Drivers"]}
            description="Professional 4x4 vehicles with experienced drivers. Comfortable travel through wildlife territories with strategic game viewing stops and safety first approach."
          />
          <SingleService
            title="Hotel Service"
            icon={<Building />}
            notes={["Premium Lodges", "All-Inclusive"]}
            description="Curated 3-5 star accommodations in prime locations. From luxury lodges to boutique hotels, all selected for comfort, service quality, and unforgettable experiences."
          />
          <SingleService
            title="Airline Service"
            icon={<Plane />}
            notes={["Flight Bookings", "Charter Flights"]}
            description="Seamless flight bookings and arrangements. International flights, domestic transfers, and charter flights coordinated to fit your safari itinerary perfectly."
          />
          <SingleService
            title="Tour Service"
            icon={<Map />}
            notes={["Expert Guides", "Custom Itineraries"]}
            description="Expert-guided safari experiences with certified naturalists. Customized itineraries, wildlife photography guidance, and cultural immersion activities included."
          />
          <SingleService
            title="Live Booking"
            icon={<CalendarCheck />}
            notes={["Instant Confirmation", "Flexible Dates"]}
            description="Real-time booking system with instant confirmation. Flexible scheduling, easy modifications, and transparent pricing. Book your adventure with just a few clicks."
          />
          <SingleService
            title="24/7 Support"
            icon={<Headphones />}
            notes={["Round the Clock", "Multi-Channel"]}
            description="Always available support team. Phone, email, chat assistance round the clock. We're here for you before, during, and after your safari adventure."
          />
        </div>
      </div>

      <div
        className="container"
        style={{
          background: "linear-gradient(135deg, var(--color-primary), #2d5a47)",
          padding: "60px",
          borderRadius: "20px",
          textAlign: "center",
          color: "#fff",
          marginTop: "55px",
          boxShadow: "0 15px 50px rgba(30,86,49,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            margin: "0 0 16px",
            fontFamily: "var(--font-serif)",
            color: "white",
          }}
        >
          Complete Peace of Mind
        </h2>
        <p
          style={{
            fontSize: "16px",
            margin: "0 0 28px",
            color: "white",
            opacity: 0.95,
          }}
        >
          All services are professionally managed and coordinated. One single
          point of contact for everything you need. Let us handle the details
          while you enjoy the adventure.
        </p>
        <a
          href="#contact"
          className="cta-primary transition-all hover:opacity-80 cursor-pointer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#fff",
            color: "var(--color-primary)",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: 700,
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <ArrowRight /> Start Booking Now
        </a>
      </div>
    </section>
  );
}
