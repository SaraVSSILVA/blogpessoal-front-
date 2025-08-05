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
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/themes' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar