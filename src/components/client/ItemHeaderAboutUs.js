import React from 'react'
import styled, { keyframes } from 'styled-components'
import '../StyleComponent/Header.css'
export default function ItemHeaderAboutUs({value,active,delay}) {
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
  box-shadow: 0 0 5px 0px #a7a7ff;
`
  return (
    <Bar className={`headerAboutUs  ${active ? "activeHeaderAboutUs" : ""}`} >{value}</Bar>
  )
}
