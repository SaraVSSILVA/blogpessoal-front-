import type Post from './Post'

export default interface Theme {
  id: number
  description: string
  post?: Post[] | null
}
