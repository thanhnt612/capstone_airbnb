import React from 'react'
import { Outlet } from 'react-router-dom';
import Footerhome from '../Components/FooterHome/Footerhome';
import FooterHome_Mobile from '../Components/FooterHome/FooterHome_Mobile';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
import HeaderHome_Mobile from '../Components/HeaderHome/HeaderHome_Mobile';
import ResponsiveItem from '../Components/ResponsiveItem/ResponsiveItem';
type Props = {}

export default function HomeTemplate({ }: Props) {
  return (
    <>
      <ResponsiveItem component={HeaderHome} mobileComponent={HeaderHome_Mobile} />
      <div className='home-template' style={{ minHeight: '88vh' }}>
        <Outlet />
      </div>
      <ResponsiveItem component={Footerhome} mobileComponent={FooterHome_Mobile} />
    </>
  )
}