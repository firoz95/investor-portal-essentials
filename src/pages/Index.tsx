
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <CardTitle className="text-2xl">New Age Entrepreneurs Fund</CardTitle>
          <CardDescription>
            Log in to access your investment dashboard and documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              This is a demo portal. Click the button below to view the login page.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Enter Portal
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
