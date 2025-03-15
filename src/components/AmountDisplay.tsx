
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AmountDisplayProps {
  amount: number;
  className?: string;
  fullDisplay?: boolean;
}

// Helper to convert amount to crores with appropriate rounding
const formatAmountInCrores = (amount: number): string => {
  const amountInCrores = amount / 10000000; // 1 crore = 10,000,000
  return `₹ ${amountInCrores.toFixed(2)} Crs`;
};

// Helper to format the full amount in Indian format
const formatFullAmount = (amount: number): string => {
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

const AmountDisplay: React.FC<AmountDisplayProps> = ({ amount, className = "", fullDisplay = false }) => {
  // If fullDisplay is true, just show the full amount without the tooltip
  if (fullDisplay) {
    return <span className={className}>{formatFullAmount(amount)}</span>;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`cursor-help ${className}`}>
            {formatAmountInCrores(amount)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formatFullAmount(amount)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Export these helper functions for use in other components
export { formatAmountInCrores, formatFullAmount };
export default AmountDisplay;
