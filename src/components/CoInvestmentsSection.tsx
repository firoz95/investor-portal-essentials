
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { coInvestments, formatCurrency, formatDate } from "@/utils/mockData";

// Check if the investor has any co-investments
const hasCoInvestments = coInvestments.length > 0;

const CoInvestmentsSection = () => {
  if (!hasCoInvestments) {
    return null; // Don't show the section if there are no co-investments
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#4B2E83]">Co-Investments</CardTitle>
        <CardDescription>Direct investments made through the fund</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coInvestments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">{investment.name}</TableCell>
                <TableCell>{formatDate(investment.date)}</TableCell>
                <TableCell>{formatCurrency(investment.amount)}</TableCell>
                <TableCell>{investment.status}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    {investment.documents.map((doc, index) => (
                      <Button 
                        key={index} 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start p-0 h-auto"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">{doc.title}</span>
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CoInvestmentsSection;
