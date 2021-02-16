import React, { useState } from "react";
import "./Multicolore.otf";
import './badge.css';

export default function Badge(props) {
    const { title, iconURL, onClick, activeClass, number } = props;

    const resolveClass = activeClass?  'badge-container active-badge': 'badge-container';
    const numberOfTitle = ()=>{
        if(number)return <div className='number-of-title' >{number}</div>
    }
    // console.log(iconURL);
    return (
       
        <div className={resolveClass} onClick={onClick}>
        {numberOfTitle()}
            <img src={iconURL&&require(`${iconURL}`)}/>
            <div className='badge-content'>
                <div className='badge-title'>{title.toUpperCase()}</div>
            </div>
        </div>
    )
}   
