import { Link } from "react-router-dom"
import React, { useState, useEffect, Component } from 'react';
import './TabButton.css'
export default function ({ text, pathName, data, type, target, disabled }) {
    // console.log(pathName);

    return (
        <div className={"tabButton" + (type === "active" ? " tabButtonActive" : "") + (disabled ? " tabButtonDisabled" : "")}>
            <Link
                to={{
                    pathname: pathName,
                    data: data
                }}
                target={target}
            >
                {text}
            </Link>
        </div>
    )
}