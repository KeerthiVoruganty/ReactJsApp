import React, { useState, useEffect, useLayoutEffect, useImperativeHandle } from "react";
import axios from "axios";
import { PORT } from "../../config";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
require("./ValidateDocuments.css");

const ValidateDocuments = props => {
  const [allUsers, setAllUsers] = useState([]);

  const [isValidateBtn, setValidateBtn] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("teacher"))
  );
  const [wwcc_check_proof_url, setWWCC_check_proof] = useState(
    user.wwcc_check_proof_url
  );
  const [police_check_proof_url, setPolice_check_proof] = useState(
    user.police_check_proof_url
  );
  const [visa_check_proof_url, setVisa_check_proof] = useState(
    user.visa_url
  );
 
  let wwcc = "";
  let police_check = "";
  let visa = "";
  let qualifications=[]; 
  let transcripts=[];
  let uploadPoliceCheck,
    uploadVisa,
    uploadWWCC, uploadQualification = "";

  let [no_users, setNo_users] = useState("");
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    wwcc = document.querySelector(`#wwcc`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    police_check = document.querySelector(`#police_check`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    visa = document.querySelector(`#visa`); 
  });
  console.log("wwcc status");
  console.log(user.wwcc_verification_status);
  
  // const setVerifyBtn = () =>{
  //   debugger;
  //   let isWwcc_check_proof_url = (wwcc_check_proof_url !== (null || undefined));
  //   let  isPolice_check_proof_url = (police_check_proof_url !== (null || undefined));
  //   let isVisa_check_proof_url = (visa_check_proof_url !== (null || undefined));
  //   if( isWwcc_check_proof_url && isPolice_check_proof_url && isVisa_check_proof_url && (wwcc ? wwcc.checked : false) && (police_check ? police_check.checked : false) && (visa ? visa.cheked: false)){
  //     setValidateBtn(true);
  //   }else{
  //     alert("haha");
  //   }
  // }

  const handleValidation = (userId, user) => {
    debugger;
    const id = userId;
    let newUser = Object.assign({}, user);
    let isWwcc_check_proof_url =
      user.wwcc_check_proof_url !== (null || undefined);
    let isPolice_check_proof_url =
      user.police_check_proof_url !== (null || undefined);
    let isVisa_check_proof_url =
      user.visa_url !== (null || undefined);
    
    if (wwcc && wwcc.checked) {
      if (isWwcc_check_proof_url) {
        newUser.wwcc_verification_status = wwcc.checked;
        newUser.wwcc_check_validated_date = new Date();
        saveDocumentVerification(userId, newUser);
      } else {
        notify.show("Please provide wwcc verification proof", "warning");
      }
    }

    if (police_check && police_check.checked) {
      if (isPolice_check_proof_url) {
        newUser.police_check_verification_status = police_check.checked;
        newUser.police_check_validated_date = new Date();
        saveDocumentVerification(userId, newUser);
      } else {
        notify.show("Please provide police verification proof", "warning");
      }
    }

    if (visa && visa.checked) {
      if (isVisa_check_proof_url) {
        newUser.visa_verification_status = true;
        newUser.visa_check_validated_date = new Date();
        saveDocumentVerification(userId, newUser);
      } else {
        notify.show("Please provide visa verification proof", "warning");
      }
    }  
  };

  const handleValidation_Qualification = (userId,index) => {
    let qualifications_id=[];
    const list= user.qualifications;
    const qualification_id= list.map(item =>item._id);
    for(var i=0;i<qualification_id.length;i++){
       qualifications_id[i]=qualification_id[i];
      qualifications=document.querySelector(`#${userId}`);
      transcripts=document.querySelector(`#${userId+index}`);
    } 

    //debugger;
  
    let newUser = Object.assign({}, user);
      let isQualification_check_proof = 
      user._id !==(null||undefined); 
      if(qualifications && qualifications.checked) {
           if(isQualification_check_proof){
             if(qualifications_id[index]==userId){
              newUser.qualifications[index]['qualification_status']=true;
              newUser.qualification_check_validated_date= new Date();
              saveDocumentVerification(userId, newUser);
             }
           } else{
             notify.show("Please verify your qualification","warning");
           }
      }   
      
      let isTranscript_check_proof =
      user._id!==(null||undefined);
      if(transcripts && transcripts.checked){
        if(isTranscript_check_proof){
          if(qualifications_id[index]==userId){
            newUser.qualifications[index]['transcript_status']=true;
            newUser.transcript_check_validated_date = new Date();
            saveDocumentVerification(userId, newUser);
          }
        } else{
          notify.show("Please verify your transcript","warning"); 
        }
      }
      
  }
  const saveDocumentVerification = (userId, newUser) => {
    const newAllUsers = allUsers.map(u => {
      if (u._id === userId) {
        u = newUser;
      }
      return u;
    });
    setAllUsers(newAllUsers);
    setUser(newUser);
    axios
      .put(`${PORT}/updateUser`, {
        user: newUser
      })
      .then(res => {
        notify.show("Email sent to user");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadDocument = id => {
    document.getElementById(id).click();
  };

  const handleVisaFileChange = () => {
    debugger;
    let visaFile = uploadVisa.files[0];
  //  saveFile(visaFile, "visa");
  };

  const handleWWCCFileChange = () => {
    let wwccFile = uploadWWCC.files[0];
    saveFile(wwccFile, "wwcc");
  };

  const handlePoliceCheckFileChange = () => {
    let policecheckFile = uploadPoliceCheck.files[0];
    saveFile(policecheckFile, "police");
  };

  const handleQualificationFileChange = (index) => {
    debugger;
    let qualificationcheckFile = uploadQualification.files[0];
    let abc = "qualification"+index;
    console.log(abc.includes("qualification"));
    // saveFile(qualificationcheckFile, "qualification"+index);
  };

  // Updates local storage object when any control updates its state
  const updateLocalStorage = (field, value) => {
    let userData = JSON.parse(window.localStorage.getItem("teacher"));
    userData[`${field}`] = value;
    window.localStorage.setItem("teacher", JSON.stringify(userData));
  };

  const saveFile = (file, filename) => {
    let fileParts = file.name.split(".");
    let fileType = fileParts[1];
    let fileName = filename;
    axios
      .post(`${PORT}/s3`, {
        fileName: `document-verification-files/verified-${fileName}`,
        fileType: fileType,
        _id: user._id
      })
      .then(response => {
        let newUser = Object.assign({}, user);
        let setState = "";
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
     
        let stateFileName = filename + "_check_proof_filename";
        let stateFileUrl = filename + "_check_proof_url";
        newUser[stateFileName] = file.name;
        newUser[stateFileUrl] = url;
        setUser(newUser);
        // this.setState({ [stateFileName]: file.name });
        // this.setState({ [stateFileUrl]: url });
        updateLocalStorage(stateFileName, file.name);
        updateLocalStorage(stateFileUrl, url);
        console.log("Signed request", signedRequest);
        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios
          .put(signedRequest, file, options)
          .then(response2 => {
            // alert("Good " + JSON.stringify(response2));
          })
          .catch(error => {
            // alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch(error => {
        notify.show(JSON.stringify(error), "error");
      });
  };

  const setWatermarkedImage = imgURL => {
    window.localStorage.setItem("imgURL", imgURL);
  };

  return (
    <div>
      <FixProfileNavbar />
      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5">
                <h1 className="mb-4">{user.first_name}'s Details</h1>

                {/* navigationbar on top */}
                <div className="userNavigation d-flex justify-content-between">
                  <Link
                    to={{
                      pathname: "/AllTeachers"
                    }}
                    className="user-links text-center d-flex  btn-primary primary-button-no-margin-hover text-white"
                  >
                    <p>BACK</p>
                  </Link>
                  <div className="behind-user-links">
                    <Link
                      to={{
                        pathname: "/TeacherpersonalDetails"
                      }}
                      className="user-links  d-flex user-links-background-transparent "
                    >
                      <p>1 - Personal</p>
                    </Link>
                  </div>
                  <div className="behind-user-links">
                    <Link
                      to={{
                        pathname: "/TeacherBanking"
                      }}
                      className="user-links  text-center d-flex  "
                    >
                      <p>2 - Banking</p>
                    </Link>
                  </div>
                  <div className="behind-user-links">
                    <Link
                      to={{
                        pathname: "/validatedocuments"
                      }}
                      className="user-links user-links-active  text-center d-flex "
                    >
                      <p>3 - Documents</p>
                    </Link>
                  </div>
                  <div className="behind-user-links">
                    <Link
                      to={{
                        pathname: "/TeacherCalendar"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>4 - Calendar</p>
                    </Link>
                  </div>
                  <div className="behind-user-links">
                    <Link
                      to={{
                        pathname: "/TeacherBillings"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>5 - Billings</p>
                    </Link>
                  </div>
                </div>

                {/* cpntent of the form */}
                <div className="availability-table-container">
                  <div className="availability-table">
                    {/* container of the form */}
                    <div className="availability-table-body  mb-0 mt-5">
                      <div className="availability-table-body-content h-100">
                        <table className="av-tab-root">
                          <thead className="availability-table-head">
                            <tr className="availability-table-head-row">
                              <th className="availability-table-head-cell">
                                WWCC
                              </th>
                              <th className="availability-table-head-cell">
                                Police Check
                              </th>
                              <th className="availability-table-head-cell">
                                Visa
                              </th>
                              {user.police_check_verification_status &&
                              user.visa_verification_status &&
                              user.wwcc_verification_status ? (
                                ""
                              ) : (
                                <th className="availability-table-head-cell">
                                  Validate
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="availability-table-body-bodytable">
                            <tr className="availability-table-body-row">
                              <td className="availability-table-cell">
                                {user.wwcc_url != null ? (
                                  user.wwcc_verification_status ? (
                                    <div>
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(user.wwcc_url);
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        WWCC File
                                      </Link>
                                      <br />
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(
                                            user.wwcc_check_proof_url
                                          );
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        WWCC Verification File
                                      </Link>
                                      <br />
                                      <small>Verified</small>
                                    </div>
                                  ) : (
                                    <table>
                                      <tr>
                                        <td>
                                          <div>
                                            <div id="r8-balloon-radio-group-wrapper-teacherdetails">
                                              <ul>
                                                <li>
                                                  <input
                                                    className="radio r8-radio-float"
                                                    type="checkbox"
                                                    id={"wwcc"}

                                                    //   onChange={setVerifyBtn}
                                                  ></input>
                                                </li>
                                              </ul>
                                            </div>
                                            <Link
                                              onClick={() => {
                                                setWatermarkedImage(
                                                  user.wwcc_url
                                                );
                                              }}
                                              to={{
                                                pathname: "/ImgWaterMarks"
                                              }}
                                              className="profile-linkfont"
                                              target="_blank"
                                            >
                                              WWCC File
                                            </Link>
                                            <div></div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {" "}
                                          {user.wwcc_check_proof_url ? (
                                            <a
                                              href={user.wwcc_check_proof_url}
                                              className="profile-linkfont"
                                              rel="noopener noreferrer"
                                              target="_blank"
                                            >
                                              WWCC verification file
                                            </a>
                                          ) : (
                                            <div className="form-group">
                                              <label className="w-100">
                                                <p className="float-left mb-0">
                                                  Upload WWCC verification proof
                                                </p>
                                              </label>
                                              <div className="input-icon d-flex justify-content-between ">
                                                <i className="mdi mdi-upload"></i>
                                                <input
                                                  type="txt"
                                                  className="form-control"
                                                  placeholder={
                                                    user.wwcc_check_proof_filename
                                                      ? user.wwcc_check_proof_filename
                                                      : "No file chosen"
                                                  }
                                                  disabled
                                                />
                                                <input
                                                  type="file"
                                                  id="wwcc_check_proof"
                                                  name="wwcc_check_proof"
                                                  onChange={() =>
                                                    handleWWCCFileChange()
                                                  }
                                                  ref={ref => {
                                                    uploadWWCC = ref;
                                                  }}
                                                  style={{ display: "none" }}
                                                  accept="image/*, .pdf"
                                                />
                                                <button
                                                  id="btnUpload_wwcc_proof"
                                                  type="button"
                                                  required
                                                  className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                                  onClick={() =>
                                                    uploadDocument(
                                                      "wwcc_check_proof"
                                                    )
                                                  }
                                                >
                                                  Upload
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="availability-table-cell">
                                {user.police_check_url != null ? (
                                  user.police_check_verification_status ? (
                                    <div>
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(
                                            user.police_check_url
                                          );
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        Police Check File
                                      </Link>
                                      <br />
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(
                                            user.police_check_proof_url
                                          );
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        Police Check verification File
                                      </Link>
                                      <br />
                                      <small>Verified</small>
                                    </div>
                                  ) : (
                                    <table>
                                      <tr>
                                        <td>
                                          <div>
                                            <div id="r8-balloon-radio-group-wrapper-teacherdetails">
                                              <ul>
                                                <li>
                                                  <input
                                                    className="radio r8-radio-float"
                                                    type="checkbox"
                                                    id={"police_check"}

                                                    //     onChange={setVerifyBtn}
                                                  ></input>
                                                </li>
                                              </ul>
                                            </div>
                                            <Link
                                              onClick={() => {
                                                setWatermarkedImage(
                                                  user.police_check_url
                                                );
                                              }}
                                              to={{
                                                pathname: "/ImgWaterMarks"
                                              }}
                                              className="profile-linkfont"
                                              target="_blank"
                                            >
                                              Police Check File
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {" "}
                                          {user.police_check_proof_url ? (
                                            <a
                                              href={user.police_check_proof_url}
                                              className="profile-linkfont"
                                              rel="noopener noreferrer"
                                              target="_blank"
                                            >
                                              Police check verification file
                                            </a>
                                          ) : (
                                            <div className="form-group">
                                              <label className="w-100">
                                                <p className="float-left mb-0">
                                                  Upload police check
                                                  verification proof
                                                </p>
                                              </label>
                                              <div className="input-icon d-flex justify-content-between ">
                                                <i className="mdi mdi-upload"></i>
                                                <input
                                                  type="txt"
                                                  className="form-control"
                                                  placeholder={
                                                    user.police_check_proof_filename
                                                      ? user.police_check_proof_filename
                                                      : "No file chosen"
                                                  }
                                                  disabled
                                                />
                                                <input
                                                  type="file"
                                                  id="police_check_proof"
                                                  name="police_check_proof"
                                                  onChange={() =>
                                                    handlePoliceCheckFileChange()
                                                  }
                                                  ref={ref => {
                                                    uploadPoliceCheck = ref;
                                                  }}
                                                  style={{ display: "none" }}
                                                  accept="image/*, .pdf"
                                                />
                                                <button
                                                  id="btnUpload_police_proof"
                                                  type="button"
                                                  required
                                                  className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                                  onClick={() =>
                                                    uploadDocument(
                                                      "police_check_proof"
                                                    )
                                                  }
                                                >
                                                  Upload
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="availability-table-cell">
                                {user.visa_url != null ? (
                                  user.visa_verification_status ? (
                                    <div>
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(user.visa_url);
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        Visa File
                                      </Link>
                                      <br />
                                      <Link
                                        onClick={() => {
                                          setWatermarkedImage(
                                            user.visa_check_proof_url
                                          );
                                        }}
                                        to={{
                                          pathname: "/ImgWaterMarks"
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank"
                                      >
                                        Visa Verification File
                                      </Link>
                                      <br />
                                      <small>Verified</small>
                                    </div>
                                  ) : (
                                    <table>
                                      <tr>
                                        <td>
                                          {" "}
                                          <div>
                                            <div id="r8-balloon-radio-group-wrapper-teacherdetails">
                                              <ul>
                                                <li>
                                                  <input
                                                    className="radio r8-radio-float"
                                                    type="checkbox"
                                                    id={"visa"}
                                                    //     onChange={setVerifyBtn}
                                                  ></input>
                                                </li>
                                              </ul>
                                            </div>
                                            <Link
                                              onClick={() => {
                                                setWatermarkedImage(
                                                  user.visa_url
                                                );
                                              }}
                                              to={{
                                                pathname: "/ImgWaterMarks"
                                              }}
                                              className="profile-linkfont"
                                              target="_blank"
                                            >
                                              Visa File
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {" "}
                                          {user.visa_check_proof_url ? (
                                            <a
                                              href={user.visa_check_proof_url}
                                              rel="noopener noreferrer"
                                              className="profile-linkfont"
                                              target="_blank"
                                            >
                                              Visa verifiction file
                                            </a>
                                          ) : (
                                            <div className="form-group">
                                              <label className="w-100">
                                                <p className="float-left mb-0">
                                                  Upload visa verification proof
                                                </p>
                                              </label>
                                              <div className="input-icon d-flex justify-content-between ">
                                                <i className="mdi mdi-upload"></i>
                                                <input
                                                  type="txt"
                                                  className="form-control"
                                                  placeholder={
                                                    user.visa_check_proof_filename
                                                      ? user.visa_check_proof_filename
                                                      : "No file chosen"
                                                  }
                                                  disabled
                                                />
                                                <input
                                                  type="file"
                                                  id="visa_check_proof"
                                                  name="visa_check_proof"
                                                  onChange={() =>
                                                    handleVisaFileChange()
                                                  }
                                                  ref={ref => {
                                                    uploadVisa = ref;
                                                  }}
                                                  style={{ display: "none" }}
                                                  accept="image/*, .pdf"
                                                />
                                                <button
                                                  id="btnUpload_visa_proof"
                                                  type="button"
                                                  required
                                                  className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                                  onClick={() =>
                                                    uploadDocument(
                                                      "visa_check_proof"
                                                    )
                                                  }
                                                >
                                                  Upload
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </table>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="availability-table-cell">
                                {user.police_check_verification_status &&
                                user.visa_verification_status &&
                                user.wwcc_verification_status ? (
                                  ""
                                ) : (
                                  <button
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                    onClick={() => {
                                      handleValidation(user._id, user);
                                    }}
                                    id={"validateButton"}
                                    value={user._id}
                                  >
                                    Validate
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <br />
                        <table className="av-tab-root">
                          <thead className="availability-table-head">
                            <tr className="availability-table-head-row">
                              <th className="availability-table-head-cell">
                                Qualification
                              </th>
                              <th className="availability-table-head-cell">
                                Institution Name
                              </th>
                              <th className="availability-table-head-cell">
                                Transcripts
                              </th>
                              <th className="availability-table-head-cell">
                                Verification File
                              </th>
                              <th className="availability-table-head-cell">
                                Validate
                              </th>
                            </tr>
                          </thead>

                          <tbody className="availability-table-body-bodytable">
                            {user.qualifications.map((user,index) => (
                              <tr
                                key={index}
                                className="availability-table-body-row"
                              >
                                {/* <td className="availability-table-cell">
                                  {user.degree} {user.major}
                                </td> */}
                                <td className="availability-table-cell">
                                  {user._id != null ? (
                                    user.qualification_status? (
                                      <div>
                                        {/* <a href={user.qualification_url} target="blank">Qualification File</a><br/> */}
                                        <Link to={{ pathname: `/PdfViewer?id=${user.qualification_url}` }} target="_blank">
                                        
                                        {/* <Link
                                          onClick={() => {
                                            setWatermarkedImage(
                                              user.qualification_url
                                            );
                                          }}
                                          to={{
                                            pathname: "/ImgWaterMarks"
                                          }}
                                          className="profile-linkfont"
                                          target="_blank"
                                        >*/}
                                          {user.degree} 
                                        </Link> 
                                         {user.major}
                                        <small>Verified</small>
                                      </div>
                                    ) : (
                                      <div>
                                        <div id="r8-balloon-radio-group-wrapper-teacherdetails">
                                          <ul>
                                            <li>
                                              <input
                                                type="checkbox"
                                                className="radio r8-radio-float"
                                                id={user._id}
                                              ></input>
                                            </li>
                                          </ul>
                                        </div>
                                        {/* <a href={user.qualification_url} target="blank">Qualification File</a> */}
                                        {/* <Link
                                          onClick={() => {
                                            setWatermarkedImage(
                                              user.qualification_url
                                            );
                                          }}
                                          to={{
                                            pathname: "/ImgWaterMarks"
                                          }}
                                          className="profile-linkfont"
                                          target="_blank"
                                        > */}
                                        <Link to={{ pathname: `/PdfViewer?id=${user.qualification_url}` }} target="_blank">

                                          {user.degree} 
                                        </Link>  {user.major}
                                      </div>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td className="availability-table-cell">
                                  {user.institution_name}
                                </td>
                                <td className="availability-table-cell">
                                {console.log(user.transcript_status)}
                                {console.log(user.qualification_status)}
                                  {user.transcript_url != null ? (
                                    user.transcript_status ? (
                                    
                                      <div>
                                        {/* <a href={user.qualification_url} target="blank">Qualification File</a><br/> */}
                                        {/* <Link
                                          onClick={() => {
                                            setWatermarkedImage(
                                              user.transcript_url
                                            );
                                          }}
                                          to={{
                                            pathname: "/ImgWaterMarks"
                                          }}
                                          target="_blank"
                                        > */}
                                        <Link to={{ pathname: `/PdfViewer?id=${user.transcript_url}` }} target="_blank">

                                          {user.degree} 
                                        </Link> 
                                        <small>Verified</small>
                                      </div>
                                    ) :  
                                  <div>
                                    
                                    <div id="r8-balloon-radio-group-wrapper-teacherdetails">
                                      <ul>
                                        <li>
                                          <input
                                            type="checkbox"
                                            className="radio r8-radio-float"
                                            id={user._id+index}
                                          ></input>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <Link
                                          onClick={() => {
                                            setWatermarkedImage(
                                              user.transcript_url
                                            );
                                          }}
                                          to={{
                                            pathname: "/ImgWaterMarks"
                                          }}
                                          target="_blank"
                                        > */}
                                        <Link to={{ pathname: `/PdfViewer?id=${user.transcript_url}` }} target="_blank">

                                          {user.degree} 
                                        </Link> 
                                    </div>
                                  ):("" 
                                  )}
                                </td>
                                <td className="availability-table-cell">
                                  <div className="input-icon d-flex justify-content-between ">
                                    <i className="mdi mdi-upload"></i>
                                    <input
                                      type="txt"
                                      className="form-control"
                                      placeholder={
                                        user.wwcc_check_proof_filename
                                          ? user.wwcc_check_proof_filename
                                          : "No file chosen"
                                      }
                                      disabled
                                    />
                                    <input
                                      type="file"
                                      id={"qualification_check_proof"+index}
                                      name="qualification_check_proof"
                                      onChange={() => handleQualificationFileChange(index)}
                                      ref={ref => {
                                   //    `{index}uploadQualification`
                                      uploadQualification = ref;
                                      }}
                                      style={{ display: "none" }}
                                      accept="image/*, .pdf"
                                    />
                                    <button
                                      id="btnUpload_qualification_proof"
                                      type="button"
                                      required
                                      className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                      onClick={() =>
                                        uploadDocument("qualification_check_proof"+index)
                                      }
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </td>
                                <td className="availability-table-cell">
                                  <button
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                    onClick={() => {
                                      handleValidation_Qualification(user._id,index);
                                    }} /*</td>onClick={()=>{handleValidation(user._id, index, user)}} id={'validateButton'+index} value={index}*/
                                    id={"validate" + index}>
                                    Validate
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="availability-table-body-content">
                        <h1> {no_users} </h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/* navigationbar on bottom */}
                <div className="adminBottomNavigation ">
                  <Link
                    to={{
                      pathname: "/AllTeachers"
                    }}
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                  >
                    <p>BACK - All Teachers</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};                
export default ValidateDocuments;
