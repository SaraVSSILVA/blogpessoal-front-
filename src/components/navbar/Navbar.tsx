import { type ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Navbar() {
  const navigate = useNavigate()
  const { user, handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
    navigate('/')
  }

  let component: ReactNode

  if (user.token !== '') {
    component = (
      <div
        className="w-full bg-stone-800 text-stone-100 font-serif
                flex justify-center py-4 border-b-2 border-amber-400"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-2xl font-bold">
            Blog Pessoal
          </Link>
          <div className="flex gap-4">
            <Link to="/postagens" className="hover:text-amber-400">
              Postagens
            </Link>
            <Link to="/themes" className="hover:text-amber-400">
              Temas
            </Link>
            <Link to="/cadastrartema" className="hover:text-amber-400">
              Cadastrar tema
            </Link>
            <Link to="/perfil" className="hover:text-amber-400">
              Perfil
            </Link>
            <Link to="" onClick={logout} className="hover:text-amber-400">
              Sair
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{component}</>
}

export default Navbar
