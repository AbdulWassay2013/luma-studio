import { HomeHeroSection } from "@/components/ui/HomeHeroSection";
import { GalleryShowcaseSection } from "@/components/ui/GalleryShowcaseSection";
import Testimonials from "@/components/Testimonials";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Footer } from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";


export default function Home() {
  fetch("/api/upload")
  return (
  <main className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
    <HomeHeroSection />

      <GalleryShowcaseSection/>
      
      <HowItWorksSection/>

      <PricingSection/>
      
      <Testimonials/>

      <Footer/>
      

  </main>
  );
}
