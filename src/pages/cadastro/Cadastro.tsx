import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type User from '../../models/User'; 
import { cadastrarUsuario } from '../../services/Service';
import './Cadastro.css';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const [confirmPassword, setConfirmPassword] = useState<string>(""); 

  
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    username: '', 
    password: '', 
    photo: '',
    
    token: '',
  });

  useEffect(() => {
    ''
    if (user.id !== 0) {
      returnToLogin();
    }
  }, [returnToLogin, user]);
  
  function returnToLogin() { 
    navigate('/login');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) { 
    setUser({
      ...user,
      [e.target.name]: e.target.value 
    });
  }

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) { /
    setConfirmPassword(e.target.value);
  }

  async function registerNewUser(e: FormEvent<HTMLFormElement>) { 
    e.preventDefault();

    
    if (confirmPassword === user.password && user.password.length >= 8) {
      setIsLoading(true);

      try {
        
        
        await cadastrarUsuario(`/users/register`, user); 
        alert('Usuário cadastrado com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar o usuário!');
      } finally { 
        setIsLoading(false);
      }
    } else {
      alert(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro."
      );
      
      setUser({ ...user, password: '' }); 
      setConfirmPassword('');
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
          place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3'
          onSubmit={registerNewUser}> {/* Nome da função alterado */}
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name">Nome</label> {/* Label em português */}
            <input
              type="text"
              id="name"
              name="name" 
              placeholder="Nome" 
              className="border-2 border-slate-700 rounded p-2"
              value={user.name} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} 
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="username">Usuário</label> {/* Label em português */}
            <input
              type="text"
              id="username"
              name="username" 
              placeholder="Usuário" 
              className="border-2 border-slate-700 rounded p-2"
              value={user.username} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} 
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="photo">Foto</label> {/* Label em português */}
            <input
              type="text"
              id="photo"
              name="photo" 
              placeholder="Link da Foto" 
              className="border-2 border-slate-700 rounded p-2"
              value={user.photo} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} 
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Senha</label> {/* Label em português */}
            <input
              type="password"
              id="password"
              name="password" 
              placeholder="Senha" 
              className="border-2 border-slate-700 rounded p-2"
              value={user.password} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} 
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword">Confirmar Senha</label> {/* Label em português */}
            <input
              type="password"
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirmar Senha" 
              className="border-2 border-slate-700 rounded p-2"
              value={confirmPassword} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPasswordChange(e)} 
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type='reset'
              className='rounded text-white bg-red-400 
                hover:bg-red-700 w-1/2 py-2'
              onClick={returnToLogin} 
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 
                hover:bg-indigo-900 w-1/2 py-2
                flex justify-center'
            >
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;