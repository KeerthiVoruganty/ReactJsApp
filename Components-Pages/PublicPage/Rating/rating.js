import React, { useState, useEffect } from "react";
import Slide from "@material-ui/core/Slide";
import CardContent from "@material-ui/core/CardContent";
import "./rating.css";
import badgesQuality from "../../../assets/img/1.png";
import badgeSkill from "../../../assets/img/2.png";
import badgeTrophy from "../../../assets/img/3.png";
import elly from "../../../assets/img/elly.png";
import adaptable from "../../../assets/img/feedbackIcons/Adaptable.png";
import Modal from "./rating-modal";
import axios from "axios";
import { PORT } from "../../../config";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// import TabList from './tab-list'
import Badge from './badge'
const Rating = props => {
  const classId = window.location.search.substring(1).split("cid=")[1];
  const [teacher, setTeacher] = useState(props.location.state);
  console.log(teacher)
  const [classDetail, setClassDetail] = useState(props.location.state);
  const teacherName = teacher
    ? teacher.firstName + " " + teacher.lastName +"." || "Teacher Ready"
    : "Teacher Ready";
  const teacherDate = classDetail ? classDetail.date || "-" : "-";

  const badges = [
    { title: 'Adaptable', iconURL:'./feedbackIcons/Adaptable.png' },
    { title: 'Arrives Early', iconURL: './feedbackIcons/arrivesEarly.png' },
    { title: 'Creative', iconURL: './feedbackIcons/Creative.png' },
    { title: 'Energetic', iconURL: './feedbackIcons/Energetic.png' },
    { title: 'Engages Students', iconURL: './feedbackIcons/engagesStudents.png' },
    { title: 'Fun Teacher', iconURL: './feedbackIcons/funTeacher.png' },
    { title: 'Knows the Field', iconURL: './feedbackIcons/knowsTheField.png' },
    { title: 'On the Ball', iconURL: './feedbackIcons/onTheBall.png' },
    { title: 'Organised', iconURL: './feedbackIcons/Organised.png' },
    { title: 'Quiet Achiever', iconURL: './feedbackIcons/quietAchiever.png' },
    { title: 'Reliable', iconURL: './feedbackIcons/Reliable.png' },
    { title: 'Resourceful', iconURL: './feedbackIcons/Resourceful.png' },
  ]

  const q_badge = [
    "Reading",
    "Writing",
    "Vocabulary",
    "Grammar",
    "Speaking",
    "Marking assements",
    "Quality",
    "Skills",
    "Knowledge"
  ];
  const g_badge = [
    "assessment_delivery",
    "grammar_guru",
    "listening_guru",
    "marking_assessment",
    "reading_guru",
    "speaking/pron",
    "vocabulary_guru",
    "writing_guru"
  ];
  const s_badge = ["above&beyond", "above&beyond", "above&beyond"];
  const badgeList = [q_badge, g_badge, s_badge];
  const [open, setOpen] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentStep, setStep] = useState('step1');
  const [selectedBadge, setSelectedBadge] = useState(null);
  

  const submitFeedback = feedback => {
    console.log("backend data "+ JSON.stringify(feedback));
    const url = `${PORT}/feedback`;
    setStep('step2');
    function sendData() {
      axios
        .put(url, {
          data: feedback,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log("good")
          setSending("succesfully");
          setOpen(true);
          setStep('step3');
          setSending(false);
        })
        .catch(err => {
          console.log("bad")
          setSending("error");
          setSending(false);
        });
    }
    setSending(true);
    setTimeout(function () {
      sendData();
    }, 1000);
    setSending(false)
  };

  const errorMessage = () => {
      if (sending === "error") {
        return "Error Sending Data 404 please refresh and try again";
      }}
   
  const handleClickBadge = (title) => {
    setSelectedBadge(title)
  }
  const handleSubmit = () => {
    const data = {
        teacher_id: teacher.teacher_id,
        class_id: classDetail,
        badge_title: selectedBadge,
    };
      submitFeedback(data)
  }
  const renderComponent = {
    step1: {
      headingTitle: () => (<h3 className="rating-header">
      Hi, Elly here. I'm checking in to see how <span className="teacher-name">{teacherName}</span>'s class went on
      <strong> {teacherDate} </strong>.
    <br />
      Give them a badge.
  </h3>),
      selectTitle: null,
      component: () => generateBadge()
    },

    step2: {
      headingTitle: ()=>{
       return ( 
        <div className="sending-data-content">
          <h1 >
            Sending Data ...
          </h1>
          <CircularProgress color="inherit" className="circular-progress" />
        </div>)
      },
      selectTitle: '',
      component:null ,
    },
    step3: {
      headingTitle: () => (
        <div className="submit-content">
          <div className = "submit-title">
            Thank you for providing valuable feedback for our teaching team.
          </div>
          <div className = "submit-body">
            <div>
              To make another booking, simply send me an SMS.
            </div>
            <div>
              Bye for now!
            </div>
            <div>
            <img src={elly} className="elly-goodbye"/>              
            </div>
          
            <div>
              Elly Elicos
              <br/>Your VADoS
            </div>
          
          </div>
        </div>
        
      ),
      selectTitle: '',
      component: () => null
    },
  }
  const generateBadge = () => {
    return (
      <div className='badges-container'> 
        {badges.map((list, index) => {
          return (
            <Badge title={list.title} key={index} iconURL={list.iconURL} onClick={() => handleClickBadge(list.title)} activeClass={list.title === selectedBadge} />
          )
        })}
      </div>)
  }
  const renderButton = () => {
     if (currentStep === 'step1' && selectedBadge) {
      return (
        <div className="selection-confirm">
          <p className="submit-confirmation">You're adding '{selectedBadge}' badge to <span className = "teacher-name">{teacherName}</span>'s Profile. </p>
          <button onClick={handleSubmit} className="submitButton" id="submitButton">SUBMIT</button>
        </div>
      )
    } else {
      return (
        <div className="selection-confirm">
          <p className="submit-confirmation">Please select one badge. </p>
          
        </div>
      )
    }
  }

  const renderElly = () => {
    if(currentStep=="step1"){
      return(
        <img src={elly} alt="elly" id="elly"  className="rating_pic_right"/>
      )
    }
  }

  return (
    <>
      {teacher ? (
        <div className="rating-container">
          <div className="row header-logo">
            <img src="../../../assets/img/logo.png" alt="logo"  className="rating_logo_left"/>
            {renderElly()}
          </div>
          {renderComponent[currentStep].headingTitle()}

          {currentStep === 'step1' ? (<div className='body-wrapper'>
            <h4>{renderComponent[currentStep].selectTitle}</h4>
            <div className="badge-wrapper">
              <div>{renderComponent[currentStep].component()}</div>
              {renderButton()}
            </div>
          </div>) : null}
        </div>
      ) : (
          <>
            <Backdrop className="rating-backdrop" open={true}>
              <div>
                <div className="loding-flex-center">
                  <img src="../../../assets/img/logo.png" alt="" />
                </div>
                {errorMessage}
              </div>
            </Backdrop>
          </>
        )}
    </>
  );
};

export default Rating;
