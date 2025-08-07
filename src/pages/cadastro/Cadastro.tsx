import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type User from '../../models/User'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { ToastAlerta } from '../../utils/ToastAlerta'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>('')

  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: '',
  })

  function retornar() {
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === user.password && user.password.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario(`/users/register`, user)
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
        retornar() // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
      }
    } else {
      ToastAlerta(
        'Dados do usuário inconsistentes! Verifique as informações do cadastro.',
        'erro',
      )
      setUser({ ...user, password: '' })
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }

  return (
    <>
      {' '}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-serif bg-stone-200">
        {' '}
        <div className="hidden lg:block relative">
          {' '}
          <img
            src="https://i.imgur.com/G9L2p2H.jpg"
            alt="Imagem de fundo da vitrola"
            className="w-full h-screen object-cover"
          />{' '}
        </div>{' '}
        <form
          className="flex justify-center items-center flex-col w-2/3 gap-4 p-8 rounded-lg shadow-md bg-stone-100"
          onSubmit={cadastrarNovoUsuario}
        >
          {' '}
          <h2 className="text-stone-800 text-5xl font-bold">Cadastrar</h2>{' '}
          <div className="flex flex-col w-full gap-2">
            {' '}
            <label htmlFor="name" className="text-stone-800">
              Nome
            </label>{' '}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
              value={user.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />{' '}
          </div>{' '}
          <div className="flex flex-col w-full gap-2">
            {' '}
            <label htmlFor="user" className="text-stone-800">
              Email
            </label>{' '}
            <input
              type="text"
              id="user"
              name="user"
              placeholder="E-mail"
              className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
              value={user.user}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />{' '}
          </div>{' '}
          <div className="flex flex-col w-full gap-2">
            {' '}
            <label htmlFor="photo" className="text-stone-800">
              Foto
            </label>{' '}
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Link da foto"
              className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
              value={user.photo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />{' '}
          </div>{' '}
          <div className="flex flex-col w-full gap-2">
            {' '}
            <label htmlFor="password" className="text-stone-800">
              Senha
            </label>{' '}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
              value={user.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />{' '}
          </div>{' '}
          <div className="flex flex-col w-full gap-2">
            {' '}
            <label htmlFor="confirmarSenha" className="text-stone-800">
              Confirmar Senha
            </label>{' '}
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />{' '}
          </div>{' '}
          <div className="flex justify-around w-full gap-8">
            {' '}
            <button
              type="reset"
              className="rounded text-stone-100 bg-red-700 hover:bg-red-800 w-1/2 py-2 font-serif"
              onClick={retornar}
            >
              Cancelar{' '}
            </button>{' '}
            <button
              type="submit"
              className="rounded text-stone-100 bg-green-700 hover:bg-green-800 w-1/2 py-2 flex justify-center font-serif"
            >
              {' '}
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Cadastrar</span>
              )}{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </div>{' '}
    </>
  )
}

export default Cadastro
