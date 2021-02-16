import React from "react";
import "./ViewBar.css";
import { Link } from "react-router-dom";


export default function Viewbar (props){
    const {isViewAsTeacher} = props;
    let roleControlToggle;
    let viewBarInfo;
    let internalLink;

    if (isViewAsTeacher){
        
        viewBarInfo = 'You are viewing Profile as Teacher';
        internalLink = <Link title="Ready Teacher" to={`/PreviewProfile2`} >View as College</Link>
    } else {
        viewBarInfo = 'You are viewing Profile as College';
        internalLink = <Link title="Ready Teacher" to={`/home2`}>View as Teacher</Link>
    }

    return (
       <div className="review-control-bar">
        <div className="review-control-bar-virtual-div"></div>
        <div>{viewBarInfo}</div>
        <div className="role-control-toggle">{internalLink}</div>
       
       </div>

    )
}

