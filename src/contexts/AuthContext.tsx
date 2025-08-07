/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState } from 'react'
import type UserLogin from '../models/UserLogin'
import { login } from '../services/Service'
import { ToastAlerta } from '../utils/ToastAlerta'

interface AuthContextProps {
  user: UserLogin
  handleLogout(): void
  handleLogin(userLogin: UserLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: '',
    token: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true)
    try {
      // A linha abaixo estava faltando a atribuição do resultado para o estado.
      const data = await login(`/users/login`, userLogin) // A chamada à API já estava correta.
      setUser(data) // Esta é a linha crucial que salva o usuário e o token no estado.
      ToastAlerta('Usuário logado com sucesso!', 'sucesso')
    } catch (error) {
      ToastAlerta('Dados do usuário inconsistentes!', 'erro')
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    setUser({
      id: 0,
      name: '',
      user: '',
      password: '',
      photo: '',
      token: '',
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
