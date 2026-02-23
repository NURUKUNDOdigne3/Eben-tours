"use client";

import SectionHeader from "@/app/components/SectionHeader";
import {
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle,
  Info,
  InfoIcon,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  Users2,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { toast } from "sonner";

type TabKey = "itinerary" | "inclusions" | "exclusions" | "info";

type ItineraryItem = {
  time: string;
  activity: string;
  description: string;
};

type PackageDetailsRow = {
  id: string;
  title: string;
  location: string;
  durationDays: number;
  price: number;
  maxGroup: number;
  featured: boolean;
  imageUrl?: string | null;
  description?: string | null;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  info: string[];
};

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[rgba(30,86,49,0.10)] ${
        className ?? ""
      }`}
    />
  );
}

function PackageDetailsSkeleton() {
  return (
    <>
      <SectionHeader title="" note="Tour Details" description="" />

      <div className="container">
        <div
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,86,49,0.15)",
            marginBottom: "60px",
          }}
        >
          <SkeletonBox className="h-full w-full" />
        </div>

        <div
          className="grid grid-rows-1! sm:grid-cols-3! gap-[40px]"
          style={{ marginBottom: "60px" }}
        >
          <div className="col-span-2">
            <div
              className="grid grid-rows-1! sm:grid-cols-3! gap-[16px]"
              style={{ marginBottom: "40px" }}
            >
              <SkeletonBox className="h-[104px] w-full" />
              <SkeletonBox className="h-[104px] w-full" />
              <SkeletonBox className="h-[104px] w-full" />
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-4!"
              style={{
                marginBottom: "32px",
                borderBottom: "2px solid rgba(30,86,49,0.1)",
                background: "#faf7f4",
              }}
            >
              <SkeletonBox className="h-[54px] w-full" />
              <SkeletonBox className="h-[54px] w-full" />
              <SkeletonBox className="h-[54px] w-full" />
              <SkeletonBox className="h-[54px] w-full" />
            </div>

            <div className="tab-content">
              <SkeletonBox className="h-[34px] w-[220px] mb-[28px]" />
              <div style={{ display: "grid", gap: "16px" }}>
                <SkeletonBox className="h-[90px] w-full" />
                <SkeletonBox className="h-[90px] w-full" />
                <SkeletonBox className="h-[90px] w-full" />
              </div>
            </div>
          </div>

          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#fff",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(30,86,49,0.12)",
                border: "1px solid rgba(30,86,49,0.1)",
                marginBottom: "24px",
              }}
            >
              <SkeletonBox className="h-[16px] w-[130px] mb-[14px]" />
              <SkeletonBox className="h-[56px] w-[220px] mb-[10px]" />
              <SkeletonBox className="h-[14px] w-[180px] mb-[24px]" />
              <SkeletonBox className="h-[1px] w-full mb-[24px]" />

              <div style={{ display: "grid", gap: "16px" }}>
                <SkeletonBox className="h-[44px] w-full" />
                <SkeletonBox className="h-[44px] w-full" />
                <SkeletonBox className="h-[44px] w-full" />
                <SkeletonBox className="h-[44px] w-full" />
                <SkeletonBox className="h-[44px] w-full" />
                <SkeletonBox className="h-[52px] w-full" />
              </div>
            </div>

            <SkeletonBox className="h-[132px] w-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default function PackageDetails() {
  const params = useParams<{ id: string }>();
  const id = String(params?.id ?? "");
  const [activeTab, setActiveTab] = useState<TabKey>("itinerary");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [travelDate, setTravelDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pkg, setPkg] = useState<PackageDetailsRow | null>(null);

  useEffect(() => {
    let alive = true;
    if (!id) return;
    setLoading(true);
    fetch(`/api/packages/${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setPkg(data?.package ?? null);
      })
      .catch(() => {
        if (!alive) return;
        setPkg(null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return <PackageDetailsSkeleton />;
  }

  if (!pkg) {
    return (
      <>
        <SectionHeader
          title="Package not found"
          note="Tour Details"
          description="We couldn't load this package. Please go back and try another one."
        />

        <div className="container" style={{ paddingBottom: "60px" }}>
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid rgba(30,86,49,0.1)",
              boxShadow: "0 10px 40px rgba(30,86,49,0.08)",
            }}
          >
            <p style={{ margin: 0, color: "var(--muted)" }}>
              This package may have been removed, or your connection might be
              offline.
            </p>
            <div style={{ marginTop: "16px" }}>
              <Link
                href="/packages"
                style={{
                  display: "inline-block",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Back to packages
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const durationLabel = `${pkg.durationDays} Day${
    pkg.durationDays === 1 ? "" : "s"
  }`;

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    if (submitting) return;
    if (!fullName.trim() || !email.trim() || !travelDate) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          packageId: id,
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          travellers,
          date: travelDate,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(String(data?.error || "Booking failed"));

      toast.success(
        `Booking received! Your booking ID is ${String(
          data?.booking?.id ?? ""
        )}.`
      );

      setFullName("");
      setEmail("");
      setPhone("");
      setTravellers(2);
      setTravelDate("");
    } catch (err: any) {
      toast.error(String(err?.message || "Booking failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SectionHeader
        title={pkg.title}
        note="Tour Details"
        description={
          pkg.description ||
          "Discover this tour package and create unforgettable memories."
        }
      />

      <div className="container">
        <div
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,86,49,0.15)",
            marginBottom: "60px",
          }}
        >
          <Image
            width={500}
            height={500}
            src={pkg.imageUrl || "/canopy_walk.webp"}
            alt={pkg.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          className="grid grid-rows-1! sm:grid-cols-3! gap-[40px]"
          style={{
            marginBottom: "60px",
          }}
        >
          <div className="col-span-2">
            <div
              className="grid grid-rows-1! sm:grid-cols-3! gap-[16px]"
              style={{
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--color-primary)",
                  boxShadow: "0 4px 12px rgba(30,86,49,0.08)",
                }}
              >
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Calendar size={18} style={{ marginRight: "6px" }} />
                  Duration
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  {durationLabel}
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--color-primary)",
                  boxShadow: "0 4px 12px rgba(30,86,49,0.08)",
                }}
              >
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MapPin size={18} style={{ marginRight: "6px" }} />
                  Destination
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  {pkg.location || "-"}
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--color-primary)",
                  boxShadow: "0 4px 12px rgba(30,86,49,0.08)",
                }}
              >
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Users2 size={18} style={{ marginRight: "6px" }} />
                  Min Group
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  {pkg.maxGroup ? `${pkg.maxGroup} People` : "-"}
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-4!"
              style={{
                position: "sticky",
                top: 0,
                // display: "flex",
                // gap: 0,
                marginBottom: "32px",
                borderBottom: "2px solid rgba(30,86,49,0.1)",
                // flexWrap: "wrap",
                background: "#faf7f4",
                zIndex: 10,
              }}
            >
              <button
                type="button"
                className="tab-btn"
                onClick={() => setActiveTab("itinerary")}
                style={{
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  color:
                    activeTab === "itinerary"
                      ? "var(--color-primary)"
                      : "var(--muted)",
                  borderBottom:
                    activeTab === "itinerary"
                      ? "3px solid var(--color-primary)"
                      : "3px solid transparent",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Map size={22} style={{ marginRight: "8px" }} />
                Itinerary
              </button>

              <button
                type="button"
                className="tab-btn"
                onClick={() => setActiveTab("inclusions")}
                style={{
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  color:
                    activeTab === "inclusions"
                      ? "var(--color-primary)"
                      : "var(--muted)",
                  borderBottom:
                    activeTab === "inclusions"
                      ? "3px solid var(--color-primary)"
                      : "3px solid transparent",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckCircle size={22} style={{ marginRight: "8px" }} />
                Inclusions
              </button>

              <button
                type="button"
                className="tab-btn"
                onClick={() => setActiveTab("exclusions")}
                style={{
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  color:
                    activeTab === "exclusions"
                      ? "var(--color-primary)"
                      : "var(--muted)",
                  borderBottom:
                    activeTab === "exclusions"
                      ? "3px solid var(--color-primary)"
                      : "3px solid transparent",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <XCircle size={22} style={{ marginRight: "8px" }} />
                Exclusions
              </button>

              <button
                type="button"
                className="tab-btn"
                onClick={() => setActiveTab("info")}
                style={{
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  color:
                    activeTab === "info"
                      ? "var(--color-primary)"
                      : "var(--muted)",
                  borderBottom:
                    activeTab === "info"
                      ? "3px solid var(--color-primary)"
                      : "3px solid transparent",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Info size={22} style={{ marginRight: "8px" }} />
                Info
              </button>
            </div>

            {activeTab === "itinerary" && (
              <div className="tab-content">
                <h2
                  style={{
                    fontSize: "28px",
                    margin: "0 0 32px",
                    color: "var(--color-secondary)",
                  }}
                >
                  Tour Itinerary
                </h2>

                {pkg.itinerary.length ? (
                  pkg.itinerary.map((item, idx) => (
                    <div
                      key={`${item.time}-${idx}`}
                      style={{
                        display: "flex",
                        gap: "24px",
                        marginBottom:
                          idx === pkg.itinerary.length - 1 ? 0 : "40px",
                        position: "relative",
                        paddingBottom:
                          idx === pkg.itinerary.length - 1 ? 0 : "40px",
                        borderBottom:
                          idx === pkg.itinerary.length - 1
                            ? "none"
                            : "1px solid rgba(30,86,49,0.1)",
                      }}
                    >
                      <div style={{ flexShrink: 0, width: "100px" }}>
                        <div
                          style={{
                            background: "var(--color-primary)",
                            color: "#fff",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                        >
                          {item.time || "--"}
                        </div>
                      </div>
                      <div>
                        <h3
                          style={{
                            margin: "0 0 8px",
                            fontSize: "20px",
                            color: "var(--color-primary)",
                            fontFamily: "var(--font-serif)",
                          }}
                        >
                          {item.activity || "Activity"}
                        </h3>
                        <p
                          style={{
                            color: "var(--muted)",
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description || ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "var(--muted)", margin: 0 }}>
                    No itinerary has been published for this package yet.
                  </p>
                )}
              </div>
            )}

            {activeTab === "inclusions" && (
              <div className="tab-content">
                <h2
                  style={{
                    fontSize: "28px",
                    margin: "0 0 32px",
                    color: "var(--color-secondary)",
                  }}
                >
                  What's Included
                </h2>
                {pkg.inclusions.length ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "16px",
                    }}
                  >
                    {pkg.inclusions.map((item, idx) => (
                      <div
                        key={`${idx}-${item}`}
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "flex-start",
                          padding: "20px",
                          background: "#fff",
                          borderRadius: "12px",
                          borderLeft: "4px solid var(--color-primary)",
                        }}
                      >
                        <Check
                          style={{
                            color: "var(--color-primary)",
                            fontSize: "20px",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <h4
                            style={{
                              margin: 0,
                              color: "var(--color-primary)",
                              fontWeight: 700,
                            }}
                          >
                            {item}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--muted)", margin: 0 }}>
                    No inclusions have been published for this package yet.
                  </p>
                )}
              </div>
            )}

            {activeTab === "exclusions" && (
              <div className="tab-content">
                <h2
                  style={{
                    fontSize: "28px",
                    margin: "0 0 32px",
                    color: "var(--color-secondary)",
                  }}
                >
                  What's Not Included
                </h2>
                {pkg.exclusions.length ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "16px",
                    }}
                  >
                    {pkg.exclusions.map((item, idx) => (
                      <div
                        key={`${idx}-${item}`}
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "flex-start",
                          padding: "20px",
                          background: "#fff",
                          borderRadius: "12px",
                          borderLeft: "4px solid #d32f2f",
                        }}
                      >
                        <X
                          style={{
                            color: "#d32f2f",
                            fontSize: "20px",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <h4
                            style={{
                              margin: 0,
                              color: "#d32f2f",
                              fontWeight: 700,
                            }}
                          >
                            {item}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--muted)", margin: 0 }}>
                    No exclusions have been published for this package yet.
                  </p>
                )}
              </div>
            )}

            {activeTab === "info" && (
              <div className="tab-content">
                <h2
                  style={{
                    fontSize: "28px",
                    margin: "0 0 32px",
                    color: "var(--color-secondary)",
                  }}
                >
                  Essential Information
                </h2>
                {pkg.info.length ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "20px",
                    }}
                  >
                    {pkg.info.map((item, idx) => (
                      <div key={`${idx}-${item}`}>
                        <h4
                          style={{
                            margin: "0 0 12px",
                            color: "var(--color-primary)",
                            fontWeight: 700,
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <InfoIcon size={20} style={{ marginRight: "8px" }} />
                          Info
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--muted)",
                            lineHeight: 1.7,
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--muted)", margin: 0 }}>
                    No additional info has been published for this package yet.
                  </p>
                )}
              </div>
            )}
          </div>

          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#fff",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(30,86,49,0.12)",
                border: "1px solid rgba(30,86,49,0.1)",
                marginBottom: "24px",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "14px",
                    margin: "0 0 8px",
                    fontWeight: 600,
                  }}
                >
                  Price Per Person
                </p>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    margin: 0,
                  }}
                >
                  ${Number(pkg.price.toFixed(0)).toLocaleString()}
                </div>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                    margin: "8px 0 0",
                    fontWeight: 500,
                  }}
                >
                  Based on minimum 2 people
                </p>
              </div>

              <div
                style={{
                  height: "1px",
                  background: "rgba(30,86,49,0.1)",
                  marginBottom: "24px",
                }}
              />

              <form
                onSubmit={submitBooking}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Rambo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid rgba(30,86,49,0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid rgba(30,86,49,0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Contact Number
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className="contact-phone">
                      <PhoneInput
                        defaultCountry="rw"
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                          name: "phone",
                          placeholder: "7XX XXX XXX",
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    required
                    min={2}
                    max={20}
                    value={travellers}
                    onChange={(e) => setTravellers(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid rgba(30,86,49,0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid rgba(30,86,49,0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                <div
                  style={{
                    background: "rgba(30,86,49,0.05)",
                    padding: "14px",
                    borderRadius: "8px",
                    borderLeft: "3px solid var(--color-primary)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "var(--color-secondary)",
                      fontWeight: 600,
                    }}
                  >
                    Total:{" "}
                    <span style={{ color: "var(--color-primary)" }}>
                      ${Number(pkg.price.toFixed(0)).toLocaleString()}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "12px",
                      color: "var(--muted)",
                    }}
                  >
                    Includes all services & lunch
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.8 : 1,
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CalendarCheck style={{ marginRight: "8px" }} />
                  {submitting ? "Submitting..." : "Book Now"}
                  <span className="invisible" />
                </button>

                <Link
                  href="https://wa.me/+250786140897"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "14px",
                    background: "rgba(30,86,49,0.1)",
                    color: "var(--color-primary)",
                    border: "2px solid var(--color-primary)",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MessageCircle style={{ marginRight: "8px" }} />
                  Chat on WhatsApp
                  <span className="invisible" />
                </Link>
              </form>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(30,86,49,0.08), rgba(30,86,49,0.02))",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid rgba(30,86,49,0.1)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 16px",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Have Questions?
              </h4>
              <a
                href="tel:+250786140897"
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "12px",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                <Phone style={{ fontSize: "16px" }} />
                (+250) 786 140 897
              </a>
              <a
                href="mailto:administration@ebenconnections.com"
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                <Mail style={{ fontSize: "16px" }} />
                administration@ebenconnections.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
