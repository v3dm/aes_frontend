import { useState } from "react";
import { Lock, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

import { save } from "@/lib/aes"; // <- NEW import for saving

export const EncryptionSection = () => {
  const [plaintext, setPlaintext] = useState("Hello world");
  const [password, setPassword] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const doEncrypt = async () => {
    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter a password to encrypt",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      const resp = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext, password }),
      });

      if (!resp.ok) {
        throw new Error(await resp.text());
      }

      const data = await resp.json();
      setCiphertext(data.ciphertext_b64);

      toast({
        title: "Encryption Successful",
        description: "Your text has been encrypted securely",
      });

      // --- AUTO SAVE: call save immediately after encryption ---
      try {
        console.log("DEBUG: calling /api/save with ciphertext (auto-save)");
        const saveResp = await save(data.ciphertext_b64 /*, optional filename here */);
        console.log("DEBUG: /api/save returned", saveResp);

        toast({
          title: "Saved",
          description: `Saved to server (id=${saveResp.id})`,
        });
      } catch (saveErr: any) {
        console.error("Auto-save failed:", saveErr);
        toast({
          title: "Save Failed",
          description: saveErr?.message ?? "Failed to save encrypted data",
          variant: "destructive",
        });
      }
      // --- end auto-save ---

    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ciphertext);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Ciphertext copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="encryption" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Encrypt Your Data
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your sensitive information into an unreadable format using AES-256-GCM encryption
          </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border-border p-8 shadow-glow-blue">
          <div className="space-y-6">
            <div>
              <Label htmlFor="plaintext" className="text-lg mb-2 block">
                Plaintext
              </Label>
              <Textarea
                id="plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Type text to encrypt..."
                className="min-h-[120px] bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-lg mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <Button
              onClick={doEncrypt}
              disabled={isEncrypting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-cyan text-lg py-6"
            >
              {isEncrypting ? (
                "Encrypting..."
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Encrypt & Save
                </>
              )}
            </Button>

            {ciphertext && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="ciphertext" className="text-lg">
                    Ciphertext (Base64)
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-primary hover:text-primary/80"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="ciphertext"
                  value={ciphertext}
                  readOnly
                  className="min-h-[120px] bg-primary/5 border-primary/30 font-mono text-sm"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
