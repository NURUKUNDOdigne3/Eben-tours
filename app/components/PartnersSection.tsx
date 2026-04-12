import Image from "next/image";

export default function PartnersSection() {
  const partners = [
    {
      src: "/rdb.png",
      alt: "RDB Partner logo",
    },
    {
      src: "/Visit_Rwanda_Logo.png",
      alt: "Visit Rwanda Partner",
    },
    {
      src: "/OneOnly-Logo.webp",
      alt: "One Only Partner",
    },
    {
      src: "/qatar.png",
      alt: "Partner logo",
    },
    {
      src: "/Logo-011.webp",
      alt: "RDB Partner logo",
    },
    {
      src: "/RwandaAirLogo.svg",
      alt: "RwandaAir logo",
    },
  ];

  // Duplicate the partners array for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="partners-carousel" style={{ marginTop: "28px" }}>
      <div className="carousel-track">
        {duplicatedPartners.map((partner, index) => (
          <div key={index} className="carousel-item">
            <Image
              width={100}
              height={100}
              src={partner.src}
              alt={partner.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
