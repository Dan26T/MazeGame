import React from 'react'
import s from './motion.module.css'
import arrow from '../common/appIcons/up-arrow-svgrepo-com.svg'


const Motion = (props) => {
    let motionsClass = () => {
        if (props.length===1) return s.motions0
        if (props.length>1 && props.length<props.motionsLength) return s.motions1
        return ''
    }
    let style = props.type
    if (style === 'left') {
        return <div className={[s.container, s.left, motionsClass()].join(' ')}>
            <img src={arrow} alt="Motion"/></div>
    }else if (style === 'right') {
        return <div className={[s.container, s.right, motionsClass()].join(' ')}>
            <img src={arrow} alt="Motion"/></div>
    }else if (style === 'down') {
        return <div className={[s.container, s.down, motionsClass()].join(' ')}>
            <img src={arrow} alt="Motion"/></div>
    }else if (style === 'up') {
        return <div className={[s.container, s.up, motionsClass()].join(' ')}>
            <img src={arrow} alt="Motion"/></div>
    }

}

export default Motion