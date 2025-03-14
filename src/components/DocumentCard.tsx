
import React from "react";
import { cn } from "@/lib/utils";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  attachmentName: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  date,
  category,
  attachmentName,
  description,
  onClick,
  className,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer h-full flex flex-col",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between">
          <div className="mr-4">
            <Badge 
              variant="secondary"
              className="mb-3 font-normal text-xs"
            >
              {category}
            </Badge>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-2">{date}</p>
            {description && (
              <p className="text-muted-foreground text-sm line-clamp-2 mt-3">
                {description}
              </p>
            )}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t bg-muted/20">
        <span className="text-xs text-muted-foreground truncate max-w-[70%]">
          {attachmentName}
        </span>
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" aria-label="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" aria-label="Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
