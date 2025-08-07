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
   <div className="container mx-auto my-4 rounded-2xl overflow-hidden bg-stone-100">
    <img
     className="w-full h-72 object-cover border-b-8 border-stone-800"
     src="https://i.imgur.com/ZZFAmzo.jpg"
     alt="Capa do Perfil"
    />

    <img
     className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-stone-800 relative z-10"
     src={user.photo}
     alt={`Foto de perfil de ${user.name}`}
    />

    <div
     className="relative mt-[-6rem] h-72 flex flex-col 
          bg-stone-800 text-stone-100 text-2xl items-center justify-center"
    >
     <p>Nome: {user.name} </p>
     <p>Email: {user.user}</p>
    </div>
   </div>
  </div>
 )
}

export default Perfil