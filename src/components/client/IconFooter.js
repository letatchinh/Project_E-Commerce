import React from 'react'
import '../StyleComponent/Footer.css'
export default function IconFooter({icon}) {
  return (
    <div style={{boxShadow : '0 0 5px 2px white', borderRadius : '50%',padding : '2px'}} className='iconFooterHover'>
        {icon}
    </div>
  )
}
