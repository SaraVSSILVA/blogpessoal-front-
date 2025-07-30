import type Post from './Post';

export default interface User {
  id: number;
  name: string;
  user: string;
  photo: string;
  password: string;
  post?: Post[] | null;
}