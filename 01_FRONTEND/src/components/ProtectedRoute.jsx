import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // Wait until /auth/me finishes
    if (loading) {
        return <div>Loading...</div>;
    }

    // Not authenticated
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Authenticated
    return <Outlet />;
};

export default ProtectedRoute;