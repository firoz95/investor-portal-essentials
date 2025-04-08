
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // If user is already logged in, redirect appropriately
    if (user) {
      navigate(isAdmin ? "/admin/dashboard" : `/investor/${user.id}`);
    }
  }, [user, isAdmin, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="w-full max-w-md p-4">
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign up disabled</CardTitle>
            <CardDescription>
              New accounts can only be created by an administrator.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            <p className="text-center text-muted-foreground">
              Please contact your administrator to create an account.
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
