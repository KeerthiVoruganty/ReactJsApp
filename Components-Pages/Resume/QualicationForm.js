import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { PORT } from "../../config";
import { useToggle } from "../../Hook";
import { getClass } from "../../Helper";
import axios from "axios";
import { notify } from "react-notify-toast";
import uuid from "uuid/v4";
import { Link } from "react-router-dom";
import "./Resume.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { addDays } from "date-fns";
import "./Resume.css";


function ModalForm(props) {
  const [user, setUser] = useState();
  const [isCreate, toggleCreate] = useToggle(props.isCreate);
  const [startDate, setStartDate] = useState(props.content.start_date ?
    Date.parse(`${props.content.start_date.substring(0, 2)}/01/${props.content.start_date.substring(3, 7)}`) : new Date());
  const [graduationDate, setGraduationDate] = useState((props.content.end_date && props.content.end_date !== "Present") ?
    Date.parse(`${props.content.end_date.substring(0, 2)}/01/${props.content.end_date.substring(3, 7)}`) : new Date());
  const [gradDatePickerVisible, toggleGradDatePicker] = useToggle(props.content.end_date !== "Present");
  const [gradQDatePickerVisible, toggleQGradDatePicker] = useToggle(props.content.graduation_date !== "Present");
  const [pd_startDate, setpd_StartDate] = useState(new Date());
  const [pd_endDate, setpd_EndDate] = useState(props.content.end_date ?
    Date.parse(`${props.content.end_date.substring(0, 2)}/01/${props.content.end_date.substring(3, 7)}`) : new Date());
  const [course_class_delivered, setcourse_class_delivered] = useState(props.content.course_class_delivered || []);
  const [can_deliver, setcan_deliver] = useState();
  const [qualification_fileName, setQualification_fileName] = useState(null);
  const qualification = isCreate
    ? null
    : props.user.qualifications.filter(q => q._id === props.qualificationID);
  const professional_development = isCreate
    ? null
    : props.user.professional_developments.filter(
      q => q._id === props.qualificationID
    );
  let [link, setLink] = useState(
    props.content ? props.content.qualification_url : ""
  );
  let [fName, setFName] = useState(
    props.content ? props.content.certificate_filename : ""
  );
  let [transcript_link, settranscript_Link] = useState(
    props.content ? props.content.transcript_url : ""
  );
  let [transcript_fName, settranscript_FName] = useState(
    props.content ? props.content.transcript_filename : ""
  );
  let [enrolment_link, setenrolment_Link] = useState(
    props.content ? props.content.enrolment_url : ""
  );
  let [enrolment_fName, setenrolment_FName] = useState(
    props.content ? props.content.enrolment_filename : ""
  );
  let [referee, setreferee] = useState(false);
  let [referrer_organisations, setReferrer_organisations] = useState(
    getRef_Organisations()
  );

  const class_type = getClass();
  const DOCUMENT_DELETE_MSG = "Deleted the document successfully";
  const class_types = class_type.map((c, index) => {
    return { value: `${c.name}`, label: `${c.name}` };
  });

  function getRef_Organisations() {
    let user = Object.assign({}, props.user);
    let organisation = [];
    if (user.professional_experience && user.professional_experience.length > 0)
      user.professional_experience.forEach(pe => {
        organisation.push(pe.organisation);
      });
    if (user.non_teaching_experience && user.non_teaching_experience.length > 0)
      user.non_teaching_experience.forEach(nte => {
        organisation.push(nte.organisation);
      });
    return organisation;
  }

  //  function deleteFile(isDelete, fileName, popupStatus) {
  //     var field = fileName + "_filename";
  //     var popUpState = "delete" + fileName + "Popup";
  //     var buttonID = "btnUpload_" + fileName;
  //     if (isDelete) {
  //       notify.show("File deleted successfully");
  //       this.setState({ [field]: null });
  //       this.setState({ link_style: "none" });
  //       document.getElementById(buttonID).disabled = false;
  //     } else {
  //     }
  //     this.setState({ [popUpState]: popupStatus });
  //   }

  const deleteCertificate = (e) => {
    setFName(null);
  };

  const deleteTranscript = (e) => {
    settranscript_FName(null);
  }

  const deleteEnrolment = (e) => {
    setenrolment_FName(null);
  }
  const handleClose = () => {
    props.showPopup(false);
  };
  const prepareValue = id => {
    const institution_name = document.querySelector("#institution").value;
    //  const description = document.querySelector("#description").value;
    const degree = document.querySelector("#degree").value;
    const major = document.querySelector("#major").value;
    const award_name = document.querySelector("#award_name").value;
    const start_date = document.querySelector("#start_date").value;
    //const graduation_date = document.querySelector("#graduation_date").value;
    const qualification_url = link;
    const transcript_url = transcript_link;
    const enrolment_url=enrolment_link;
    const certificate_filename = fName;
    const transcript_filename = transcript_fName;
    const enrolment_filename=enrolment_fName;
    const institution_website =
      document.querySelector("#institution-website").value;
    const verification_status = false;
    const graduation_date = document.querySelector("#current_date").checked
    ? "Present"
    : document.querySelector("#graduation_date").value;
    const institution_location = document.querySelector("#institution-location")
      .value;
    const newQualification = {
      institution_name: institution_name,
      degree: degree,
      major: major,
      qualification_url: qualification_url,
      qualification_status: false,
      transcript_url: transcript_url,
      enrolment_url:enrolment_url,
      transcript_status: false,
      certificate_filename: certificate_filename,
      transcript_filename: transcript_filename,
      enrolment_filename:enrolment_filename,
      institution_website: institution_website,
      institution_location: institution_location,
      award_name: award_name,
      start_date: start_date,
      graduation_date: graduation_date,
      verification_status: verification_status,
      _id: id
      // description: description
    };
    return newQualification;
  };

  const preparePDValue = id => {
    const activity = document.querySelector("#activity").value;
    const location = document.querySelector("#location").value;
    const end_date = document.querySelector("#pd_endDate").value;
    const focus_event = document.querySelector("#focus_event").value;
    const institution_location = document.querySelector("#institution-location")
      .value;
    const newQualification = {
      activity: activity,
      location: location,
      institution_location: institution_location,
      end_date: end_date,
      focus_event: focus_event,
      _id: id
    };
    return newQualification;
  };

  const prepareExValue = id => {
    const organisation = document.querySelector("#organisation").value;
    const institution_location = document.querySelector("#institution-location")
      .value;
    const start_date = document.querySelector("#start_date").value;
    const end_date = document.querySelector("#current_date").checked
      ? "Present"
      : document.querySelector("#end_date").value;
    const newExperience = {
      organisation: organisation,
      course_class_delivered: course_class_delivered,
      institution_location: institution_location,
      start_date: start_date,
      end_date: end_date,
      _id: id
    };
    return newExperience;
  };

  const prepareRefereeValue = id => {
    const referee_first_name =
      document.querySelector("#referee_first_name") !== null
        ? document.querySelector("#referee_first_name").value
        : "";
    const referee_last_name =
      document.querySelector("#referee_last_name") !== null
        ? document.querySelector("#referee_last_name").value
        : "";
    const referee_email =
      document.querySelector("#referee_email") !== null
        ? document.querySelector("#referee_email").value
        : "";
    const referee_position_title =
      document.querySelector("#referee_position_title") !== null
        ? document.querySelector("#referee_position_title").value
        : "";

    const organisation =
      document.querySelector("#referrer_organisation") !== null
        ? document.querySelector("#referrer_organisation").value
        : "";
    const newReferee = {
      organisation: organisation,
      referee_first_name: referee_first_name,
      referee_last_name: referee_last_name,
      referee_email: referee_email,
      referee_position_title: referee_position_title,
      _id: id,
      flag: false,
    };
    return newReferee;
  };

  const prepareNonTeachingExValue = id => {
    const organisation = document.querySelector("#organisation").value;
    const institution_location = document.querySelector("#institution-location")
      .value;
    const role_held = document.querySelector("#role_held").value;
    const main_duties = document.querySelector("#main_duties").value;
    const start_date = document.querySelector("#start_date").value;
    const end_date = document.querySelector("#current_date").checked
      ? "Present"
      : document.querySelector("#end_date").value;
    const newNonTeachingExperience = {
      organisation: organisation,
      institution_location: institution_location,
      role_held: role_held,
      main_duties: main_duties,
      start_date: start_date,
      end_date: end_date,
      _id: id
    };
    return newNonTeachingExperience;
  };
  const handleSave = event => {
    event.preventDefault();
    const id = uuid();
    // ======= Prepare values =======
    const newQualification = prepareValue(id);
    console.log(checkFiles(newQualification));
    if (checkFiles(newQualification)) {
      // ======= Close popup =======
      props.showPopup(false);
      // ======= Update user  =======
      const newUser = Object.assign({}, props.user);
      if (props.content != "") {
        newUser.qualifications.map((c, index) => {
          if (c._id == props.content._id) {
            c.institution_name = newQualification.institution_name;
            c.degree = newQualification.degree;
            c.major = newQualification.major;
            c.qualification_url = newQualification.qualification_url;
            c.transcript_url = newQualification.transcript_url;
            c.enrolment_url=newQualification.enrolment_url;
            c.certificate_filename = newQualification.certificate_filename;
            c.transcript_filename = newQualification.transcript_filename;
            c.enrolment_filename=newQualification.enrolment_filename;
            c.institution_website = newQualification.institution_website;
            c.institution_location = newQualification.institution_location;
            c.award_name = newQualification.award_name;
            c.start_date = newQualification.start_date;
            c.graduation_date = newQualification.graduation_date;
          }
        });
      } else {
        newUser.qualifications = [
          ...props.user.qualifications,
          newQualification
        ];
      }
      updateUser(newUser);
    }
  };

  const checkFiles = newQualification => {
    let isvalid = true;
    if(!(document.querySelector("#current_date").checked)){
    if (newQualification.certificate_filename === "") {
      notify.show("Please upload your certificate");
      isvalid = false;
      }else if(newQualification.transcript_filename === ""){
        notify.show("Please upload your transcript");
        isvalid = false;
      } else {
        isvalid = true;
     }
    }
    else if(newQualification.enrolment_filename === ""){
      notify.show("Please upload your statement of Enrolment")
      isvalid = false;
    }
    return isvalid;
  };
  const handleEdit = () => {
    const newQualification = prepareValue(props.qualificationID);
    // ======= Close popup =======
    props.showPopup(false);
    // ======= Update user  =======
    const newUser = Object.assign({}, props.user);
    const index = newUser.qualifications.findIndex(
      q => q._id === props.qualificationID
    );
    newUser.qualifications[index] = newQualification;
    props.addQualification(newUser);
    // ======= Update localStorage =======
    window.localStorage.setItem("user", JSON.stringify(newUser));

    //Todo: save the qualification into database
    axios
      .put(`${PORT}/updateUser`, {
        user: newUser
      })
      .then(res => {
        console.log("successful");
      })
      .catch(err => {
        console.log(err);
      });
  };

  /*  const handleSavePD = () => {
      console.log("savepd")
      const id = uuid();
      // ======= Prepare values =======
      const newprofessional_development = preparePDValue(id);

      // ======= Close popup =======
      props.showPopup(false);
      // ======= Update user  =======
      const newUser = Object.assign({}, props.user);
      newUser.professional_developments = [
        ...props.user.professional_developments,
        newprofessional_development
      ];
      updateUser(newUser);
    };*/

  const handleSavePD = () => {
    const id = uuid();
    // ======= Prepare values =======
    const newprofessional_development = preparePDValue(id);

    // ======= Close popup =======
    props.showPopup(false);
    // ======= Update user  =======
    const newUser = Object.assign({}, props.user);
    if (props.content != "") {
      console.log("xxx");
      newUser.professional_developments.map((c, index) => {
        if (c._id == props.content._id) {
          console.log(c);
          c.activity = newprofessional_development.activity;
          c.location = newprofessional_development.location;
          c.focus_event = newprofessional_development.focus_event
          c.institution_location =
            newprofessional_development.institution_location;
          c.end_date = newprofessional_development.end_date;
        }
      });
    } else {
      newUser.professional_developments = [
        ...props.user.professional_developments,
        newprofessional_development
      ];
    }
    updateUser(newUser);
  };

  const handleSavePE = e => {
    e.preventDefault();
    const id = uuid();
    // ======= Prepare values =======
    const newExperience = prepareExValue(id);
    console.log(newExperience);
    if (newExperience.course_class_delivered.length > 0) {
      // ======= Close popup =======
      props.showPopup(false);
      // ======= Update user  =======
      const newUser = Object.assign({}, props.user);

      if (props.content != "") {
        newUser.professional_experience.map((c, index) => {
          if (c._id == props.content._id) {
            c.organisation = newExperience.organisation;
            c.institution_location = newExperience.institution_location;
            c.course_class_delivered = newExperience.course_class_delivered;
            c.start_date = newExperience.start_date;
            c.end_date = newExperience.end_date;
            c.other_referee_first_name = newExperience.referee_first_name;
            c.other_referee_last_name = newExperience.referee_last_name;
            c.other_referee_email = newExperience.referee_email;
            c.other_referee_position_title =
              newExperience.referee_position_title;
          }
        });
      } else {
        newUser.professional_experience = [
          ...props.user.professional_experience,
          newExperience
        ];
      }

      newUser.can_deliver = can_deliver;
      updateUser(newUser);
    } else {
      notify.show("Please select courses/classes delivered", "warning");
    }
  };

  const handleRefereeDetails = () => {
    const id = uuid();
    const newReferee = prepareRefereeValue(id);
    const capitalize = (str) => {
      return str ? str[0].toUpperCase() + str.slice(1) : "";
    };
    props.showPopup(false);
    // ======= Update user  =======
    const newUser = Object.assign({}, props.user);

    let ref_email = newReferee.referee_email;
    let ref_fname = capitalize(newReferee.referee_first_name);
    let ref_lname = capitalize(newReferee.referee_last_name);
    let user_fname = capitalize(newUser.first_name);
    let user_lname = capitalize(newUser.last_name);
    let user_id = newUser._id;
    let ref_id = props.content ? props.content._id : newReferee._id;

    if (props.content !== "") {
      newUser.referees.map((c, index) => {
        if (c._id === props.content._id) {
          c.organisation = newReferee.organisation;
          c.referee_first_name = newReferee.referee_first_name;
          c.referee_last_name = newReferee.referee_last_name;
          c.referee_email = newReferee.referee_email;
          c.referee_position_title = newReferee.referee_position_title;
          c.flag = newReferee.flag;
        }
      })
    }
    else {
      newUser.referees = [
        ...props.user.referees,
        newReferee
      ];
    }
    updateUser(newUser);
    triggerReferenceCheck(ref_email, ref_fname, ref_lname, user_fname, user_lname,
      user_id, ref_id);
  };

  const handleSaveNonTeachingEx = () => {
    const id = uuid();
    // ======= Prepare values =======
    const newNonTeachingExperience = prepareNonTeachingExValue(id);

    // ======= Close popup =======
    props.showPopup(false);
    // ======= Update user  =======
    const newUser = Object.assign({}, props.user);
    if (props.content != "") {
      newUser.non_teaching_experience.map((c, index) => {
        if (c._id == props.content._id) {
          c.organisation = newNonTeachingExperience.organisation;
          c.institution_location =
            newNonTeachingExperience.institution_location;
          c.role_held = newNonTeachingExperience.role_held;
          c.main_duties = newNonTeachingExperience.main_duties;
          c.start_date = newNonTeachingExperience.start_date;
          c.end_date = newNonTeachingExperience.end_date;
          c.other_referee_first_name =
            newNonTeachingExperience.other_referee_first_name;
          c.other_referee_last_name =
            newNonTeachingExperience.other_referee_last_name;
          c.other_referee_email = newNonTeachingExperience.other_referee_email;
          c.other_referee_position_title =
            newNonTeachingExperience.other_referee_position_title;
        }
      });
    } else {
      newUser.non_teaching_experience = [
        ...props.user.non_teaching_experience,
        newNonTeachingExperience
      ];
    }
    updateUser(newUser);
  };

  const updateUser = user => {
    props.addQualification(user);
    // ======= Update localStorage =======
    window.localStorage.setItem("user", JSON.stringify(user));

    //Todo: save the qualification into database
    axios
      .put(`${PORT}/updateUser`, {
        user: user
      })
      .then(res => {
        console.log("successful");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const triggerReferenceCheck = (
    referee_email,
    referee_first_name,
    referee_last_name,
    teacher_first_name,
    teacher_last_name,
    teacher_id,
    referee_id
  ) => {
    const data = {
      to: referee_email,
      rfname: referee_first_name,
      rlname: referee_last_name,
      tfname: teacher_first_name,
      tlname: teacher_last_name,
      link: `https://master.d2ui2xxezlfztd.amplifyapp.com/NavigateToReferenceForm?tid=${teacher_id}&rid=${referee_id}`
    }
    axios
      .put(`${PORT}/sendReferenceCheck`, data)
      .then(res => {
        console.log("successful");
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleDDLChange = e => {
    if (e !== null) {
      e.length > 0
        ? setcourse_class_delivered(e)
        : setcourse_class_delivered([]);
      if (e.length > 0) {
        updateCanDeliver(e);
      }
    }
  };

  //When select a degree in qualification form, change happen
  const changeforselectdegree = e => {
    if (
      e.target.value == "Cambridge CELTA" ||
      e.target.value == "Cambridge DELTA" ||
      e.target.value == "Trinity TESOL"
    ) {
      document.getElementById("award_name").setAttribute("disabled", true);
      document.getElementById("award_name").setAttribute("placeholder", "");
      document.getElementById("award_name").value = "";
      document.getElementById("major").setAttribute("disabled", true);
      document.getElementById("major").setAttribute("placeholder", "");
      document.getElementById("major").value = "";
    } else {
      document.getElementById("award_name").removeAttribute("disabled");
      document.getElementById("major").removeAttribute("disabled");
      console.log(
        document.getElementById("award_name").getAttribute("disabled")
      );
    }
  };

  const updateCanDeliver = cds => {
    let canDelivers = [];
    const setCanDeliver = (cd, c) => {
      return {
        _id: uuid(),
        can_deliver: cd.value,
        bg_color: c.bg_color,
        whole_name: c.whole_name,
        short_name: c.short_name
      };
    };

    cds.forEach(cd => {
      class_type.forEach(c => {
        if (c.name === cd.value) {
          canDelivers.push(setCanDeliver(cd, c));
        }
      });
    });
    const newUser = Object.assign({}, props.user);

    const filterCandeliver = () => {
      if (newUser.can_deliver && newUser.can_deliver.length > 0) {
        canDelivers.forEach(function (cd) {
          newUser.can_deliver = newUser.can_deliver.filter(c => c.can_deliver !== cd.can_deliver);
          if (newUser.can_deliver.includes(cd.can_deliver)) {

          } else {
            newUser.can_deliver.push(cd);
          }
        });
      } else {
        newUser.can_deliver = [...canDelivers];
      }

    };
    filterCandeliver();
    setcan_deliver(newUser.can_deliver);
  };

  const uploadDocument = id => {
  document.getElementById(id).click();
  };


  const handleSaveFile = e => {
    const file = e.target.files[0];
    if (file) {
      const [fileName, fileType] = e.target.files[0].name.split(".");
      axios
        .post(`${PORT}/s3`, {
          fileName: `qualification${fileName}`,
          fileType: fileType,
          _id: props.user._id
        })
        .then(res => {
          const returnData = res.data.data.returnData;
          const signedRequest = returnData.signedRequest;
          const url = returnData.url;
          const options = {
            headers: {
              "Content-Type": fileType
            }
          };
          axios
            .put(signedRequest, file, options)
            .then(res2 => {
              const newUser = Object.assign({}, props.user);
              console.log(url);
              newUser.qualification_url = url;
              newUser.qualification_filename = fileName;
              const fileNameOnly = url.split(props.user._id + "/qualification");

              setQualification_fileName(fileName);
              setLink(url);
              setFName(fileNameOnly[1]);
              window.localStorage.setItem("user", JSON.stringify(newUser));

              axios
                .put(`${PORT}/updateUser`, {
                  user: newUser
                })
                .then(res3 => {
                  console.log("Uploaded Successfully");
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error1 => {
              console.log(error1);
            });
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    } else {
      console.log("Upload Error");
    }
  };
  const handleTranscriptSaveFile = e => {
    const file = e.target.files[0];
    if (file) {
      const [fileName, fileType] = e.target.files[0].name.split(".");
      axios
        .post(`${PORT}/s3`, {
          fileName: `qualification/transcript${fileName}`,
          fileType: fileType,
          _id: props.user._id
        })
        .then(res => {
          const returnData = res.data.data.returnData;
          const signedRequest = returnData.signedRequest;
          const url = returnData.url;
          const options = {
            headers: {
              "Content-Type": fileType
            }
          };
          axios
            .put(signedRequest, file, options)
            .then(res2 => {
              const newUser = Object.assign({}, props.user);
              console.log(url);
              // newUser.t = url
              // newUser.qualification_filename = fileName
              const fileNameOnly = url.split(
                props.user._id + "/qualification/transcript"
              );

              setQualification_fileName(fileName);
              settranscript_Link(url);
              settranscript_FName(fileNameOnly[1]);
              window.localStorage.setItem("user", JSON.stringify(newUser));

              axios
                .put(`${PORT}/updateUser`, {
                  user: newUser
                })
                .then(res3 => {
                  console.log("Uploaded Successfully");
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error1 => {
              console.log(error1);
            });
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    } else {
      console.log("Upload Error");
    }
  };

  const handleSaveEnrolmentFile = e => {
    const file = e.target.files[0];
    if (file) {
      const [fileName, fileType] = e.target.files[0].name.split(".");
      axios
        .post(`${PORT}/s3`, {
          fileName: `qualification/enrolment${fileName}`,
          fileType: fileType,
          _id: props.user._id
        })
        .then(res => {
          const returnData = res.data.data.returnData;
          const signedRequest = returnData.signedRequest;
          const url = returnData.url;
          const options = {
            headers: {
              "Content-Type": fileType
            }
          };
          axios
            .put(signedRequest, file, options)
            .then(res2 => {
              const newUser = Object.assign({}, props.user);
              console.log(url);
              // newUser.t = url
              // newUser.qualification_filename = fileName
              const fileNameOnly = url.split(
                props.user._id + "/qualification/enrolment"
              );

              setQualification_fileName(fileName);
              setenrolment_Link(url);
              setenrolment_FName(fileNameOnly[1]);
              window.localStorage.setItem("user", JSON.stringify(newUser));

              axios
                .put(`${PORT}/updateUser`, {
                  user: newUser
                })
                .then(res3 => {
                  console.log("Uploaded Successfully");
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error1 => {
              console.log(error1);
            });
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    } else {
      console.log("Upload Error");
    }
  };

  const qualificationForm = () => {
    return (
      <Modal show={true} className="model-for-qualificationForm">
        <Modal.Header>
          <Modal.Title>Add Qualification</Modal.Title>
          <div onClick={handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="model-main-content">
            <form onSubmit={handleSave}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="degree">Award Type</label>
                  {console.log(props.content)}
                  {props.content != "" ? (
                    <select
                      className="form-control"
                      name="degree"
                      id="degree"
                      required
                      defaultValue={props.content.degree}
                      onChange={changeforselectdegree}
                    >
                      <option value="PhD in">PhD</option>
                      <option value="Master of/in">Master’s Degree</option>
                      <option value="Bachelor of">Bachelor’s Degree</option>
                      <option value="Graduate Diploma of/in">
                        Graduate Diploma
                      </option>
                      <option value="Graduate Certificate in">
                        Graduate Certificate
                      </option>

                      <option value="Advanced Diploma of/in">
                        Advanced Diploma
                      </option>
                      <option value="Diploma of/in">Diploma</option>
                      <option value="Certificate IV in">Certificate IV</option>
                      <option value="Certificate III in">
                        Certificate III
                      </option>

                      <option value="Certificate II in">Certificate II</option>

                      <option value="Certificate I in">Certificate I</option>
                      <option value="Cambridge CELTA">Cambridge CELTA</option>
                      <option value="Cambridge DELTA"> Cambridge DELTA</option>
                      <option value="Trinity TESOL"> Trinity TESOL</option>
                    </select>
                  ) : (
                      <select
                        className="form-control"
                        name="degree"
                        id="degree"
                        required
                        onChange={changeforselectdegree}
                      >
                        <option value="PhD in">PhD</option>
                        <option value="Master of/in">Master’s Degree</option>
                        <option value="Bachelor of">Bachelor’s Degree</option>
                        <option value="Graduate Diploma of/in">
                          Graduate Diploma
                      </option>
                        <option value="Graduate Certificate in">
                          Graduate Certificate
                      </option>

                        <option value="Advanced Diploma of/in">
                          Advanced Diploma
                      </option>
                        <option value="Diploma of/in">Diploma</option>
                        <option value="Certificate IV in">Certificate IV</option>
                        <option value="Certificate III in">
                          Certificate III
                      </option>

                        <option value="Certificate II in">Certificate II</option>

                        <option value="Certificate I in">Certificate I</option>
                        <option value="Cambridge CELTA">Cambridge CELTA</option>
                        <option value="Cambridge DELTA"> Cambridge DELTA</option>
                        <option value="Trinity TESOL"> Trinity TESOL</option>
                      </select>
                    )}

                  <label htmlFor="award_name">Award Title</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="award_name"
                      id="award_name"
                      placeholder="e.g.: Applied Linguistics"
                      required
                      defaultValue={props.content.award_name}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="award_name"
                        id="award_name"
                        placeholder="e.g.: Applied Linguistics"
                        required
                        defaultValue={qualification ? qualification[0].major : ""}
                      />
                    )}

                  <label htmlFor="major">Major/s</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      placeholder="Separate majors with comma"
                      className="form-control"
                      name="major"
                      id="major"
                      defaultValue={props.content.major}
                    />
                  ) : (
                      <input
                        type="text"
                        placeholder="Separate majors with comma"
                        className="form-control"
                        name="major"
                        id="major"
                        defaultValue={
                          qualification ? qualification[0].details : ""
                        }
                      />
                    )}

                  <label htmlFor="institution">Institution Name</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution"
                      id="institution"
                      placeholder="e.g.: University of Sydney"
                      required
                      defaultValue={props.content.institution_name}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        id="institution"
                        placeholder="e.g.: University of Sydney"
                        required
                        defaultValue={
                          qualification ? qualification[0].institution_name : ""
                        }
                      />
                    )}

                  <label htmlFor="institution-website">
                    Institution Website
                  </label>
                  {/* <div className="row"> */}
                  {/* <div className="col-3 px-0 px-md-3">
                      <input
                        type="text"
                        className="form-control"
                        value="www."
                        disabled
                      />
                    </div> */}
                  {/* <div className="col-9 pr-0 pr-md-3"> */}
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution-website"
                      id="institution-website"
                      placeholder="Institution WebSite"
                      required
                      defaultValue={props.content.institution_website}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution-website"
                        id="institution-website"
                        placeholder="Institution WebSite"
                        required
                      />
                    )}
                  {/* </div>
                  </div> */}

                  <label htmlFor="institution-location">
                    Institution City/Town
                  </label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution-location"
                      id="institution-location"
                      pattern="^[A-Za-z]+$"
                      title="Please enter a valid City/Town"
                      placeholder="e.g.: Sydney"
                      required
                      defaultValue={props.content.institution_location}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution-location"
                        id="institution-location"
                        pattern="^[A-Za-z]+$"
                        title="Please enter a valid City/Town"
                        placeholder="e.g.: Sydney"
                        required
                      />
                    )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="start_date">Start Date</label>
                  {props.content != "" ? (
                    <DatePicker
                      className="react-datepicker-wrapper form-control"
                      id="start_date"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={graduationDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      value={startDate}
                      placeholderText={new Date()}
                      isClearable
                    ></DatePicker>
                  ) : (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        id="start_date"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={startDate}
                        placeholderText={new Date()}
                        isClearable
                      ></DatePicker>
                    )}
                    <div className="d-flex form-check">
                    <div id="r8-balloon-radio-group-wrapper-popup">
                      <ul>
                        <li>
                          {props.content != "" ? (
                            props.content.graduation_date == "Present" ? (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={true}
                                onChange={toggleQGradDatePicker}
                              />
                            ) : (
                                <input
                                  className="radio r8-radio-float"
                                  type="checkbox"
                                  id="current_date"
                                  name="current_date"
                                  defaultChecked={false}
                                  onChange={toggleQGradDatePicker}
                                />
                              )
                          ) : (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={false}
                                onChange={toggleQGradDatePicker}
                              />
                            )}
                        </li>
                      </ul>
                    </div>
                    <label
                      htmlFor="current_date"
                      className="currently-working-label"
                    >
                      {" "}
                      Currently Enrolled{" "}
                    </label>
                  </div>
                  <div id="end_date_block" hidden={!gradQDatePickerVisible}>
                    <label htmlFor="graduation_date">Graduation Date</label>
                    {props.content != "" ? (
                    <DatePicker
                      className="react-datepicker-wrapper form-control"
                      id="graduation_date"
                      selected={graduationDate}
                      onChange={date => setGraduationDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={graduationDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      value={graduationDate}
                      minDate={startDate}
                      placeholderText={new Date()}
                      isClearable
                    ></DatePicker>
                  ) : (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        id="graduation_date"
                        selected={graduationDate}
                        onChange={date => setGraduationDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={graduationDate}
                        minDate={startDate}
                        placeholderText={new Date()}
                        isClearable
                      ></DatePicker>
                    )}
                </div>
                  {/* document upload */}
                  <div className="form-group" hidden={!gradQDatePickerVisible} >
                    <label className="w-100 lineheight-17 float-left d-flex">
                      <p className=" d-flex mb-0">
                        Upload Certificate{" "}
                        <div className="ml-1 d-flex span-hovered">
                          <i className="mdi mdi-lock-outline"></i>
                          {/* <span className="span-hovered-content">Your data will be encryted and secured using Amazon Simple Storage Service (S3). You can choose to allow Institutions to preview your qualification documents in the RESUME PAGE.</span></div> */}
                          <span className="span-hovered-content">
                            Your documents will be encrypted and stored securely
                          </span>
                        </div>
                      </p>
                    </label>
                    <div className="input-icon d-flex justify-content-between">
                      <i className="mdi mdi-upload"></i>
                      <input
                        type="txt"
                        id="certificate"
                        placeholder={fName ? fName : "No file chosen"}
                        className="form-control"
                        disabled
                      />
                      <input
                        type="file"
                        id="upload_qualification"
                        name="upload_qualification"
                        onChange={handleSaveFile}
                        style={{ display: "none" }}
                        accept="image/*, .pdf"
                      />
                      <button
                        type="button"
                        onClick={() => uploadDocument("upload_qualification")}
                        className="ml-3 pl-4 pr-4 mr-0 mb-2 btn btn-primary btn-c primary-button-no-margin-hover"
                        id="Select_Button"
                      >
                        {fName ? "Uploaded" : "Select"}
                      </button>
                    </div>
                    <div>
                      <table>
                        <tr>
                          {fName ? (
                            <div className="text-left" id="space">
                              
                              <td><Link to={{ pathname: `/PdfViewer?id=${link}` }} target="_blank">
                                <p className="uploaded-file-name">{fName}</p>
                              </Link> </td>
                              <td> <i
                                className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                onClick={deleteCertificate}
                              ></i></td>

                            </div>
                          ) : (
                              " "
                            )}
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div className="form-group" hidden={gradQDatePickerVisible} >
                    <label className="w-100 lineheight-17 float-left d-flex">
                      <p className=" d-flex mb-0">
                        Upload Statement of Enrolment{" "}
                        <div className="ml-1 d-flex span-hovered">
                          <i className="mdi mdi-lock-outline"></i>
                          {/* <span className="span-hovered-content">Your data will be encryted and secured using Amazon Simple Storage Service (S3). You can choose to allow Institutions to preview your qualification documents in the RESUME PAGE.</span></div> */}
                          <span className="span-hovered-content">
                            Your documents will be encrypted and stored securely
                          </span>
                        </div>
                      </p>
                    </label>
                    <div className="input-icon d-flex justify-content-between">
                      <i className="mdi mdi-upload"></i>
                      <input
                        type="txt"
                        id="certificate"
                        placeholder={enrolment_fName ? enrolment_fName : "No file chosen"}
                        className="form-control"
                        disabled
                      />
                      <input
                        type="file"
                        id="upload_enrolment"
                        name="upload_enrolment"
                        onChange={handleSaveEnrolmentFile}
                        style={{ display: "none" }}
                        accept="image/*, .pdf"
                      />
                      <button
                        type="button"
                        onClick={() => uploadDocument("upload_enrolment")}
                        className="ml-3 pl-4 pr-4 mr-0 mb-2 btn btn-primary btn-c primary-button-no-margin-hover"
                        id="Select_Button"
                      >
                        {enrolment_fName ? "Uploaded" : "Select"}
                      </button>
                    </div>
                    <div>
                      <table>
                        <tr>
                          {enrolment_fName ? (
                            <div className="text-left" id="space">
                              
                              <td><Link to={{ pathname: `/PdfViewer?id=${link}` }} target="_blank">
                                <p className="uploaded-file-name">{enrolment_fName}</p>
                              </Link> </td>
                              <td> <i
                                className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                onClick={deleteEnrolment}
                              ></i></td>

                            </div>
                          ) : (
                              " "
                            )}
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div className="form-group" hidden={!gradQDatePickerVisible}>
                    <label className="w-100 lineheight-17 float-left d-flex">
                      <p className="d-flex mb-0">
                        Upload Academic Transcript/Statement of Results{" "}
                        <div className="ml-1 d-flex span-hovered">
                          <i className="mdi mdi-lock-outline"></i>
                          {/* <span className="span-hovered-content">Your data will be encryted and secured using Amazon Simple Storage Service (S3). You can choose to allow Institutions to preview your qualification documents in the RESUME PAGE.</span></div> */}
                          <span className="span-hovered-content">
                            Your documents will be encrypted and stored securely
                          </span>
                        </div>
                      </p>
                    </label>
                    <div className="input-icon d-flex justify-content-between">
                      <i className="mdi mdi-upload"></i>
                      <input
                        type="txt"
                        id="transcript"
                        placeholder={
                          transcript_fName ? transcript_fName : "No file chosen"
                        }
                        className="form-control"
                        disabled
                      />
                      <input
                        type="file"
                        id="upload_qualificationTranscript"
                        name="upload_qualificationTranscript"
                        onChange={handleTranscriptSaveFile}
                        style={{ display: "none" }}
                        accept="image/*, .pdf"
                      />
                      <button
                        type="button"
                        id="Select_Button_1"
                        onClick={() =>
                          uploadDocument("upload_qualificationTranscript")
                        }
                        className="ml-3 pl-4 pr-4 mr-0 mb-2 btn btn-primary btn-c primary-button-no-margin-hover"
                      >
                        {transcript_fName ? "Uploaded" : "Select"}
                      </button>
                    </div>
                    <div>
                      <table>
                        <tr>
                          {transcript_fName ? (
                            <div className="text-left" id="space_1">
                              <td><Link
                                to={{ pathname: `/PdfViewer?id=${transcript_link}` }}
                                target="_blank"
                              >
                                <p className="uploaded-file-name">
                                  {transcript_fName}
                                </p>
                              </Link> </td>
                              <td>  <i
                                className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                onClick={deleteTranscript}
                              ></i> </td>

                            </div>
                          ) : (
                              " "
                            )} </tr> </table>
                    </div>
                  </div>

                  <p className="small">
                    To ensure successful verification, please upload clearly
                    scanned or photographed documents.
                  </p>
                </div>
              </div>

              <div
                className="row mt-5"
              >
                <div className="col-md-6">
                  <Link
                    type="back"
                    value="Back"
                    onClick={handleClose}
                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
                <div className="col-md-6">
                  <Button
                    type="submit"
                    variant="info"
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover qualification-save-change"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const pdForm = () => {
    return (
      <Modal show={true} className="model-for-pdform">
        <Modal.Header>
          <Modal.Title>Professional Development</Modal.Title>
          <div onClick={handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="model-main-content">
            <form onSubmit={handleSavePD}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="major">Activity</label>

                  {props.content != "" ? (
                    <div className="pl-1 dropdown-box br-4">
                      <select
                        className="form-control"
                        id="activity"
                        name="activity"
                        required
                        defaultValue={props.content.activity}
                      >
                        <option value="">Please Select</option>
                        <option>Attend industry webinar</option>
                        <option>Attend industry PD event</option>
                        <option>Attend English Australia PD event</option>
                        <option>Present at industry event </option>
                        <option>Attend in-house PD or training event</option>
                        <option>Present at in-house PD event </option>
                        <option>Attend English Australia webinar</option>
                        <option>Watch recorded webinar</option>
                        <option>Peer-observe someone's lesson</option>
                        <option>Be observed teaching a lesson</option>
                        <option>Complete professional course</option>
                      </select>
                    </div>
                  ) : (
                      <div className="pl-1 dropdown-box br-4">
                        <select
                          className="form-control"
                          id="activity"
                          name="activity"
                          required
                        >
                          <option value="">Please Select</option>
                          <option>Attend industry webinar</option>
                          <option>Attend industry PD event</option>
                          <option>Attend English Australia PD event</option>
                          <option>Present at industry event </option>
                          <option>Attend in-house PD or training event</option>
                          <option>Present at in-house PD event </option>
                          <option>Attend English Australia webinar</option>
                          <option>Watch recorded webinar</option>
                          <option>Peer-observe someone's lesson</option>
                          <option>Be observed teaching a lesson</option>
                          <option>Complete professional course</option>
                        </select>
                      </div>
                    )}

                  <label htmlFor="location">Delivering Organisation</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="e.g.: Melbourne University"
                      required
                      defaultValue={props.content.location}
                    />
                  ) : (
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="e.g.: Melbourne University"
                        required
                      />
                    )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="institution-location">
                    City/Town Held
                  </label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution-location"
                      id="institution-location"
                      placeholder="e.g.: Sydney"
                      required
                      defaultValue={props.content.institution_location}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution-location"
                        id="institution-location"
                        placeholder="e.g.: Sydney"
                        required
                      />
                    )}

                  <label htmlFor="pd_endDate">Completion Date</label>
                  {props.content != "" ? (
                    <DatePicker
                      className="react-datepicker-wrapper form-control"
                      name="pd_endDate"
                      id="pd_endDate"
                      selected={pd_endDate}
                      maxDate={new Date()}
                      onSelect={date => setpd_EndDate(date)}
                      // onChange={date => setpd_EndDate(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      value={pd_endDate}
                      placeholderText={new Date()}
                      isClearable
                    />
                  ) : (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        name="pd_endDate"
                        id="pd_endDate"
                        selected={pd_endDate}
                        maxDate={new Date()}
                        onSelect={date => setpd_EndDate(date)}
                        // onChange={date => setpd_EndDate(date)}
                        onChange={date => alert(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={pd_endDate}
                        placeholderText={new Date()}
                        isClearable
                      />
                    )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="focus_event">
                    What was the focus of this event?
                  </label>
                  {props.content ? (
                    <input
                      type="text"
                      className="form-control"
                      name="focus_event"
                      id="focus_event"
                      placeholder="Give a brief description"
                      required
                      defaultValue={props.content.focus_event}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="focus_event"
                        id="focus_event"
                        placeholder="Give a brief description"
                        required
                      />
                    )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <Link
                    type="back"
                    value="Back"
                    onClick={handleClose}
                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                  {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
                </div>
                <div className="col-md-6">
                  <Button
                    type="submit"
                    variant="info"
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover qualification-save-change"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const peForm = () => {
    return (
      <Modal show={true} className="model-for-qualificationForm">
        <Modal.Header>
          <Modal.Title>English Teaching Experience</Modal.Title>
          <div onClick={handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="model-main-content">
            <form onSubmit={handleSavePE}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="organisation">Organisation</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="organisation"
                      id="organisation"
                      placeholder="e.g.: Trinity College"
                      required
                      defaultValue={props.content.organisation}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="organisation"
                        id="organisation"
                        placeholder="e.g.: Trinity College"
                        required
                      />
                    )}

                  <label htmlFor="institution-location">
                    City/Town
                  </label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution-location"
                      id="institution-location"
                      placeholder="e.g.: Sydney"
                      required
                      defaultValue={props.content.institution_location}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution-location"
                        id="institution-location"
                        placeholder="e.g.: Sydney"
                        required
                      />
                    )}

                  <label htmlFor="course">Courses/Classes Delivered</label>
                  <div className="">
                    {props.content != "" ? (
                      <Select
                        id="course_class_delivered"
                        name="course_class_delivered"
                        onChange={handleDDLChange}
                        options={class_types}
                        isSearchable
                        isMulti
                        required
                        defaultValue={course_class_delivered}
                      ></Select>
                    ) : (
                        <Select
                          id="course_class_delivered"
                          name="course_class_delivered"
                          onChange={handleDDLChange}
                          options={class_types}
                          isSearchable
                          isMulti
                          required
                        ></Select>
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="start_date">Starting Date</label>
                   {props.content != "" ? (
                    <DatePicker
                      className="react-datepicker-wrapper form-control"
                      id="start_date"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={graduationDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      value={startDate}
                      placeholderText={new Date()}
                      isClearable
                    />
                  ) : (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        id="start_date"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={startDate}
                        placeholderText={new Date()}
                        isClearable
                      />
                    )}

                  <div className="d-flex form-check">
                    <div id="r8-balloon-radio-group-wrapper-popup">
                      <ul>
                        <li>
                          {props.content != "" ? (
                            props.content.end_date == "Present" ? (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={true}
                                onChange={toggleGradDatePicker}
                              />
                            ) : (
                                <input
                                  className="radio r8-radio-float"
                                  type="checkbox"
                                  id="current_date"
                                  name="current_date"
                                  defaultChecked={false}
                                  onChange={toggleGradDatePicker}
                                />
                              )
                          ) : (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={false}
                                onChange={toggleGradDatePicker}
                              />
                            )}
                        </li>
                      </ul>
                    </div>
                    <label
                      htmlFor="current_date"
                      className="currently-working-label"
                    >
                      {" "}
                      Currently working in this role{" "}
                    </label>
                  </div>
                  <div id="end_date_block" hidden={!gradDatePickerVisible}>
                    <label htmlFor="end_date" id="end_date_label">
                      End Date
                    </label>
                    {props.content != "" ? (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        name="end_date"
                        id="end_date"
                        selected={graduationDate}
                        onChange={date => setGraduationDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={graduationDate}
                        minDate={startDate}
                        placeholderText={new Date()}
                        isClearable
                      />
                    ) : (
                        <DatePicker
                          className="react-datepicker-wrapper form-control"
                          name="end_date"
                          id="end_date"
                          selected={graduationDate}
                          onChange={date => setGraduationDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={graduationDate}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          value={graduationDate}
                          minDate={startDate}
                          placeholderText={new Date()}
                          isClearable
                        />
                      )}
                  </div>
                 
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <Link
                    type="back"
                    value="Back"
                    onClick={handleClose}
                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                  {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
                </div>
                <div className="col-md-6">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover qualification-save-change"
                  >
                   Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const refForm = () => {
    return (
      <Modal show={true} className="model-for-qualificationForm">
        <Modal.Header>
          <Modal.Title>Referee</Modal.Title>
          <div onClick={handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="model-main-content">
            <form onSubmit={handleRefereeDetails}>
              <div class="row">
                <div className="col-md-6">
                  {" "}
                  <label htmlFor="referee_first_name">Referee First Name</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="referee_first_name"
                      id="referee_first_name"
                      placeholder="First Name"
                      required
                      defaultValue={props.content.referee_first_name}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="referee_first_name"
                        id="referee_first_name"
                        placeholder="First Name"
                        required
                      />
                    )}
                  <label htmlFor="referee_last_name">Referee Last Name</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="referee_last_name"
                      id="referee_last_name"
                      placeholder="Last Name"
                      required
                      defaultValue={props.content.referee_last_name}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="referee_last_name"
                        id="referee_last_name"
                        placeholder="Last Name"
                        required
                      />
                    )}
                  <label htmlFor="referrer_organisation">
                    Referrer organisation
                  </label>
                  {props.content !== "" ? (

                    <select
                      className="form-control"
                      name="referrer_organisation"
                      id="referrer_organisation"
                      required
                      selected={props.content.organisation}
                    >
                      {referrer_organisations &&
                        referrer_organisations.length > 0 ? (
                          referrer_organisations.map(item => (
                            <option key={item} value={item} selected={item === props.content.organisation ? "selected" : ""}>
                              {item}
                            </option>

                          ))
                        ) : (
                          <option value="">No item found</option>
                        )}
                    </select>
                  ) : (
                      <select
                        className="form-control"
                        name="referrer_organisation"
                        id="referrer_organisation"
                        required
                      >
                        {referrer_organisations &&
                          referrer_organisations.length > 0 ? (
                            referrer_organisations.map(item => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))
                          ) : (
                            <option value="">No item found</option>
                          )}
                      </select>
                    )}
                </div>
                <div className="col-md-6">
                  {" "}
                  <label htmlFor="referee_position_title">
                    Referee Position Title
                  </label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="referee_position_title"
                      id="referee_position_title"
                      placeholder="Position Title"
                      required
                      defaultValue={props.content.referee_position_title}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="referee_position_title"
                        id="referee_position_title"
                        placeholder="Position Title"
                        required
                      />
                    )}
                  <label htmlFor="referee_email">Referee Email</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="referee_email"
                      id="referee_email"
                      placeholder="Email"
                      pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                      title="Please enter valid email address"
                      required
                      defaultValue={props.content.referee_email}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="referee_email"
                        id="referee_email"
                        placeholder="Email"
                        required
                        pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                        title="Please enter valid email address"
                      />
                    )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <Link
                    type="back"
                    value="Back"
                    onClick={handleClose}
                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                  {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
                </div>
                <div className="col-md-6">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover qualification-save-change"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  const nonTeachingExperienceForm = () => {
    return (
      <Modal show={true} className="model-for-qualificationForm">
        <Modal.Header>
          <Modal.Title>Other Professional Experience</Modal.Title>
          <div onClick={handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="model-main-content">
            <form onSubmit={handleSaveNonTeachingEx}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="organisation">Organisation</label>
                  {console.log(props.content)}
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="organisation"
                      id="organisation"
                      placeholder="e.g.: Officeworks"
                      required
                      defaultValue={props.content.organisation}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="organisation"
                        id="organisation"
                        placeholder="e.g.: Officeworks"
                        required
                      />
                    )}

                  <label htmlFor="institution-location">City/Town</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="institution-location"
                      id="institution-location"
                      placeholder="e.g.: Sydney"
                      required
                      defaultValue={props.content.institution_location}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="institution-location"
                        id="institution-location"
                        placeholder="e.g.: Sydney"
                        required
                      />
                    )}

                  <label htmlFor="role_held">Role Held</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="role_held"
                      id="role_held"
                      placeholder="e.g.: Customer Service"
                      required
                      defaultValue={props.content.role_held}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="role_held"
                        id="role_held"
                        placeholder="e.g.: Customer Service"
                        required
                      />
                    )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="main_duties">Main Duties</label>
                  {props.content != "" ? (
                    <input
                      type="text"
                      className="form-control"
                      name="main_duties"
                      id="main_duties"
                      placeholder="Separate main duties with comma"
                      required
                      defaultValue={props.content.main_duties}
                    />
                  ) : (
                      <input
                        type="text"
                        className="form-control"
                        name="main_duties"
                        id="main_duties"
                        placeholder="Separate main duties with comma"
                        required
                      />
                    )}

                  <label htmlFor="start_date">Starting Date</label>
                  {props.content != "" ? (
                    <DatePicker
                      className="react-datepicker-wrapper form-control"
                      id="start_date"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={graduationDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      value={startDate}
                      placeholderText={new Date()}
                      isClearable
                    />
                  ) : (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        id="start_date"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={startDate}
                        placeholderText={new Date()}
                        isClearable
                      />
                    )}

                  <div className="d-flex form-check">
                    <div id="r8-balloon-radio-group-wrapper-popup">
                      <ul>
                        <li>
                          {props.content != "" ? (
                            props.content.end_date == "Present" ? (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={true}
                                onChange={toggleGradDatePicker}
                              />
                            ) : (
                                <input
                                  className="radio r8-radio-float"
                                  type="checkbox"
                                  id="current_date"
                                  name="current_date"
                                  defaultChecked={false}
                                  onChange={toggleGradDatePicker}
                                />
                              )
                          ) : (
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="current_date"
                                name="current_date"
                                defaultChecked={false}
                                onChange={toggleGradDatePicker}
                              />
                            )}
                        </li>
                      </ul>
                    </div>
                    <label
                      htmlFor="current_date"
                      className="currently-working-label"
                    >
                      {" "}
                      Currently working in this role{" "}
                    </label>
                  </div>
                  <div id="end_date_block" hidden={!gradDatePickerVisible}>
                    <label htmlFor="end_date" id="end_date_label">
                      End Date
                    </label>
                    {props.content != "" ? (
                      <DatePicker
                        className="react-datepicker-wrapper form-control"
                        name="end_date"
                        id="end_date"
                        selected={graduationDate}
                        onChange={date => setGraduationDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={graduationDate}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        value={graduationDate}
                        minDate={startDate}
                        placeholderText={new Date()}
                        isClearable
                      />
                    ) : (
                        <DatePicker
                          className="react-datepicker-wrapper form-control"
                          name="end_date"
                          id="end_date"
                          selected={graduationDate}
                          onChange={date => setGraduationDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={graduationDate}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          value={graduationDate}
                          minDate={startDate}
                          placeholderText={new Date()}
                          isClearable
                        />
                      )}
                  </div>
                 
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <Link
                    type="back"
                    value="Back"
                    onClick={handleClose}
                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                  >
                    {" "}
                    Cancel{" "}
                  </Link>
                  {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
                </div>
                <div className="col-md-6">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover qualification-save-change"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    // Change the date picker style
    const date_picker = document.querySelectorAll(".react-datepicker-wrapper");
    if (date_picker.length !== 0) {
      for (let i = 0; i < date_picker.length; i++) {
        date_picker[i].style.display = "block";
      }
    }
    if (
      document.querySelector("#current_date") &&
      document.querySelector("#current_date").checked
    ) {
      // document.querySelector("#end_date_block").hidden = true
    }
  });
  return (
    <>
      {props.formType === "qualification" && qualificationForm()}
      {props.formType === "PD" && pdForm()}
      {props.formType === "PE" && peForm()}
      {props.formType === "NTE" && nonTeachingExperienceForm()}
      {props.formType === "referee" && refForm()}
    </>
  );
}

export default ModalForm;
