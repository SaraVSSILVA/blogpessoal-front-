/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Tema from '../../../models/Tema'
import { atualizar, buscar, cadastrar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/themes/${id}`, setTema, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    })
  }

  function retornar() {
    navigate('/themes')
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/themes`, tema, setTema, {
          headers: { Authorization: token },
        })
        ToastAlerta('O Tema foi atualizado com sucesso!', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o tema.', 'erro')
        }
      }
    } else {
      try {
        await cadastrar(`/themes`, tema, setTema, {
          headers: { Authorization: token },
        })
        ToastAlerta('O Tema foi cadastrado com sucesso!', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar o tema.', 'erro')
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto font-serif">
      {' '}
      <h1 className="text-4xl text-center my-8 text-stone-800">
        {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}{' '}
      </h1>{' '}
      <form
        className="w-1/2 flex flex-col gap-4 bg-stone-100 p-8 rounded-lg shadow-md"
        onSubmit={gerarNovoTema}
      >
        {' '}
        <div className="flex flex-col gap-2">
          {' '}
          <label htmlFor="description" className="text-stone-800">
            Descrição do Tema
          </label>{' '}
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="description"
            className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
            value={tema.description || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />{' '}
        </div>{' '}
        <button
          className="rounded text-stone-100 bg-green-700 hover:bg-green-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
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
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          )}{' '}
        </button>{' '}
      </form>{' '}
    </div>
  )
}

export default FormTema
