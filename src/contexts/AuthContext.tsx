import { createContext, type ReactNode, useState } from "react";
import { login } from "../services/Service";
import type UserLogin from "../models/UserLogin";



interface AuthContextProps {
    user: UserLogin;
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
        token: ""
    },
    handleLogout: () => {},
    handleLogin: async () => {},
    isLoading: false
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserLogin>({
        id: 0,
        name: "",
        user: "",
        password: "",
        photo: "",
        token: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true);
        try {
            const data = await login(`/users/login`, userLogin);
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
        token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
