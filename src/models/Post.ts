import type Theme from './Tema'
import type User from './User'

export default interface Post {
  id: number
  title: string
  text: string
  date: string
  theme: Theme | null
  username: Pick<User, 'id' | 'name' | 'photo'> | null
}

