
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  capitalCommitment, 
  capitalContributions, 
  distributions, 
  feeCharges, 
  formatDate, 
  getFeeStructureForInvestor,
  getTotalCapitalContributed, 
  getRemainingCommitment 
} from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, DollarSign, TrendingUp, PieChart, PercentIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AmountDisplay from "@/components/AmountDisplay";

const CapitalActivitySection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalContributed = getTotalCapitalContributed();
  const remainingCommitment = getRemainingCommitment();
  const contributionPercentage = (totalContributed / capitalCommitment.total) * 100;
  
  const feeStructure = getFeeStructureForInvestor(capitalCommitment.total);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#4B2E83]">Capital Activity</CardTitle>
        <CardDescription>Overview of your capital contributions and fees</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 w-full justify-start overflow-auto whitespace-nowrap custom-scrollbar p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="distributions">Distributions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Commitment</div>
                <div className="text-2xl font-bold mt-1">
                  <AmountDisplay amount={capitalCommitment.total} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">Class {capitalCommitment.class}</div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Contributed</div>
                <div className="text-2xl font-bold mt-1">
                  <AmountDisplay amount={totalContributed} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {contributionPercentage.toFixed(1)}% of commitment
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Remaining Commitment</div>
                <div className="text-2xl font-bold mt-1">
                  <AmountDisplay amount={remainingCommitment} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {(100 - contributionPercentage).toFixed(1)}% of commitment
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Fees Paid</div>
                <div className="text-2xl font-bold mt-1">
                  <AmountDisplay amount={feeCharges.reduce((sum, fee) => sum + fee.amount, 0)} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  See Fee Details
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Contribution Progress</span>
                <span className="text-sm">{contributionPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={contributionPercentage} className="h-2" />
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Fee Structure for Class {capitalCommitment.class}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-md p-3 flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PercentIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Management Fee</span>
                    <p className="text-xs text-muted-foreground">{feeStructure.managementFee}</p>
                  </div>
                </div>
                <div className="border rounded-md p-3 flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Performance Fee</span>
                    <p className="text-xs text-muted-foreground">{feeStructure.performanceFee}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contributions" className="space-y-4">
            <div className="space-y-4">
              {capitalContributions.map((contribution) => (
                <div key={contribution.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">
                        <AmountDisplay amount={contribution.amount} />
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(contribution.date)} · {contribution.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Received
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ref: {contribution.reference}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fees" className="space-y-4">
            <div className="space-y-4">
              {feeCharges.map((fee) => (
                <div key={fee.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{fee.type}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(fee.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium">
                        <AmountDisplay amount={fee.amount} />
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {fee.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {fee.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="distributions" className="space-y-4">
            {distributions.length > 0 ? (
              <div className="space-y-4">
                {distributions.map((distribution, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{distribution.type}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(distribution.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <h4 className="font-medium">
                          <AmountDisplay amount={distribution.amount} />
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <DollarSign className="mx-auto h-10 w-10 text-muted-foreground/50" />
                <h3 className="mt-2 text-lg font-medium">No Distributions Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Distributions will appear here when they are made.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CapitalActivitySection;
