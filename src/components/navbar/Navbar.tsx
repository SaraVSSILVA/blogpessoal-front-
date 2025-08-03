import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"


function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert("Usuário deslogado com sucesso!")
        navigate('/')
    }

    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-slate-900 text-rose-50'>
            
                <div className="container flex justify-between text-lg">
<Link to='/home' className="text-2xl font-bold">Ecos de Papel</Link>

                    <div className='flex gap-4'>
                        Postagens
                        <Link to='/theme' className='hover:underline'>Temas</Link>
                        Cadastrar tema
                        Perfil
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar