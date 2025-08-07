/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastAlerta } from '../../utils/ToastAlerta'
import { AuthContext } from '../../contexts/AuthContext'

function Perfil() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user.token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [user.token])

  return (
    <div className="flex justify-center mx-4 font-serif">
      <div className="container mx-auto my-4 rounded-2xl overflow-hidden h-96 relative">
        
        <img
          className="w-full h-full object-cover absolute inset-0"
          src="https://i.imgur.com/tT3gLca.png"
          alt="Capa do Perfil"
        />

        <img
          className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-stone-800 relative z-10"
          src={user.photo}
          alt={`Foto de perfil de ${user.name}`}
        />

        <div
          className="relative mt-[-6rem] h-full flex flex-col z-10
                   bg-stone-800/80 text-stone-100 text-2xl items-center justify-center"
        >
          <p>Nome: {user.name} </p>
          <p>Email: {user.user}</p>
        </div>
      </div>
    </div>
  )
}

export default Perfil