
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { investorProfile } from "@/utils/mockData";
import { User, Mail, Phone, MapPin } from "lucide-react";

const InvestorInfoSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#4B2E83]">Investor Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm">{investorProfile.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Address:</span>
              <span className="text-sm">{investorProfile.address}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Contact Person:</span>
              <span className="text-sm">{investorProfile.contactPerson}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm">{investorProfile.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Phone:</span>
              <span className="text-sm">{investorProfile.contactPhone}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorInfoSection;
