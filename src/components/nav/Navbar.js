
import MediaDropdownItemList from './MediaDropdownItemList'
import NavDropdownItemList from './NavDropdownItemList'
import NavbarSearch from './NavbarSearch'
import { getProperty } from '../Common'
import React from 'react'

export function NavDivider(){
    return <div className="dropdown-divider"></div>
 }
 

export default function Navbar(props){

    const navbarClass           = getProperty(props, "navbarClass", "main-header navbar navbar-expand navbar-white navbar-light")
    const navLinks              = getProperty(props,"navLinks",[{"name": "Home", "href":"index3.html"} ,{"name":"Contact", "href":"#"}])
    const navDropdownItemList   = getProperty(props,"NavDropdownItemList",[])
    const mediaDropdownItemList = getProperty(props,"MediaDropdownItemList",[])

  //  console.log(JSON.stringify(navLinks))

return (
    <nav className={navbarClass}>
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      { 
        navLinks.map((navLink, key)=>{
            <li key={key} className="nav-item d-none d-sm-inline-block">
            <a href={navLink.href} className="nav-link">{navLink.name}</a>
          </li>
        })   
      }    
    </ul>
    
    <ul className="navbar-nav ml-auto">   
      <NavbarSearch />
      <MediaDropdownItemList props={mediaDropdownItemList} />
      <NavDropdownItemList props={navDropdownItemList}/>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
          <i className="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  

  
)


}