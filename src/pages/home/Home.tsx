
function Home() {
    return (
        <>
            <div className="bg-slate-800 flex justify-center">
                <div className='container grid grid-cols-2 text-rose-300'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                             Bem-Vindo aos Ecos!
                        </h2>
                        <p className='text-xl text-rose-400'>
                            As letras que ouço, os contos que escrevo.
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className='rounded text-cyan-400
                                            border-cyan-400 border-solid border-2 py-2 px-4'
                                >
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://i.imgur.com/A9k7qDO.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home