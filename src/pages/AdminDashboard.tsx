
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, MessageSquare } from "lucide-react";
import InvestorList from "./admin/InvestorList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </div>
        </div>
        
        <Tabs defaultValue="investors">
          <TabsList className="mb-6">
            <TabsTrigger value="investors">
              <Users className="h-4 w-4 mr-2" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="updates">
              <MessageSquare className="h-4 w-4 mr-2" />
              Updates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="investors">
            <InvestorList />
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section will show all documents uploaded across investors.
                  For now, please manage documents in each investor's detail page.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>All Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section will show all updates posted across investors.
                  For now, please manage updates in each investor's detail page.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
