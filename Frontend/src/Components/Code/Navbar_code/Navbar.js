import React from 'react';
import './Navbar.css';
import './Navbar.scss';
import logo from './../../../img/logo.png'
import dark_logo from './../../../img/logo-darktheme.png'
import DarkModeToggle from "react-dark-mode-toggle";
import useLocalStorage from 'use-local-storage'
import Dropdown from './Dropdown';
import { NavLink } from 'react-router-dom';
import Notif_dropdown from './Notif_dropdown';




function Navbar({setdata}) {

  //************************************** Dark Mode **************************************************************/
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  

  if(theme === true){
      setTheme('dark');
  }else{
  }
  setdata(theme);
  //***************************************************************************************************************/

  //************************************** Switch Logo **************************************************************/
  const LightLogo = () => (
    <img src={logo} height='40px'/>
  )
  const DarkLogo = () => (
    <img src={dark_logo} height='40px'/>
  )
  //***************************************************************************************************************/


  return (
    <div className='header' data-theme={theme}>
    <div id="brand">{ theme ? <DarkLogo/> : <LightLogo/> }</div>
    <nav>
      <ul >
        <div id='middle'>
        <li>
        <NavLink exact to='/dashboard'  activeClassName="highlighted" >
          <div className='dashboard-nav-box nav-box' data-theme={theme}>
            <i className="fa fa-home fa-lg" aria-hidden="true"></i>
            Dashboard
          </div>
          </NavLink>
        </li>
        <li>
        <NavLink exact to='/calendar'  activeClassName="highlighted">
          <div className='calendar-nav-box nav-box' data-theme={theme}>
             <i className="fa fa-calendar-o fa-lg" aria-hidden="true"></i>
              Calendar
          </div>
          </NavLink>
        </li>
        <li>
        <NavLink exact to='/search'  activeClassName="highlighted">
          <div className='search-nav-box nav-box' data-theme={theme}>
             <i className="fa fa-search" aria-hidden="true"></i>
             Search
          </div>
          </NavLink>
        </li>
        </div>
        <div className='Notif_Dropdown'>
            <Notif_dropdown theme={theme}/>
        </div>
        <div className='right-cont'>
          <div id='dark-mode-navbar'>
            <Dropdown/>
            <DarkModeToggle className='dark-tog' onChange={setTheme} checked={theme} size={70} speed={3}/>
          </div>
          </div>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar

//<li id="login"><i class="fa fa-clock-o fa-lg" aria-hidden="true" data-theme={theme}></i></li>