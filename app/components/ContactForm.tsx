"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { toast } from "sonner";
export default function ContactForm() {
  const [phone, setPhone] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "")
      .trim()
      .toLowerCase();
    const message = String(fd.get("message") ?? "").trim();
    const phoneValue = String(phone ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phoneValue, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const err =
          typeof data?.error === "string"
            ? data.error
            : "Failed to send message";
        throw new Error(err);
      }

      toast.success("Message sent! We will get back to you within 24 hours.");
      form.reset();
      setPhone("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onReset = () => {
    setPhone("");
  };

  return (
    <section
      id="contact"
      style={{
        padding: "48px 0",
        background:
          "linear-gradient(135deg, rgba(30,86,49,0.05), rgba(30,86,49,0.02))",
        borderRadius: "20px",
        margin: "40px 0",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background:
                "linear-gradient(135deg, rgba(30,86,49,0.1), rgba(30,86,49,0.05))",
              borderRadius: "8px",
              marginBottom: "12px",
              border: "1px solid rgba(30,86,49,0.15)",
            }}
          >
            <p
              style={{
                color: "var(--color-primary)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "1.5px",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </p>
          </div>
          <h2 style={{ margin: "12px 0", fontSize: "36px", lineHeight: 1.2 }}>
            Contact Us
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Have questions about our tours? We&apos;re here to help. Reach out
            to us and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            marginBottom: "32px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                background: "#fff",
                padding: "28px",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(30,86,49,0.12)",
                border: "1px solid rgba(30,86,49,0.08)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px",
                  fontSize: 22,
                  color: "var(--color-primary)",
                }}
              >
                Send us a Message
              </h3>

              <form
                id="booking-form"
                onSubmit={onSubmit}
                onReset={onReset}
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
                      fontSize: "14px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="John Doe"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(30,86,49,0.2)",
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
                      fontSize: "14px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(30,86,49,0.2)",
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
                      fontSize: "14px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Phone
                  </label>
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

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--color-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your tour interest..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(30,86,49,0.2)",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      resize: "vertical",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cta-primary transition-all hover:opacity-95 cursor-pointer"
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
                      opacity: submitting ? 0.75 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                  <button
                    type="reset"
                    disabled={submitting}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid rgba(30,86,49,0.2)",
                      background: "#fff",
                      color: "var(--color-primary)",
                      cursor: submitting ? "not-allowed" : "pointer",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      opacity: submitting ? 0.75 : 1,
                    }}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                background: "#fff",
                padding: "22px",
                borderRadius: "14px",
                borderLeft: "5px solid var(--color-primary)",
                boxShadow: "0 8px 28px rgba(30,86,49,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), #2d5a47)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin style={{ color: "#fff", fontSize: "20px" }} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    Office Address
                  </h4>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "14px",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    1 KN 78 St
                    <br />
                    Norrsken House
                    <br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "22px",
                borderRadius: "14px",
                borderLeft: "5px solid var(--color-primary)",
                boxShadow: "0 8px 28px rgba(30,86,49,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), #2d5a47)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone style={{ color: "#fff", fontSize: "20px" }} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    Phone
                  </h4>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "14px",
                      color: "var(--muted)",
                    }}
                  >
                    <a
                      href="tel:+250786140897"
                      style={{
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}
                    >
                      (+250) 786 140 897
                    </a>
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    Available Mon-Fri, 8am-5pm EAT
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "22px",
                borderRadius: "14px",
                borderLeft: "5px solid var(--color-primary)",
                boxShadow: "0 8px 28px rgba(30,86,49,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), #2d5a47)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail style={{ color: "#fff", fontSize: "20px" }} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    Email
                  </h4>
                  <p style={{ margin: "6px 0 0", fontSize: "14px" }}>
                    <a
                      href="mailto:administration@ebenconnections.com"
                      style={{
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}
                    >
                      administration@ebenconnections.com
                    </a>
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 15px 50px rgba(30,86,49,0.15)",
            height: "400px",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1763540960228!6m8!1m7!1sHPFJlZUX1v7rxR7b2GSVbg!2m2!1d-1.951185469851299!2d30.06022485246644!3f277.5790160102026!4f-3.65199571720963!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eben Tours Location"
          />
        </div>
      </div>
    </section>
  );
}
