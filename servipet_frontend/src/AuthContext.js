import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token');
    });
    const login = (userData) => {
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', userData.token);
        setToken(userData.token);
    };

    const logout = () => {
        setUser(null); 
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
