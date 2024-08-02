
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoutes;
