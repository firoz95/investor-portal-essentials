
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Phone, Edit, Trash } from "lucide-react";
import { formatCurrency } from "@/utils/mockData";
import { useNavigate } from "react-router-dom";

interface InvestorCardProps {
  investor: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    capitalCommitment: {
      total: number;
      class: string;
    };
    tags?: string[];
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const InvestorCard: React.FC<InvestorCardProps> = ({
  investor,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{investor.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Mail className="h-4 w-4" />
              <span>{investor.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Phone className="h-4 w-4" />
              <span>{investor.mobile}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Total Commitment</div>
            <div className="font-semibold text-lg">
              {formatCurrency(investor.capitalCommitment.total)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Class: {investor.capitalCommitment.class}
            </div>
          </div>
        </div>
        
        {investor.tags && investor.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {investor.tags.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-muted/30 px-6 py-3 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/investor/${investor.id}`)}
        >
          <FileText className="h-4 w-4 mr-2" />
          View Details
        </Button>
        
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          
          {onDelete && (
            <Button variant="ghost" size="icon" className="text-destructive" onClick={onDelete}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default InvestorCard;
