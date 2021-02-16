import React, { useState, useEffect, Component } from 'react';
import ViewBar from "../../Components/ViewBar/ViewBar.js";
import MenuBar from "../../Components/MenuBar/MenuBar.js";
import "./HomeContainer.css";
import Tabs from "../../Components/Tabs/Tabs.js";
import "../../Components/Tabs/Tabs.css";
import "../../Components/Tabs/TabButton.css";
import PopUp from '../../Components/PopUpForm/ShareProfile-PopUp';
import UploadAvatars from '../Home/UploadAvatars'


export default function HomeContainer(props) {

    const user = props.user;
    const setUser = props.setUser;

    const { isViewAsTeacher, tabs, isShowWhereby } = props;
    const footer = props.footer;
    const [formType, setFormType] = useState("");
    const [isPopup, togglePopup] = useState(false);
    const [isUploadPopup, toggleUploadPopup] = useState(false);
    const [isDeletePopup, toggleDeletePopup] = useState(false)
    const [canDeliverId, setDeliverId] = useState("")

    const toggleUpload = (e) => {
        toggleUploadPopup(true)
    }


    let displayWhereby;
    if (isShowWhereby) {
        displayWhereby = (
            <div>
                {user.whereby_link ?
                    <a href={user.whereby_link} alt="Whereby Link">
                        <div className="whereby-button"></div>
                    </a>
                    : null}
            </div>
        );
    } else {
        displayWhereby = null;
    }

    const showShareProfile = () => {
        console.log('run function share');

        setFormType('shareProfile')
        togglePopup(true)
    };

    let newUser;
    if (isDeletePopup) {
        // ======= Update user  =======
        newUser = Object.assign({}, user);
        const can_deliver_arr = newUser.can_deliver.filter(c => c._id !== canDeliverId)
        newUser.can_deliver = can_deliver_arr
    }

    return (
        <div className="wrapper-homeContainer overlay-background" >
            {isPopup && <PopUp user={user} showPopup={togglePopup} formType={formType} />}
            {isUploadPopup && <UploadAvatars showPopup={toggleUploadPopup} newUser={newUser} setUser={setUser} user={user} />}
            <div className="view-bar-main">
                <ViewBar isViewAsTeacher={isViewAsTeacher} />
            </div>
            <div>
                <MenuBar isViewAsTeacher={isViewAsTeacher} />
            </div>


            <div >
                {/*<div style={{ visibility: 'hidden' }}>empty</div>*/}
                <div className="body-main-page">


                    <Tabs tabs={tabs} />
                    <div className="profile-photo-box">
                        <img
                            src={user.img_url || '../../assets/img/avatar.jpg'}
                            className='profile-photo '
                            alt=''
                        />

                    </div>
                    <div onClick={toggleUpload}>
                        <span className='mdi mdi-camera upload-avatar-button'></span>
                    </div>
                    <div className="teacher-personal-info">
                        <div className="teacher-full-name">
                            {user.preferred_name ? user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}
                        </div>
                        <div className="teacher-title-and-location">
                            <div>English Language Teacher</div>
                            <div><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </div>
                        </div>
                        {displayWhereby}

                    </div>

                    {/* sharing buttons */}
                    <div className="share-button-hc">
                        <button
                            className="primiry-share-button"
                            type="submit"
                            onClick={showShareProfile}
                        >
                            <i className="mdi mdi-share" > </i>
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
            <div>
                {footer}
            </div>
        </div>
    )

}


