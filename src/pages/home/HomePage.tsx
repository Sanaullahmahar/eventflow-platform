import CalendarsSection from "@/features/home/components/CalendarsSection";
import DiscoverSection from "@/features/home/components/DiscoverSection";
import FeaturedEvents from "@/features/home/components/FeaturedEvents";
import FinalCTA from "@/features/home/components/FinalCTA";
import HeroSection from "@/features/home/components/HeroSection";
import IntegrationsSection from "@/features/home/components/IntegrationsSection";
import ServicesSection from "@/features/home/components/ServicesSection";
import SupportSection from "@/features/home/components/SupportSection";
import TestimonialsSection from "@/features/home/components/TestimonialsSection";
import ToolsSection from "@/features/home/components/ToolsSection";
import WaitlistSection from "@/features/home/components/WaitlistSection";
import Footer from "@/shared/components/layout/Footer";
import Navbar from "@/shared/components/navigation/Navbar";

const HomePage = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <WaitlistSection />
    <FeaturedEvents />
    <ToolsSection />
    <IntegrationsSection />
    <ServicesSection />
    <DiscoverSection />
    <CalendarsSection />
    <TestimonialsSection />
    <SupportSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default HomePage;
