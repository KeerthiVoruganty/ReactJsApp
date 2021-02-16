import React, { useState, useEffect, Component } from 'react';
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from 'axios';
import { PORT } from '../../config';
import { notify } from 'react-notify-toast';
import "./TeacherResume.css";
import QualificationForm from './QualicationForm'



export default function TeacherResume(props) {
  const [user, setUser] = useState(JSON.parse(window.localStorage.user));
  // const userObject = props.userObject;

  //props
  const isShowBoxFooter = props.isShowBoxFooter;
  const editRemoveButton = props.editRemoveButton;

  const [content, setContent] = useState()
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

  //dynamic "Add More button". isShowBoxFooter receive from props
  let addMoreButton;
  if (isShowBoxFooter) {
    addMoreButton = (
      <div className="profile_can_deliver_bottom">
        <hr className="qualification-line-2"></hr>
        <div className="resume-container-update-content a">
          <Link onClick={showAddQualifications}>
            <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
            {"  "}Add More
          </Link>

        </div>
      </div>
    )
  } else {
    addMoreButton = null;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  return (
    <div className="teacher-resume-wrapper">
      <div className="qualification-experience-wrapper">
        <div className="qualifications-pro-development">
          <div>
            {/*Qualifications Box */}
            <ProfileBox header="Qualifications" footer={addMoreButton}>
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

                          {
                            (editRemoveButton) ? (
                              <div className="row">
                                <p className="mt-0 mb-2 profile-qualification-place text-left">
                                  <Icon name="file text outline" onClick={() => editAddQualifications(q)} className="qualification-container-update-icon">  </Icon>
                                  {q.enrolment_url ?
                                    <Link to={{ pathname: `/PdfViewer?id=${q.enrolment_url}` }} target="_blank" className="profile-qualification-place">SOE
                                    </Link>
                                    :
                                    <div>
                                      <Link to={{ pathname: `/PdfViewer?id=${q.qualification_url}` }} target="_blank" className="profile-qualification-place">Resume
                                    </Link>
                                      {" "}|{" "}
                                      <Link to={{ pathname: `/PdfViewer?id=${q.transcript_url}` }} target="_blank" className="profile-qualification-place">
                                        Transcript
                                      </Link>
                                    </div>
                                  }
                                </p>
                              </div>
                            ) : null
                          }


                          {
                            (editRemoveButton) ?
                              (
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
                              ) : null
                          }


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
                              {
                                (editRemoveButton) ? (
                                  <p className="mb-0 profile-qualification-title text-right mt-2">
                                    <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddQualifications(q)} className="qualification-container-update-icon">  </Icon>
                                    <Icon name="trash" circular inverted color="red" onClick={delete_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                                  </p>
                                ):null
                              }

                            </div>
                         
                      </div>
                    </li>
                  )
                }) : null}
            </ProfileBox>
          </div>
          <div>
            {/* professional development */}
            <ProfileBox header="Professional Development" footer={addMoreButton}>
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

                          {
                            (editRemoveButton) ? (
                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddPD(q)} className="qualification-container-update-icon">  </Icon>
                                <Icon name="trash" circular inverted color="red" onClick={deletePD_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                              </p>

                            ) : null
                          }


                        </div>
                      </div>
                    </li>
                  )
                }) : null}
            </ProfileBox>
          </div>
        </div>
        <div className="teachingExperience-otherExperience">
          <div>
            {/*  Teaching Experience*/}
            <ProfileBox header="Teaching Experience" footer={addMoreButton}>
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

                          {
                            (editRemoveButton) ? (
                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddPE(q)} className="qualification-container-update-icon">  </Icon>
                                <Icon name="trash" circular inverted color="red" onClick={deleteEx_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                              </p>
                            ) : null
                          }


                        </div>
                      </div>
                    </li>
                  )
                }) : null}
            </ProfileBox>
          </div>

          <div>
            {/*  OTHER PROFESSIONAL EXPERIENCE*/}
            <ProfileBox header="Other Professional Experience" footer={addMoreButton}>
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
                          {
                            (editRemoveButton) ? (
                              <p className="mb-0 profile-qualification-title text-right mt-2">
                                <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => editAddNTE(q)} className="qualification-container-update-icon">  </Icon>
                                <Icon name="trash" circular inverted color="red" onClick={deleteNonTeachingEx_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                              </p>
                            ) : null
                          }

                        </div>
                      </div>
                    </li>
                  )
                }) : null}
            </ProfileBox>
          </div>
        </div>
      </div>
      <div className="professional-referee-resume">
        <ProfileBox header="Professional Referee" footer={addMoreButton}>
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

                    {
                      (editRemoveButton) ? (
                        <div className="col-4">
                          <p className="mb-0 profile-qualification-title text-right mt-2">
                            <Icon name="pencil" circular inverted color="#3bb4d8" onClick={() => showAddReferee(q)} className="qualification-container-update-icon">  </Icon>
                            <Icon name="trash" circular inverted color="red" onClick={deleteReferee_check} className="qualification-container-update-icon" id={q._id}>  </Icon>
                          </p>
                        </div>
                      ) : null
                    }

                  </div>
                </li>
              )
            }) : null}
        </ProfileBox>
      </div>
    </div>
  )
}