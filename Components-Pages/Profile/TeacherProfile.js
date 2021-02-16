import React, { useState, useEffect, Component } from 'react';
import { defineLocale } from 'moment';
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "./TeacherProfile.css";
import HomeCarousel from '../Home/HomeCarousel';
import '../Home/HomeCarouselScript.js';
import { log } from 'fullcalendar';

export default function TeacherProfile(props) {
    const user = props.user;
    const userObject = props.userObject;

    const toggleClass = () => {
        userObject.toggleClassPopup(true)
    }

    const isShowFooter = props.isShowFooter;
    const seeResume = props.seeResume;
    let updateResumeButton;
    let addMoreCanDeliver;
    let displaySeeResume;

    /*Footer will be shown at Home page. Invisible at PreviewProfile page*/
    if (isShowFooter) {
        updateResumeButton = (
            <div className="profile_can_deliver_bottom">
                <hr className="qualification-line-2"></hr>
                <div className="resume-container-update-content a">
                    <Link title="Resume" to='/resume'>
                        <Icon name="pencil" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                        {"  "}Update Resume
                    </Link>
                </div>
            </div>
        )
    } else {
        updateResumeButton = null;
    }

    /*Footer will be shown at Home page. Invisible at PreviewProfile page*/
    if (isShowFooter) {
        addMoreCanDeliver = (
            <div className="profile_can_deliver_bottom">
                <hr className="qualification-line-2"></hr>
                <div className="resume-container-update-content a">
                    <Link onClick={toggleClass}>
                        <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                        {"  "}Add More
                    </Link>
                </div>
            </div>
        )
    } else {
        addMoreCanDeliver = null;
    }

    if (seeResume){
        displaySeeResume = (
            <div className="row pr-0 mr-0 mb-4 justify-content-center">
                <div className="col-md-6 pr-0 ">
                    <Link
                    title="Resume"
                    to={{
                        pathname: '/previewResume2',
                        data: { user }
                    }
                    }
                    >
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box"
                    >
                        <i className="mdi mdi-briefcase">
                        {" "}
                        </i>
                        See Resume
                    </button>
                    </Link>
                </div>
                </div>
        );
    } else {
        displaySeeResume = null;
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    return (
        <div className="teacher-profile-wrapper">
            <div className="qualification-canDeliver-wrapper">
                {/* Qualification Box*/ }
                <div>
                    <ProfileBox header="Qualifications" footer={updateResumeButton} seeResumeFooter = {displaySeeResume} >
                        {user.qualifications && user.qualifications.length > 0 ?
                            user.qualifications.sort((a, b) => {
                                var dateA = new Date("01/" + a.graduation_date),
                                    dateB = new Date("01/" + b.graduation_date);
                                return dateB - dateA
                            }).map(q => {
                                return (
                                    <li key={q._id} className="p-0">
                                        <hr className="qualification-line-1"></hr>
                                        <div className="row profile-qualification-content-box">
                                            <div className="col-8">
                                                <div className="row">
                                                    <p className="mt-0 mb-2 profile-qualification-title text-left">{q.degree}  {q.award_name}</p>
                                                </div>
                                                <div className="row">
                                                    <p className="mt-0 mb-2 profile-qualification-title text-left">{q.major ? "(" + (q.major) + ")" : ""}</p>
                                                </div>
                                                <div className="row">
                                                    <p className="mt-0 mb-2 profile-qualification-place text-left">{q.institution_name}, {q.institution_location}</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <p className="mt-0 mb-0 profile-qualification-title text-right">
                                                    {(q.graduation_date !== "Present") ?

                                                        (
                                                            (q.graduation_date.length === 7)
                                                                ?
                                                                months[new Date(((q.graduation_date).substring(0, 2) + "/01/2020")).getMonth()]
                                                                + " "
                                                                + new Date(("01/01/" + (q.graduation_date).substring(3, 10))).getFullYear()
                                                                :
                                                                months[new Date(q.graduation_date).getMonth()]
                                                                + " "
                                                                + new Date(q.graduation_date).getFullYear())
                                                        :
                                                        <p className="mt-0 mb-0 profile-qualification-title text-right">
                                                            Currently Enrolled
                                                        </p>
                                                    }
                                                </p>
                                            </div>
                                           
                                        </div>
                                    </li>
                                )
                            }) : null}
                    </ProfileBox>
                </div>

                {/* Can Deliver Box*/ }
                <div>
                    <ProfileBox header="Can Deliver" footer={addMoreCanDeliver}>
                        {user.can_deliver && user.can_deliver.length > 0 ?
                            (
                                <li className="p-0">
                                    <div className="row profile-qualification-content-box">
                                        {userObject.store_ge == "" ? null :
                                            (
                                                <div className="col-12">
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                            ELICOS General English
                                                    </p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-place text-left">{userObject.store_ge.join(" | ")}</p>
                                                    </div>
                                                    {userObject.store_online === "" && userObject.store_manage === "" && userObject.store_other === "" && userObject.store_cam === "" ? null : <hr className="qualification-line-1"></hr>}
                                                </div>
                                            )
                                        }

                                        {userObject.store_cam == "" ? null :
                                            (
                                                <div className="col-12">
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                            ELICOS Exam/Uni Preparation
                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-place text-left">{userObject.store_cam.join(" | ")}</p>
                                                    </div>
                                                    {userObject.store_online === "" && userObject.store_manage === "" && userObject.store_other === "" ? null : <hr className="qualification-line-1"></hr>}
                                                </div>
                                            )
                                        }

                                        {userObject.store_other == "" ? null :
                                            (
                                                <div className="col-12">
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                            Others
                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-place text-left">{userObject.store_other.join(" | ")}</p>
                                                    </div>
                                                    {userObject.store_online === "" && userObject.store_manage === "" ? null : <hr className="qualification-line-1"></hr>}
                                                </div>
                                            )
                                        }


                                        {userObject.store_manage == "" ? null :
                                            (
                                                <div className="col-12">
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                            Management
                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-place text-left">{userObject.store_manage.join(" | ")}</p>
                                                    </div>
                                                    {userObject.store_online === "" ? null : <hr className="qualification-line-1"></hr>}
                                                </div>
                                            )
                                        }

                                        {userObject.store_online == "" ? null :
                                            (
                                                <div className="col-12">
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                            Online Classroom
                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="mt-0 mb-2 profile-qualification-place text-left">{userObject.store_online.join(" | ")}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            )
                            : null}
                    </ProfileBox>
                </div>
            </div>
            {/* Compliment Box. Using HomeCarousel component*/ }
            <div className="compliment-profile-box">
                <ProfileBox header="Compliments" >
                    {/* compliments go here */}
                    {user && user.feedback && user.feedback.length > 0 ? <HomeCarousel feedbacks={user.feedback}></HomeCarousel> : null}
                </ProfileBox>
            </div>
        </div>
    )
}