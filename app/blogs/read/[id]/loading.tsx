import SectionHeader from "@/app/components/SectionHeader";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[rgba(30,86,49,0.10)] ${
        className ?? ""
      }`}
    />
  );
}

export default function Loading() {
  return (
    <>
      <SectionHeader title="" note="" description="" />

      <div className="container" style={{ paddingBottom: "60px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,86,49,0.12)",
            border: "1px solid rgba(30,86,49,0.08)",
          }}
        >
          <SkeletonBox className="h-[420px] w-full rounded-none" />

          <div style={{ padding: "28px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <SkeletonBox className="h-[14px] w-[110px]" />
              <SkeletonBox className="h-[14px] w-[14px]" />
              <SkeletonBox className="h-[14px] w-[110px]" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <SkeletonBox className="h-[14px] w-full" />
              <SkeletonBox className="h-[14px] w-[96%]" />
              <SkeletonBox className="h-[14px] w-[92%]" />
              <SkeletonBox className="h-[14px] w-full" />
              <SkeletonBox className="h-[14px] w-[90%]" />
              <SkeletonBox className="h-[14px] w-[95%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
