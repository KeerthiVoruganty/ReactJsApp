import React, { useState, useEffect, Component } from 'react';
import './Home.css';
import './HomeCarouselScript.js';
import ProfileStatus from '../../Components/StatusAlerts/ProfileStatus';
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar';
import axios from 'axios';
import { PORT } from '../../config';
import CanDeliverForm from './CanDeliverForm';
import UploadAvatars from './UploadAvatars'
import DeletePopup from './DeletePopup';
import { useArray, useForceUpdate } from '../../Hook';
import { Link } from "react-router-dom"
import HomeCarousel from './HomeCarousel'
import { notify } from 'react-notify-toast';
import DatePicker from "../User/DateRange";
import PopUp from '../../Components/PopUpForm/ShareProfile-PopUp';
import HireMePopUp from '../../Components/PopUpForm/HireMe-PopUp';
import $ from "jquery"
import MobileNavBar from "../../Components/Navbar/MobileNavBar";
import "../../Components/Navbar/mobileNavBar.scss"
import { Button, Icon } from "semantic-ui-react";
import SharedNavbar from '../../Components/Navbar/SharedNavbar'
import ProfileBox from "../../Components/ProfileBox/ProfileBox"
import Tabs from "../../Components/Tabs/Tabs";

const Home = props => {
  const [user, setUser] = useState();
  const [isloading, setIsLoading] = useState(true);
  const forceUpdate = useForceUpdate();
  // =================  Begin Adding and delete can_deliver =================
  const [can_deliver, handleArr, add_class, remove_class] = useArray([]);
  const [isClassPopup, toggleClassPopup] = useState(false);
  const [isUploadPopup, toggleUploadPopup] = useState(false);
  const [isDeletePopup, toggleDeletePopup] = useState(false)
  const [canDeliverId, setDeliverId] = useState("")
  const [isPopup, togglePopup] = useState(false)
  const [formType, setFormType] = useState("")
  const [isHireMePopup, toggleHireMePopup] = useState(false)
  const [qualification_height, setQualificationHeight] = useState();
  const [test, setTEST] = useState()
  const [test_1, setTESTR] = useState()
  const [store_ge, setGE, add_ge, remove_ge] = useState([]);
  const [store_cam, setCam] = useState([]);
  const [store_other, setOther] = useState([]);
  const [store_manage, setManage] = useState([]);
  const [store_online, setOnline] = useState([]);
  // =================  End Adding and delete can_deliver =================
  const showHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
      'block';
  };
  const hideHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
      'none';
  };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const showShareProfile = () => {
    setFormType('shareProfile')
    togglePopup(true)
  };

  const toggleClass = () => {
    toggleClassPopup(true)
  }

  const toggleDelete = (e) => {
    setDeliverId(e.target.parentNode.getAttribute('value'))
    toggleDeletePopup(true)
  }

  const toggleUpload = (e) => {
    toggleUploadPopup(true)
  }

  const toggleHireMe = (e) => {
    toggleHireMePopup(true)
  }

  // =================  Begin Saving Profile Pic =================
  const handleProfilePic = () => {
    document.querySelector('#imgupload').click();
  }
  /*  const handleSaveFile = (e) => {
      const file = e.target.files[0]
      if(file){
        const [fileName, fileType] = e.target.files[0].name.split(".")
        axios
            .post(`${PORT}/s3`, {
              fileName: `profilePic${fileName}`,
              fileType: fileType,
              _id: user._id
            })
            .then(response => {
              const returnData = response.data.data.returnData;
              const signedRequest = returnData.signedRequest;
              const url = returnData.url;
              // Put the fileType in the headers for the upload
              const options = {
                headers: {
                  "Content-Type": fileType
                }
              };
              axios
                  .put(signedRequest, file, options)
                  .then(response2 => {
                    // save the img_url into user and change the ui
                    const newUser = Object.assign({}, user);
                    newUser.img_url = url
                    setUser(newUser);
                    window.localStorage.setItem('user', JSON.stringify(newUser))
                    //Todo: save the class_type into database
                    axios.put(`${PORT}/updateUser`,{
                      user: newUser
                    })
                        .then( res => {
                          console.log("before")
                          forceUpdate()
                          console.log("after")
                          notify.show("Profile picture added successfully");
                        })
                        .catch( err => {
                          console.log(err)
                        })
                  })
                  .catch(error => {
                    alert("ERROR " + JSON.stringify(error));
                  });
            })
            .catch(error => {
              alert(JSON.stringify(error));
            });

      }else{
        // show uploading error
        console.log("upload error")
      }
    }*/
  // =================  End Saving Profile Pic =================


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
              || c.can_deliver === "Study Tours" 
              || c.can_deliver === "Lecturer- English Language"
              || c.can_deliver === "Teacher Training") {
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
              || c.can_deliver === "Microsoft Teams"
              || c.can_deliver === "Google Meet"
             ) {
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

  // ====  prepare the value to remove class ====
  let newUser;
  if (isDeletePopup) {
    // ======= Update user  =======
    newUser = Object.assign({}, user);
    const can_deliver_arr = newUser.can_deliver.filter(c => c._id !== canDeliverId)
    newUser.can_deliver = can_deliver_arr
  }
  // $(document).ready(function () {
  /*    if(document.getElementById('profile-qualification-height') !== null){
        if(document.getElementById('badges') !== null){
          setTEST(document.getElementById('profile-qualification-height').offsetHeight);
          setTESTR(document.getElementById('badges').offsetHeight);
          if(test>test_1){
            document.getElementById('badges').style.height = test + "px";
          }
          else if(test <= test_1){
            document.getElementById('profile-qualification-height').style.height = test_1 + "px";
          }

        }
      }*/

  // });

  // console.log(user, 'user ');

  // const feedbacks = user.feedback

  // user.feedback=[{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"Reliable","teacher_id":"5d899b3178a2581455eac395"},{"class_id":"5e38bf161c9d44000075e5ee","badge_title":"Adaptable","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"On the Ball","teacher_id":"5d899b3178a2581455eac395"},{"badge_title":"Fun Teacher","teacher_id":"5d899b3178a2581455eac395"},{"class_id":"5e38bf161c9d44000075e5ee","badge_title":"Energetic","teacher_id":"5d899b3178a2581455eac395"}]

  return (
    <div>
      {isPopup && <PopUp user={user} showPopup={togglePopup} formType={formType} />}
      {isHireMePopup && <HireMePopUp user={user} showPopup={toggleHireMePopup} />}
      {!isloading &&
        <div>
          {/* {console.log(user.prefered_work_location.length, "location")} */}
          {/* menu bar */}
          {isClassPopup && <CanDeliverForm user={user} setUser={setUser} addClass={add_class} showPopup={toggleClassPopup} />}
          {isDeletePopup && <DeletePopup showPopup={toggleDeletePopup} newUser={newUser} setUser={setUser} />}
          {isUploadPopup && <UploadAvatars showPopup={toggleUploadPopup} newUser={newUser} setUser={setUser} user={user} />}
          <FixProfileNavbar offset={true} />
          <div className="viewing-as-bar">
            <span id="notify-text">You are viewing Profile as Teacher</span>
            <Link title="Ready Teacher" to={`/NavigateToPreviewProfile?id=${user._id}`} className="toggle-view-button">View as College</Link>
          </div>


          <div className='auth-right d-lg-flex bg-photoregister offset-container'>
            <div className='bg-gradient'></div>

            <div className='resume-container-transparent  profile-container-transparent'>

              <div>

              </div>
              <div className="profile-name-and-location ">
                {/* <h1>{user.first_name} {user.last_name}</h1> */}
                <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
                <h3>English Language Teacher</h3>
                <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>

                {user.whereby_link ?
                  <a href={user.whereby_link} alt="Whereby Link">
                    <div className="whereby-link"></div>
                  </a>
                  : null}
              </div>

              <div className='profile-content-card-area w-100 resume-overflow'>
                <div className='profile-area profile-margin-top-negative'>

                  <div className=" w-fill w-100 ">

                    <div className="row">

                      <div className="w-100">
                        <div className="teacher-picture-container">
                          {/* user picture */}
                          <div className='profile-img front-1' onClick={toggleUpload}>
                            {/*
                                  toggleUpload
                                  handleProfilePic*/}

                            {/*                                <input type="file" id="imgupload" style={{display:"none"}} onChange={handleSaveFile} accept="image/*"/>*/}
                            <div className='project__card'>
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
                            <span className='mdi mdi-camera camera-icon-position-style'></span>
                          </div>

                          {/* tabs */}







                          {/* mobile-screen name */}
                          <div className="mobile-screen-name ">
                          <h1>{user.preferred_name && user.preferred_name.trim() !== user.first_name.trim() ? 
                  user.first_name[0].toUpperCase() + user.first_name.slice(1) + " (" + user.preferred_name[0].toUpperCase() + user.preferred_name.slice(1) + ") " 
                  : user.first_name[0].toUpperCase() + user.first_name.slice(1)} {user.last_name[0].toUpperCase()}</h1>
                            <h4><i className="mdi mdi-map-marker"> {user.prefered_work_location && user.prefered_work_location.length > 0 ? user.prefered_work_location.map(location => location).join(', ') : "Melbourne"}</i> </h4>
                          </div>
                          {/* sharing buttons */}
                          <div className="row mb-5 ml-5 mr-5 front-1 front-2 for-small-size-margin-change-all">
                            <div className=" ">
                              <button
                                type="submit"
                                onClick={showShareProfile}
                                id="share-button"
                                className="btn btn-c primary-button-no-margin-hover gray-shadow-box"
                              >
                              <i className="mdi mdi-share" id="mdi-share-home" >  </i>
                              </button>
                            </div>
                            {/* {user.role} */}
                            {user.role === "college" ?
                              <div className="for-small-size-margin-change-hireme">
                                <button
                                  type="submit"
                                  onClick={toggleHireMe}
                                  className="btn btn-primary btn-block btn-c primary-button-no-margin-hover pl-5 pr-5 gray-shadow-box"
                                ><i className="mdi mdi-account-tie">  </i>Hire Me</button>
                              </div> : null}
                          </div>

                        </div>

                        <div className='profile-info-container-header'>
                          {/* user name */}
                          <div className='profile-info '>
                            <div className='profile-name'>
                              <div className="profile-page-card ">
                                <Tabs
                                  tabs={[
                                    {
                                      pathname: "/",
                                      text: "Profile",
                                      active: true
                                    },
                                    {
                                      pathname: "/resume",
                                      text: "Resume"
                                    }
                                  ]}
                                />
                                {/* <div className="small-screen-page-title">PROFILE</div> */}
                                <div className="row badges-profile-margin-row justify-content-center">

                                  {/* qualifications */}
                                  <div className="col-lg-6 col-md-12">
                                    <ProfileBox header="Qualifications"
                                      footer={
                                        <div className="profile_can_deliver_bottom">
                                          <hr className="qualification-line-2"></hr>
                                          <div className="resume-container-update-content a">
                                            <Link title="Resume" to='/resume'>
                                              <Icon name="pencil" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                              {"  "}Update Resume
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

                                  {/* compliments */}
                                  {/*                                <div className="col-lg-6 col-md-12" >
                                  <div className="availability-table top-floor-row-table" id="badges">
                                    <h4 className="font-xlg mt-5 text-right mr-5 pr-4 text-front text-gradient">COMPLIMENTS</h4>
                                    <hr className="qualification-line"></hr>
                                    <div className="availability-table-body justify-content-center row m-2 little-screen-compliments-container">
                                    { user.feedback && user.feedback.length > 0 ?
                                     <HomeCarousel feedbacks={user.feedback}></HomeCarousel>
                                     :
                                     <div className="row p-padding">
                                    <div className="empty-folder-container"></div>
                                    <div className="m-auto">
                                      <p className="no-data-message">Unfortunately there is no data to display yet.</p>
                                    </div>
                                  </div>
                                  }
                                    </div>
                                  </div>
                                </div> */}

                                  <div className="col-lg-6 col-md-12">
                                    <ProfileBox header="Can Deliver"
                                      footer={
                                        <div className="profile_can_deliver_bottom">
                                          <hr className="qualification-line-2"></hr>
                                          <div className="resume-container-update-content a">
                                            <Link onClick={toggleClass}>
                                              <Icon name="add" circular inverted color="#3bb4d8" className="qualification-container-update-icon">  </Icon>
                                              {"  "}Add More
                                              </Link>
                                          </div>
                                        </div>
                                      }>
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
                                                        Other
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
                                        )
                                        : null}



                                    </ProfileBox>
                                  </div>
                                </div>
                                <div className="row compliments-profile-margin-row justify-content-center">
                                  <div className="col-lg-12 col-md-12" >
                                    <ProfileBox header="Compliments" className="compliment-profile-box">
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

                              </div>

                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                    {/* for the college */}
                    <div className="row text-center mb-5">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id='modal-container-HireMe' className='status-modal'>
            <div id='HireMe-box'>
              <div onClick={hideHireMe} className='dot'></div>
              <div className='status-alert-message overflow-unset hireme-padding'>
                <h1 className='status-alert blue-text mb-3 modal-title'>HIRE ME</h1>
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

          <div className="mobile-size-menu">
            <SharedNavbar offset={true} />
            <MobileNavBar offset={true} />
          </div>
        </div>
      }
    </div>
  )
}

export default Home;
