import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WaitlistSection from "@/components/WaitlistSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import ToolsSection from "@/components/ToolsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import ServicesSection from "@/components/ServicesSection";
import DiscoverSection from "@/components/DiscoverSection";
import CalendarsSection from "@/components/CalendarsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SupportSection from "@/components/SupportSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => (
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

export default Index;
