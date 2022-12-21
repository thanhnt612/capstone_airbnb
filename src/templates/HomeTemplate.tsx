import React from 'react'
import { Outlet } from 'react-router-dom';
import Footerhome from '../Components/FooterHome/Footerhome';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
type Props = {}

export default function HomeTemplate({ }: Props) {
  return (
    <>
      <HeaderHome />
      <div style={{ minHeight: '88vh' }}>
        <Outlet />
      </div>
      <Footerhome />
    </>
  )
}