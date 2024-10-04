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
        localStorage.setItem('id', userData.id );
        localStorage.setItem('RolUsuario', userData.rol);

        localStorage.setItem('nombreUsuario', userData.nombreUsuario);
        localStorage.setItem('documento', userData.documento);
        setToken(userData.token);
    };

    const logout = () => {
        setUser(null); 
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('RolUsuario');
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('documento');
    };

    return (
        <AuthContext.Provider value={{ user, token, login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
