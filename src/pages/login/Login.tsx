import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import type UserLogin from '../../models/UserLogin';

function Login() {

    const navigate = useNavigate();
    const { user, handleLogin } = useContext(AuthContext);

    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (user.token !== "") {
            navigate('/home');
        }
    }, [navigate, user]);

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await handleLogin(userLogin);
            alert('Usuário logado com sucesso');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert('Dados do usuário inconsistentes');
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="username">Usuário (e-mail)</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="seu-email@exemplo.com"
                            className="border-2 border-slate-900 rounded p-2"
                            value={userLogin.username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            className="border-2 border-slate-900 rounded p-2"
                            value={userLogin.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded bg-slate-700 flex justify-center
                                   hover:bg-slate-900 text-rose-50 w-1/2 py-2">
                        <span>Entrar</span>
                    </button>

                    <hr className="border-slate-900 w-full" />

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
