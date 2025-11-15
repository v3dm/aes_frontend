import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              AES Encryptor
            </span>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            <p>© 2024 AES Encryptor. All rights reserved.</p>
            <p className="mt-1">
              For demonstration purposes only. Review code before production use.
            </p>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
