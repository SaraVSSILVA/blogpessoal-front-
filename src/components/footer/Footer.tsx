import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { type ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {
  const data = new Date().getFullYear()
  const { user } = useContext(AuthContext)

  let component: ReactNode

  if (user.token !== '') {
    component = (
      <div className="flex justify-center bg-stone-800 text-stone-100">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">Blog Pessoal | Copyright: {data}</p>
          <p className="text-lg">Acesse minhas redes sociais</p>
          <div className="flex gap-2">
            <a href="https://www.linkedin.com/in/SEU_LINKEDIN" target="_blank">
              <LinkedinLogo
                size={48}
                weight="bold"
                className="hover:text-amber-400"
              />
            </a>
            <a href="https://www.instagram.com/SEU_INSTAGRAM" target="_blank">
              <InstagramLogo
                size={48}
                weight="bold"
                className="hover:text-amber-400"
              />
            </a>
            <a href="https://www.facebook.com/SEU_FACEBOOK" target="_blank">
              <FacebookLogo
                size={48}
                weight="bold"
                className="hover:text-amber-400"
              />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <>{component}</>
}

export default Footer
