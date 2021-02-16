import React, { useState, useEffect, component } from "react";
import "./ReferenceForm.css";
import axios from "axios";
import { PORT } from "../../../config";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, Divider } from "@material-ui/core";
import { notify } from 'react-notify-toast';

const URL = PORT;

const ReferenceForm = (props) => {
  
  const [user, setUser] = useState(props.location.state);
  const [isloading, setIsLoading] = useState(true);
  const [teacherId, setTid] = useState(props.location.tid);
  const [refereeId, setRid] = useState(props.location.rid);
  const [currentStep, setStep] = useState(((props.location.flag|| !teacherId || !refereeId) ? "thank" : "descr"));


  const teacherFirstName = user.first_name ;
  const teacherLastName = user.last_name;
  const cal = new Date();
  const refDate = cal.getDate() + '/' + ((cal.getMonth()<9)? "0" : "") + (cal.getMonth()+1) + '/' + cal.getFullYear();
  const refDateForFileName = cal.getDate() + '_' + (cal.getMonth()+1) + '_' + cal.getFullYear()

  const [refFirstName, setFirst] = useState("");
  const [refLastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const [position, setPosition] = useState("");
  const [proRelation, setProRelation] = useState("");
  const [directly, setDirectly] = useState(true);

  const [currently, setCurrently] = useState(true);
  const [length, setLength] = useState("");
  const [reliability, setReliability] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [relationship, setRelationship] = useState("");
  const [courses, setCourses] = useState("");
  const [reason, setReason] = useState("");
  const [confidential, setConf] = useState(false);
  
  useEffect(()=>{
      let field = document.getElementById("refFirstName");
      document.documentElement.scrollTop = document.body.scrollTop = document.pageYOffset = 0;
      if (field) {
        field.focus();
      }
  }, [currentStep]);

  const capitalize = (str) => {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  };

  const handleNext = () => {
    setStep("form");
  };

  // Submit the reference form
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameReg = /^[a-zA-Z]+$/;
    const emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const phoneReg = /^04[0-9]{8}$/;

    if (nameReg.test(refFirstName) && nameReg.test(refLastName)) {
      if(emailReg.test(email)) {
        if(phoneReg.test(phone)) {
          const f = {
            teacherId : teacherId,
            refereeId : refereeId,

            teacherFirstName: capitalize(teacherFirstName),
            teacherLastName: capitalize(teacherLastName),
            refDate: refDate,
            refDateForFileName: refDateForFileName,
  
            refFirstName: capitalize(refFirstName),
            refLastName: capitalize(refLastName),
            phone: phone,
            email: email,
            work: capitalize(work),
            position: capitalize(position),
            proRelation: capitalize(proRelation),
            directly: directly,
  
            currently: currently,
            length: length ? capitalize(length) : "",
            reliability: capitalize(reliability),
            knowledge: capitalize(knowledge),
            relationship: capitalize(relationship),
            courses: capitalize(courses),
            reason:capitalize(reason),

            confidential: confidential,
          }

          // console.log(f);

          axios
            .put(`${URL}/reference/submit`, f)
            .then(res => {
              if (res.data.msg === "succeed") {
                setStep('thank');
              } else {
                console.log(res.data.msg, res.data.err);
                setStep('error');
              }
            });

          // console.log(f);

        } else {
          notify.show ('Please use a valid phone number', "custom", 5000, { background:'red', text: "#FFFFFF" })
        }
      } else {
        notify.show ('Please use a valid email address', "custom", 5000, { background:'red', text: "#FFFFFF" })
      }
    } else {
      notify.show('Please use only letters in first name or last name', "custom", 5000, { background:'red', text: "#FFFFFF" })
    }

    // console.log(capitalize('submitted'));
  };

  const savePDF = () => {
    return null;
  };

  const handleRefFirstName = (e) => {
    setFirst(e.target.value);
  };

  const handleRefLastName = (e) => {
    setLast(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleWork = (e) => {
    setWork(e.target.value);
  };

  const handlePosition = (e) => {
    setPosition(e.target.value);
  };

  const handleProRelation = (e) => {
    setProRelation(e.target.value);
  };

  const handleDirectly = (e) => {
    setDirectly(e.target.value === "Yes");
  };

  const handleCurrently = (e) => {
    setCurrently(e.target.value === "Yes");
    document.getElementById("que-length").style.display = (e.target.value === "Yes") ? 'none':'block';
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleReliability = (e) => {
    setReliability(e.target.value);
  };

  const handleKnowledge= (e) => {
    setKnowledge(e.target.value);
  };

  const handleRelationship = (e) => {
    setRelationship(e.target.value);
  };

  const handleCourses = (e) => {
    setCourses(e.target.value);
  };

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleCheck = (e) => {
    setConf(document.getElementById("do_not_share").checked);
  };

  const renderComponent = {

    descr: {content:
      <div className='row'>
        <div className="form-div">
        <div className="header-container">
          <h1>
            Position Description for Referee
          </h1>
        </div>
        <hr className="hori-line"/>
        <br/>
        <h2>About the Role</h2>
        <p>ReadyTeacher provides colleges with teachers and trainers for emergency relief, 
          contract and ongoing roles. The role the applicant has registered for is providing
          delivery of English language courses to adults, in a face-to-face or online setting.</p>
        <br/>
        <h2>Expectations for English Language Teachers</h2>
        <p>The applicant is required to possess a qualification reflective of a teaching framework 
          (such as Cambridge CELTA) or equivalent that can inform the teaching practice of the applicant. 
          Some knowledge of function and form of English is required. The applicant is required to facilitate 
          improvement of the skills of listening, reading, writing and speaking in a way that is conducive to adult
          learning.</p>
          <br/>
        <h2>General Professional Expectations</h2>
        <p>Applicants should be organised, flexible, well-mannered and friendly to students
          and staff of hosting Colleges. They should attend their placement promptly and 
          present well (casual attire is to be avoided). Problem-solving skills and flexibility 
          are important attributes of our team members. Marking & language testing are
          not a requirement of English language teachers, however Teachers possessing
          these skills may be invited to utilise them. </p>
        <br/>
        <h2>Referee Confidentiality</h2>
        <p>The contents of this Reference Check Form will be viewed by the administration 
          of ReadyTeacher only, for screening purposes, and will be stored securely. </p>
        <hr className="hori-line"/>
        <br/>
        <div className="button-next">
          <button className="button-general" id="next" onClick = {handleNext}>Next</button>
        </div>
      </div>
     </div>
    },

    form: {content:
      
      <div className='form-div'>
        <form id="form" onSubmit={handleSubmit} 
          className="padding-for-form mt-4 white-bcg small-screen-small-padding padding-form-for-iphone5">

          <div className='auth-text-top small-screen-disappear header-container'>
            <h1>
              Teacher Reference Check Form
            </h1> 
          </div>
        
          <hr className="hori-line"/>
        
          <div className="about-educator-div">            
            <div className='form-group mb-1'>
              <div>
                <h4>
                  <label className="label-primary"> English Language Teacher Name: {teacherFirstName + ' ' + teacherLastName}</label>
                </h4> 
              </div>
            </div>
            
            <div className='form-group mb-1'>
              <div>
                <label className="label-primary"> Date of Reference: {refDate}</label>
              </div>
            </div>
          </div>

          <br/>
          <div className="about-referee-div">
            <div><h2> Referee's Details </h2></div>
            <div className='form-group mb1'>
              <label className="label-primary"> First Name: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="refFirstName" name="refFirstName"
                  defaultValue={refFirstName} 
                  onChange={handleRefFirstName}
                  autoFocus required/>
              </div>
            </div>  

            <div className='form-group mb1'>
              <label className="label-primary"> Last Name: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="refLastName" name="refLastName"
                  defaultValue={refLastName} 
                  onChange={handleRefLastName}
                  autoFocus required/>
              </div>
            </div>

            <div className='form-group mb1'>
              <label className="label-primary"> Phone Number: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="phone" name="phone"
                  defaultValue={phone} 
                  onChange={handlePhone}
                  autoFocus required/> 
              </div>
            </div>

            <div className='form-group mb-1'> 
              <label className="label-primary"> Email: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="email" name="email"
                  onChange={handleEmail}
                  defaultValue={email} 
                  autoFocus required/>
              </div>
            </div>
            
            <div className='form-group mb-1'>
              <label className="label-primary"> Current Place of Work: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="work" name="work"
                  onChange={handleWork}
                  defaultValue={work} 
                  autoFocus required/>
              </div>
            </div>
            
            <div className='form-group mb-1'>
              <label className="label-primary"> Current Position: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="position" name="position"
                  onChange={handlePosition}
                  defaultValue={position} 
                  autoFocus required/>
              </div>
            </div>
            
            <div className='form-group mb-1'>
              <label className="label-primary"> Professional Relationship with Teacher: </label>
              <div>
                <input type="text" className="imput-field" 
                  id="proRelation" name="proRelation"
                  onChange={handleProRelation}
                  defaultValue={proRelation} 
                  autoFocus required/>
              </div>
            </div>

            <div className='form-group mb-1 float-div'>
              <label className="label-primary"> Did you directly supervise the Teacher? </label>
              <div className='shrink'>
              <input
                type="radio" className="shrink"
                id="directly-yes" name="directly-yes"
                value="Yes"
                checked={directly}
                onChange={handleDirectly}/>
              </div>
              <div className='shrink'>
              <label className="label-input">  
                Yes
              </label>
              </div>
              <div className='shrink'>
              <input
                type="radio" className="shrink"
                id="directly-no" name="directly-no"
                value="No"
                checked={!directly}
                onChange={handleDirectly}/>
              </div>  
              <div className='shrink'>  
              <label className="label-input">  
                No
              </label>
              </div>
            </div>
            
          </div>

          <br/>
          <div className="question_div">
            <div>
              <div><h2> Reference Questions </h2></div>

              <div className="questions">
                <div className='form-group mb-1'>
                  <label className="label-primary"> Are you currently supervising this Teacher? </label>
                  <div>
                    <div className="shrink">
                      <input
                        type="radio" className="shrink"
                        id="currently-yes" name="currently-yes"
                        value="Yes"
                        checked={currently}
                        onChange={handleCurrently}/>
                    </div>
                    <div className="shrink">
                      <label>
                        Yes
                      </label>
                    </div>
                    <div className="shrink">
                      <input
                        type="radio" className="shrink"
                        id="currently-no" name="currently-no"
                        value="No"
                        checked={!currently}
                        onChange={handleCurrently}/>
                    </div>
                    <div className="shrink">
                      <label>
                        No
                      </label>
                    </div>
                  </div>
                
                  <div id='que-length' className='form-group mb-1'>
                    <label className="label-primary">
                      How long ago did you work with this Teacher?
                    </label>
                    <textarea id="timepriod" className="answer-text-field"
                        id="length" name="length"
                        onChange={handleLength}
                        defaultValue={length} autoFocus required={!currently}/>
                  </div>
                </div>
              </div>

              <div className="questions">
              <div className='form-group mb-1'>
                <label className="label-primary">
                  Please comment on the Teacher's professionalism and reliability:
                </label>
                <textarea id="prefessionalism" className="answer-text-field"
                    id="reliability" name="reliability"
                    onChange={handleReliability}
                    defaultValue={reliability} autoFocus required/>
                    </div>
              </div>

              <div className="questions">
              <div className='form-group mb-1'>
                <label className="label-primary">
                  Please comment on the Teacher's knowledge of the field:
                </label>
                <textarea id="knowledge" className="answer-text-field"
                    id="knowledge" name="knowledge"
                    onChange={handleKnowledge}
                    defaultValue={knowledge} autoFocus required/>
                    </div>
              </div>

              <div className="questions">
              <div className='form-group mb-1'>
                <label className="label-primary">
                  Please comment on the Teacher's relationships with students and staff:
                </label>
                <textarea id="student_relation" className="answer-text-field"
                    id="relationship" name="relationship"
                    onChange={handleRelationship}
                    defaultValue={relationship} autoFocus required/>
                    </div>
              </div>

              <div className="questions">
              <div className='form-group mb-1'>
                <label className="label-primary">
                Are there any classes or courses that this Teacher would be best suited to delivering?
                </label>
                <textarea id="knowledge" className="answer-text-field"
                    id="courses" name="courses"
                    onChange={handleCourses}
                    defaultValue={courses} autoFocus required/>
                    </div>
              </div>

              <div className="questions">
              <div className='form-group mb-1'>
                <label className="label-primary">
                  Why would you recommend this Teacher?
                </label>
                <textarea id="recommend" className="answer-text-field"
                    id="reason" name="reason"
                    onChange={handleReason}
                    defaultValue={reason} autoFocus required/> 
                 </div>
              </div>
              <br/>
            </div>
          </div>
          <div>
          <p className="between">Very rarely, academic managers/ college directors can request to view reference 
          checks as a way of establishing credibility of the teacher as part of the selection process. 
          Please advise if you do not wish this to occur by selecting <b>Do Not Share with Employers,</b> below.</p>
        </div>
        <div className="check-box-div">
          <input className="checkbox-share" type="checkbox" 
            id="do_not_share" name= "do_not_share" 
            onChange={handleCheck}/>
          <label><b>Do not Share with Employers</b></label>
        </div>
        <div className="button-next">
        <br/>
          {/* <button className="pr-0 btn button-primary btn-block primary-button-no-margin-hover btn-c"  */}
          <button className="button-general"
            id="submit" type='submit' > Submit </button>
        </div>
        </form>
        <br/>
        <hr className="hori-line"/>
       
      </div>
    },

    thank: {content:
      <div className="thank-you-header">
        {/* I need an image */}
        <img/>
        <div >Thank you for your submission.</div>
        <div >
        Visit the <a className="link" href="https://www.readyteacher.com.au/home">ReadyTeacher</a> website for more information.
        </div> 
      </div>
    },

    error: {content:
      <div className="thank-you-header">
        {/* I need an image */}
        <img/>
        <p>Sorry</p>
        <br/>
        <p>Your submission is unsuccessful</p>
        <p>Please retry the link and resubmit</p>
      </div>
    }
  };

    return(
      <div>
        {/* OTDO: change it back later*/}
        <div className='row'>
          <div className="reference-container">
            <img src="../../../assets/img/logo.png" alt="" className="ref-check-logo"/>
            <br/>
            {renderComponent[currentStep].content}
          </div>
      </div>
      </div>

      
    )
};

export default ReferenceForm;
