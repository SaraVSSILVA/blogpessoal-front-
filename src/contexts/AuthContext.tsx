import { createContext, type ReactNode, useState } from "react";
import { login } from "../services/Service";
import type User from "../models/User";
import type UserLogin from "../models/UserLogin";



interface AuthContextProps {
    user: User;
    handleLogout(): void;
    handleLogin(userLogin: UserLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps>({
    user: {
        id: 0,
        name: "",
        user: "",
        password: "",
        photo: "",
    },
    handleLogout: () => {},
    handleLogin: async () => {},
    isLoading: false
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        user: "",
        password: "",
        photo: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true);
        try {
            const data = await login(`/usuarios/logar`, userLogin);
            setUser(data);
            alert("Usuário logado com sucesso!");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            alert("Dados do usuário inconsistentes");
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUser({
            id: 0,
            name: "",
            user: "",
            password: "",
            photo: "",
        });
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
