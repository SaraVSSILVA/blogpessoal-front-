import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-nest-6jeu.onrender.com'
})

export const registerUser = async (url: string, data: Object, setData: Function) => {
    const answer = await api.post(url, data)
    setData(answer.data)
}

export const login = async (url: string, data: Object, setData: Function) => {
    const answer = await api.post(url, data)
    setData(answer.data)
}