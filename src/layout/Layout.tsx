import { PropsWithChildren } from 'react'
import { Header } from '../components/Navbar'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}

export default Layout
