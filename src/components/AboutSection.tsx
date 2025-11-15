import { Shield, Lock, Key, Eye, Server, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "AES-256-GCM",
      description: "Military-grade encryption standard trusted by governments and enterprises worldwide",
    },
    {
      icon: Key,
      title: "PBKDF2 Key Derivation",
      description: "Transforms your password into a cryptographic key using 100,000 iterations",
    },
    {
      icon: Eye,
      title: "Zero Knowledge",
      description: "Your passwords and plaintext never leave your device unencrypted",
    },
    {
      icon: Lock,
      title: "Authenticated Encryption",
      description: "GCM mode provides both confidentiality and authenticity verification",
    },
    {
      icon: Server,
      title: "Secure Processing",
      description: "All encryption operations use Web Crypto API for maximum security",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Lightning-fast encryption and decryption with modern cryptographic algorithms",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            About AES Encryption
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Advanced Encryption Standard (AES) is a specification for the encryption of electronic data
            established by the U.S. National Institute of Standards and Technology (NIST) in 2001.
            AES-256-GCM is the gold standard for data encryption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-cyan animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-card border-border p-8">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">1. Key Derivation:</strong> Your password is transformed
              into a cryptographic key using PBKDF2 with 100,000 iterations and a random salt.
            </p>
            <p>
              <strong className="text-foreground">2. Encryption:</strong> The plaintext is encrypted using
              AES-256-GCM with a random initialization vector (IV), producing ciphertext and an authentication tag.
            </p>
            <p>
              <strong className="text-foreground">3. Output:</strong> The salt, IV, authentication tag, and
              ciphertext are combined and encoded in Base64 format for easy transmission.
            </p>
            <p>
              <strong className="text-foreground">4. Decryption:</strong> The process is reversed using the
              same password, which must match exactly to derive the correct key and decrypt the data.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
