import type Post from './Post';

export default interface User {
  id: number;
  name: string;
  user: string;
  password: string; // Necessária para o cadastro, mas não para exibir dados
  photo: string;
  post?: Post[] | null;
}