import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EncryptionSection } from "@/components/EncryptionSection";
import { DecryptionSection } from "@/components/DecryptionSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />
      <Hero />
      <EncryptionSection />
      <DecryptionSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
