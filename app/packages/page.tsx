import Filter from "../components/Filter";
import SectionHeader from "../components/SectionHeader";
import SinglePackage from "../components/SinglePackage";

export default function PackagesPage() {
  return (
    <>
      <SectionHeader
        title="Unforgettable Safari Experiences"
        note="Our Tours & Packages"
        description="Discover our curated collection of African safari tours designed to create lasting memories. From wildlife adventures to cultural immersion, find your perfect journey."
      />

      <Filter />

      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
          <SinglePackage />
        </div>
      </div>
    </>
  );
}
