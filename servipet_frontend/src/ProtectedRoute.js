import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, roles}) => {
    const token =localStorage["token"];
    const { user } = useAuth();
    const location = useLocation();
    if ((!token) || ( roles && !roles.includes(user.rol))) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
