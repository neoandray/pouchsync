import MediaDropdownItem from  './MediaDropdownItem';
import { getProperty } from '../Common'
import  React from  'react'
export default  function MediaDropdownItemList (props){ 
    const  navListClassName      = getProperty(props,"navListClassName","nav-item dropdown")
    const  navIconClassName      = getProperty(props,"navIconClassName","far fa-comments")
    const  bagdeClassName        = getProperty(props,"bagdeClassName","badge badge-danger navbar-badge")
    const  bagdeValue            = getProperty(props,"bagdeValue",3)
    const  dropdownListClassName = getProperty(props,"dropdownListClassName","dropdown-menu dropdown-menu-lg dropdown-menu-right")
    const  footerText            = getProperty(props,"footerText","See All Messages")
    const  mediaDropdownItems    = getProperty(props,"mediaDropdownItems",[])
   // console.log(`mediaDropdownItems: ${JSON.stringify(mediaDropdownItems)}`)
 return ( 
<li className={navListClassName}>
  <a className="nav-link" data-toggle="dropdown" href="#">
    <i className={navIconClassName}></i>
      <span className={bagdeClassName}>{bagdeValue}</span>
  </a>
<div className={dropdownListClassName}>
  {
    mediaDropdownItems.map((dropdownItem,key)=><MediaDropdownItem  key={key} props={dropdownItem} />)
  }
  <a href="#" className="dropdown-item dropdown-footer">{footerText}</a>
</div>

</li>
 )

}