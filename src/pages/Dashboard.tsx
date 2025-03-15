
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  FileText, 
  TrendingUp,
  Clock,
  LayoutDashboard,
  PieChart,
  Users,
  Info,
  ChevronRight,
  Power
} from "lucide-react";
import StatusCard from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AmountDisplay from "@/components/AmountDisplay";
import { 
  dashboardSummary, 
  formatCurrency, 
  formatDate,
  capitalCommitment,
} from "@/utils/mockData";
import NotificationsSection from "@/components/NotificationsSection";
import NAVSection from "@/components/NAVSection";
import FundInvestmentsSection from "@/components/FundInvestmentsSection";
import DocumentsSection from "@/components/DocumentsSection";
import CapitalActivitySection from "@/components/CapitalActivitySection";
import CoInvestmentsSection from "@/components/CoInvestmentsSection";
import InvestorInfoSection from "@/components/InvestorInfoSection";
import FundTechnicalsSection from "@/components/FundTechnicalsSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import { investorProfile } from "@/utils/mockData";
import Logo from "@/components/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

interface SectionRef {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
  label: string;
  icon: React.ReactNode;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showTopBar, setShowTopBar] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Create refs for each section
  const dashboardRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const capitalActivityRef = useRef<HTMLDivElement>(null);
  const coInvestmentsRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const investorInfoRef = useRef<HTMLDivElement>(null);
  const fundTechnicalsRef = useRef<HTMLDivElement>(null);
  
  // Define all sections with updated icons
  const sections: SectionRef[] = [
    { id: "dashboard", ref: dashboardRef, label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-1" /> },
    { id: "nav", ref: navRef, label: "NAV", icon: <TrendingUp className="h-4 w-4 mr-1" /> },
    { id: "capital", ref: capitalActivityRef, label: "Capital Activity", icon: <span className="mr-1">₹</span> },
    { id: "coinvestments", ref: coInvestmentsRef, label: "Co-Investments", icon: <PieChart className="h-4 w-4 mr-1" /> },
    { id: "documents", ref: documentsRef, label: "Documents", icon: <FileText className="h-4 w-4 mr-1" /> },
    { id: "investor", ref: investorInfoRef, label: "Investor Info", icon: <Users className="h-4 w-4 mr-1" /> },
    { id: "fund", ref: fundTechnicalsRef, label: "Fund Info", icon: <Info className="h-4 w-4 mr-1" /> },
  ];
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show topbar after scrolling down 100px
      if (window.scrollY > 100) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200; // Add offset to account for header height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.ref.current) {
      window.scrollTo({
        top: section.ref.current.offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={`fixed top-0 left-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Logo size="sm" showText={false} />
            
            <nav className="ml-6 hidden md:flex">
              <ul className="flex space-x-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Button
                      variant={activeSection === section.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center text-sm"
                    >
                      {section.icon}
                      {section.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile dropdown for navigation */}
            <div className="md:hidden ml-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-3">
                      <span className="flex items-center">
                        {sections.find(s => s.id === activeSection)?.icon}
                        {sections.find(s => s.id === activeSection)?.label}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {sections.map((section) => (
                          <li key={section.id} className="row-span-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                scrollToSection(section.id);
                              }}
                              className="flex w-full items-center justify-start text-sm"
                            >
                              {section.icon}
                              {section.label}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/login")}
              title="Logout"
              aria-label="Logout"
            >
              <Power className="h-5 w-5 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        </div>
      </div>
      
      <header className="bg-background border-b border-border">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo size="lg" showText={true} />
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-medium">{investorProfile.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <div ref={dashboardRef} id="dashboard-section">
          <h1 className="text-3xl font-bold tracking-tight text-[#000000]">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your investment portal
          </p>
        </div>
        
        <NotificationsSection />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Total Commitment"
            value={<AmountDisplay amount={dashboardSummary.totalCommitment} />}
            icon={<DollarSign className="h-4 w-4" />}
            variant="primary"
          />
          <StatusCard
            title="Contributed Capital"
            value={<AmountDisplay amount={dashboardSummary.totalContributed} />}
            subtitle={`${((dashboardSummary.totalContributed / dashboardSummary.totalCommitment) * 100).toFixed(1)}% of commitment`}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatusCard
            title="Current NAV"
            value={<AmountDisplay amount={dashboardSummary.currentNav} />}
            trend={{
              value: dashboardSummary.performanceSinceInception,
              isPositive: dashboardSummary.performanceSinceInception > 0
            }}
            icon={<TrendingUp className="h-4 w-4" />}
            variant="success"
          />
          <StatusCard
            title="Class of Units"
            value={capitalCommitment.class}
            subtitle={<AmountDisplay amount={capitalCommitment.unitPrice} /> + " per unit"}
            icon={<FileText className="h-4 w-4" />}
          />
        </div>
        
        <div ref={navRef} id="nav-section" className="pt-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">NAV</h2>
          </div>
          <NAVSection />
        </div>
        
        <div ref={capitalActivityRef} id="capital-section" className="pt-8">
          <div className="flex items-center mb-4">
            <DollarSign className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">Capital Activity</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CapitalActivitySection />
            <FundInvestmentsSection />
          </div>
        </div>
        
        <div ref={coInvestmentsRef} id="coinvestments-section" className="pt-8">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">Co-Investments</h2>
          </div>
          <CoInvestmentsSection />
        </div>
        
        <div ref={documentsRef} id="documents-section" className="pt-8">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">Documents</h2>
          </div>
          <DocumentsSection />
        </div>
        
        <div ref={investorInfoRef} id="investor-section" className="pt-8">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">Investor Information</h2>
          </div>
          <InvestorInfoSection />
        </div>
        
        <div ref={fundTechnicalsRef} id="fund-section" className="pt-8">
          <div className="flex items-center mb-4">
            <Info className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold text-black">Fund Information</h2>
          </div>
          <FundTechnicalsSection />
        </div>
        
        <DisclaimerSection />
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size="md" />
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} New Age Entrepreneurs Fund. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
