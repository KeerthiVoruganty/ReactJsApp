import React, { Component, useState, useEffect } from 'react'
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar'
import axios from 'axios';
import { notify } from 'react-notify-toast';

import './Resume.css';
import '../Home/Home.css';
import { PORT } from '../../config';
import QualificationForm from './QualicationForm'
import DeletePopup from '../Home/DeletePopup';
import { Link } from "react-router-dom"
import DatePicker from "../User/DateRange";
import PopUp from '../../Components/PopUpForm/ShareProfile-PopUp';
import MobileNavBar from "../../Components/Navbar/MobileNavBar"
import { Button, Icon } from "semantic-ui-react";
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import Tabs from "../../Components/Tabs/Tabs";
import PdfViewer from "../ValidateDocuments/PdfViewer";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Resume = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.user));
  const [isPopup, togglePopup] = useState(false)
  const [isCreate, toggleCreate] = useState(true)
  const [qualificationID, setQualificationID] = useState("")
  const [formType, setFormType] = useState("")
  const [isDeleteQuaPopup, toggleDeleteQuaPopup] = useState(false);
  const [sortedQalifications, setQualification] = useState();
  const QUALIFICATION_DELETE_MSG = "Qualification removed successfully";
  const PROFESSIONAL_DEVELOPMENT_DELETE_MSG = "Professional development removed successfully";
  const PROFESSIONAL_EXPERIENCE_DELETE_MSG = "Professional experience removed successfully";
  const NON_TEACHING_EXPERIENCE_DELETE_MSG = "Other experience removed successfully";
  const REFEREE_DELETE_MSG = "Referee removed successfully";
  const [content, setContent] = useState()

  // const [qualifications, handleArr, add_qualification, remove_qualification] = CrudUser(user);

  const showHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
      'block';
  };
  const hideHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
      'none';
  };

  const showShareProfile = () => {
    setFormType('shareProfile')
    setContent("")
    togglePopup(true)
  };

  const showAddQualifications = () => {
    setContent("")
    setFormType('qualification')
    toggleCreate(true)
    togglePopup(true)
  }

  const showAddReferee = (q) => {
    if (q) {
      setContent(q)
    } else {
      setContent("")

    }
    setFormType('referee')
    toggleCreate(true)
    togglePopup(true)
  }

  const editAddQualifications = (q) => {
    setContent(q)
    setFormType('qualification')
    toggleCreate(true)
    togglePopup(true)
  }
  /*  const showEditQualifications = (e) => {
      setFormType('qualification')
      togglePopup(true)
      toggleCreate(false)
      setQualificationID(e.target.getAttribute('value') || e.target.parentNode.getAttribute('value'))
    }*/

  const toggleDeleteQualification = (e) => {
    // assign the qualificationId and pass it to delete popup
    setQualificationID(e.target.parentNode.getAttribute('value'))
    toggleDeleteQuaPopup(true)
  }

  const showAddPD = () => {
    setContent("")
    setFormType('PD')
    toggleCreate(true)
    togglePopup(true)
  }

  const editAddPD = (q) => {
    setContent(q)
    setFormType('PD')
    toggleCreate(true)
    togglePopup(true)
  }

  const showAddPE = () => {
    setContent("")
    setFormType('PE')
    toggleCreate(true)
    togglePopup(true)
  }


  const editAddPE = (q) => {
    setContent(q)
    setFormType('PE')
    toggleCreate(true)
    togglePopup(true)
  }

  const showAddNTE = () => {
    setContent("")
    setFormType('NTE')
    toggleCreate(true)
    togglePopup(true)
  }

  const editAddNTE = (q) => {
    setContent(q)
    setFormType('NTE')
    toggleCreate(true)
    togglePopup(true)
  }

  const toggleHover = () => {
    // TODO: Implement the funtion later
  }

  let newUser;
  if (isDeleteQuaPopup) {
    // ======= Update user  =======
    newUser = Object.assign({}, user);
    const arr = newUser.qualifications.filter(q => q._id !== qualificationID)
    newUser.qualifications = arr
  }

  const delete_over = (e) => {
    console.log(document.getElementById(e.target.id).parentNode.parentNode.childNodes[1]);
    document.getElementById(e.target.id).parentNode.childNodes[1].classList.toggle('cl-bar2')
    document.getElementById(e.target.id).parentNode.parentNode.childNodes[1].classList.toggle('cl-box2')

  }

  // Delete Qualification
  // TODO: Refresh card on delete
  const delete_check = (e) => {
    const id = e.target.id;
    newUser = Object.assign({}, user);
    const arr = newUser.qualifications.filter(q => q._id !== id)
    newUser.qualifications = arr
    updateUser(newUser, QUALIFICATION_DELETE_MSG);
  }

  const deletePD_check = (e) => {
    const id = e.target.id;
    newUser = Object.assign({}, user);
    const arr = newUser.professional_developments.filter(q => q._id !== id)
    newUser.professional_developments = arr
    // alert(e);
    updateUser(newUser, PROFESSIONAL_DEVELOPMENT_DELETE_MSG);
  }

  const deleteEx_check = (e) => {
    const id = e.target.id;
    newUser = Object.assign({}, user);
    const arr = newUser.professional_experience.filter(q => q._id !== id)
    newUser.professional_experience = arr
    // alert(e);
    updateUser(newUser, PROFESSIONAL_EXPERIENCE_DELETE_MSG);
  }

  const deleteReferee_check = (e) => {
    const id = e.target.id;
    newUser = Object.assign({}, user);
    const arr = newUser.referees.filter(q => q._id !== id)
    newUser.referees = arr
    updateUser(newUser, REFEREE_DELETE_MSG);
  }

  const deleteNonTeachingEx_check = (e) => {
    const id = e.target.id;
    newUser = Object.assign({}, user);
    const arr = newUser.non_teaching_experience.filter(q => q._id !== id)
    newUser.non_teaching_experience = arr
    // alert(e);
    updateUser(newUser, NON_TEACHING_EXPERIENCE_DELETE_MSG);
  }

  const updateUser = (user, msg) => {
    setUser(user);
    window.localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    //=======  save the class_type into database =======
    axios.put(`${PORT}/updateUser`, {
      user: user
    })
      .then(res => {
        notify.show(msg);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changeStringToMonth = (string) => {
    let d = Date.parse(string + "1, 2020");
    return new Date(d).getMonth() + 1;

  }

  const showVerificationStatus = (qual) => {
    const qualsToVerify = ["Bachelor of", "Master of/in", "PhD in", "Graduate Diploma of/in", "Graduate Certificate in"]
    return qualsToVerify.includes(qual);
  }

  // $(document).ready(function() {

  //   $(".qualification-box").hover(function() {
  //     $(".qualification-box-right").toggleClass('qualification-cl-box2');
  //     $(".qualification-bar").toggleClass('qualification-cl-bar2');
  //   });

  //   $(".qualification-bar").click(function() {
  //     alert("Deleted");
  //   });
  // });
  // useEffect(() => {

  // });

  /*  window.onload = () => {
      document.querySelectorAll('.qualification-box').onmouseenter(function(){
        document.querySelectorAll('.qualification-box').toggleClass('qualification-cl-box2')
        document.querySelectorAll('.qualification-box').toggleClass('qualification-cl-bar2')
      });
      document.querySelectorAll('.qualification-bar').click(function(){
        alert("Deleted");
      })
    }*/



  return (
    <div>
      {isPopup &&
        <QualificationForm
          user={user}
          showPopup={togglePopup}
          addQualification={setUser}
          isCreate={isCreate}
          qualificationID={qualificationID}
          formType={formType}
          content={content}
        />
      }
      {isDeleteQuaPopup &&
        <DeletePopup
          showPopup={toggleDeleteQuaPopup}
          newUser={newUser}
          setUser={setUser}
        />
      }
      {isPopup &&
        <PopUp
          user={user}
          showPopup={togglePopup}
          formType={formType}
        />
      }
      {/* menu bar */}
      <FixProfileNavbar offset={true} />
      <div className="viewing-as-bar">
        <span id="notify-text">You are viewing Resume as Teacher</span>
        <Link title="Ready Teacher" to={`/NavigateToPreviewProfile?id=${user._id}`} className="toggle-view-button">View as College</Link>
      </div>

      <div className='auth-right d-lg-flex bg-photoregister offset-container'>
        <div className='bg-gradient'></div>

        <div className='resume-container-transparent  profile-container-transparent'>


          <div className="profile-name-and-location ">
            {/* <p className="resume-title">RESUME</p> */}
            <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
            <h3>English Language Teacher</h3>
            <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>

          </div>

          <div className='profile-content-card-area w-100 resume-overflow'>
            <div className='profile-area profile-margin-top-negative'>

              <div className="w-fill w-100">

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
                                className='img-avatar-ellipse'
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
                        <div className=" ">
                          <button
                            type="submit"
                            onClick={showShareProfile}
                            id="share-button"
                            className="btn btn-c primary-button-no-margin-hover gray-shadow-box "
                          ><i className="mdi mdi-share" id="mdi-share-home" >  </i></button>
                        </div>

                        {user.role === "college" ? <div className="for-small-size-margin-change-hireme">
                          <button
                            type="submit"
                            // onClick={showHireMe}
                            className="btn btn-primary btn-block btn-c primary-button-no-margin-hover pl-5 pr-5 gray-shadow-box comingsoon-buttons"
                          ><i className="mdi mdi-account-tie">  </i>Hire Me</button>
                        </div> : null}
                      </div>
                    </div>

                    <div className='profile-info-container-header'>
                      {/* user name */}
                      <div className='profile-info '>
                        <div className='profile-name'>
                          <div className="resume-page-card ">
                            <Tabs
                              tabs={[
                                {
                                  pathname: "/",
                                  text: "Profile"
                                },
                                {
                                  pathname: "/resume",
                                  text: "Resume",
                                  data: user,
                                  active: true
                                }
                              ]}
                            />

                            <div className="row badges-profile-margin-row">
                              <div className="col-lg-6 col-md-12 d-block">
                                {/* qualifications */}


                                <ProfileBox header="Qualifications"
                                  footer={
                                    <div className="profile_can_deliver_bottom">
                                      <hr className="qualification-line-2"></hr>
                                      <div className="resume-container-update-content a">
                                        <Link onClick={showAddQualifications}>
                                          <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                          {"  "}Add More
                                            </Link>

                                      </div>
                                    </div>
                                  }>
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
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">
                                                  <Icon name="file text outline" onClick={() => editAddQualifications(q)} className="qualification-container-update-icon">  </Icon>
                                                  {q.enrolment_url ?
                                                    <Link to={{ pathname: `/PdfViewer?id=${q.enrolment_url}` }} target="_blank" className="profile-qualification-place">SOE
                                                            </Link>
                                                  :
                                                 <div> <Link to={{ pathname: `/PdfViewer?id=${q.qualification_url}` }} target="_blank" className="profile-qualification-place">Resume
                                                            </Link>
                                                  {" "}|{" "}
                                                  <Link to={{ pathname: `/PdfViewer?id=${q.transcript_url}` }} target="_blank" className="profile-qualification-place">
                                                    Transcript
                                                            </Link></div>
                                                   }
                                                  

                                                </p>
                                              </div>
                                              <div className="row">
                                                {showVerificationStatus(q.degree) && q.qualification_url ? (
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

                                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddQualifications(q)} className="qualification-container-update-icon">  </Icon>
                                                <Icon name="trash" circular inverted color="red" onClick={delete_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                                              </p>

                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>

                                {/* professional development */}
                                <ProfileBox header="Professional Development"
                                  footer={
                                    <div className="profile_can_deliver_bottom">
                                      <hr className="qualification-line-2"></hr>
                                      <div className="resume-container-update-content a">
                                        <Link onClick={showAddPD}>
                                          <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                          {"  "}Add More
                                        </Link>

                                      </div>
                                    </div>
                                  }>
                                  {user.professional_developments.length > 0 ?
                                    user.professional_developments.sort((a, b) => {
                                      var dateA = new Date("01/" + a.end_date),
                                        dateB = new Date("01/" + b.end_date);
                                      return dateB - dateA
                                    }).map(q => {
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
                                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddPD(q)} className="qualification-container-update-icon">  </Icon>
                                                <Icon name="trash" circular inverted color="red" onClick={deletePD_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                                              </p>

                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>
                              </div>


                              {/* professional experience */}
                              <div className=" col-lg-6 col-md-12">
                                {/*  Teaching Experience*/}
                                <ProfileBox header="Teaching Experience"
                                  footer={
                                    <div className="profile_can_deliver_bottom">
                                      <hr className="qualification-line-2"></hr>
                                      <div className="resume-container-update-content a">
                                        <Link onClick={showAddPE} >
                                          <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                          {"  "}Add More
                                  </Link>

                                      </div>
                                    </div>
                                  }>
                                  {user.professional_experience.length > 0 ?
                                    user.professional_experience.sort((a, b) => {
                                      var dateA = new Date("01/" + a.end_date),
                                        dateB = new Date("01/" + b.end_date);
                                      return dateB - dateA
                                    }).map(q => {
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
                                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddPE(q)} className="qualification-container-update-icon">  </Icon>
                                                <Icon name="trash" circular inverted color="red" onClick={deleteEx_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                                              </p>

                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>

                                {/*  OTHER PROFESSIONAL EXPERIENCE*/}
                                <ProfileBox header="Other Professional Experience"
                                  footer={
                                    <div className="profile_can_deliver_bottom">
                                      <hr className="qualification-line-2"></hr>
                                      <div className=" resume-container-update-content a">
                                        <Link onClick={showAddNTE}>
                                          <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                          {"  "}Add More
                                      </Link>

                                      </div>
                                    </div>
                                  }>
                                  {user.non_teaching_experience.length > 0 ?
                                    user.non_teaching_experience.sort((a, b) => {
                                      var dateA = new Date("01/" + a.end_date),
                                        dateB = new Date("01/" + b.end_date);
                                      return dateB - dateA
                                    }).map(q => {
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
                                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddNTE(q)} className="qualification-container-update-icon">  </Icon>
                                                <Icon name="trash" circular inverted color="red" onClick={deleteNonTeachingEx_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                                              </p>

                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                </ProfileBox>
                              </div>

                              {/* referee*/}
                              <div className="referee-center">
                                <ProfileBox header="Professional Referee"
                                  footer={
                                    <div className="profile_can_deliver_bottom">
                                      <hr className="qualification-line-2"></hr>
                                      <div className="resume-container-update-content a">
                                        <Link onClick={() => showAddReferee()}>
                                          <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                          {"  "}Add More
                                        </Link>

                                      </div>
                                    </div>
                                  }>
                                  {user.referees.length > 0 ?
                                    user.referees.map(q => {
                                      return (
                                        <li key={q._id} className="p-0">
                                          <hr className="qualification-line-1"></hr>
                                          <div className="row profile-qualification-content-box">
                                            <div className="col-8">
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-title text-left">{q.organisation}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.referee_first_name + " " + q.referee_last_name + "  (" + q.referee_position_title + ")"}</p>
                                              </div>
                                              <div className="row">
                                                <p className="mt-0 mb-2 profile-qualification-place text-left">{q.referee_email}</p>
                                              </div>
                                            </div>

                                            <div className="col-4">
                                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => showAddReferee(q)} className="qualification-container-update-icon">  </Icon>
                                                <Icon name="trash" circular inverted color="red" onClick={deleteReferee_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
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
                <div className='row prof-otherinfo-row'>

                  {/* return invitations - DO NOT DELETE!!! */}
                  {/* <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-bigger ">
                            <div className="profile-otherinfo-box">
                              <div className="profile-otherinfo-box-header">
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-2">
                                  <div className="mdi mdi-thumb-up"> </div>
                                </div>
                                <p>Return Invitations</p>
                                <h3>30 INVITATIONS</h3>
                              </div>
                              <div className="profile-otherinfo-box-body-cont">
                                <div className="profile-otherinfo-box-body">
                                  This is the times this teacher has been invited to work in the same college again
                                </div>
                              </div>
                            </div>
                          </div> */}


                  {/* <div className="col-3 profile-otherinfo-box-container profile-otherinfo-box-container-smaller">
                            <div className="profile-otherinfo-box">
                            <Link to={{pathname: "/Identification"}} target="_blank">
                              <div className="profile-otherinfo-box-header d-flex justify-content-between">
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-4 ml-3">
                                  <div className="mdi mdi-passport"> </div>
                                </div>
                                {user.visa_verification_status ?
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-verified  float-right">
                                  <div className="mdi mdi-check"> </div>
                                </div>
                                :
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-notverified"> */}
                  {/* <div className="mdi mdi-check mdi-spin"> </div> */}
                  {/* </div>
                                }
                              </div>
                              <div className="profile-otherinfo-box-header d-flex justify-content-between mt-3">
                                <p></p>

                                <p className="text-left">Visa</p>
                                <br></br>
                                {user.visa_verification_status ?
                                <h3>VERIFIED!!</h3>
                                :
                                <h3>Awaiting Verification</h3>
                                }
                              </div>
                              {user.visa_type ?
                              <div>
                              <p className="m-auto">VISA HOLDER: {user.visa_type}</p>
                              <div className="profile-otherinfo-box-body-cont pt-0">
                                <div className="profile-otherinfo-box-body">
                                  This teacher is on a visa
                                </div>
                              </div>
                              </div>
                              :
                              <div>
                                <p className="m-auto"> </p>
                                <div className="profile-otherinfo-box-body-cont pt-0"> */}
                  {/* <div className="profile-otherinfo-box-body">
                                    Please upload your Visa
                                  </div> */}
                  {/* </div>
                              </div>}
                              </Link>
                            </div>
                          </div> */}

                  <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller">
                    <div className="profile-otherinfo-box">
                      {/* This link will work with pdf files */}
                      {/* <Link to={{ pathname:  `/PdfViewer?id=${user.police_check_url}` }}target="_blank"> */}
                      {/* This link will work with imags files */}
                      <Link to={{ pathname: user.police_check_url ? `/pdfViewer?id=${user.police_check_url}` : "/Policecheck" }} target="_blank">
                        <div className="profile-otherinfo-box-header d-flex justify-content-between">
                          <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-4 ml-3">
                            <div className="mdi mdi-fingerprint"> </div>
                          </div>
                          {user.police_check_verification_status ?
                            <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-verified  float-right">
                              <div className="mdi mdi-check"> </div>
                            </div>
                            :
                            <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-notverified">
                              {/* <div className="mdi mdi-check mdi-spin"> </div> */}
                            </div>
                          }
                        </div>
                        <div className="profile-otherinfo-box-header d-flex justify-content-between mt-3">
                          <p className="text-left">Police Check</p>
                          {user.police_check_url ?
                            <h3>View Police Check</h3> :
                            <h3>Not yet added</h3>}
                          {/* {user.police_check_verification_status ?
                            <h3>VERIFIED!!</h3>
                            :
                            <h3>Awaiting Verification</h3>
                          } */}
                        </div>
                        {user.police_check_expiry ?
                          <div className="profile-otherinfo-box-body-cont">
                            <div className="profile-otherinfo-box-body">
                              Expiry Date: {user.police_check_expiry}
                            </div>
                          </div>
                          :
                          <div>
                            <p className="m-auto"> </p>
                            <div className="profile-otherinfo-box-body-cont pt-0">
                              {/* <div className="profile-otherinfo-box-body">
                                  Please upload your Police Check
                                  </div> */}
                            </div>
                          </div>}
                      </Link>
                    </div>
                  </div>

                  <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller" >
                    <div className="profile-otherinfo-box" >
                      <Link to={{ pathname: user.wwcc_url ? `/pdfViewer?id=${user.wwcc_url}` : "/WorkingWithChildrenChk" }} target="_blank">

                        <div className="profile-otherinfo-box-header d-flex justify-content-between">
                          <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-5 ml-3">
                            <div className="mdi mdi-face"> </div>
                          </div>
                          {user.wwcc_verification_status ?
                            <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-verified  float-right">
                              <div className="mdi mdi-check"> </div>
                            </div>
                            :
                            <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-notverified">
                              {/* <div className="mdi mdi-check mdi-spin"> </div> */}
                            </div>
                          }
                        </div>
                        <div className="profile-otherinfo-box-header d-flex justify-content-between mt-3">
                          <p className="text-left">WWCC</p>
                          {user.wwcc_url ?
                            <h3>View Working With Children Check (WWCC)</h3> :
                            <h3>Not yet added</h3>}
                          {/* {user.wwcc_verification_status ?
                            <h3>VERIFIED!!</h3>
                            :
                            <h3>Awaiting Verification</h3>
                          } */}
                        </div>
                        {!user.wwcc_verification_status ?
                          <div className="profile-otherinfo-box-body-cont pt-0">
                            {/* <div className="profile-otherinfo-box-body">
                                    Please, upload your WWCC
                                  </div> */}
                          </div>
                          : null}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mobile-size-menu">
                  <MobileNavBar offset={true} />
                </div>

                <div id='modal-container-HireMe' className='status-modal'>
                  <div id='HireMe-box'>
                    <div onClick={hideHireMe} className='dot'></div>
                    <div className='status-alert-message overflow-unset hireme-padding'>
                      <h1 className='status-alert blue-text mb-3 modal-title'>HIRE ME!</h1>
                      <div className="row mb-4 main-content">
                        <div className="col-12">
                          <h4 className="pt-0 pb-0 pl-0">Please, insert the shifts you need, and we will let you know if this teacher is available</h4>
                          <p className="mb-0 pb-0 pl-0">Filling up this table, you are sending us a booking request for this teacher. </p>
                          <p className="mb-0 pb-0 pl-0">We will contact you to let you know if this teacher is available</p>
                        </div>
                        <div className="row ml-0 pr-4 col-12 d-flex justify-content-between">

                          <h5 className="mt-4 d-flex ">Coming week</h5>
                          <h5 className="mt-4 d-flex ">or Pick a date</h5>
                        </div>
                        <div className="row ml-0">

                          <div className="pl-3 pr-0 col-9">
                            <div className="calendar-rule-container pb-3">
                              <div className="row ml-0">
                                <div className="col-2">
                                  <div className="row week-days mb-1">Monday 25th</div>
                                  <div className="row weekday-container availability-box-unavialable">
                                    Unavialable
                                      </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">Tuesday 26th</div>
                                  <div className="row weekday-container ">
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">Wednesday 27th</div>
                                  <div className="row weekday-container ">
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">Thursday 28th</div>
                                  <div className="row weekday-container ">
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">Friday 29th</div>
                                  <div className="row weekday-container ">
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                    </div>
                                    <div className='col-4 form-check d-block text-center'>
                                      <input
                                        type='checkbox'
                                        className='check-filter'
                                      /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-1"></div>
                              </div>
                            </div>
                          </div>

                          <div className="pl-0 col-3 margin-t-25 mb-0">
                            <div className="form-group hireme-alert-datepicker">
                              <div className="input-icon">
                                <i className="mdi mdi-calendar calendar-ic"></i>
                                <DatePicker></DatePicker>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                      <div >
                        <div className="row qualification-footer">
                          <div className="col-md-5">
                            <button onClick={(event) => { hideHireMe(); }} className="btn btn-block btn-c secondary-button-no-margin-hover">
                              Cancel
                                  </button>
                          </div>
                          <div className="col-md-7 pr-4">
                            <button onClick={(event) => { hideHireMe(); }} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
                              Send Request
                                  </button>
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

export default Resume
