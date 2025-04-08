
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Redirect based on user role
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate(`/investor/${user.id}`);
    }
  }, [user, isAdmin, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Dashboard;
