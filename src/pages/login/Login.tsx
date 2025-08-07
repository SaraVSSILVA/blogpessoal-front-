import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { AuthContext } from '../../contexts/AuthContext'
import {
 type ChangeEvent,
 useContext,
 useEffect,
 useState,
 type FormEvent,
} from 'react'
import type UserLogin from '../../models/UserLogin'
import { RotatingLines } from 'react-loader-spinner'

function Login() {
 const navigate = useNavigate()

 const { user, handleLogin, isLoading } = useContext(AuthContext)

 const [userLogin, setUserLogin] = useState<UserLogin>({
  id: 0,
  name: '',
  user: '',
  password: '',
  photo: '',
  token: '',
 })

 useEffect(() => {
  if (user.token !== '') {
   navigate('/home')
  }
 }, [user.token, navigate])

 function updateState(e: ChangeEvent<HTMLInputElement>) {
  setUserLogin({
   ...userLogin,
   [e.target.name]: e.target.value,
  })
 }

 function login(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  handleLogin(userLogin)
 }

 return (
  <>
   <div
    className="grid grid-cols-1 lg:grid-cols-2 
          h-screen place-items-center font-serif bg-stone-200 "
   >
    <form
     className="flex justify-center items-center flex-col w-1/2 gap-4 p-8 rounded-lg shadow-md bg-stone-100"
     onSubmit={login}
    >
     <h2 className="text-stone-800 text-5xl ">Entrar</h2>
     <div className="flex flex-col w-full gap-2">
      <label htmlFor="user" className="text-stone-800">Usuário</label>
      <input
       type="text"
       id="user"
       name="user"
       placeholder="Usuário"
       className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
       value={userLogin.user}
       onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
      />
     </div>
     <div className="flex flex-col w-full gap-2">
      <label htmlFor="password" className="text-stone-800">Senha</label>
      <input
       type="password"
       id="password"
       name="password"
       placeholder="Senha"
       className="border-2 border-stone-400 rounded p-2 bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-500"
       value={userLogin.password}
       onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
      />
     </div>
     <button
      type="submit"
      className="rounded bg-green-700 flex justify-center
                 hover:bg-green-800 text-stone-100 w-1/2 py-2 font-serif"
     >
      {isLoading ? (
       <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="24"
        visible={true}
       />
      ) : (
       <span>Entrar</span>
      )}
     </button>

     <hr className="border-stone-800 w-full" />

     <p className="text-stone-800">
      Ainda não tem uma conta?{' '}
      <Link to="/cadastro" className="text-green-700 hover:underline">
       Cadastre-se
      </Link>
     </p>
    </form>
    <div className="fundoLogin hidden lg:block"></div>
   </div>
  </>
 )
}

export default Login