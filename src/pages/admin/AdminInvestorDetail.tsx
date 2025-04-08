
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, MessageSquare, User } from "lucide-react";
import DocUploader from "@/components/DocUploader";
import UpdateList from "@/components/UpdateList";
import InvestorForm from "@/components/InvestorForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  posted_at: Date;
  posted_by: string;
}

const AdminInvestorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvestorData = async () => {
      setIsLoading(true);
      try {
        // Fetch investor details
        const { data: investorData, error: investorError } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();
        
        if (investorError) throw investorError;
        
        setInvestor(investorData as Investor);
        
        // Fetch investor documents
        const { data: documentData, error: documentError } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', id);
        
        if (documentError) throw documentError;
        
        setDocuments(documentData as Document[]);
        
        // Fetch investor updates
        const { data: updateData, error: updateError } = await supabase
          .from('updates')
          .select('*')
          .eq('user_id', id);
        
        if (updateError) throw updateError;
        
        setUpdates(updateData.map(update => ({
          ...update,
          posted_at: new Date(update.posted_at)
        })) as Update[]);
        
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to fetch investor data: ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchInvestorData();
    }
  }, [id, toast]);

  const handleUploadDocument = async (file: File) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `investors/${id}/${fileName}`;
      
      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      // Insert document record
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert({
          user_id: id,
          filename: file.name,
          file_url: publicUrl,
          type: file.type,
          uploaded_at: new Date().toISOString(),
        })
        .select();
      
      if (docError) throw docError;
      
      // Update documents list
      if (docData) {
        setDocuments(prev => [...prev, docData[0] as Document]);
      }
      
      toast({
        title: "Success",
        description: "Document uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to upload document: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleAddUpdate = async (content: string) => {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user?.email || 'Admin';
      
      const { data, error } = await supabase
        .from('updates')
        .insert({
          user_id: id,
          message: content,
          posted_at: new Date().toISOString(),
          posted_by: currentUser
        })
        .select();
      
      if (error) throw error;
      
      if (data) {
        setUpdates(prev => [...prev, {
          ...data[0],
          posted_at: new Date()
        } as Update]);
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to post update: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleUpdateInvestor = async (values: any) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: values.name,
          email: values.email,
          phone: values.mobile,
          investor_code: values.capitalCommitment.class
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setInvestor(prev => prev ? {
        ...prev,
        name: values.name,
        email: values.email,
        phone: values.mobile,
        investor_code: values.capitalCommitment.class
      } : null);
      
      toast({
        title: "Success",
        description: "Investor details updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update investor: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!investor) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Investor Not Found</h2>
                <p className="text-muted-foreground mb-6">The requested investor could not be found.</p>
                <Button onClick={() => navigate("/admin")}>Return to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Investor: {investor.name}</h1>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
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
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investor Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <InvestorForm 
                  isEdit={true}
                  defaultValues={{
                    name: investor.name,
                    email: investor.email,
                    mobile: investor.phone,
                    username: investor.email,
                    password: "",
                    capitalCommitment: {
                      total: 0,
                      class: investor.investor_code || "Class A",
                    }
                  }}
                  onSubmit={handleUpdateInvestor}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <DocUploader onUpload={handleUploadDocument} />
              </CardContent>
            </Card>
            
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {documents.map(doc => (
                  <Card key={doc.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium truncate">{doc.filename}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(doc.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                        <a 
                          href={doc.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No documents uploaded yet
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investor Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <UpdateList 
                  updates={updates}
                  investorId={id}
                  onAddUpdate={handleAddUpdate}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminInvestorDetail;
