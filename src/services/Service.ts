import axios from 'axios'
import { type Dispatch, type SetStateAction } from 'react'
import type User from '../models/User'
import type UserLogin from '../models/UserLogin'

const api = axios.create({
  baseURL: 'https://blogpessoal-nest-6jeu.onrender.com/',
})

/**
 * Cadastra um novo usuário na API.
 * @param url Endpoint para cadastro (ex: /usuarios/cadastrar)
 * @param dados Objeto do usuário para cadastro, sem o ID.
 * @returns A promise com os dados do usuário cadastrado.
 */
export const cadastrarUsuario = async (
  url: string,
  dados: Omit<User, 'id'>,
): Promise<User> => {
  const { data } = await api.post<User>(url, dados)
  return data
}

export const login = async (url: string, dados: UserLogin): Promise<UserLogin> => {
  const { data } = await api.post<UserLogin>(url, dados)
  return data
}

export const buscar = async <T>(
url: string, header: object,
): Promise<T> => {
  const resposta = await api.get<T>(url, header)
  return resposta.data
}

export const cadastrar = async <T>(
  url: string,
  dados: object,
  header: object,
): Promise<T> => {
  const resposta = await api.post<T>(url, dados, header)
  return resposta.data
}

export const atualizar = async <T>(
  url: string,
  dados: object,
  header: object,
): Promise<T> => {
  const resposta = await api.put<T>(url, dados, header)
  return resposta.data
}

export const deletar = async (url: string, header: object) => {
  await api.delete(url, header)
}
