"use client";

import SectionHeader from "@/app/components/SectionHeader";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";

type TabKey = "itinerary" | "inclusions" | "exclusions" | "info";

export default function PackageDetails() {
  const [activeTab, setActiveTab] = useState<TabKey>("itinerary");
  const [phone, setPhone] = useState("");
  return (
    <>
      <SectionHeader
        title="1-Day Canopy Walk Adventure in Nyungwe National Park"
        note="Tour Details"
        description="Embark on an unforgettable journey into Rwanda's lush wilderness with our 1-Day Canopy Walk Adventure in Nyungwe National Park. Departing early from Kigali, we'll take you through Rwanda's scenic landscapes."
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
          <img
            src="/canopy_walk.jpg"
            alt="Canopy Walk"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "40px",
            marginBottom: "60px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
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
                  }}
                >
                  <i
                    className="fas fa-calendar"
                    style={{ marginRight: "6px" }}
                  />
                  Duration
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  1 Day
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
                  }}
                >
                  <i
                    className="fas fa-map-marker-alt"
                    style={{ marginRight: "6px" }}
                  />
                  Destination
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  Rwanda
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
                  }}
                >
                  <i
                    className="fas fa-people-group"
                    style={{ marginRight: "6px" }}
                  />
                  Min Group
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  2 People
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 0,
                marginBottom: "32px",
                borderBottom: "2px solid rgba(30,86,49,0.1)",
                flexWrap: "wrap",
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
                }}
              >
                <i className="fas fa-map" style={{ marginRight: "8px" }} />
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
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ marginRight: "8px" }}
                />
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
                }}
              >
                <i
                  className="fas fa-times-circle"
                  style={{ marginRight: "8px" }}
                />
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
                }}
              >
                <i
                  className="fas fa-info-circle"
                  style={{ marginRight: "8px" }}
                />
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

                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    marginBottom: "40px",
                    position: "relative",
                    paddingBottom: "40px",
                    borderBottom: "1px solid rgba(30,86,49,0.1)",
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
                      04:00 AM
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
                      Departure to Nyungwe National Park
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      Begin your adventure at the break of dawn as we depart
                      from Kigali, Rwanda's vibrant capital. Settle into our
                      comfortable vehicle and prepare for a scenic drive through
                      the breathtaking countryside. Along the way, soak in the
                      stunning landscapes before arriving at the serene Nyungwe
                      National Park, where your canopy walk experience awaits.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    marginBottom: "40px",
                    position: "relative",
                    paddingBottom: "40px",
                    borderBottom: "1px solid rgba(30,86,49,0.1)",
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
                      10:00 AM
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
                      Canopy Walk Experience
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      Step into the heart of the forest as you embark on a
                      guided canopy walk. Traverse a series of suspended bridges
                      swaying gently above the lush treetops. Immerse yourself
                      in the beauty of Nyungwe's rich biodiversity, spot rare
                      birds, colorful butterflies, and playful primates as you
                      explore the vibrant ecosystem.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "24px" }}>
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
                      01:00 PM
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
                      Lunch and Return Journey
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      After an exhilarating morning, indulge in a delicious
                      lunch at the Uwinka Visitor's Center, surrounded by the
                      tranquility of the park. Recharged and ready for the
                      return journey, we begin our scenic drive back to Kigali.
                      Arrive at your hotel by evening with cherished memories
                      and a heart full of nature's wonders.
                    </p>
                  </div>
                </div>
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "16px",
                  }}
                >
                  <div
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
                    <i
                      className="fas fa-check"
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
                          margin: "0 0 4px",
                          color: "var(--color-primary)",
                          fontWeight: 700,
                        }}
                      >
                        Professional Guide
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Experienced and knowledgeable tour guide throughout the
                        journey
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-check"
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
                          margin: "0 0 4px",
                          color: "var(--color-primary)",
                          fontWeight: 700,
                        }}
                      >
                        Transportation
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Comfortable air-conditioned vehicle for the entire
                        journey
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-check"
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
                          margin: "0 0 4px",
                          color: "var(--color-primary)",
                          fontWeight: 700,
                        }}
                      >
                        Park Entrance Fee
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Access to Nyungwe National Park and canopy walk
                        facilities
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-check"
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
                          margin: "0 0 4px",
                          color: "var(--color-primary)",
                          fontWeight: 700,
                        }}
                      >
                        Lunch & Beverages
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Delicious lunch and refreshing non-alcoholic beverages
                      </p>
                    </div>
                  </div>
                </div>
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "16px",
                  }}
                >
                  <div
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
                    <i
                      className="fas fa-times"
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
                          margin: "0 0 4px",
                          color: "#d32f2f",
                          fontWeight: 700,
                        }}
                      >
                        Alcoholic Beverages
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Any alcoholic drinks are not included and available for
                        purchase
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-times"
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
                          margin: "0 0 4px",
                          color: "#d32f2f",
                          fontWeight: 700,
                        }}
                      >
                        Personal Travel Insurance
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Travel and health insurance are the responsibility of
                        the traveler
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-times"
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
                          margin: "0 0 4px",
                          color: "#d32f2f",
                          fontWeight: 700,
                        }}
                      >
                        Accommodation
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Hotel accommodation not included. This is a day trip
                        only
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-times"
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
                          margin: "0 0 4px",
                          color: "#d32f2f",
                          fontWeight: 700,
                        }}
                      >
                        Optional Activities
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Any additional activities or upgrades not mentioned in
                        the itinerary
                      </p>
                    </div>
                  </div>

                  <div
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
                    <i
                      className="fas fa-times"
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
                          margin: "0 0 4px",
                          color: "#d32f2f",
                          fontWeight: 700,
                        }}
                      >
                        Personal Expenses
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--muted)",
                          fontSize: "14px",
                        }}
                      >
                        Souvenirs, tips, and other personal expenses
                      </p>
                    </div>
                  </div>
                </div>
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "20px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: "0 0 12px",
                        color: "var(--color-primary)",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      <i
                        className="fas fa-backpack"
                        style={{ marginRight: "8px" }}
                      />
                      What to Bring
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      Comfortable walking shoes, light clothing, sunscreen, hat,
                      insect repellent, camera, and a refillable water bottle.
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        margin: "0 0 12px",
                        color: "var(--color-primary)",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      <i
                        className="fas fa-person-hiking"
                        style={{ marginRight: "8px" }}
                      />
                      Physical Requirements
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      Moderate fitness level required. The canopy walk involves
                      walking across suspended bridges at heights up to 50
                      meters.
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        margin: "0 0 12px",
                        color: "var(--color-primary)",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      <i
                        className="fas fa-calendar-check"
                        style={{ marginRight: "8px" }}
                      />
                      Best Time to Visit
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      Year-round destination, but best visited during dry
                      seasons: January-February and September-October.
                    </p>
                  </div>
                </div>
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
                  $450
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
                onSubmit={(e) => e.preventDefault()}
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
                    defaultValue={2}
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
                    <span style={{ color: "var(--color-primary)" }}>$450</span>
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
                  style={{
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <i
                    className="fas fa-calendar-check"
                    style={{ marginRight: "8px" }}
                  />
                  Book Now
                </button>

                <a
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
                  }}
                >
                  <i
                    className="fab fa-whatsapp"
                    style={{ marginRight: "8px" }}
                  />
                  Chat on WhatsApp
                </a>
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
                <i className="fas fa-phone" style={{ fontSize: "16px" }} />
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
                <i className="fas fa-envelope" style={{ fontSize: "16px" }} />
                administration@ebenconnections.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
