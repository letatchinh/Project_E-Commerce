import React from 'react'
import { Link } from 'react-router-dom'
import '../StyleComponent/Footer.css'
export default function IconFooter({icon,href}) {
  return (
    <a href={href}>
<div style={{boxShadow : '0 0 5px 2px white', borderRadius : '50%',padding : '2px'}} className='iconFooterHover'>
        {icon}
    </div>
    </a>
    
  )
}
