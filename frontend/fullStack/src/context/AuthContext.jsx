import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../../api/axiosApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {

            const res = await apiClient.get("/auth/me");

            setIsAuthenticated(true);
            setUser(res.data.user);

        } catch (err) {

            setIsAuthenticated(false);
            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                loading,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);