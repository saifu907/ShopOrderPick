import React from 'react'
import { NavLink } from 'react-router-dom'

function NavSideLink({ to, icon, label, badgeContent }) {
  return (
    <>
        
  <li>
    <NavLink className='rounded-5 justify-content-sm-start' to={to}>
      <div className="d-flex align-items-center p-2">
        <i className={icon}></i>
        {badgeContent && (
          <MDBBadge   color='danger' notification pill>
            {badgeContent}
          </MDBBadge>
        )}
        <span className="d-none d-sm-inline">{label}</span>
      </div>
    </NavLink>
  </li>
    </>
  )
}

export default NavSideLink