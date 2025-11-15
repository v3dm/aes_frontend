import { Mail, Github, Twitter, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ContactSection = () => {
  const contacts = [
    {
      icon: Mail,
      title: "Email",
      value: "security@aesencryptor.com",
      link: "mailto:security@aesencryptor.com",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/aes-encryptor",
      link: "https://github.com",
    },
    {
      icon: Twitter,
      title: "Twitter",
      value: "@AESEncryptor",
      link: "https://twitter.com",
    },
    {
      icon: Globe,
      title: "Website",
      value: "www.aesencryptor.com",
      link: "https://aesencryptor.com",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our encryption service? Need support or want to report a security issue?
            We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-cyan text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <contact.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {contact.title}
                </h3>
                <p className="text-sm text-muted-foreground">{contact.value}</p>
              </a>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto mt-12 bg-card/50 backdrop-blur-sm border-border p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Security Disclosure</h3>
          <p className="text-muted-foreground mb-4">
            If you've discovered a security vulnerability, please report it responsibly to our security team.
            We take all security reports seriously and will respond promptly.
          </p>
          <a
            href="mailto:security@aesencryptor.com"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Report Security Issue →
          </a>
        </Card>
      </div>
    </section>
  );
};
