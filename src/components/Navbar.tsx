
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  User, 
  LogOut,
  Menu,
  X,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { investorProfile } from "@/utils/mockData";
import Logo from "@/components/Logo";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // This would be replaced with actual logout logic
    window.location.href = "/login";
  };

  return (
    <div className="border-b border-border bg-background/70 backdrop-blur-lg sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className={cn(
              "transition-colors hover:text-foreground text-sm font-medium",
              isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link 
            to="/documents" 
            className={cn(
              "transition-colors hover:text-foreground text-sm font-medium",
              isActive("/documents") ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Documents
          </Link>
          <Link 
            to="/capital" 
            className={cn(
              "transition-colors hover:text-foreground text-sm font-medium",
              isActive("/capital") ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Capital
          </Link>
          <Link 
            to="/investments" 
            className={cn(
              "transition-colors hover:text-foreground text-sm font-medium",
              isActive("/investments") ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Investments
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-border mr-2">
                  <img 
                    src={investorProfile.avatarUrl} 
                    alt={investorProfile.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{investorProfile.name}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/dashboard" 
              className={cn(
                "block py-2 px-3 rounded-md text-base font-medium transition-colors",
                isActive("/dashboard") 
                  ? "bg-primary/10 text-foreground" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </div>
            </Link>
            <Link 
              to="/documents" 
              className={cn(
                "block py-2 px-3 rounded-md text-base font-medium transition-colors",
                isActive("/documents") 
                  ? "bg-primary/10 text-foreground" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                Documents
              </div>
            </Link>
            <Link 
              to="/capital" 
              className={cn(
                "block py-2 px-3 rounded-md text-base font-medium transition-colors",
                isActive("/capital") 
                  ? "bg-primary/10 text-foreground" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <DollarSign className="mr-3 h-5 w-5" />
                Capital
              </div>
            </Link>
            <Link 
              to="/investments" 
              className={cn(
                "block py-2 px-3 rounded-md text-base font-medium transition-colors",
                isActive("/investments") 
                  ? "bg-primary/10 text-foreground" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <PieChart className="mr-3 h-5 w-5" />
                Investments
              </div>
            </Link>
            <Link 
              to="/profile" 
              className={cn(
                "block py-2 px-3 rounded-md text-base font-medium transition-colors",
                isActive("/profile") 
                  ? "bg-primary/10 text-foreground" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5" />
                Profile
              </div>
            </Link>
            <div 
              className="block py-2 px-3 rounded-md text-base font-medium text-destructive hover:bg-destructive/5 cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
            >
              <div className="flex items-center">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
