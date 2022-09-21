import React from 'react'

export default function ContentTop({value}) {
  return (
    <div style={{borderBottom : '2px solid #C3C4C4',padding : '10px 0 0 10px'}}>
        <h2 style={{fontFamily : "roboto"}}>{value}</h2>
    </div>
  )
}
