
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  CalendarDays,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import StatusCard from "@/components/StatusCard";
import DocumentCard from "@/components/DocumentCard";
import MetricCard from "@/components/MetricCard";
import InvestmentCard from "@/components/InvestmentCard";
import FinancialBreakdown from "@/components/FinancialBreakdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  dashboardSummary, 
  getInvestmentSummary, 
  documents, 
  fundInvestments, 
  capitalContributions, 
  formatCurrency, 
  formatDate,
  navStatements,
  feeCharges
} from "@/utils/mockData";

// Generate mock chart data
const generateChartData = (points: number, baseLine = 100, variance = 20) => {
  return Array.from({ length: points }).map((_, i) => ({
    value: baseLine + Math.random() * variance - variance / 2 + (i * variance) / (points * 2),
  }));
};

const breakdownData = [
  { name: "Project Alpha", value: 97500, color: "#9b87f5" },
  { name: "Project Beta", value: 168750, color: "#7E69AB" },
  { name: "Project Gamma", value: 187500, color: "#D6BCFA" },
  { name: "Project Delta", value: 52500, color: "#FEC6A1" },
];

const feeData = [
  { name: "Setup Fee", value: 5000, color: "#D3E4FD" },
  { name: "Management", value: 33125, color: "#9b87f5" },
  { name: "Performance", value: 0, color: "#7E69AB" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const investmentSummary = getInvestmentSummary();
  
  // Latest NAV data
  const latestNav = navStatements[navStatements.length - 1];
  
  // Recent activities
  const recentActivities = [
    {
      id: "act-001",
      title: "Q1 2023 NAV Statement Released",
      date: "Apr 15, 2023",
      type: "document",
    },
    {
      id: "act-002",
      title: "Capital Call for Project Delta",
      date: "Feb 15, 2023",
      type: "capital",
    },
    {
      id: "act-003",
      title: "Q4 2022 Management Fee Charged",
      date: "Dec 31, 2022",
      type: "fee",
    },
    {
      id: "act-004",
      title: "Project Gamma Value Increased by 5%",
      date: "Dec 15, 2022",
      type: "investment",
    },
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to your investment portal
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/documents")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </Button>
            <Button
              onClick={() => navigate("/capital")}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              View Capital
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 w-full justify-start overflow-auto whitespace-nowrap custom-scrollbar p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-fade-up">
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
                icon={<BarChart3 className="h-4 w-4" />}
                variant="success"
              />
              <StatusCard
                title="Active Investments"
                value={investmentSummary.count}
                subtitle={`${formatCurrency(investmentSummary.currentValue)} current value`}
                icon={<PieChart className="h-4 w-4" />}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription>Current value of your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <FinancialBreakdown 
                    data={breakdownData}
                    title="Investment Allocation"
                    formatValue={(value) => formatCurrency(value)}
                    height={200}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Capital Activity</CardTitle>
                  <CardDescription>Overview of your capital contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Commitment</span>
                      <span className="font-medium">{formatCurrency(dashboardSummary.totalCommitment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Contributed</span>
                      <span className="font-medium">{formatCurrency(dashboardSummary.totalContributed)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining Commitment</span>
                      <span className="font-medium">{formatCurrency(dashboardSummary.remainingCommitment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Fees Paid</span>
                      <span className="font-medium">{formatCurrency(dashboardSummary.totalFees)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3">Recent Contributions</h4>
                    <div className="space-y-3">
                      {capitalContributions.slice(0, 3).map((contribution) => (
                        <div key={contribution.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{formatCurrency(contribution.amount)}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(contribution.date)}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => navigate("/capital")}
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="NAV per Unit"
                value={formatCurrency(latestNav.navPerUnit)}
                change={{
                  value: latestNav.change,
                  isPositive: latestNav.change > 0
                }}
                chart={true}
                chartData={generateChartData(12, 100, 30)}
                icon={<ArrowUpRight className="h-5 w-5" />}
              />
              <MetricCard
                title="Fee Summary"
                value={formatCurrency(dashboardSummary.totalFees)}
                subtitle="Total fees paid to date"
                chart={true}
                chartData={generateChartData(12, 100, 15)}
                chartColor="#7E69AB"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <MetricCard
                title="Next Capital Call"
                value="Feb 28, 2023"
                subtitle="Estimated amount: $150,000"
                icon={<CalendarDays className="h-5 w-5" />}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-full lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>Access your recent statements and agreements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {documents.slice(0, 3).map((doc) => (
                        <DocumentCard
                          key={doc.id}
                          id={doc.id}
                          title={doc.title}
                          date={formatDate(doc.date)}
                          category={doc.category}
                          attachmentName={doc.attachmentName}
                          onClick={() => navigate("/documents")}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-full lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Activity</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>Your recent activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div 
                          key={activity.id} 
                          className="flex items-start space-x-3 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                        >
                          <div className={`p-1.5 rounded-full mt-0.5 ${
                            activity.type === 'document' ? 'bg-blue-50' :
                            activity.type === 'capital' ? 'bg-green-50' :
                            activity.type === 'fee' ? 'bg-amber-50' : 'bg-purple-50'
                          }`}>
                            {activity.type === 'document' && <FileText className="h-3.5 w-3.5 text-blue-600" />}
                            {activity.type === 'capital' && <DollarSign className="h-3.5 w-3.5 text-green-600" />}
                            {activity.type === 'fee' && <BarChart3 className="h-3.5 w-3.5 text-amber-600" />}
                            {activity.type === 'investment' && <TrendingUp className="h-3.5 w-3.5 text-purple-600" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="investments" className="space-y-6 animate-fade-up">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Investment Portfolio</CardTitle>
                    <CardDescription>Your fund's current investments</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => navigate("/investments")}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fundInvestments.slice(0, 3).map((investment) => (
                    <InvestmentCard
                      key={investment.id}
                      id={investment.id}
                      name={investment.name}
                      sector={investment.sector}
                      type={investment.type}
                      initialAmount={investment.initialAmount}
                      currentValue={investment.currentValue}
                      investmentDate={formatDate(investment.investmentDate)}
                      performancePercentage={investment.performancePercentage}
                      description={investment.description}
                      onClick={() => navigate("/investments")}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialBreakdown 
                data={breakdownData}
                title="Investment Allocation"
                description="Breakdown of your current investments by project"
                formatValue={(value) => formatCurrency(value)}
              />
              <FinancialBreakdown 
                data={feeData}
                title="Fee Breakdown"
                description="Breakdown of fees paid to date"
                formatValue={(value) => formatCurrency(value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6 animate-fade-up">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Important Documents</CardTitle>
                    <CardDescription>Access all your fund documents</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => navigate("/documents")}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents.slice(0, 6).map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      date={formatDate(doc.date)}
                      category={doc.category}
                      attachmentName={doc.attachmentName}
                      description={doc.description}
                      onClick={() => navigate("/documents")}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6 animate-fade-up">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>All recent activities related to your investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feeCharges.slice(0, 5).map((fee) => (
                    <div 
                      key={fee.id} 
                      className="flex items-start space-x-4 border-b border-border/50 pb-5 last:border-0 last:pb-0"
                    >
                      <div className="p-2 rounded-full bg-muted">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm font-medium">{fee.type}</h4>
                            <p className="text-xs text-muted-foreground">{formatDate(fee.date)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatCurrency(fee.amount)}</p>
                            <p className="text-xs text-muted-foreground">{fee.status}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{fee.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
