import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signIn" />;
  }

  return element
};

export default ProtectedRoute;
