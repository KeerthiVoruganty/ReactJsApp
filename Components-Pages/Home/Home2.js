import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { PORT } from '../../config';
import HomeContainer from '../Container/HomeContainer';
import TeacherProfile from '../Profile/TeacherProfile';
import { useArray, useForceUpdate } from '../../Hook';

// import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export default function Home2(props) {

    const [user, setUser] = useState();
    const [isloading, setIsLoading] = useState(true);
    const [can_deliver, handleArr, add_class, remove_class] = useArray([]);
    const [store_ge, setGE, add_ge, remove_ge] = useState([]);
    const [store_cam, setCam] = useState([]);
    const [store_other, setOther] = useState([]);
    const [store_manage, setManage] = useState([]);
    const [store_online, setOnline] = useState([]);


    const [isClassPopup, toggleClassPopup] = useState(false);
    const [isUploadPopup, toggleUploadPopup] = useState(false);
    const [isDeletePopup, toggleDeletePopup] = useState(false)



    useEffect(() => {
        let store_ge_list = [];
        let store_cam_list = [];
        let store_other_list = [];
        let store_manage_list = [];
        let store_online_list = [];
        if (props.location.search !== '') {
            window.localStorage.setItem('token', props.location.search.split('&t=')[1])
        }


        if (window.localStorage.token) {
            axios({
                method: 'get',
                url: `${PORT}/current`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${window.localStorage.token}`
                }
            })
                .then(res => {
                    const user = res.data.user
                    window.localStorage.setItem('user', JSON.stringify(user))
                    window.localStorage.setItem('shared_teacher', JSON.stringify(user))
                    console.log(user);
                    setUser(user);
                    setIsLoading(false);
                    handleArr(user.can_deliver)
                    user.can_deliver.map((c, index) => {
                        if (c.can_deliver === "All ELICOS"
                            || c.can_deliver === "Beginner/Starter"
                            || c.can_deliver === "Elementary GE"
                            || c.can_deliver === "Pre-Intermediate GE"
                            || c.can_deliver === "Intermediate GE"
                            || c.can_deliver === "Upper-Intermediate GE"
                            || c.can_deliver === "Blended Lower GE"
                            || c.can_deliver === "Blended Upper GE"
                            || c.can_deliver === "Advanced GE"
                            || c.can_deliver === "Young Learners"
                            || c.can_deliver === "Teens") {
                            store_ge_list.push(c.can_deliver);

                        }
                        else if (c.can_deliver === "Cambridge CPE"
                            || c.can_deliver === "Cambridge KEY"
                            || c.can_deliver === "Cambridge PET"
                            || c.can_deliver === "Cambridge FCE"
                            || c.can_deliver === "Cambridge CAE"
                            || c.can_deliver === "PTE"
                            || c.can_deliver === "IELTS"
                            || c.can_deliver === "IELTS Intermediate"
                            || c.can_deliver === "IELTS Advanced"
                            || c.can_deliver === "Occupational English Test") {
                            store_cam_list.push(c.can_deliver);
                        }
                        else if (c.can_deliver === "Business English"
                            || c.can_deliver === "Study Tours") {
                            store_other_list.push(c.can_deliver);
                        }
                        else if (c.can_deliver === "Assistant Academic Manager"
                            || c.can_deliver === "Academic Manager"
                            || c.can_deliver === "Student Support Officer"
                            || c.can_deliver === "Social Program Officer") {
                            store_manage_list.push(c.can_deliver);
                        }
                        else if (c.can_deliver === "EAP/Bridging") {
                            store_cam_list.push(c.can_deliver);
                            store_other_list.push(c.can_deliver);

                        }
                        else if (c.can_deliver === "Zoom"
                            || c.can_deliver === "Skype"
                            || c.can_deliver === "Bb Collaborate Ultra"
                            || c.can_deliver === "Moodle"
                            || c.can_deliver === "Canvas LMS"
                            || c.can_deliver === "Padlet"
                            || c.can_deliver === "Microsoft Teams") {
                            store_online_list.push(c.can_deliver);
                        }
                    })

                    setGE(store_ge_list)
                    setCam(store_cam_list)
                    setOther(store_other_list);
                    setManage(store_manage_list);
                    setOnline(store_online_list)
                })
                .catch(err => {
                    const path = {
                        pathname: '/login'
                    };
                    props.history.push(path);
                });
        } else {
            const path = {
                pathname: '/login'
            };
            props.history.push(path);
        }
    }, []);

    const tabs = [
        {
            pathname: "/",
            text: "Profile",
            active: true
        },
        {
            pathname: "/resume2",
            text: "Resume"
        }
    ]

    
    const userObject = { isloading, can_deliver, store_ge, store_cam, store_other, store_manage, store_online, isClassPopup, isUploadPopup, isDeletePopup  }

    const shareResumeButton = (<div className="row text-center mb-5">
    <div className="col-sm-4 col-7"></div>
    <div className="col-sm-4 col-0 p-0">
      <Link
        title="Resume"
        to='/resume'>
        <button
          type="submit"
          id="see-resume-button"
          className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box"
        ><i className="mdi mdi-briefcase">  </i>View Resume</button>
      </Link>
    </div>
    <div className="col-sm-4 col-0"></div>
  </div>) ;

    if (user) {return (
        <HomeContainer isViewAsTeacher={true} tabs={tabs} footer={shareResumeButton} user={user} isShowWhereby = {true}>
            <TeacherProfile user={user} isShowFooter={true} userObject={userObject} />
        </HomeContainer>
    )} else return <div>Loading</div>;
}