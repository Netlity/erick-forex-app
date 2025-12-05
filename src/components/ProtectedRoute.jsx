import { Navigate, Outlet } from "react-router-dom";

// Replace this with your real auth check (context, redux, localStorage, etc.)
const useAuth = () => {
  const user = localStorage.getItem("user") || localStorage.getItem("token");
  return !!user; // return true if logged in
};

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  // If not logged in → redirect to /login, but remember where they were trying to go
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → show the child routes (Dashboard, Orders, etc.)
  return <Outlet />;
};

export default ProtectedRoute;