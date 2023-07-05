import React from 'react'
 
 export default function NavbarSearch(props){
      
   return(
    <li className="nav-item">
    <a className="nav-link" data-widget="navbar-search" href="#" role="button">
      <i className="fas fa-search"></i>
    </a>
    <div className="navbar-search-block">
      <form className="form-inline">
        <div className="input-group input-group-sm">
          <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"></input>
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </li>
   )



 }