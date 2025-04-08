
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { formatCurrency } from "@/utils/mockData";
import Layout from "@/components/Layout";
import StatusCard from "@/components/StatusCard";
import NAVSection from "@/components/NAVSection";
import DocumentsSection from "@/components/DocumentsSection";
import NotificationsSection from "@/components/NotificationsSection";
import { TrendingUp, FileText, Info } from "lucide-react";
import AmountDisplay from "@/components/AmountDisplay";

const InvestorDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { investors } = useAppContext();
  
  // Find the specific investor by ID
  const investor = investors.find(inv => inv.id === id);
  
  if (!investor) {
    return <Navigate to="/login" replace />;
  }

  const dashboardSummary = {
    totalCommitment: investor.capitalCommitment.total,
    totalContributed: investor.capitalContributions.reduce((total, item) => total + item.amount, 0),
    currentNav: investor.navData.currentNAV,
    performanceSinceInception: investor.navData.changePercentage
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {investor.name}</h1>
        <p className="text-muted-foreground mb-8">Here's an overview of your investment</p>
        
        <NotificationsSection />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusCard
            title="Total Commitment"
            value={<AmountDisplay amount={dashboardSummary.totalCommitment} />}
            icon={<span className="text-base">₹</span>}
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
            value={investor.capitalCommitment.class}
            subtitle={<AmountDisplay amount={100000} /> + " per unit"}
            icon={<FileText className="h-4 w-4" />}
          />
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold">NAV</h2>
          </div>
          <NAVSection />
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 mr-2 text-[#43A66A]" />
            <h2 className="text-2xl font-bold">Documents</h2>
          </div>
          <DocumentsSection />
        </div>
      </div>
    </Layout>
  );
};

export default InvestorDashboard;
