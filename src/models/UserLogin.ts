export default interface UserLogin {
    user: string | number | readonly string[] | undefined;
    // O campo 'username' no backend espera o e-mail
    username: string;
    password: string;
}