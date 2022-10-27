import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import '../StyleComponent/Header.css'
export default function ItemHeaderAboutUs({value,active,delay,link}) {
  const distance = delay * 100
  const pulse = keyframes`
  from {
    transform: translateX(-${distance}%);
  }

  to {
    transform: translateX(0);
  }
`
const Bar = styled.div`
  text-align: center;
  cursor: pointer;
  animation: ${pulse} 0.8s ease ;
  
`
  return (
    <Link style={{boxShadow: active ? '0 0 5px 0px #a7a7ff' : "none"}} className={`headerAboutUs  ${active ? "activeHeaderAboutUs" : ""}`} to={`/${link}`}><Bar  >{value}</Bar></Link>
  )
}
