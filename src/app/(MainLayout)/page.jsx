import FeaturedProperties from "@/Components/Apps/HomePage/FeaturedProperties";
import HeroSection from "@/Components/Apps/HomePage/HeroSection";
import RentalStatistics from "@/Components/Apps/HomePage/RentalStatistics";
import Reviews from "@/Components/Apps/HomePage/Reviews";
import TopLocations from "@/Components/Apps/HomePage/TopLocations";
import WhyChooseUs from "@/Components/Apps/HomePage/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <TopLocations />
      <Reviews />
      <RentalStatistics />
    </main>
  );
}
