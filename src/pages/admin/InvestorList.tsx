
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import InvestorCard from "@/components/InvestorCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import InvestorForm from "@/components/InvestorForm";

const InvestorList: React.FC = () => {
  const { investors, addInvestor, updateInvestor, deleteInvestor } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter investors based on search query
  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddInvestor = (values: any) => {
    addInvestor({
      ...values,
      id: crypto.randomUUID(),
      navData: {
        currentNAV: values.capitalCommitment.total, // Initial NAV equals commitment
        changePercentage: 0,
        navStatements: []
      },
      capitalContributions: [],
      documents: []
    });
    
    setIsFormOpen(false);
    toast({
      title: "Investor added",
      description: `${values.name} has been added successfully.`
    });
  };
  
  const handleEditInvestor = (investor: any) => {
    setSelectedInvestor(investor);
    setIsFormOpen(true);
  };
  
  const handleUpdateInvestor = (values: any) => {
    if (!selectedInvestor) return;
    
    updateInvestor({
      ...selectedInvestor,
      ...values
    });
    
    setIsFormOpen(false);
    setSelectedInvestor(null);
    toast({
      title: "Investor updated",
      description: `${values.name} has been updated successfully.`
    });
  };
  
  const handleDeleteInvestor = (investorId: string) => {
    const investor = investors.find(inv => inv.id === investorId);
    if (!investor) return;
    
    deleteInvestor(investorId);
    toast({
      title: "Investor deleted",
      description: `${investor.name} has been removed.`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search investors..."
            className="w-full pl-9 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedInvestor ? "Edit Investor" : "Add New Investor"}
              </DialogTitle>
              <DialogDescription>
                {selectedInvestor 
                  ? "Update the investor's information" 
                  : "Fill in the details to add a new investor"}
              </DialogDescription>
            </DialogHeader>
            <InvestorForm
              defaultValues={selectedInvestor || undefined}
              onSubmit={selectedInvestor ? handleUpdateInvestor : handleAddInvestor}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedInvestor(null);
              }}
              isEdit={!!selectedInvestor}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {filteredInvestors.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">
            No investors found
          </h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Add your first investor to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInvestors.map((investor) => (
            <InvestorCard
              key={investor.id}
              investor={investor}
              onEdit={() => handleEditInvestor(investor)}
              onDelete={() => handleDeleteInvestor(investor.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestorList;
