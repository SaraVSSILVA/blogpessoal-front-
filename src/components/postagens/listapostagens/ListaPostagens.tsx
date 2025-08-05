/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Post from "../../../models/Post";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Post[]>([]);

    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token;

    async function buscarPostagens() {
        try {
            await buscar('/posts', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [token])

    return (
        <>
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {postagens.map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;