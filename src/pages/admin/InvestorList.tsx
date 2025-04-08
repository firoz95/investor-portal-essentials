
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import InvestorCard from "@/components/InvestorCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const InvestorList: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('investor_code', 'ADMIN');
        
        if (error) throw error;
        
        setInvestors(data || []);
        setFilteredInvestors(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to fetch investors: ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInvestors();
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInvestors(investors);
    } else {
      const filtered = investors.filter(investor => 
        investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.investor_code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvestors(filtered);
    }
  }, [searchTerm, investors]);

  const handleAddInvestor = async (values: any) => {
    try {
      // First create the auth user with Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: values.email,
        password: values.password,
        email_confirm: true,
      });
      
      if (authError) throw authError;
      
      if (!authData.user) throw new Error("User creation failed");
      
      // Then add the investor profile
      const { data, error } = await supabase
        .from('users')
        .update({
          name: values.name,
          phone: values.mobile,
          investor_code: values.capitalCommitment.class,
        })
        .eq('id', authData.user.id)
        .select();
      
      if (error) throw error;
      
      // Close the dialog and update the list
      setDialogOpen(false);
      if (data) {
        setInvestors([...investors, data[0] as Investor]);
      }
      
      toast({
        title: "Success",
        description: "Investor created successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create investor: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleEditInvestor = (id: string) => {
    navigate(`/admin/investor/${id}`);
  };

  const handleDeleteInvestor = async (id: string) => {
    try {
      // Delete the auth user and associated data
      const { error } = await supabase.auth.admin.deleteUser(id);
      
      if (error) throw error;
      
      // Update local state
      setInvestors(investors.filter(inv => inv.id !== id));
      
      toast({
        title: "Success",
        description: "Investor deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete investor: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Investors</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Investor</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new investor account
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <InvestorForm onSubmit={handleAddInvestor} />
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search investors..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredInvestors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <InvestorCard
                key={investor.id}
                investor={{
                  id: investor.id,
                  name: investor.name,
                  email: investor.email,
                  mobile: investor.phone,
                  capitalCommitment: {
                    total: 0,
                    class: investor.investor_code || "Class A"
                  }
                }}
                onEdit={() => handleEditInvestor(investor.id)}
                onDelete={() => handleDeleteInvestor(investor.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? "No investors match your search" : "No investors found"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestorList;
