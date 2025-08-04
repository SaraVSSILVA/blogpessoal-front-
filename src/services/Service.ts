/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
import type User from "../models/User";
import type UserLogin from "../models/UserLogin";


const api = axios.create({
    baseURL: 'https://blogpessoal-nest-6jeu.onrender.com/'
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

export const login = async (url: string, dados: UserLogin): Promise<UserLogin> => {
    const { data } = await api.post<UserLogin>(url, dados);
    return data;
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}
