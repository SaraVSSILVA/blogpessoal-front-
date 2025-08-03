export default interface UserLogin {
    user: string | number | readonly string[] | undefined;
    // O campo 'username' no backend espera o e-mail
    id: number
    name: string
    password: string
    photo: string
    token: string
}