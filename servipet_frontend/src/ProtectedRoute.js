import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roles}) => {
    const token =localStorage["token"];
    const { user } = useAuth();

    if ((!token) || ( roles && !roles.includes(user.rol))) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
