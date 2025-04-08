
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import StatusCard from "@/components/StatusCard";
import NAVSection from "@/components/NAVSection";
import DocumentsSection from "@/components/DocumentsSection";
import NotificationsSection from "@/components/NotificationsSection";
import { TrendingUp, FileText, Info } from "lucide-react";
import AmountDisplay from "@/components/AmountDisplay";
import { formatCurrency } from "@/utils/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentCard from "@/components/DocumentCard";

interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  investor_code: string;
}

interface Document {
  id: string;
  filename: string;
  file_url: string;
  type: string;
  uploaded_at: string;
}

interface Update {
  id: string;
  message: string;
  posted_at: string;
  posted_by: string;
}

const InvestorDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Using mock data for now for the portfolio metrics
  const dashboardSummary = {
    totalCommitment: 1000000,
    totalContributed: 500000,
    currentNav: 550000,
    performanceSinceInception: 10
  };

  useEffect(() => {
    const fetchInvestorData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Use the logged-in user's ID if no ID is specified in URL 
        const investorId = id || user.id;
        
        // Fetch investor details
        const { data: investorData, error: investorError } = await supabase
          .from('users')
          .select('*')
          .eq('id', investorId)
          .maybeSingle();
        
        if (investorError) throw investorError;
        
        setInvestor(investorData as Investor);
        
        // Fetch investor documents
        const { data: documentData, error: documentError } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', investorId);
        
        if (documentError) throw documentError;
        
        setDocuments(documentData as Document[]);
        
        // Fetch investor updates
        const { data: updateData, error: updateError } = await supabase
          .from('updates')
          .select('*')
          .eq('user_id', investorId);
        
        if (updateError) throw updateError;
        
        setUpdates(updateData as Update[]);
        
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to fetch data: ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInvestorData();
  }, [id, user, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!investor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {investor.name}</h1>
        <p className="text-muted-foreground mb-8">Here's an overview of your investment</p>
        
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
            value={investor.investor_code || "Class A"}
            subtitle={<AmountDisplay amount={100000} /> + " per unit"}
            icon={<FileText className="h-4 w-4" />}
          />
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 mr-2 text-[#43A66A]" />
                <h2 className="text-2xl font-bold">NAV</h2>
              </div>
              <NAVSection />
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-[#43A66A]" />
                <h2 className="text-2xl font-bold">Documents</h2>
              </div>
              
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.filename}
                      date={new Date(doc.uploaded_at).toLocaleDateString()}
                      category={doc.type}
                      attachmentName={doc.filename}
                      onClick={() => window.open(doc.file_url, '_blank')}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No documents available
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="updates">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 mr-2 text-[#43A66A]" />
                <h2 className="text-2xl font-bold">Updates & Notices</h2>
              </div>
              
              {updates.length > 0 ? (
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div 
                      key={update.id}
                      className="p-4 border rounded-md"
                    >
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <div>{new Date(update.posted_at).toLocaleDateString()}</div>
                        <div>Posted by: {update.posted_by}</div>
                      </div>
                      <p className="whitespace-pre-wrap">{update.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No updates available
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvestorDashboard;
