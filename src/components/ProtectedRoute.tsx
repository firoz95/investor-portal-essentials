
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = false
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const params = useParams();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If requiring admin access
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  // For authenticated routes
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // For investor routes with specific IDs, verify access rights
  // In a real app, you'd check if the logged-in user can access this investor's data
  if (params.id && !isAdmin) {
    // Check if the user is trying to access their own profile
    // This is just a simple check - in a real app you'd verify permissions more thoroughly
    if (user.id !== params.id) {
      return <Navigate to={`/investor/${user.id}`} replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
