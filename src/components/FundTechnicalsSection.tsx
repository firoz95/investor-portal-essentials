
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { fundInformation, formatDate } from "@/utils/mockData";

const FundTechnicalsSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#4B2E83]">Fund Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium block">First Close Date:</span>
                <span className="text-sm">{formatDate(fundInformation.firstCloseDate)}</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Subsequent Closings:</span>
                <div className="space-y-1">
                  {fundInformation.subsequentClosingDates.map((date, index) => (
                    <span key={index} className="text-sm block">
                      {formatDate(date)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Final Close:</span>
                <span className="text-sm">{fundInformation.finalCloseDate || "TBD"}</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Commitment Period:</span>
                <span className="text-sm">{fundInformation.commitmentPeriod}</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Fund Life:</span>
                <span className="text-sm">{fundInformation.fundLife}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundTechnicalsSection;
