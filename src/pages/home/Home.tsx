import ListaPostagens from '../../components/postagens/listapostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalpostagem/ModalPostagem';
import './Home.css'; 

function Home() {
  return (
    <>
      <div className="bg-stone-800 flex justify-center">
        <div className="container grid grid-cols-2 text-stone-100 h-96">
          <div className="flex flex-col gap-4 items-center justify-center py-4 font-serif">
            <h2 className="text-5xl font-bold">Bem Vindos!</h2>
            <p className="text-xl">Onde o som do vinil inspira as palavras.</p>

            <div className="flex justify-around gap-4">
              <ModalPostagem />
            </div>
          </div>

          <div className="home-image" />
        </div>
      </div>

      <ListaPostagens />
    </>
  );
}

export default Home;