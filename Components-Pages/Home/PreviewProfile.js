import React, { useState, useEffect } from "react";
import "./Home.css";
import "./HomeCarouselScript.js";
import axios from "axios";
import { PORT } from "../../config";
import CanDeliverForm from "./CanDeliverForm";
import DeletePopup from "./DeletePopup";
import { useArray, useForceUpdate } from "../../Hook";
import { Link } from "react-router-dom";
import HomeCarousel from "./HomeCarousel";
import Notifications, { notify } from "react-notify-toast";
import PopUp from "../../Components/PopUpForm/ShareProfile-PopUp";
import { Button, Icon } from "semantic-ui-react";
import $ from "jquery";
import SharedNavbar from '../../Components/Navbar/SharedNavbar'
// import Tabs from '@material-ui/core/Tab';
// import Tab from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import Tabs from "../../Components/Tabs/Tabs";
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PreviewProfile = props => {
  const [user, setUser] = useState(props.location.state);

  const [isloading, setIsLoading] = useState(true);
  // =================  Begin Adding and delete can_deliver =================
  const [handleArr, add_class] = useArray([]);
  const [isClassPopup, toggleClassPopup] = useState(false);
  const [isDeletePopup, toggleDeletePopup] = useState(false);
  const [canDeliverId, setDeliverId] = useState("");
  const [isPopup, togglePopup] = useState(false);
  const [formType, setFormType] = useState("");
  const allUser = JSON.parse(window.localStorage.getItem("allusers")) || [];
  const currentIndex =
    allUser.findIndex(user => {
      return props.location.state._id === user._id;
    }) || null;
  const previous = currentIndex > 0 ? allUser[currentIndex - 1]._id : null;
  const next = allUser[currentIndex + 1] ? allUser[currentIndex + 1]._id : null;
  const previos_avatar = previous ? allUser[currentIndex - 1].img_url : null;
  const next_avatar = next ? allUser[currentIndex + 1].img_url : null;
  const [test, setTEST] = useState()
  // =================  End Adding and delete can_deliver =================
  useEffect(() => {
    window.localStorage.setItem('shared_teacher', JSON.stringify(user))

    setIsLoading(false);
  }, []);

  // ====  prepare the value to remove class ====
  let newUser;
  if (isDeletePopup) {
    // ======= Update user  =======
    newUser = Object.assign({}, user);
    const can_deliver_arr = newUser.can_deliver.filter(
      c => c._id !== canDeliverId
    );
    newUser.can_deliver = can_deliver_arr;
  }

  const hideShareProfile = () => {
    document.getElementById("modal-container-ShareProfile").style.display =
      "none";
  };

  const showShareProfile = () => {
    setFormType("shareProfile");
    togglePopup(true);
  };
  const shareProfile = () => {
    axios
      .put(`${PORT}/shareUserProfile`, {
        id: user._id,
        to: document.querySelector("#email").value,
        msg: document.querySelector("#message").value
      })
      .then(res => {
        notify.show("Profile shared successfully");
      })
      .catch(err => {
        console.log(err);
      });
    hideShareProfile();
  };
  $(document).ready(function () {
    // console.log("ready!");
    // if (document.getElementById('profile-qualification-height') !== null) {
    //   setTEST(document.getElementById('profile-qualification-height').offsetHeight)
    //   if (document.getElementById('badges') !== null) {
    //     if (user.qualifications.length > 2) {
    //       document.getElementById('badges').style.height = test + "px";
    //     }
    //     else if (user.qualifications.length == 0) {
    //       document.getElementById("profile-qualification-height").style.height = "350px";
    //     }
    //     else {
    //       document.getElementById("profile-qualification-height").style.height = "350px";
    //     }
    //   }
    // }

  });


  // $(document).ready(function () {
  //   if(notify.show){
  //     document.getElementById("navHide").style.paddingTop = "350px";
  //   }
  // })

  // const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  let store_ge = [];
  let store_cam = [];
  let store_other = [];
  let store_manage = [];
  let store_online = [];

  console.log(user);

  user.can_deliver.forEach(c => {
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
      store_ge.push(c.can_deliver);

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
      store_cam.push(c.can_deliver);
    }
    else if (c.can_deliver === "Business English"
      || c.can_deliver === "Study Tours"
      || c.can_deliver === "Lecturer- English Language"
      || c.can_deliver === "Teacher Training") {
      store_other.push(c.can_deliver);
    }
    else if (c.can_deliver === "Assistant Academic Manager"
      || c.can_deliver === "Academic Manager"
      || c.can_deliver === "Student Support Officer"
      || c.can_deliver === "Social Program Officer") {
      store_manage.push(c.can_deliver);
    }
    else if (c.can_deliver === "EAP/Bridging") {
      store_cam.push(c.can_deliver);
      store_other.push(c.can_deliver);

    }
    else if (c.can_deliver === "Zoom"
      || c.can_deliver === "Skype"
      || c.can_deliver === "Bb Collaborate Ultra"
      || c.can_deliver === "Moodle"
      || c.can_deliver === "Canvas LMS"
      || c.can_deliver === "Padlet"
      || c.can_deliver === "Microsoft Teams"
      || c.can_deliver === "Google Meet") {
      store_online.push(c.can_deliver);

    }
  })
  // user.feedback=[{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"Reliable","teacher_id":"5d899b3178a2581455eac395"},{"class_id":"5e38bf161c9d44000075e5ee","badge_title":"Adaptable","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"Fun Teacher","teacher_id":"5d899b3178a2581455eac395"},{"class_id":"5e38bf161c9d44000075e5ee","badge_title":"Energetic","teacher_id":"5d899b3178a2581455eac395"}]

  return (
    // <Paper squar e className={classes.root}>

    <div>

      <Notifications />

      {isPopup && (
        <PopUp user={user} showPopup={togglePopup} formType={formType} />
      )}
      {!isloading && (
        <div>

          {/* menu bar */}
          {isClassPopup && (
            <CanDeliverForm
              user={user}
              setUser={setUser}
              addClass={add_class}
              showPopup={toggleClassPopup}
            />
          )}
          {isDeletePopup && (
            <DeletePopup
              showPopup={toggleDeletePopup}
              newUser={newUser}
              setUser={setUser}
            />
          )}

          <div className="auth-right d-lg-flex bg-photoregister offset-container">
            <div className="bg-gradient"></div>

            <div className="resume-container-transparent  profile-container-transparent">
              <div className="profile-name-and-location ">
                {/* <h1>{user.first_name} {user.last_name}</h1> */}
                <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
                <h3>English Language Teacher</h3>
                <h4>
                  <i className="mdi mdi-map-marker">
                    {" "}
                    {user.prefered_work_location.length > 0
                      ? user.prefered_work_location
                        .map(location => location)
                        .join(", ")
                      : "Melbourne"}
                  </i>{" "}
                </h4>

                {user.whereby_link ?
                  <a href={user.whereby_link} alt="Whereby Link">
                    <div className="whereby-link"></div>
                  </a>
                  : null}
              </div>

              <div className="profile-content-card-area w-100 resume-overflow">
                <div className="profile-area profile-margin-top-negative">
                  <div className=" w-fill w-100 ">
                    <div className="row">
                      <div className="w-100">
                        <div className="teacher-picture-container">
                          {/* user picture */}
                          <div className="profile-img front-1">
                            <input
                              type="file"
                              id="imgupload"
                              style={{ display: "none" }}
                              accept="image/*"
                            />
                            <div className="project__card">
                              <div className="">
                                <div className="img-avatar-ellipse-c">
                                  <img
                                    src={
                                      user.img_url ||
                                      "../../assets/img/avatar.jpg"
                                    }
                                    className="img-avatar-ellipse"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* shearing buttons */}






                          {/*                          <div className="row toggle-for-share-profile">
                            <Link
                                to={{
                                  pathname: `/NavigateToShareProfile?id=${user._id}`
                                }}
                                className="toggle-share-profile-item toggle-item-profile "
                                target="blank"
                            >
                              <p className="toggle-share-profile-content toggle-item-profile-content">Profile</p>
                            </Link>
                            <Link
                                to= {{
                                  pathname:'/sharedResume',
                                  data: {user}
                                }}
                                className="toggle-share-profile-item"
                            >
                              <p className="toggle-share-profile-content ">Resume</p>
                            </Link>
                          </div>*/}
                          {/* mobile-screen name */}
                          <div className="mobile-screen-name ">
                          <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
                            <h4>English Language Teacher</h4>
                            <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>
                          </div>
                          {/* share btn */}
                          <div className="row mb-5 ml-5 mr-5 front-1 front-2 for-small-size-margin-change-all">
                            <div className="mobile-for-share-button">
                              <button
                                type="submit"
                                onClick={showShareProfile}
                                id="share-button"
                                className="btn btn-c primary-button-no-margin-hover gray-shadow-box "
                              ><i className="mdi mdi-share" id="mdi-share-home" >  </i></button>
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

                        {/* <div class="toast-notification toggle-view-notif">
                          <span id="notify-text">You are viewing profile as College</span>
                          <Link title="Ready Teacher" to="/" className="toggle-view-button">View as Teacher</Link>
                        </div> */}
                        <SharedNavbar offset={true} />
                        <div className="viewing-as-bar">
                          <span id="notify-text">You are viewing Profile as College</span>
                          <Link title="Ready Teacher" to="/" className="toggle-view-button">View as Teacher</Link>
                        </div>

                        <div className="profile-info-container-header">
                          {/* user name */}
                          <div className="profile-info ">
                            <div className="profile-name">


                              <div className="profile-page-card ">
                                <Tabs
                                  tabs={[
                                    {
                                      pathname: `/NavigateToPreviewProfile?id=${user._id}`,
                                      text: "Profile",
                                      active: true,
                                      newWindow: true
                                    },
                                    {
                                      pathname: "/PreviewResume",
                                      text: "Resume",
                                      data: { user }
                                    }
                                  ]}
                                />
                                {/* <div className='toggle-for-share-profile'>
                                  <Button.Group size='medium' className='triple-buttons-for-bookings-contents'>
                                    <Button className='choose-bookings-types' id="choose-bookings-types-all-profile">
                                      <Link
                                        to={{
                                          //pathname: `/NavigateToShareProfile?id=${user._id}`
                                          pathname: `/NavigateToPreviewProfile?id=${user._id}`
                                        }}
                                        target="blank"
                                      >
                                        <p className="toggle-profile-item-content">Profile</p>
                                      </Link>
                                    </Button>
                                    <Button className='choose-bookings-types' id='choose-bookings-types-past-resume'>
                                      <Link
                                        to={{
                                          pathname: '/PreviewResume',
                                          data: { user }
                                        }}
                                      >
                                        <p className="toggle-profile-item-content">Resume</p>
                                      </Link>
                                    </Button>
                                  </Button.Group>
                                </div> */}


                                <div className="small-screen-share-profile-tittle"></div>

                                <div className="row badges-profile-margin-row justify-content-center">
                                  {/* qualifications */}
                                  <div className="col-lg-6 col-md-12 ">
                                    <ProfileBox header="Qualifications"
                                      footer={
                                        user.qualifications && user.qualifications.length ?
                                          (<div className="row pr-0 mr-0 mb-4 justify-content-center">
                                            <div className="col-md-6 pr-0 ">
                                              <Link
                                                title="Resume"
                                                to={{
                                                  pathname: '/previewResume',
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
                                          </div>)
                                          : null
                                      }>
                                      {user.qualifications && user.qualifications.length ?
                                        user.qualifications.sort((a, b) => {
                                          var dateA = new Date("01/" + a.graduation_date),
                                            dateB = new Date("01/" + b.graduation_date);
                                          return dateB - dateA
                                        }).map(q => {
                                          return (
                                            <li key={q._id} className="p-0">
                                              {/*                                            <li className="list-item-decoration d-flex justify-content-between" >
                                              <p className="mt-0 mb-0 profile-qualification-title text-left">{q.graduation_date}</p>
                                              <p className="mt-0 mb-0 profile-qualification-title text-center">{q.degree}: {q.award_name}</p>
                                              <p className="mt-0 profile-qualification-place text-right">{q.institution_name}</p>
                                            </li>*/}
                                              <hr className="qualification-line-1"></hr>
                                              <div className="row profile-qualification-content-box">
                                                <div className="col-8">
                                                  {/* <p className="mt-0 mb-0 profile-qualification-title text-left">{q.graduation_date}</p> */}
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
                                          );
                                        })
                                        :
                                        null
                                      }

                                    </ProfileBox>
                                  </div>

                                  {/* can deliver */}
                                  <div className="col-lg-6 col-md-12" >
                                    <ProfileBox header="Can Deliver">
                                      {user.can_deliver && user.can_deliver.length > 0 ?
                                        (
                                          <li className="p-0">
                                            <div className="row profile-qualification-content-box">
                                              {store_ge == "" ? null :
                                                (
                                                  <div className="col-12">
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                        ELICOS General English
                                                                    </p>
                                                    </div>
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-place text-left">{store_ge.join(" | ")}</p>
                                                    </div>
                                                    {store_online === "" && store_manage === "" && store_other === "" && store_cam === "" ? null : <hr className="qualification-line-1"></hr>}
                                                  </div>

                                                )

                                              }

                                              {store_cam == "" ? null :
                                                (
                                                  <div className="col-12">
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                        ELICOS Exam/Uni Preparation
                                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-place text-left">{store_cam.join(" | ")}</p>
                                                    </div>
                                                    {store_online === "" && store_manage === "" && store_other === "" ? null : <hr className="qualification-line-1"></hr>}
                                                  </div>

                                                )

                                              }


                                              {store_other == "" ? null :
                                                (
                                                  <div className="col-12">
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                        Others
                                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-place text-left">{store_other.join(" | ")}</p>
                                                    </div>
                                                    {store_online === "" && store_manage === "" ? null : <hr className="qualification-line-1"></hr>}
                                                  </div>

                                                )

                                              }


                                              {store_manage == "" ? null :
                                                (
                                                  <div className="col-12">
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                        Management
                                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-place text-left">{store_manage.join(" | ")}</p>
                                                    </div>
                                                    {store_online === "" ? null : <hr className="qualification-line-1"></hr>}
                                                  </div>
                                                )

                                              }

                                              {store_online == "" ? null :
                                                (
                                                  <div className="col-12">
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-title text-left">
                                                        Online Classroom
                                                                      </p>
                                                    </div>
                                                    <div className="row">
                                                      <p className="mt-0 mb-2 profile-qualification-place text-left">{store_online.join(" | ")}</p>
                                                    </div>
                                                  </div>
                                                )

                                              }

                                            </div>
                                          </li>
                                        ) : null}

                                    </ProfileBox>
                                  </div>
                                </div>

                                {/* compliments */}
                                <div className="row compliments-profile-margin-row justify-content-center">
                                  <div className="col-lg-12 col-md-12">
                                    <ProfileBox header="Compliments">
                                      {/* compliments go here */}

                                      {user.feedback && user.feedback.length > 0 ?
                                        <HomeCarousel feedbacks={user.feedback}></HomeCarousel>
                                        :
                                        <div className="row p-padding">
                                          <div className="empty-folder-container"></div>
                                          <div className="m-auto">
                                            <p className="no-data-message">Unfortunately there is no data to display yet.</p>
                                          </div>
                                        </div>
                                      }

                                    </ProfileBox>
                                  </div>
                                </div>

                                {/* <div className="profile-can-deliv-container mt-0 mobile-size-for-can-deliver">
                                  <div className="availability-table-container candeliver-profile-container row mt-0">
                                    <div className="availability-table">
                                      <div className="availability-table-header d-flex justify-content-end">
                                        <div className="availability-table-header-card w-auto availability-header-behind"></div>
                                        <div className="availability-table-header-card w-auto text-center">
                                          <div className="similar-to-h4-style margin-can-deliver font-xlg text-front">
                                            I CAN DELIVER
                                        </div>
                                        </div>

                                      </div>
                                      <div className="candeliver-background-picture mb-5">
                                        <div className="profile-subject-delivered-row">
                                          <div className="row cover-margin-for-deliver">
                                            {user.can_deliver ? user.can_deliver.map(c => {
                                              return (
                                                <div key={c._id} value={c._id} className="col-3 candeliver-box">
                                                  <div className={`${c.bg_color} candeliver-badges profile-badge`} ><span>{c.whole_name}</span>{c.can_deliver}</div>
                                                </div>
                                              )
                                            }) : ""}


                                          </div>
                                        </div>


                                      </div>
                                    </div>

                                  </div>
                                </div> */}
                              </div>

                              {/* <div className="row text-center mb-5">
                              {user.role === "admin" ?  previous ? (
                                  <Link
                                    to={{
                                      pathname: `/NavigateToShareProfile?id=${previous}`
                                    }}
                                    className="col-1 arrow-in-share-profile"
                                    target="blank"
                                  >
                                    <Icon
                                      name="angle left"
                                      className="arrow-in-share-profile-left"
                                    />
                                  </Link>
                                ) : null : ""}
                                { user.role === "admin" ? previous ? (
                                    <div className="col-3">
                                      <div className="img-share-profile-bottom-box-left">
                                        <Link
                                            to={{
                                              pathname: `/NavigateToShareProfile?id=${
                                                  previous ? previous : null
                                                  }`
                                            }}
                                            className="col-1 arrow-in-share-profile"
                                            target="blank"
                                        >
                                          <img
                                              src={
                                                previos_avatar ||
                                                "../../assets/img/avatar.jpg"
                                              }
                                              className="img-share-profile-bottom-left"
                                              alt=""
                                          ></img>
                                        </Link>
                                      </div>
                                    </div>
                                ) :
                                    <div className="col-4">
                                      <div className="img-share-profile-bottom-box-left">
                                        <Link
                                            to={{
                                              pathname: `/NavigateToShareProfile?id=${
                                                  previous ? previous : null
                                                  }`
                                            }}
                                            className="col-1 arrow-in-share-profile"
                                            target="blank"
                                        >
                                          <img
                                              src={
                                                previos_avatar ||
                                                "../../assets/img/avatar.jpg"
                                              }
                                              className="img-share-profile-bottom-left"
                                              alt=""
                                          ></img>
                                        </Link>
                                      </div>
                                    </div>:" "} */}

                              {/* <div className="col-4 shared-profile-link "> */}
                              {/* <Link title="Resume"  to= {{
                                                pathname:'/sharedResume',
                                                data: {user}
                                              }
                                              }>
                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box"
                                    >
                                      <i className="mdi mdi-briefcase"> </i>See
                                      Resume
                                    </button>
                                  </Link> */}
                              {/* </div>
                                <div className="col-3 ">
                                  <div className="img-share-profile-bottom-box-right">
                                    <img
                                      src={
                                        next_avatar ||
                                        "../../assets/img/avatar.jpg"
                                      }
                                      className="img-share-profile-bottom-right"
                                      alt=""
                                    ></img>
                                  </div>
                                </div>
                                {user.role === "admin" ? next ? (
                                  <Link
                                    to={{
                                      pathname: `/NavigateToShareProfile?id=${next}`
                                    }}
                                    className="col-1 arrow-in-share-profile"
                                    target="blank"
                                  >
                                    <Icon
                                      name="angle right"
                                      className="arrow-in-share-profile-right"
                                    />
                                  </Link>
                                ) : null : ""}
                              </div> */}
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
      )}
    </div>

  );
};

export default PreviewProfile;
