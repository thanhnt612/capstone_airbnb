import React, { useEffect, useState } from 'react'
type Props = {
    component: React.FC
    mobileComponent?: React.FC
}
type Screen = {
    width: number,
    height: number
}
export default function ResponsiveItem(props: Props) {
    const [screen, setScreen] = useState<Screen>({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const changeWidth = (e: Event) => {
        setScreen({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])
    let Component: React.FC | any = props.component;
    if (screen.width <= 768 && props.mobileComponent) {
        Component = props.mobileComponent
    }
    return (
        <>
            <Component />
        </>
    )
}
