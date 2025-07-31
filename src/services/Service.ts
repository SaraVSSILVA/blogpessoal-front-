import axios from "axios";
import type User from "../models/User";
import type UserLogin from "../models/UserLogin";

const api = axios.create({
    baseURL: 'https:
})

/**
 * Cadastra um novo usuário na API.
 * @param url Endpoint para cadastro (ex: /usuarios/cadastrar)
 * @param dados Objeto do usuário para cadastro, sem o ID.
 * @returns A promise com os dados do usuário cadastrado.
 */
export const cadastrarUsuario = async (url: string, dados: Omit<User, 'id'>): Promise<User> => {
    const { data } = await api.post<User>(url, dados);
    return data;
}

export const login = async (url: string, dados: UserLogin): Promise<User> => {
    const { data } = await api.post<User>(url, dados);
    return data;
}