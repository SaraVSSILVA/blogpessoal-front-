/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Post from '../../../models/Post'
import type Tema from '../../../models/Tema'
import { buscar, atualizar, cadastrar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormPostagem() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({
    id: 0,
    description: '',
  })

  const [postagem, setPostagem] = useState<Post>({
    id: 0,
    title: '',
    text: '',
    date: '',
    theme: null,
    username: null,
  })

  async function buscarPostagemPorId(id: string) {
    await buscar(`/posts/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    })
  }

  async function buscarTemas() {
    try {
      await buscar('/themes', setTemas, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        alert('O token expirou, favor logar novamente')
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
    buscarTemas()
    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      theme: tema,
    })
  }, [tema])

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      theme: tema,
      username: user,
    })
  }

  function retornar() {
    navigate('/postagens')
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    const postagemParaEnvio = { ...postagem, date: new Date().toISOString() }

    if (id !== undefined) {
      try {
        await atualizar(`/posts`, postagemParaEnvio, setPostagem, {
          headers: {
            Authorization: token,
          },
        })
        alert('Postagem atualizada com sucesso')
        retornar()
      } catch (error: any) {
        if (error.toString().includes('401')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'info')
        }
      }
    } else {
      try {
        await cadastrar(`/posts`, postagemParaEnvio, setPostagem, {
          headers: {
            Authorization: token,
          },
        })

        ToastAlerta('Postagem cadastrada com sucesso', 'info')
        retornar()
      } catch (error: any) {
        if (error.toString().includes('401')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem', 'info')
        }
      }
    }
  }

  const carregandoTema = tema.description === ''

  return (
    <div className="container flex flex-col mx-auto items-center">
      {' '}
      <h1 className="text-4xl text-center my-8 font-serif text-stone-800">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>{' '}
      <form
        onSubmit={gerarNovaPostagem}
        className="flex flex-col w-1/2 gap-4 font-serif bg-stone-100 p-8 rounded-lg shadow-md"
      >
        {' '}
        <div className="flex flex-col gap-2">
          {' '}
          <label htmlFor="title" className="text-stone-800">
            Título da postagem
          </label>{' '}
          <input
            value={postagem.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Título"
            name="title"
            required
            className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
          />{' '}
        </div>{' '}
        <div className="flex flex-col gap-2">
          {' '}
          <label htmlFor="text" className="text-stone-800">
            Texto da postagem
          </label>{' '}
          <textarea
            value={postagem.text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              atualizarEstado(e)
            }
            placeholder="Texto"
            name="text"
            required
            className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
          />{' '}
        </div>{' '}
        <div className="flex flex-col gap-2">
          <p className="text-stone-800">Tema da postagem</p>{' '}
          <select
            name="theme"
            id="theme"
            className="border p-2 border-stone-400 rounded bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
            defaultValue=""
            onChange={(e) =>
              buscar(`/themes/${e.currentTarget.value}`, setTema, {
                headers: { Authorization: token },
              })
            }
          >
            {' '}
            <option value="" disabled>
              Selecione um tema
            </option>{' '}
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.description}
              </option>
            ))}{' '}
          </select>{' '}
        </div>{' '}
        <button
          disabled={carregandoTema}
          type="submit"
          className="rounded disabled:bg-stone-300 bg-green-700 hover:bg-green-800 text-stone-100 font-bold w-1/2 mx-auto block py-2"
        >
          {' '}
          {carregandoTema ? (
            <span>Carregando</span>
          ) : id !== undefined ? (
            'Editar'
          ) : (
            'Cadastrar'
          )}{' '}
        </button>{' '}
      </form>{' '}
    </div>
  )
}

export default FormPostagem
