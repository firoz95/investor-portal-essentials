
import React, { useState } from "react";
import { FileUp, Check, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface DocUploaderProps {
  onUpload?: (file: File) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

const DocUploader: React.FC<DocUploaderProps> = ({
  onUpload,
  allowedTypes = [".pdf", ".docx", ".xlsx", ".xls", ".doc"],
  maxSize = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    // Check file type
    const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload one of the following: ${allowedTypes.join(", ")}`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !onUpload) return;
    
    setUploading(true);
    try {
      // Here we would normally upload to Supabase
      // For now just simulate upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpload(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} has been uploaded successfully`,
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const clearSelectedFile = () => {
    setSelectedFile(null);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        {!selectedFile ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/10" : "border-border"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="mb-4">
              <p className="text-lg font-medium">Drag & Drop a file here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse (max {maxSize}MB)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supported: {allowedTypes.join(", ")}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept={allowedTypes.join(",")}
              onChange={handleFileChange}
            />
            <Button asChild>
              <label htmlFor="file-upload">Select File</label>
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={clearSelectedFile}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="default"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload File"}
                {!uploading && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocUploader;
