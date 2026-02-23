"use client";

import Filter from "../components/Filter";
import SectionHeader from "../components/SectionHeader";
import SinglePackage from "../components/SinglePackage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CountryKey = "all" | "rwanda" | "kenya" | "tanzania" | "uganda";

type PackageListRow = {
  id: string;
  title: string;
  country: Exclude<CountryKey, "all">;
  location: string;
  durationDays: number;
  price: number;
  maxGroup: number;
  featured: boolean;
  imageUrl?: string | null;
  description?: string | null;
};

function PackagesGridSkeleton({ count = 6 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="animate-pulse"
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(30,86,49,0.08)",
        border: "1px solid rgba(30,86,49,0.08)",
      }}
    >
      <div style={{ height: "190px", background: "rgba(30,86,49,0.10)" }} />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: "14px",
            width: "70%",
            background: "rgba(30,86,49,0.12)",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "100%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "92%",
            background: "rgba(30,86,49,0.10)",
            borderRadius: "8px",
            marginBottom: "14px",
          }}
        />
        <div
          style={{
            height: "12px",
            width: "45%",
            background: "rgba(30,86,49,0.12)",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  ));
}

export default function PackagesClient() {
  const searchParams = useSearchParams();
  const [rows, setRows] = useState<PackageListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<CountryKey>("all");

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) setCountry(filter as CountryKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const q =
      country === "all" ? "" : `?country=${encodeURIComponent(country)}`;

    fetch(`/api/packages${q}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setRows(Array.isArray(data?.rows) ? data.rows : []);
      })
      .catch(() => {
        if (!alive) return;
        setRows([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [country]);

  return (
    <>
      <SectionHeader
        title="Unforgettable Safari Experiences"
        note="Our Tours & Packages"
        description="Discover our curated collection of African safari tours designed to create lasting memories. From wildlife adventures to cultural immersion, find your perfect journey."
      />

      <Filter value={country} onChange={setCountry} />

      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <PackagesGridSkeleton />
          ) : rows.length === 0 ? (
            <div
              className="col-span-3"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid rgba(30,86,49,0.10)",
                boxShadow: "0 10px 40px rgba(30,86,49,0.06)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "var(--color-secondary)",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                No packages found
              </h3>
              <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>
                {country === "all"
                  ? "There are no active packages in the database yet."
                  : "No packages match this filter. Try changing the country."}
              </p>

              {country !== "all" ? (
                <button
                  type="button"
                  onClick={() => setCountry("all")}
                  style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid var(--color-primary)",
                    background: "rgba(30,86,49,0.08)",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Clear filter
                </button>
              ) : null}
            </div>
          ) : (
            rows.map((p) => (
              <SinglePackage
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                price={p.price}
                imageUrl={p.imageUrl}
                featured={p.featured}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
