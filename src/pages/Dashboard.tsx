
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  FileText, 
  TrendingUp,
  Clock,
} from "lucide-react";
import StatusCard from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  dashboardSummary, 
  formatCurrency, 
  formatDate,
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showTopBar, setShowTopBar] = useState(false);
  
  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed top bar that appears on scroll */}
      <div className={`fixed top-0 left-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Logo size="sm" />
          </div>
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
      
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
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
      
      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#4B2E83]">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your investment portal
          </p>
        </div>
        
        {/* Notifications Section */}
        <NotificationsSection />
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Total Commitment"
            value={formatCurrency(dashboardSummary.totalCommitment)}
            icon={<DollarSign className="h-4 w-4" />}
            variant="primary"
          />
          <StatusCard
            title="Contributed Capital"
            value={formatCurrency(dashboardSummary.totalContributed)}
            subtitle={`${((dashboardSummary.totalContributed / dashboardSummary.totalCommitment) * 100).toFixed(1)}% of commitment`}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatusCard
            title="Current NAV"
            value={formatCurrency(dashboardSummary.currentNav)}
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
            subtitle={`${formatCurrency(capitalCommitment.unitPrice)} per unit`}
            icon={<FileText className="h-4 w-4" />}
          />
        </div>
        
        {/* NAV Section */}
        <div className="grid grid-cols-1 gap-6">
          <NAVSection />
        </div>
        
        {/* Capital Activity and Fund Investments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CapitalActivitySection />
          <FundInvestmentsSection />
        </div>
        
        {/* Co-Investments Section (conditional) */}
        <CoInvestmentsSection />
        
        {/* Documents Section */}
        <DocumentsSection />
        
        {/* Investor Information */}
        <InvestorInfoSection />
        
        {/* Fund Technicals */}
        <FundTechnicalsSection />
        
        {/* Disclaimer */}
        <DisclaimerSection />
      </main>
      
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size="sm" />
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
