import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-slate-900 text-rose-50'>
            
                <div className="container flex justify-between text-lg">
<Link to='/home' className="text-2xl font-bold">Ecos de Papel</Link>
                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar