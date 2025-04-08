
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

const Index: React.FC = () => {
  const { user, isAdmin } = useAuth();
  
  const getDashboardLink = () => {
    if (!user) return "/login";
    return isAdmin ? "/admin" : `/investor/${user.id}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(75,46,131,0.1),_transparent_40%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(75,46,131,0.05),_transparent_30%)] pointer-events-none"></div>
      
      <header className="w-full px-6 py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center space-x-4">
              {user ? (
                <Button asChild>
                  <Link to={getDashboardLink()}>
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Button asChild>
                    <Link to="/signup">
                      Sign Up
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            New Age Entrepreneurs Fund
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your portal for investment insights, documents, and portfolio performance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="px-8">
              <Link to={getDashboardLink()}>
                {user ? 'Access Dashboard' : 'Sign In'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {!user && (
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link to="/signup">
                  Create Account
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 border border-border rounded-lg bg-card/50 text-center">
            <h3 className="text-xl font-semibold mb-3">Portfolio Tracking</h3>
            <p className="text-muted-foreground">
              Monitor your investment performance and track contributions in real-time.
            </p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card/50 text-center">
            <h3 className="text-xl font-semibold mb-3">Document Access</h3>
            <p className="text-muted-foreground">
              Securely access all of your important investment documents and reports.
            </p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card/50 text-center">
            <h3 className="text-xl font-semibold mb-3">Fund Updates</h3>
            <p className="text-muted-foreground">
              Stay informed with the latest fund performance and investment updates.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo size="sm" />
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} New Age Entrepreneurs Fund. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
