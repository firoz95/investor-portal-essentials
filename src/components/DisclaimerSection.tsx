
import React from "react";
import { AlertCircle } from "lucide-react";

const DisclaimerSection = () => {
  return (
    <div className="border-t border-border mt-8 pt-4">
      <div className="flex items-start space-x-2 text-muted-foreground">
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p className="text-xs">
          <span className="font-medium">Disclaimer:</span> This webpage is updated to the best of the fund manager's ability. 
          No information mentioned on this page has any legal binding effect. The notices shown on this website are for reference only and do not constitute a legal delivery 
          or contract with the user. All notices will continue to be legally delivered as per the Notices clause in the contribution 
          agreement and to the respective email ID / addresses provided by the investor.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerSection;
