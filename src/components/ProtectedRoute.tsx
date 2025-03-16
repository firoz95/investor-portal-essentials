
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = false
}) => {
  const { currentInvestor } = useAppContext();
  
  // If we're requiring admin and not on superadmin route, redirect to login
  if (requireAdmin) {
    // This would need additional logic if we have admin users in the system
    return <Navigate to="/login" replace />;
  }
  
  // For investor routes, check if currentInvestor exists
  if (!currentInvestor) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
