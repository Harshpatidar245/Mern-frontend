import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = useCallback((token) => {
        sessionStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/user-home');  // Ensure navigation happens immediately after login
    }, [navigate]);

    const logout = useCallback(() => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
