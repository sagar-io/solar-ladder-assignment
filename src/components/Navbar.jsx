import {NavLink} from 'react-router-dom'
import {TiTabsOutline} from 'react-icons/ti'
import {GoTasklist} from 'react-icons/go'
import {BsArrowReturnRight, BsEye} from 'react-icons/bs'
import {HiCurrencyDollar} from 'react-icons/hi'
import {FaMoneyCheck} from 'react-icons/fa'
import {IoMdSettings} from 'react-icons/io'
import {MdBook} from 'react-icons/md'
import {SiGooglenews} from 'react-icons/si'
import {GrAnalytics} from 'react-icons/gr'

export const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <ul className='navbar'>
        <li><NavLink className='item' to='/projects'><TiTabsOutline className='icon'/> Projects</NavLink></li>
        <li><NavLink className='item' to='/task'><GoTasklist className='icon'/> Task</NavLink></li>
        <li><NavLink className='item' to='/leads'><BsArrowReturnRight className='icon'/> Leads</NavLink></li>
        <li><NavLink className='item' to='/payments'><HiCurrencyDollar className='icon'/> Payments</NavLink></li>
        <li><NavLink className='item' to='/monitoring'><BsEye className='icon'/> Monitoring</NavLink></li>
        <li><NavLink className='item' to='/subscription'><FaMoneyCheck className='icon'/> Subscription</NavLink></li>
        <li><NavLink className='item' to='/analytics'><GrAnalytics className='icon'/> Analytics</NavLink></li>
        <li><NavLink className='item' to='/books/inventory'><MdBook className='icon'/> Books</NavLink></li>
        <li><NavLink className='item' to='/settings'><IoMdSettings className='icon'/> Settings</NavLink></li>
        <li><NavLink className='item' to='/news-letter'><SiGooglenews className='icon'/> News Letter</NavLink></li>
      </ul>
    </div>
  )
}
