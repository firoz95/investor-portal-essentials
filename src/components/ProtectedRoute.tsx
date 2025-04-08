
import React from "react";
import { Navigate, useParams } from "react-router-dom";
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
  const params = useParams();
  
  // If requiring admin access
  if (requireAdmin) {
    // Check if we have admin access (superadmin is hardcoded for now - would be replaced with Supabase auth)
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }
  
  // For investor routes
  if (!currentInvestor) {
    return <Navigate to="/login" replace />;
  }
  
  // If we're on an investor/:id route, verify they can only access their own data
  if (params.id && currentInvestor.id !== params.id) {
    return <Navigate to={`/investor/${currentInvestor.id}`} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
