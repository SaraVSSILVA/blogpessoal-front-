import type Post from './Post';

export default interface User {
  id: number;
  name: string;
  username: string; // Geralmente é o e-mail do usuário
  password: string; // Necessária para o cadastro, mas não para exibir dados
  photo: string;
  token: string;
  post?: Post[] | null;
}