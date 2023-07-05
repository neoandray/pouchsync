import { getProperty } from '../Common'
import {NavDivider} from './Navbar'
import React from 'react'
export default function NavDropdownItem (props){
    const  href                  = getProperty(props,"href","#")
    const  dropdownItemclass     = getProperty(props,"dropdownItemclass","dropdown-item")
    const  iconClass             = getProperty(props,"iconClass","fas fa-envelope mr-2")
    const  mainText              = getProperty(props,"mainText","4 new messages")
    const  rightSpanClass        = getProperty(props,"rightSpanClass","float-right text-muted text-sm")
    const  rightSpanText         = getProperty(props,"rightSpanText","3 mins")

    return(
      <span>
      <a href={href} className={dropdownItemclass}>
        <i className={iconClass}></i>{mainText}
        <span className={rightSpanClass}>{rightSpanText}</span>
      </a>
      <NavDivider/>
      </span>
    )
}