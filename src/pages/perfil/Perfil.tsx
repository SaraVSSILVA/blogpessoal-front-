/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {
	const navigate = useNavigate()

	const { user } = useContext(AuthContext)

	useEffect(() => {
		if (user.token === "") {
			alert("Você precisa estar logado")
			navigate("/")
		}
	}, [user.token])

	return (
		<div className="flex justify-center mx-4">
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden">
				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src="https://i.imgur.com/ZZFAmzo.jpg"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
					src={user.photo}
					alt={`Foto de perfil de ${user.name}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-sky-500 text-white text-2xl items-center justify-center"
				>
					<p>Nome: {user.name} </p>
					<p>Email: {user.user}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil
