import { Shield, Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-20 w-20 text-primary animate-glow" />
              <Lock className="h-8 w-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-blue-400 bg-clip-text text-transparent">
            Military-Grade Encryption
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure your sensitive data with AES-256-GCM encryption. 
            Enterprise-level security, simple interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("encryption")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-cyan text-lg px-8"
            >
              <Key className="mr-2 h-5 w-5" />
              Start Encrypting
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("about")}
              className="border-primary text-primary hover:bg-primary/10 text-lg px-8"
            >
              Learn More
            </Button>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Shield className="h-4 w-4 text-primary" />
              <span>AES-256-GCM</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Key className="h-4 w-4 text-primary" />
              <span>PBKDF2 Key Derivation</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Lock className="h-4 w-4 text-primary" />
              <span>Zero Knowledge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
