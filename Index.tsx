import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 MarketMind. AI-powered sales & marketing intelligence.
        </div>
      </footer>
    </div>
  );
};

export default Index;
