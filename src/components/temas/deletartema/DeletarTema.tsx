/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react'
import { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Tema from '../../../models/Tema'
import { buscar, deletar } from '../../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/themes/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/themes/${id}`, {
        headers: {
          Authorization: token,
        },
      })

      ToastAlerta('Tema apagado com sucesso', 'sucesso')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar o tema.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate('/themes')
  }

  return (
    <div className="container w-1/3 mx-auto font-serif">
      {' '}
      <h1 className="text-4xl text-center my-4 text-stone-800">
        Deletar tema
      </h1>{' '}
      <p className="text-center font-semibold mb-4 text-stone-800">
        Você tem certeza de que deseja apagar o tema a seguir?{' '}
      </p>{' '}
      <div className="border border-stone-400 rounded-2xl overflow-hidden justify-between bg-stone-100 shadow-md">
        {' '}
        <header className="py-2 px-6 bg-stone-800 text-stone-100 font-bold text-2xl">
          Tema{' '}
        </header>{' '}
        <p className="p-8 text-3xl h-full bg-stone-100 text-stone-800">
          {tema.description}
        </p>{' '}
        <div className="flex">
          {' '}
          <button
            className="text-stone-100 bg-green-700 hover:bg-green-800 w-full py-2"
            onClick={retornar}
          >
            Não{' '}
          </button>{' '}
          <button
            className="w-full text-stone-100 bg-red-700 hover:bg-red-800 flex items-center justify-center py-2"
            onClick={deletarTema}
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
              <span>Sim</span>
            )}{' '}
          </button>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}
export default DeletarTema
