import type Theme from './Theme';
import type User from './User';

export default interface Post {
  id: number;
  title: string;
  text: string;
  date: string;
  thema: Theme | null;
  user: User | null;
}