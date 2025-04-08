
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  MessageSquare, 
  Send, 
  Calendar,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Update {
  id: string;
  content: string;
  date: Date;
  investorId?: string; // Optional - specific to an investor
}

interface UpdateListProps {
  updates: Update[];
  investorId?: string; // Optional - to filter updates
  onAddUpdate?: (content: string, investorId?: string) => void;
  readOnly?: boolean; // For investor view
}

const UpdateList: React.FC<UpdateListProps> = ({
  updates,
  investorId,
  onAddUpdate,
  readOnly = false
}) => {
  const [newUpdate, setNewUpdate] = useState("");
  const { toast } = useToast();
  
  const filteredUpdates = investorId 
    ? updates.filter(update => !update.investorId || update.investorId === investorId)
    : updates;
  
  const handleAddUpdate = () => {
    if (!newUpdate.trim()) {
      toast({
        title: "Empty update",
        description: "Please enter content for your update.",
        variant: "destructive"
      });
      return;
    }
    
    if (onAddUpdate) {
      onAddUpdate(newUpdate, investorId);
      setNewUpdate("");
      
      toast({
        title: "Update posted",
        description: "Your update has been posted successfully."
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          Updates & Notifications
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No updates available
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUpdates.map((update) => (
              <div 
                key={update.id}
                className="p-4 border rounded-md"
              >
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(update.date, 'PPP')}
                </div>
                <p className="whitespace-pre-wrap">{update.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      {!readOnly && onAddUpdate && (
        <CardFooter className="flex-col border-t px-6 pt-4">
          <Textarea
            placeholder="Write a new update for the investor..."
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleAddUpdate}
              className="flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Post Update
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpdateList;
