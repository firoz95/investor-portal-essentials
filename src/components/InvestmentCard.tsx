
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface InvestmentCardProps {
  id: string;
  name: string;
  sector: string;
  type: string;
  initialAmount: number;
  currentValue: number;
  investmentDate: string;
  performancePercentage: number;
  description?: string;
  onClick?: () => void;
  className?: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  id,
  name,
  sector,
  type,
  initialAmount,
  currentValue,
  investmentDate,
  performancePercentage,
  description,
  onClick,
  className,
}) => {
  const isPositive = currentValue >= initialAmount;
  const performanceColor = isPositive ? "text-green-600" : "text-red-600";
  const performanceIcon = isPositive ? (
    <ArrowUpRight className="h-4 w-4" />
  ) : (
    <ArrowDownRight className="h-4 w-4" />
  );

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
            <div className="flex space-x-2 mb-3">
              <Badge variant="secondary">{sector}</Badge>
              <Badge variant="outline">{type}</Badge>
            </div>
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-muted-foreground text-sm">Invested on {investmentDate}</p>
            
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Initial</span>
                <span className="font-medium">
                  ${initialAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className="font-medium">
                  ${currentValue.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={performancePercentage} className="h-1.5" />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">Performance</span>
                <span className={cn("flex items-center text-sm font-medium", performanceColor)}>
                  {performanceIcon}
                  {performancePercentage}%
                </span>
              </div>
            </div>
            
            {description && (
              <p className="text-muted-foreground text-sm line-clamp-2 mt-4">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      <CardFooter className="p-4 flex justify-between items-center border-t bg-muted/20">
        <span className="text-xs text-muted-foreground">
          ID: {id}
        </span>
        <Badge 
          variant="outline" 
          className="flex items-center space-x-1 p-1 text-xs border-primary/30"
        >
          <TrendingUp className="h-3 w-3" />
          <span>View Details</span>
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;
