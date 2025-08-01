import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { type ChangeEvent, useContext, useEffect, useState } from 'react';
import type UserLogin from '../../models/UserLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate();

    const { user, handleLogin, isLoading } = useContext(AuthContext)

    const [userLogin, setUserLogin] = useState<UserLogin>(
        {} as UserLogin
    )

    useEffect(() => {
        if (user.token !== "") {
            navigate('/home')
        }
    }, [user])

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(userLogin)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}>
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            placeholder="User"
                            className="border-2 border-slate-700 rounded p-2"
                            value={userLogin.user}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={userLogin.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                                    
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;
