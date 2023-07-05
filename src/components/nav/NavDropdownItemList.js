import NavDropdownItem  from "./NavDropdownItem";
import  React from  'react'
import { getProperty } from '../Common'
import {NavDivider} from './Navbar'
export default function NavDropdownItemList(props){

    const dropdownItemClass    = getProperty(props,"dropdownItemClass","nav-item dropdown")
    const href                 = getProperty(props,"href","#")
    const iconClass            = getProperty(props,"iconClass","far fa-bell")
    const spanClass            = getProperty(props,"spanClass","badge badge-warning navbar-badge")
    const spanText             = getProperty(props,"spanText",15)
    const dropdownMenuClass    = getProperty(props,"dropdownMenuClass","dropdown-menu dropdown-menu-lg dropdown-menu-right")
    const dropdownHeaderClass  = getProperty(props,"dropdownHeaderClass","dropdown-item dropdown-header")
    const dropdownHeaderText   = getProperty(props,"dropdownHeaderText","Notifications")
    const footerText           = getProperty(props,"footerText","See All Messages")
    const navDropdownItems     = getProperty(props,"navDropdownItems",[])
 

    return (
  <li className={dropdownItemClass}>
        <a className="nav-link" data-toggle="dropdown" href={{href}}>
          <i className={iconClass}></i>
          <span className={spanClass}>{spanText}</span>
        </a>

        <div className={dropdownMenuClass}>
          <span className={dropdownHeaderClass}>{spanText+' '+dropdownHeaderText}</span>
         <NavDivider></NavDivider>
         {
            navDropdownItems.map((dropdownItem, key)=><NavDropdownItem  key={key} props={dropdownItem} />)
         }

          <a href="#" className="dropdown-item dropdown-footer">{footerText}</a>
        </div>
      </li>
      

    )

}