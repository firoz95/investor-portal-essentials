
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, AlertCircle } from "lucide-react";
import { documents, formatDate, drawdownNotices } from "@/utils/mockData";
import { formatCurrency } from "@/utils/mockData";

const DocumentsSection = () => {
  const ppmDocs = documents.filter(doc => doc.category === "PPM");
  const contributionAgreements = documents.filter(doc => doc.category === "Contribution Agreement");
  const sideLetters = documents.filter(doc => doc.category === "Side Letter" && doc.showToCurrentInvestor);
  const unitStatements = documents.filter(doc => doc.category === "Unit Statement");
  
  const handleView = (doc: any) => {
    // Logic to view document
    console.log("Viewing document:", doc.title);
  };
  
  const handleDownload = (doc: any) => {
    // Logic to download document
    console.log("Downloading document:", doc.title);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#4B2E83]">Documents</CardTitle>
        <CardDescription>Access your fund documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-muted/50 w-full justify-start overflow-auto whitespace-nowrap custom-scrollbar p-1">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="ppm">PPM</TabsTrigger>
            <TabsTrigger value="agreement">Contribution Agreement</TabsTrigger>
            {sideLetters.length > 0 && <TabsTrigger value="sideletter">Side Letter</TabsTrigger>}
            <TabsTrigger value="units">Unit Statement</TabsTrigger>
            <TabsTrigger value="notices">Contribution Notices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {documents
                .filter(doc => doc.category !== "Side Letter" || doc.showToCurrentInvestor)
                .map(doc => (
                <div key={doc.id} className="border rounded-md p-4 flex items-start space-x-4">
                  <div className="bg-muted/50 p-2.5 rounded mt-0.5">
                    <FileText className="h-5 w-5 text-[#4B2E83]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{doc.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(doc.date)}</span>
                        </p>
                      </div>
                      <Badge variant="outline">{doc.category}</Badge>
                    </div>
                    {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleView(doc)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                      {(doc.downloadable !== false) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ppm" className="space-y-4">
            {ppmDocs.map(doc => (
              <div key={doc.id} className="border rounded-md p-4 flex items-start space-x-4">
                <div className="bg-muted/50 p-2.5 rounded mt-0.5">
                  <FileText className="h-5 w-5 text-[#4B2E83]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(doc.date)}</span>
                  </p>
                  {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleView(doc)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    {/* PPM is not downloadable */}
                  </div>
                  {doc.copyable === false && (
                    <div className="flex items-center mt-2 text-xs text-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      This document cannot be copied, downloaded, or transferred.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="agreement" className="space-y-4">
            {contributionAgreements.map(doc => (
              <div key={doc.id} className="border rounded-md p-4 flex items-start space-x-4">
                <div className="bg-muted/50 p-2.5 rounded mt-0.5">
                  <FileText className="h-5 w-5 text-[#4B2E83]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(doc.date)}</span>
                  </p>
                  {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleView(doc)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                  {doc.confidential && (
                    <div className="flex items-center mt-2 text-xs text-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      This document is confidential.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          {sideLetters.length > 0 && (
            <TabsContent value="sideletter" className="space-y-4">
              {sideLetters.map(doc => (
                <div key={doc.id} className="border rounded-md p-4 flex items-start space-x-4">
                  <div className="bg-muted/50 p-2.5 rounded mt-0.5">
                    <FileText className="h-5 w-5 text-[#4B2E83]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(doc.date)}</span>
                    </p>
                    {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleView(doc)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </div>
                    {doc.confidential && (
                      <div className="flex items-center mt-2 text-xs text-amber-600">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        This document is confidential.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          )}
          
          <TabsContent value="units" className="space-y-4">
            {unitStatements.map(doc => (
              <div key={doc.id} className="border rounded-md p-4 flex items-start space-x-4">
                <div className="bg-muted/50 p-2.5 rounded mt-0.5">
                  <FileText className="h-5 w-5 text-[#4B2E83]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(doc.date)}</span>
                  </p>
                  {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleView(doc)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                  {doc.confidential && (
                    <div className="flex items-center mt-2 text-xs text-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      This document is confidential.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="notices" className="space-y-4">
            {drawdownNotices.map(notice => (
              <div key={notice.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Contribution Notice - {formatDate(notice.date)}</h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {notice.id}</p>
                  </div>
                  <Badge variant={notice.status === "Paid" ? "outline" : "secondary"}>
                    {notice.status}
                  </Badge>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{formatCurrency(notice.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Percentage of Commitment:</span>
                    <span className="font-medium">{notice.percentage}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className={`font-medium ${notice.status === "Pending" ? "text-red-600 font-bold" : ""}`}>
                      {formatDate(notice.dueDate)}
                    </span>
                  </div>
                  {notice.paymentDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Date:</span>
                      <span className="font-medium">{formatDate(notice.paymentDate)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="font-medium">{notice.purpose}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleView(notice)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View Notice
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleDownload(notice)}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
