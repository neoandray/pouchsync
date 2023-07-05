import { getProperty } from '../Common'
import {NavDivider} from './Navbar'
import React from 'react'

export default function MediaDropdownItem (props){
   const  href                  = getProperty(props,"href","#")
   const  dropdownItemclass     = getProperty(props,"dropdownItemclass","dropdown-item")
   const  image                 = getProperty(props,"image", "dist/img/user1-128x128.jpg")
   const  imageClass            = getProperty(props,"imageClass", "img-size-50 mr-3 img-circle")
   const  mainText              = getProperty(props,"mainText", " Brad Diesel")
   const  subText               = getProperty(props,"subText", "Call me whenever you can...")
   const  iconSpanClass         = getProperty(props,"iconSpanClass","float-right text-sm text-danger")
   const  bodyIconClass         = getProperty(props,"bodyIconClass","fas fa-star")
   const  footerIconClass       = getProperty(props,"footerIconClass","far fa-clock mr-1")
   const  footerText            = getProperty(props,"footerText","4 Hours Ago")

   return (
    <span>
    <a href={href} className={dropdownItemclass}>
    <div className="media">
      <img src={image} alt="User Avatar" className={imageClass}></img>
      <div className="media-body">
        <h3 className="dropdown-item-title">
          {mainText}
          <span className={iconSpanClass}><i className={bodyIconClass}></i></span>
        </h3>
        <p className="text-sm">{subText}</p>
        <p className="text-sm text-muted"><i className={footerIconClass}></i>{footerText} </p>
      </div>
    </div>  
  </a>
  <NavDivider/>
  </span>
   )

}