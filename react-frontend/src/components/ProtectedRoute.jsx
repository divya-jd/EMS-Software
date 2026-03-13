import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ role, children }) => {
    const isAuth = AuthService.isUserLoggedIn();
    const userRole = localStorage.getItem('role');

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (role && role !== userRole && userRole !== 'ROLE_ADMIN') {
        // Simple role check: Admin accesses all, others restricted if specific role required
        // In this case, if route requires ADMIN but user is not ADMIN
        if (role === 'ROLE_ADMIN' && userRole !== 'ROLE_ADMIN') {
            return <Navigate to="/employees" replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
