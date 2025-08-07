import { Link } from 'react-router-dom'
import type Post from '../../../models/Post'

interface CardPostagensProps {
  postagem: Post
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div
      className="border-stone-400 border bg-stone-100 
 flex flex-col rounded overflow-hidden justify-between font-serif"
    >
      <div>
        <div className="flex w-full bg-stone-300 py-2 px-4 items-center gap-4">
          <img
            src={postagem.username?.photo}
            className="h-12 rounded-full"
            alt={postagem.username?.name}
          />
          <h3 className="text-lg font-bold text-stone-900 uppercase">
            {postagem.username?.name}
          </h3>
        </div>
        <div className="p-4 ">
          <h4 className="text-lg font-semibold uppercase text-stone-900">
            {postagem.title}
          </h4>
          <p className="text-stone-800">{postagem.text}</p>
          <p className="text-stone-600">Tema: {postagem.theme?.description}</p>
          <p className="text-stone-600">
            Data:{' '}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'full',
              timeStyle: 'medium',
            }).format(new Date(postagem.date))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-stone-100 bg-green-700 hover:bg-green-800 
flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-stone-100 bg-red-700 hover:bg-red-800 
 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem
