import { Link } from "react-router-dom";
import React, { useState, useEffect, Component } from 'react';
import HomeContainer from '../Container/HomeContainer';
import TeacherResume from "./TeacherResume";
import axios from 'axios';
import { useArray, useForceUpdate } from '../../Hook';
import { PORT } from '../../config';


export default function Resume2(props) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.user));

    const tabs = [
        {
            pathname: "/home2",
            text: "Profile", 
        },
        {
            pathname: "/resume2",
            text: "Resume",
            active: true
        }
    ]

    const pageFooter = (
        <div className='row prof-otherinfo-row'>
          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller">
            <div className="profile-otherinfo-box">
              {user.police_check_url ? <Link to={{ pathname: `/PdfViewer?id=${user.police_check_url}` }} target="_blank">
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
                </div>

                {user.police_check_expiry ?
                  <div className="profile-otherinfo-box-body-cont">
                    <div className="profile-otherinfo-box-body">
                      Expiry Date: {user.police_check_expiry}
                    </div>
                  </div>
                  :
                  ""}
              </Link> :
                <div>
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
                  </div>

                  {user.police_check_expiry ?
                    <div className="profile-otherinfo-box-body-cont">
                      <div className="profile-otherinfo-box-body">
                        Expiry Date: {user.police_check_expiry}
                      </div>
                    </div>
                    :
                    ""}
                </div>
              }

            </div>
          </div>

          <div className="col-2 profile-otherinfo-box-container profile-otherinfo-box-container-smaller" >
            <div className="profile-otherinfo-box" >
              {user.wwcc_url ?
                <Link to={{ pathname: `/PdfViewer?id=${user.wwcc_url}` }} target="_blank">
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
                  </div>
                </Link> : <div>
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
                  </div></div>
              }

            </div>
          </div>
          </div>
    )

    if (user) {
        return (
            <HomeContainer isViewAsTeacher={true} tabs={tabs} footer={pageFooter} user={user} isShowWhereby = {false} >
                <TeacherResume isShowBoxFooter = {true} editRemoveButton = {true} />
            </HomeContainer>
        )
    } else return <div>Loading</div>;
}

