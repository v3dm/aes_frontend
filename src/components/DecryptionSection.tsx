import { useState } from "react";
import { Unlock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export const DecryptionSection = () => {
  const [ciphertextIn, setCiphertextIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [recovered, setRecovered] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const { toast } = useToast();

  const doDecrypt = async () => {
    if (!ciphertextIn || !passwordIn) {
      toast({
        title: "Missing Information",
        description: "Please provide both ciphertext and password",
        variant: "destructive",
      });
      return;
    }

    setIsDecrypting(true);
    try {
      const resp = await fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext_b64: ciphertextIn, password: passwordIn }),
      });

      if (!resp.ok) {
        const j = await resp.json().catch(() => null);
        throw new Error(j?.detail || await resp.text());
      }

      const data = await resp.json();
      setRecovered(data.plaintext);

      toast({
        title: "Decryption Successful",
        description: "Your text has been decrypted",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: error instanceof Error ? error.message : "Incorrect password or corrupted data",
        variant: "destructive",
      });
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <section id="decryption" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <Unlock className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Decrypt Your Data
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Restore your encrypted data back to its original form using the correct password
          </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border-border p-8 shadow-glow-blue">
          <div className="space-y-6">
            <div>
              <Label htmlFor="ciphertext_in" className="text-lg mb-2 block">
                Ciphertext (Base64)
              </Label>
              <Textarea
                id="ciphertext_in"
                value={ciphertextIn}
                onChange={(e) => setCiphertextIn(e.target.value)}
                placeholder="Paste your encrypted ciphertext here..."
                className="min-h-[120px] bg-background/50 border-border focus:border-primary transition-colors font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="password_in" className="text-lg mb-2 block">
                Password
              </Label>
              <Input
                id="password_in"
                type="password"
                value={passwordIn}
                onChange={(e) => setPasswordIn(e.target.value)}
                placeholder="Enter the same password used for encryption"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <Button
              onClick={doDecrypt}
              disabled={isDecrypting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-cyan text-lg py-6"
            >
              {isDecrypting ? (
                "Decrypting..."
              ) : (
                <>
                  <Unlock className="mr-2 h-5 w-5" />
                  Decrypt
                </>
              )}
            </Button>

            {recovered && (
              <div className="animate-fade-in">
                <Label htmlFor="recovered" className="text-lg mb-2 block">
                  Recovered Plaintext
                </Label>
                <Textarea
                  id="recovered"
                  value={recovered}
                  readOnly
                  className="min-h-[120px] bg-primary/5 border-primary/30"
                />
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Security Note:</strong> Make sure you're using the exact same
                password that was used during encryption. The password is never stored or transmitted.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
