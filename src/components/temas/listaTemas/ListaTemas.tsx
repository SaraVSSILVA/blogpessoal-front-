/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Tema from '../../../models/Tema'
import CardTemas from '../cardtemas/CardTemas'
import { buscar } from '../../../services/Service'

function ListaTemas() {
  const navigate = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
      return
    }

    async function buscarTemas() {
      try {
        await buscar('/themes', setTemas, { headers: { Authorization: token } })
      } catch (error: any) { 
        if (error.toString().includes('401')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        }
      }
    }

    buscarTemas()
  }, [token, navigate, handleLogout])

  return (
    <div className="bg-stone-200 min-h-screen">
      {' '}
      {temas.length === 0 && (
        <div className="flex justify-center items-center h-full">
          {' '}
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />{' '}
        </div>
      )}{' '}
      <div className="flex justify-center w-full my-4 p-4">
        {' '}
        <div className="container flex flex-col">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {' '}
            {temas.map((tema) => (
              <CardTemas key={tema.id} tema={tema} />
            ))}{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default ListaTemas
