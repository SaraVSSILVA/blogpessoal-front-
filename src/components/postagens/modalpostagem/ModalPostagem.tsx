import Popup from 'reactjs-popup'
import FormPostagem from '../formpostagem/FormPostagem'

import 'reactjs-popup/dist/index.css'
import './ModalPostagem.css'

function ModalPostagem() {
  return (
    <>
      {' '}
      <Popup
        trigger={
          <button
            className="
 rounded 
 px-4 
 py-2 
 border
 border-stone-100
 bg-stone-800
 text-stone-100 hover:bg-green-700
 font-serif
"
          >
            Nova Postagem{' '}
          </button>
        }
        modal
      >
        <FormPostagem />{' '}
      </Popup>{' '}
    </>
  )
}

export default ModalPostagem
