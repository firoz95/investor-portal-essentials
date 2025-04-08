
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { useAppContext } from "@/context/AppContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { investors, setCurrentInvestorByUsername } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check credentials
    setTimeout(() => {
      setIsLoading(false);
      
      if (username === "superadmin" && password === "NAFA@1234") {
        toast({
          title: "Login successful",
          description: "Welcome to the New Age Entrepreneurs Fund admin portal.",
        });
        // Set admin flag in session storage (temporary until Supabase is integrated)
        sessionStorage.setItem('isAdmin', 'true');
        navigate("/admin");
      } else {
        // Check against investors in AppContext
        const investor = investors.find(inv => 
          inv.username === username && inv.password === password
        );
        
        if (investor) {
          toast({
            title: "Login successful",
            description: `Welcome to the New Age Entrepreneurs Fund investor portal, ${investor.name}.`,
          });
          // Set current investor in context
          setCurrentInvestorByUsername(username);
          // Clear any admin session
          sessionStorage.removeItem('isAdmin');
          navigate(`/investor/${investor.id}`);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid username or password. Please try again.",
            variant: "destructive",
          });
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(75,46,131,0.1),_transparent_40%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(75,46,131,0.05),_transparent_30%)] pointer-events-none"></div>
      
      <header className="w-full px-6 py-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Logo size="sm" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="container max-w-md animate-fade-up">
          <Card className="glass border-opacity-20 shadow-lg w-full">
            <CardHeader className="space-y-1 pt-8 pb-4">
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your portal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      className="pl-10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a 
                      href="#" 
                      className="text-xs text-primary hover:underline transition-all"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full mt-6 group"
                  disabled={isLoading}
                >
                  <span>Sign In</span>
                  <ChevronRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary font-medium hover:underline">
                  Contact your fund administrator
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} New Age Entrepreneurs Fund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
