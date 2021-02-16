import React, { useState, useEffect, Component } from 'react';
import './Home.css';
import './HomeCarouselScript.js';
import ProfileStatus from '../../Components/StatusAlerts/ProfileStatus';
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar';
import axios from 'axios';
import { PORT } from '../../config';
import CanDeliverForm from './CanDeliverForm';
import DeletePopup from './DeletePopup';
import { useArray, useForceUpdate } from '../../Hook';
import {Link} from "react-router-dom"
import { HomeCarousel } from './HomeCarousel.js'
import { notify } from 'react-notify-toast';


const Home = props => {
  const [user, setUser] = useState();
  const [isloading, setIsLoading] = useState(true);
  const forceUpdate = useForceUpdate();
  // =================  Begin Adding and delete can_deliver =================
  const [can_deliver, handleArr, add_class, remove_class] = useArray([]);
  const [isClassPopup, toggleClassPopup] = useState(false)
  const [isDeletePopup, toggleDeletePopup] = useState(false)
  const [canDeliverId, setDeliverId] = useState("")
  // =================  End Adding and delete can_deliver =================
  const showHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
        'block';
  };
  const hideHireMe = () => {
    document.getElementById('modal-container-HireMe').style.display =
        'none';
  };

  const showShareProfile = () => {
    document.getElementById('modal-container-ShareProfile').style.display =
        'block';
  };
  const hideShareProfile = () => {
    document.getElementById('modal-container-ShareProfile').style.display =
        'none';
  };
  const toggleClass = () => {
    toggleClassPopup(true)
  }

  const toggleDelete = (e) => {
    setDeliverId(e.target.parentNode.getAttribute('value'))
    toggleDeletePopup(true)
  }

  // =================  Begin Saving Profile Pic =================
  const handleProfilePic = () => {
    document.querySelector('#imgupload').click();
  }
  const handleSaveFile = (e) => {
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
  }
  // =================  End Saving Profile Pic =================

  useEffect(() => {
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
            console.log(user);
            window.localStorage.setItem('user', JSON.stringify(user))
            setUser(user);
            setIsLoading(false);
            handleArr(user.can_deliver)
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
  if(isDeletePopup){
    // ======= Update user  =======
    newUser = Object.assign({}, user);
    const can_deliver_arr = newUser.can_deliver.filter(c => c._id !== canDeliverId)
    newUser.can_deliver = can_deliver_arr
  }

  return (
      <div>
        {!isloading && (
            <div>
              {/* menu bar */}
              {console.log("rerender")}
              {isClassPopup && <CanDeliverForm user={user} setUser={setUser} addClass={add_class} showPopup={toggleClassPopup}/>}
              {isDeletePopup && <DeletePopup showPopup={toggleDeletePopup} newUser={newUser} setUser={setUser} />}
              <FixProfileNavbar />


              <div className='auth-right d-lg-flex bg-photoregister '>
                <div className='bg-gradient'></div>

                <div className='resume-container-transparent  profile-container-transparent'>


                  <div className="profile-name-and-location ">
                    <h1>{user.first_name} {user.last_name}</h1>
                    <h3>English Language Teacher</h3>
                    <h4><i className="mdi mdi-map-marker"> Melbourne</i> </h4>
                  </div>

                  <div className='profile-content-card-area w-100 resume-overflow'>
                    <div className='profile-area profile-margin-top-negative'>

                      <div className=" w-fill w-100 ">

                        <div className="row">

                          <div className="w-100">
                            <div className="teacher-picture-container">
                              {/* user picture */}
                              <div className='profile-img front-1' onClick={handleProfilePic}>
                                <input type="file" id="imgupload" style={{display:"none"}} onChange={handleSaveFile}/>
                                <div className='project__card'>
                                  <div className=''>
                                    <div className='img-avatar-ellipse-c'>
                                      <img
                                          src={user.img_url || '../../assets/img/avatar.jpeg'}
                                          className='img-thumbnail img-avatar-ellipse '
                                          alt=''
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* shearing buttons */}
                              <div className="row mb-5 ml-0 front-1 front-2 ">
                                {/* <div className="col-3 pr-2">
                                  <div className="div-pop-name-btn div-pop-name d-contents div-pop-name-btn-view-resume" >
                                    <a href="#" className="btn-block btn-c">
                                      <i className="mdi mdi-file-find"><p className=""> RESUME</p></i><span>View my Resume</span>
                                    </a>
                                  </div>
                                </div> */}
                                <div className=" ">
                                  <button
                                    type="submit"
                                    onClick={showShareProfile}
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover pl-5 pr-5 gray-shadow-box" 
                                  ><i className="mdi mdi-share">  </i>Share</button>

                                  {/* <div className="div-pop-name-btn div-pop-name d-contents div-pop-name-btn-sheare-resume" onClick={showShareProfile} >
                                    <a href="#" className=" btn-block btn-c">
                                      <i className="mdi mdi-share"><p className="">SHARE RESUME</p></i><span>Share My Resume</span>
                                    </a>

                                  </div> */}
                                </div>
                                <div className=" pl-2 pr-3">
                                 
                                  <button
                                    type="submit"
                                    onClick={showHireMe}
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover pl-5 pr-5 gray-shadow-box" 
                                  ><i className="mdi mdi-account-tie">  </i>Hire Me!</button>


                                  {/* <div className="div-pop-name-btn div-pop-name d-contents div-pop-name-btn-hire-me" onClick={showHireMe} >
                                    <a href="#" className="btn-block btn-c">
                                      <i className="mdi mdi-account-tie"><p>HIRE ME</p></i><span>I am great! Hire me!</span>
                                    </a>
                                  </div> */}
                                </div>
                              </div>

                            </div>

                            <div className='profile-info-container-header'>
                              {/* user name */}
                              <div className='profile-info '>
                                <div className='profile-name'>
                                  <div className="profile-page-card ">
                                    <div className="row badges-profile-margin-row justify-content-center">

                                      {/* qualifications */}
                                      <div className="availability-table-container d-flex justify-content-center maxwidth-700">
                                        <div className="availability-table profile-qualification-container gray-shadow-box">
                                          
                                          <h4 className="font-xlg mt-5 text-left ml-5 pl-4 text-gradient">QUALIFICATIONS</h4>
                                          <div className="profile-qualification-body">
                                            <hr className="qualification-line"></hr>
                                            <div className="availability-table-body row pt-0 padding-left-80 pb-0">
                                              <ul className="profile-list-qualifications">
                                                <li>
                                                  <p className="mt-0 profile-qualification-title">Master of Applied Linguistics, University of Melbourne</p>
                                                  {/* <p className="mt-0 profile-qualification-study"></p> */}
                                                </li>
                                                <li>
                                                  <p className="mt-0 profile-qualification-title">Master of Applied Linguistics, University of Melbourne</p>
                                                  {/* <p className="mt-0 profile-qualification-study"></p> */}
                                                </li>
                                                <li>
                                                  <p className="mt-0 profile-qualification-title">Master of Applied Linguistics, University of Melbourne</p>
                                                  {/* <p className="mt-0 profile-qualification-study"></p> */}
                                                </li>
                                                <li>
                                                  <p className="mt-2 profile-qualification-title">Grad. Cert. in Learning & Teaching (Higher Education), Swinburne University of Technology</p>
                                                  {/* <p className="mt-0 profile-qualification-study"></p>  */}
                                                </li>
                                                <li>
                                                  <p className="mt-2 profile-qualification-title">Cambridge CELTA (Pass B), La Trobe University</p>
                                                  {/* <p className="mt-0 profile-qualification-study"></p>  */}
                                                </li>
                                              </ul>
                                            </div>
                                            {/* submit button */}
                                            <div className="row pr-0 mr-0 mb-4 justify-content-center">
                                              <div className="col-md-6 pr-0 ">
                                                <Link  title="Resume" to='/resume'>
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box" 
                                                ><i className="mdi mdi-briefcase">  </i>Check my Resume</button>
                                                </Link>
                                              </div>
                                            </div>

                                          </div>
                                        </div>
                                      </div>

                                      {/* compliments */}
                                      <div className="availability-table-container justify-content-center d-flex maxwidth-700">
                                        <div className="availability-table gray-shadow-box">
                                          <div className="compliments-header-bckg"></div>
                                          <h4 className="font-xlg mt-5 text-right mr-5 pr-4 compliments-card-title text-front">COMPLIMENTS</h4>
                                          <hr className="qualification-line"></hr>
                                          <div className="availability-table-body justify-content-center row pt-0">
                                            <HomeCarousel></HomeCarousel>
                                          </div>
                                        </div>
                                      </div>
                                    </div>


                                    <div className="profile-can-deliv-container mt-0">
                                      <div className="availability-table-container candeliver-profile-container row mt-0">
                                        <div className="availability-table">
                                          <div className="availability-table-header d-flex justify-content-end">
                                            <div className="availability-table-header-card w-auto text-left">
                                              <h4 className="av-table-header-first-line">
                                                CAN DELIVER
                                              </h4>
                                              <h4 className="av-table-header-second-line">
                                                I would love to teach:
                                              </h4>
                                            </div>
                                          </div>
                                          <div className="availability-table-body candeliver-background-picture">

                                            <div className="profile-subject-delivered-row row mt-4 mb-4">
                                              <div className="col-3 candeliver-box">
                                                <div className='candeliver-badges candeliver-badges-add_new profile-badge' onClick={toggleClass}>+ ADD MORE</div>
                                              </div>
                                              {user.can_deliver.map(c => {
                                                return(
                                                  <div key={c._id} value={c._id} className="col-3 candeliver-box">
                                                    <div className={`${c.bg_color} candeliver-badges profile-badge`} onClick={toggleDelete}><span>{c.whole_name}</span>{c.can_deliver}</div>
                                                  </div>
                                              )})}
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


                        <div className='row prof-otherinfo-row'>

                          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller">
                            <div className="profile-otherinfo-box">
                              <div className="profile-otherinfo-box-header">
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-1">
                                  <div className="mdi mdi-restore-clock"> </div>
                                </div>
                                <p>Hours Delivered</p>
                                <h3>250 HOURS</h3>
                              </div>
                              <div className="profile-otherinfo-box-body-cont">
                                <div className="profile-otherinfo-box-body">
                                  This is the total of hours delivered
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-bigger ">
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
                          </div>

                          <div className="col-2 profile-otherinfo-box-container">
                            <div className="profile-otherinfo-box">
                              <div className="profile-otherinfo-box-header">
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-3">
                                  <div className="mdi mdi-passport"> </div>
                                </div>
                                <p>Visa Status</p>
                                <h3>VISA HOLDER: Student</h3>
                              </div>
                              <div className="profile-otherinfo-box-body-cont">
                                <div className="profile-otherinfo-box-body">
                                  This teacher is on a visa
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller">
                            <div className="profile-otherinfo-box">
                              <div className="profile-otherinfo-box-header d-flex justify-content-between">
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-4 ml-3">
                                  <div className="mdi mdi-fingerprint"> </div>
                                </div>
                                <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-verified  float-right">
                                  <div className="mdi mdi-check"> </div>
                                </div>
                              </div>
                              <div className="profile-otherinfo-box-header d-flex justify-content-between mt-3">
                                <p className="text-left">Police Check:</p>
                                {/* <h3>NOT VERIFIED!!</h3> */}
                                <h3>VERIFIED!!</h3>
                              </div>
                              <div className="profile-otherinfo-box-body-cont">
                                <div className="profile-otherinfo-box-body">
                                  Expiry Date: 20/04/2021
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller" >
                            <div className="profile-otherinfo-box" >
                              <Link to={{pathname: "/Personaldetails"}} target="_blank">
                                <div className="profile-otherinfo-box-header d-flex justify-content-between">
                                  <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-cont-col-5 ml-3">
                                    <div className="mdi mdi-face"> </div>
                                  </div>
                                  <div className="profile-otherinfo-box-header-picture-cont profile-otherinfo-box-header-picture-notverified">
                                    <div className="mdi mdi-check mdi-spin"> </div>
                                  </div>
                                </div>
                                <div className="profile-otherinfo-box-header d-flex justify-content-between mt-3">
                                  <p className="text-left">WWCR:</p>
                                  <h3>NOT VERIFIED YET!!</h3>
                                  {/* <h3>VERIFIED!!</h3> */}
                                </div>
                                <div className="profile-otherinfo-box-body-cont">
                                  <div className="profile-otherinfo-box-body">
                                    Please, upload your documents
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div id='modal-container-HireMe' className='status-modal'>
                        <div id='HireMe-box'>
                          <div onClick={hideHireMe} className='dot'></div>
                          <div className='status-alert-message overflow-unset hireme-padding'>
                            <h1 className='status-alert blue-text mb-3 modal-title'>HIRE ME!</h1>
                            <div className="row mb-4 main-content">
                              <div className="col-4">
                                <div className='rounded-polygon alert-profile-picture' >
                                  <img
                                      src='../../assets/img/avatar.jpg'
                                      className='img-thumbnail img-avatar-ellipse'
                                      alt=''
                                  />
                                </div>
                              </div>
                              <div className="col-8">
                                <h4>If you like my profile, have a look at my resume or hire me by clicking the button below</h4>
                                <p>
                                  Lorem Ipsum is simply dummy text of the printing and
                                  typesetting industry. Lorem Ipsum has been the industry's
                                  standard dummy text ever since the 1500s, when an unknown
                                  printer took a galley of type and scrambled it to make a
                                  type specimen book. It has survived not only five
                                  centuries, but also the leap into electronic typesetting,
                                  remaining essentially unchanged. It was popularised in the
                                  1960s with the release of Letraset sheets containing Lorem
                                  Ipsum passages,{' '}
                                </p>
                              </div>

                            </div>
                            <div >
                              <div className="row qualification-footer">
                                <div className="col-md-5">
                                  <button onClick={(event) => {  hideHireMe();}} className="btn btn-block btn-c secondary-button-no-margin-hover">
                                    Cancel
                                  </button>
                                </div>
                                <div className="col-md-7">
                                  <button onClick={(event) => {  hideHireMe();}} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
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
        )}
      </div>
  );
};

export default Home;
