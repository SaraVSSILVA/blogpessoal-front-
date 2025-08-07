/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Post from '../../../models/Post'
import { buscar, deletar } from '../../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarPostagem() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagem, setPostagem] = useState<Post>({} as Post)

  const { id } = useParams<{ id: string }>()

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/posts/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
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

  async function deletarPostagem() {
    setIsLoading(true)

    try {
      await deletar(`/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      })

      ToastAlerta('Postagem apagada com sucesso', 'sucesso')
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar a postagem.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate('/postagens')
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4 font-serif text-stone-800">
        Deletar Postagem
      </h1>

      <p className="text-center font-semibold mb-4 font-serif text-stone-800">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border border-stone-400 rounded-2xl overflow-hidden justify-between font-serif bg-stone-100 shadow-md">
        <header className="py-2 px-6 bg-stone-800 text-stone-100 font-bold text-2xl">
          Postagem
        </header>
        <div className="p-4">
          <p className="text-xl h-full text-stone-800">{postagem.title}</p>
          <p className="text-stone-600">{postagem.text}</p>
        </div>
        <div className="flex">
          <button
            className="w-full text-stone-100 bg-green-700 hover:bg-green-800 py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-stone-100 bg-red-700 hover:bg-red-800 flex items-center justify-center py-2"
            onClick={deletarPostagem}
          >
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
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem
