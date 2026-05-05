import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = user?.id || null;

    useEffect(() => {
        function loadStorageData() {
            const recoveredUser = localStorage.getItem('user_data');
            const token = localStorage.getItem('token');

            if (recoveredUser && token && recoveredUser !== "undefined") {
                try {
                    const parsedUser = JSON.parse(recoveredUser);
                    setUser(parsedUser);
                    console.log(userId);
                    // Configura o token nas requisições caso a página seja atualizada
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (e) {
                    console.error("Erro ao processar dados de sessão:", e);
                    localStorage.clear();
                }
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    const login = async (username, password) => {
        try {
        
            const response = await api.post('/login', { username, password });
            
            const { token, userData } = response.data; 

            if (token && userData) {
              
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                localStorage.setItem('token', token);
                localStorage.setItem('user_data', JSON.stringify(userData)); 
                console.log(userData);

                setUser(userData);
                return { success: true };
            }
        } catch (error) {
            console.error("Falha na autenticação:", error);
            return { success: false, error: "Usuário ou senha inválidos" };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Refatorado para lidar com o array de roles que o Java envia
    const hasRole = (roleRequired) => {
        if (!user || !user.role) return false;
        return user.role.includes(roleRequired);
    };

    const updateUserData = (newData) => {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            userId,
            login, 
            logout, 
            hasRole, 
            updateUserData,
            signed: !!user, 
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);