import { Link } from "react-router-dom";
import React, { useState, useEffect, Component } from 'react';
import HomeContainer from '../Container/HomeContainer';
import TeacherResume from "./TeacherResume";
import axios from 'axios';
import { useArray, useForceUpdate } from '../../Hook';
import { PORT } from '../../config';


export default function PreviewResume2(props) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.user));

    const tabs = [
        {
            pathname: "/previewprofile2",
            text: "Profile",
            
        },
        {
            pathname: "/previewResume2",
            text: "Resume",
            active: true
        }
    ]

    if (user) {
        return (
            <HomeContainer isViewAsTeacher={false} tabs={tabs} footer={null} user={user}  isShowWhereby = {false}>
                <TeacherResume isShowBoxFooter = {false} editRemoveButton={false} />
            </HomeContainer>
        )
    } else return <div>Loading</div>;
}

