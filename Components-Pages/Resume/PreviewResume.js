import React, { Component, useState, useEffect } from 'react'
import ProfileStatus from '../../Components/StatusAlerts/ProfileStatus'
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar'
import axios from 'axios';
import Notifications, { notify } from "react-notify-toast";

import PopUp from "../../Components/PopUpForm/ShareProfile-PopUp";

import './Resume.css';
import '../Home/Home.css';
import { PORT } from '../../config';
import QualificationForm from './QualicationForm'
import DeletePopup from '../Home/DeletePopup';
import { useToggle } from '../../Hook';
import { Link } from "react-router-dom"
import DatePicker from "../User/DateRange";
import SharedNavbar from '../../Components/Navbar/SharedNavbar'
import { Button } from "semantic-ui-react";
import CloseIcon from '@material-ui/icons/Close';
import ProfileBox from "../../Components/ProfileBox/ProfileBox"
import Tabs from "../../Components/Tabs/Tabs";


const URL = PORT;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// const date = new Date().getDate();
// const formattedDate = ("0" + date).slice(-2);
// const month = new Date().getMonth() + 1;
// const formattedMonth = ("0" + month).slice(-2);
// const year = new Date().getFullYear();
// const todayDate = formattedDate + "-" + formattedMonth + "-" + year;

const PreviewResume = (props) => {
  const [user, setUser] = useState(props.location.data.user);
  const [isPopup, togglePopup] = useState(false)
  const [isCreate, toggleCreate] = useState(true)
  const [qualificationID, setQualificationID] = useState("")
  const [formType, setFormType] = useState("")
  const [isDeleteQuaPopup, toggleDeleteQuaPopup] = useState(false)
  const [isloading, setIsLoading] = useState(true);


  let newUser;
  if (isDeleteQuaPopup) {
    // ======= Update user  =======
    newUser = Object.assign({}, user);
    const arr = newUser.qualifications.filter(q => q._id !== qualificationID)
    newUser.qualifications = arr
  }

  const showShareProfile = () => {
    setFormType("shareProfile");
    togglePopup(true);
  };

  useEffect(() => {
    window.localStorage.setItem('shared_teacher', JSON.stringify(user))

    setIsLoading(false);
  }, []);

  return (
    <div>

      <Notifications />


      {isPopup &&
        <QualificationForm
          user={user}
          showPopup={togglePopup}
          addQualification={setUser}
          isCreate={isCreate}
          qualificationID={qualificationID}
          formType={formType}
        />
      }
      {isDeleteQuaPopup &&
        <DeletePopup
          showPopup={toggleDeleteQuaPopup}
          newUser={newUser}
          setUser={setUser}
        />
      }
      {isPopup && (<PopUp user={user} showPopup={togglePopup} formType={formType} />)}

      <div className='auth-right d-lg-flex bg-photoregister offset-container'>
        <div className='bg-gradient'></div>

        <div className='resume-container-transparent  profile-container-transparent'>


          <div className="profile-name-and-location ">
            {/* <p className="resume-title">RESUME</p> */}
            <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
            <h3>English Language Teacher</h3>
            <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>

          </div>

          <div className='profile-content-card-area w-100 resume-overflow'>
            <div className='profile-area profile-margin-top-negative'>

              <div className=" ">

                <div className="row">

                  <div className="profile-pic-and-name-container">
                    <div className="teacher-picture-container">
                      {/* user picture */}
                      <div className='profile-img front-1'>
                        <div className=''>
                          <div className=''>
                            <div className='img-avatar-ellipse-c'>
                              <img
                                src={user.img_url || '../../assets/img/avatar.jpg'}
                                className='img-avatar-ellipse '
                                alt=''
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mobile-screen-name ">
                      <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
                        <h4>English Language Teacher</h4>
                        <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>
                      </div>
                      {/* shearing buttons */}
                      <div className="row mb-5 ml-5 mr-5 front-1 front-2 for-small-size-margin-change-all">
                        <div className="mobile-for-share-button ">
                          <button
                            type="submit"
                            onClick={showShareProfile}
                            id="share-button"
                            className="btn btn-c primary-button-no-margin-hover gray-shadow-box "
                          ><i className="mdi mdi-share" id="mdi-share-home">  </i></button>
                        </div>
                        {user.role === "college" ? (
                          <div className="for-small-size-margin-change-hireme">
                            <button
                              type="submit"
                              // onClick={showHireMe}
                              className="btn btn-primary btn-block btn-c primary-button-no-margin-hover pl-5 pr-5 gray-shadow-box comingsoon-buttons"
                            >
                              <i className="mdi mdi-account-tie"> </i>Hire
                                  Me
                                </button>
                          </div>
                        ) : null}
                      </div>
                    </div>


                    <SharedNavbar offset={true} />
                    <div className="viewing-as-bar">
                      <span id="notify-text">You are viewing Resume as College</span>
                      <Link title="Ready Teacher" to="/" className="toggle-view-button">View as Teacher</Link>
                    </div>



                    <div className='profile-info-container-header'>
                      {/* user name */}
                      <div className='profile-info '>
                        <div className='profile-name'>
                          <div className="small-screen-share-profile-tittle"></div>
                          <div className="resume-page-card ">
                            <Tabs
                              tabs={[
                                {
                                  pathname: `/NavigateToPreviewProfile?id=${user._id}`,
                                  text: "Profile",
                                  newWindow: true
                                },
                                {
                                  pathname: "/PreviewResume",
                                  text: "Resume",
                                  data: { user },
                                  active: true
                                }
                              ]}
                            />

                            <div className="row badges-profile-margin-row">
                              <div className="col-lg-6 col-md-12 d-block">

                                {/* qualifications */}
                                <ProfileBox header="Qualifications">
                                  {user.qualifications.length > 0 ?
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
                                                {(q.graduation_date != "Present") ?

                                                  (
                                                    (q.graduation_date.length == 7)
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

                                {/* professional development */}
                                <ProfileBox header="Professional Development">
                                  {user.professional_developments.length > 0 ?
                                    user.professional_developments.map(q => {
                                      return (
                                        <li key={q._id} className="p-0">
                                          <hr className="qualification-line-1"></hr>
                                          <div className="row profile-qualification-content-box">
                                            <div className="col-8">
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-title text-left">{q.activity}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.focus_event}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.location}</p>
                                              </div>
                                            </div>

                                            <div className="col-4">
                                              <p className="mt-0 mb-0 profile-qualification-title text-right">
                                                {q.end_date.length === 7
                                                  ?
                                                  months[new Date(
                                                    ((q.end_date).substring(0, 2) + "/01/2020")
                                                  ).getMonth()] + " " + new Date(
                                                    ("01/01/" + (q.end_date).substring(3, 10))
                                                  ).getFullYear()

                                                  : months[new Date(q.end_date).getMonth()] + " " + new Date(q.end_date).getFullYear()
                                                }

                                              </p>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>
                              </div>

                              <div className="col-lg-6 col-md-12">
                                <ProfileBox header="Teaching Experience">
                                  {user.professional_experience && user.professional_experience.length > 0 ?
                                    user.professional_experience.map(q => {
                                      return (
                                        <li key={q._id} className="p-0">
                                          <hr className="qualification-line-1"></hr>
                                          <div className="row profile-qualification-content-box">
                                            <div className="col-8">
                                              {/* <p className="mt-0 mb-0 profile-qualification-title text-left">{q.graduation_date}</p> */}
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-title text-left">{q.organisation}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.course_class_delivered.length > 0 ? q.course_class_delivered.map(item => item.value).join(' | ') : q.course_class_delivered}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">
                                                  {q.institution_location}
                                                </p>
                                              </div>
                                              <div className="row">
                                                {q.qualification_url ? (
                                                  q.qualification_status ? (
                                                    <p className="mt-0 mb-2 profile-qualification-place text-left">
                                                      <i className="mdi mdi-checkbox-marked-circle float-righte green"></i>
                                                      Verified
                                                    </p>
                                                  ) :
                                                    <p className="mt-0 mb-2 profile-qualification-place text-left red">
                                                      Awaiting Verification
                                                    </p>
                                                ) : null}
                                              </div>
                                            </div>
                                            <div className="col-4">
                                              <p className="mt-0 mb-0 profile-qualification-title text-right">
                                                {q.end_date.length === 7 && q.start_date.length === 7
                                                  ?
                                                  months[new Date(((q.start_date).substring(0, 2) + "/01/2020")).getMonth()] + " " + new Date(("01/01/" + (q.start_date).substring(3, 10))).getFullYear()
                                                  + " - " + (q.end_date !== "Present" ? months[new Date(((q.end_date).substring(0, 2) + "/01/2020")).getMonth()] : q.end_date) + " " + (q.end_date !== "Present" ? new Date(("01/01/" + (q.end_date).substring(3, 10))).getFullYear() : '')
                                                  :
                                                  months[new Date(q.start_date).getMonth()]
                                                  + " "
                                                  + new Date(q.start_date).getFullYear()
                                                  + "-"
                                                  + (q.end_date !== "Present" ? months[new Date(q.end_date).getMonth()] : q.end_date)
                                                  + (q.end_date !== "Present" ? new Date(q.end_date).getFullYear() : "")
                                                }
                                              </p>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>

                                <ProfileBox header="Other Professional Experience">
                                  {user.non_teaching_experience.length > 0 ?
                                    user.non_teaching_experience.map(q => {
                                      return (
                                        <li key={q._id} className="p-0">
                                          <hr className="qualification-line-1"></hr>
                                          <div className="row profile-qualification-content-box">
                                            <div className="col-8">
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-title text-left">{q.role_held}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.main_duties}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.organisation + ", " + q.institution_location}</p>
                                              </div>
                                            </div>

                                            <div className="col-4">
                                              <p className="mt-0 mb-0 profile-qualification-title text-right">
                                                {q.end_date.length === 7 && q.start_date.length === 7
                                                  ?
                                                  months[new Date(((q.start_date).substring(0, 2) + "/01/2020")).getMonth()]
                                                  + " "
                                                  + new Date(("01/01/" + (q.start_date).substring(3, 10))).getFullYear()
                                                  + "-"
                                                  + (q.end_date !== "Present" ? months[new Date(((q.end_date).substring(0, 2) + "/01/2020")).getMonth()] : q.end_date)
                                                  + " "
                                                  + (q.end_date !== "Present" ? new Date(("01/01/" + (q.end_date).substring(3, 10))).getFullYear() : '')

                                                  :
                                                  months[new Date(q.start_date).getMonth()]
                                                  + " "
                                                  + new Date(q.start_date).getFullYear()
                                                  + "-"
                                                  + (q.end_date !== "Present" ? months[new Date(q.end_date).getMonth()] : q.end_date)
                                                  + " "
                                                  + (q.end_date !== "Present" ? new Date(q.end_date).getFullYear() : '')
                                                }
                                              </p>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewResume
