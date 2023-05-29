import {FiLogOut} from 'react-icons/fi'
import logo from '../assets/logo.png'

export const Header = () => {
  return (
    <header>
        <a href='#'><img className='logo' src={logo} alt="Solar Ladder"/></a>
        <a href='#'><FiLogOut className='icon'/> LOGOUT</a>
    </header>
  )
}
