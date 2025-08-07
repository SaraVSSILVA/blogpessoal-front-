import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemasProps {
  tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border border-stone-400 rounded-2xl overflow-hidden justify-between font-serif">
      {' '}
      <header className="py-2 px-6 bg-stone-800 text-stone-100 font-bold text-2xl">
        Tema{' '}
      </header>{' '}
      <p className="p-8 text-3xl bg-stone-100 text-stone-800 h-full">
        {tema.description}
      </p>{' '}
      <div className="flex">
        {' '}
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full text-stone-100 bg-green-700 hover:bg-green-800 
flex items-center justify-center py-2"
        >
          <button>Editar</button>{' '}
        </Link>{' '}
        <Link
          to={`/deletartema/${tema.id}`}
          className="w-full text-stone-100 bg-red-700 hover:bg-red-800 
flex items-center justify-center py-2"
        >
          <button>Deletar</button>{' '}
        </Link>{' '}
      </div>{' '}
    </div>
  )
}

export default CardTemas
