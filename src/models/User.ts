import type Post from './Post';

export default interface User {
  token: string;
  id: number;
  name: string;
  user: string; // Geralmente é o e-mail do usuário
  password: string; // Necessária para o cadastro, mas não para exibir dados
  photo: string;
  post?: Post[] | null;
}