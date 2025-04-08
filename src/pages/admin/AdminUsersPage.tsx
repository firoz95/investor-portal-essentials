
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminCreateUserForm from "@/components/AdminCreateUserForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AdminUsersPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleCreateUser = async (userData: {
    email: string;
    name: string;
    phone: string;
    investor_code: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      
      // First create the auth user with Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
      });
      
      if (authError) throw authError;
      
      if (!authData.user) throw new Error("User creation failed");
      
      // Then add the investor profile
      const { error: userError } = await supabase
        .from('users')
        .update({
          name: userData.name,
          phone: userData.phone,
          investor_code: userData.investor_code,
          role: "investor"
        })
        .eq('id', authData.user.id);
      
      if (userError) throw userError;
      
      toast({
        title: "Success",
        description: `Investor ${userData.name} created successfully`
      });
      
      return true;
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: "Error Creating User",
        description: error.message || "Failed to create user",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="text-sm text-muted-foreground">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Investor Account</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminCreateUserForm onSubmit={handleCreateUser} isLoading={loading} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsersPage;
