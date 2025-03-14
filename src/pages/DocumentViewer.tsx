
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Link as LinkIcon, 
  Calendar, 
  Info, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDate, documents } from "@/utils/mockData";

const DocumentViewer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Find document by ID from our mock data, or use first document if ID not found
  const document = documents.find(doc => doc.id === id) || documents[0];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold">{document.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="border-b px-6 py-4 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{document.attachmentName}</span>
                </div>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-muted flex items-center justify-center p-4">
                  <div className="text-center space-y-4">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Preview not available</p>
                      <p className="text-sm text-muted-foreground">Please download the document to view it</p>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Document Details</h3>
                  <Separator className="my-3" />
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID</span>
                      <span className="text-sm font-medium">{document.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <Badge variant="outline">{document.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <Badge>{document.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-medium">{formatDate(document.date)}</span>
                    </div>
                    <Separator className="my-1" />
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {document.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Related Documents</h3>
                <Separator className="my-1" />
                <div className="space-y-4">
                  {documents.filter(doc => doc.id !== document.id).slice(0, 3).map((doc) => (
                    <div 
                      key={doc.id} 
                      className="flex items-start space-x-3 cursor-pointer group"
                      onClick={() => navigate(`/document/${doc.id}`)}
                    >
                      <div className="p-2 rounded bg-muted/80">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{doc.title}</h4>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(doc.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/documents")}>
                  View All Documents
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-blue-50">
                    <Info className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Need Assistance?</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      If you have questions about this document, please contact your fund administrator.
                    </p>
                    <div className="flex space-x-3 mt-3">
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentViewer;
