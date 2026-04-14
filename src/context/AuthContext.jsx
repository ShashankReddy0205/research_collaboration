import { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore user session from localStorage on app mount
        const storedUserId = localStorage.getItem('authUserId');
        if (storedUserId) {
            const userData = dataService.getById('users', storedUserId);
            if (userData) {
                setUser(userData);
            } else {
                localStorage.removeItem('authUserId');
            }
        }
        setLoading(false);
    }, []);

    // Login by email + password, return user or null
    const login = (email, password) => {
        const matched = dataService.authenticate(email, password);
        if (matched) {
            setUser(matched);
            localStorage.setItem('authUserId', matched.id);
            return matched;
        }
        return null;
    };

    // Login by role (quick login for demo purposes)
    const loginByRole = (role) => {
        const users = dataService.getAll('users');
        const roleUser = users.find(u => u.role === role);
        if (roleUser) {
            setUser(roleUser);
            localStorage.setItem('authUserId', roleUser.id);
            return roleUser;
        }
        return null;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUserId');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginByRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
