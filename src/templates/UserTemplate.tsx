import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function UserTemplate({ }: Props) {


    return (
        <div className='user-template'>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}