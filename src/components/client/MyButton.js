import React from 'react'
import '../StyleComponent/ButtonHeader.css'
export default function MyButton({children}) {
  return (
    <button className='buttonHeader'>
        {children}
    </button>
  )
}
