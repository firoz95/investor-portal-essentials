
import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className={cn("flex-1 px-4 sm:px-6 lg:px-8 py-6 animate-fade-up", className)}>
        {children}
      </main>
      <footer className="py-4 px-8 border-t border-border text-sm text-muted-foreground">
        <div className="container mx-auto flex justify-between items-center">
          <div>© {new Date().getFullYear()} Investment Fund Portal</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
