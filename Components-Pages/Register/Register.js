import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Divider } from 'semantic-ui-react'
import { notify } from 'react-notify-toast';
import Spinner from '../../Components/Spinner';
import { PORT } from '../../config';
import logo from '../../assets/img/logo_right-removebg.png';
import './Register.css';
import { googleurl } from '../../config';
import { GoogleLogin } from 'react-google-login';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { LinkedInLoginButton } from 'react-social-login-buttons';



const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  let [checkPassword,setCheckPassword] = useState([])

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState(false);
        // This bit of state provides user feedback in the component when something
        // changes. isSendingEmail is flipped just before the fetch request is sent in 
        // onSubmit and then flipped back when data has been received from the server.
        // How many times is the 'isSendingEmail' variable used below?
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isGoolgeButton, setIsGoolgeButton] = useState(true);
    const URL = PORT;
    
    const handleSubmit = event => {
      event.preventDefault();
      if(passwordStrength >= 1&&checkPassword.length==0){
        if (password === confirmPassword) {
          setError(false);
          if (document.getElementById('terms-co-check').checked === true) {
            setIsSendingEmail(true);
    
            axios
              .post(`${URL}/register`, {
                email,
                password
              })
              .then(res => {
                console.log(res);
                notify.show(res.data.msg);
                setIsSendingEmail(false);
               res.data.email ?  setIsRegistered(false): setIsRegistered(true)
              })
              .catch(err => {
                console.log('Register.js: ', err);
              });
          } else {
            notify.show('Please accept Terms and Condition.');
          }
        } else {
          setError(true);
          notify.show("Password does not match")
        }
      }else{
        notify.show("Check the required password condition.");
      }
    }
    const togglePassword = () => {
        //Toggles between showing and hiding password
        setShowPassword(!showPassword)
    }
  
const hideGoogleRegisterForm = () => {
  document.getElementById('google-register-form').style.display = 'none';
}
const showGoogleRegisterForm = () => {
  document.getElementById('google-register-form').style.display = 'block';
  hideLinkedinRegisterForm();
  hideEmailAndPassRegisterForm();
  // document.getElementById('linkedin-register-button').disabled;
  // document.getElementById('linkedin-register-button').style.opacity='20%';
  // document.getElementById('email-and-pssw-button').disabled;
  // document.getElementById('email-and-pssw-button').style.opacity='20%';
}

const hideLinkedinRegisterForm = () => {
  document.getElementById('linkedin-register-form').style.display = 'none';
  
}
const showLinkedinRegisterForm = () => {
  document.getElementById('linkedin-register-form').style.display = 'block';
  hideGoogleRegisterForm();
  hideEmailAndPassRegisterForm();
  // document.getElementById('google-register-button').removeAttribute('onclick');
  // document.getElementById('google-register-button').style.opacity='20%';
  // document.getElementById('email-and-pssw-button').disabled;
  // document.getElementById('email-and-pssw-button').style.opacity='20%';
}

const hideEmailAndPassRegisterForm = () => {
  document.getElementById('emailandpass-register-form').style.display = 'none';
}
const showEmailAndPassRegisterForm = () => {
  document.getElementById('emailandpass-register-form').style.display = 'block';
  hideLinkedinRegisterForm();
  hideGoogleRegisterForm();
}

const toggleConfirmPassword = () => {
  //Toggles between showing and hiding password
  setShowConfirmPassword(!showConfirmPassword);
};

const handlePasswordStrength = () => { 
  setPasswordStrength(document.querySelector("progress").value);
}

const responseFromGoogle = response => {
  console.log(response);
  if (response.profileObj){
    axios({
      method: 'get',
      url: `${URL}/user/loginGoogle/${response.profileObj.email}`
    }).then(res => {
      window.localStorage.setItem('token',res.data.user['token'])
        const data = res.data.user
        const path = {
          pathname: '/',
          state: data,
        }
        props.history.push(path)
      }).catch(err => {
        axios({
          method: 'post',
          url: `${URL}/googleRegistration/${response.profileObj.email}`,
          data: { email: response.profileObj.email },
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
        });

        setIsRegistered(true)
      });
    }else{
      console.log("Fail")
      console.log(response)
    }
  };

  const handlePassword = (e) => {
    let password = e.target.value
    let passwordarray = []
    if(!password.match(".{8,}"))
      passwordarray.push('8 characters')
    if(!password.match("(?=.*?[0-9])"))
      passwordarray.push('1 digit')
    setCheckPassword(passwordarray)
  }

  const checkTerm = () => {
    if(!document.getElementById('terms-co-check-linkedin').checked){
      notify.show('Please accept terms and condtions.');
    }else{
      window.location = `${PORT}/auth/linkedin/login`
    }
  };

  const setGoolgeButton = () => {
    if(!document.getElementById('terms-co-check-google').checked){
      notify.show('Please accept terms and condtions.');
      setIsGoolgeButton(false)
    }
  }

  const handleAcceptBox = () => {
    if(!document.getElementById('terms-co-check-google').checked){
      setIsGoolgeButton(true)
    }else{
      setIsGoolgeButton(false)
    }
  }

  const showTermsAndCo = () => {
    document.getElementById('modal-container-TermsAndCo').style.display = 'block';
    //document.getElementById("container").style.height = "0px";
  };
  const hideTermsAndCo = () => {
    document.getElementById('modal-container-TermsAndCo').style.display = 'none';
  };
  const acceptButtonCheck = flag => {
    if (flag){
      document.getElementById('terms-co-check').checked = true;
      setIsGoolgeButton(false)
    }else{
      document.getElementById('terms-co-check').checked = false;
      setIsGoolgeButton(true)

    }
  };

  return (
    <>
      {/* If isRegistered is true => redirect to home; else stay at login */}
      {isRegistered ? (
        <Redirect to={{ pathname: '/beforeEmailConfirm' , emailId : email}} />
      ) : null}
      <div className='row'>
        <div className='col-xl-6 col-lg-12 auth-left mobile-background-registration'>
          <div className='row auth-form p-0 login-form-container'>
            <div className='col-12 '>

              {/* large screen */}
              <div className='auth-text-top small-screen-disappear login-welcome-back'>
                Welcome
              </div>

              {/* small screen */}
              <div className='auth-text-top row small-screen-appear d-none'>
                <img src={logo} alt="logo" className="logo logo-before-profile" />
            
{/*                <div className="d-flex row">
                  <Link to='/login' className="loat-left mx-auto login-inactive">LOGIN</Link>
                  <h4 className="float-right mx-auto login-active">SIGNUP</h4>
                </div>
                  
                <hr className="w-100 white-border"></hr>*/}
                
          </div>
              
              <div className="row justify-content-center ">
                <div className="google-button-style">
{/*                  <div id='google-register-button'
                    onClick={showGoogleRegisterForm}
                    className='h-60 btn btn-block btn-c mx-2 my-2 google-button gray-shadow-box '
                    style={{ width: '100%' }}>
                      <GoogleLogin
                        className='pr-0 google-button google-register-button opacity-100'
                        disabled={true}
                        buttonText=''    >
                      </GoogleLogin>
                  </div>*/}

                  <div className="google-button-style">
                    <GoogleLogin
                        className='btn btn-block btn-c mx-2 my-2 gray-shadow-box'
                        clientId={googleurl}
                        buttonText='Sign up with Google'
                        onSuccess={responseFromGoogle}
                        onFailure={responseFromGoogle}
                        cookiePolicy={'single_host_origin'}
                        theme = 'dark'
                    />
                  </div>
                
                </div>
{/*                <LinkedInLoginButton
                  id='linkedin-register-button'
                  // onClick={showLinkedinRegisterForm} 
                  // disabled={isGoolgeButton} 
                  disabled={true}
                  align={'center'}
                  className='h-60 w-60 linkedin-button my-auto ml-3 mr-4'
                  // style={{ background: 'rgb(26, 129, 185)' }}
                  >
                   <span>LinkedIn</span>
                  <span> </span>
                </LinkedInLoginButton>
                <button
                  id="email-and-pssw-button"
                  className="h-60 w-60 btn btn-primary btn-block btn-c my-auto primary-button-no-margin-hover rt-button"
                  disabled={isSendingEmail}
                  onClick={showEmailAndPassRegisterForm}
                  ><i className='mdi mdi-email rt-button-icon'></i>
                </button>*/}
              </div>

              <div className="login-divider-google-and-email">
                <Divider horizontal>Or</Divider>
              </div>

              

          {/* register with email & password form */}
          <div id='emailandpass-register-form'>
            <form 
              className="padding-for-login-form  mt-4 white-bcg small-screen-small-padding"
              id='form-register'
              onSubmit={handleSubmit}>
              {/* <h5 className="text-center mb-4 text-gradient">Register with Email & Password</h5> */}
{/*              <p className="text-gradient">Please, accept Terms and Conditions to register with us</p>
              <div className=" form-check text-center terms-and-conditions-check h-45 pt-2">
                <div id="r8-balloon-radio-group-wrapper-register">
                  <ul className="register-check-agree">
                    <li>
                      <input className="radio r8-radio-float"
                            id="terms-co-check" type="checkbox"
                            name="balloon-radio-group"/>
                    </li>
                  </ul>
                </div>
                <label htmlFor="terms-co-check" onClick={handleAcceptBox} id="terms-co-check-accept">I Accept</label>
                <label id ="terms-and-conditions-link" onClick={showTermsAndCo} >&nbsp;Terms and Conditions</label>
              </div>*/}


              <div className='form-group mb-1'>
                <label>Email</label>
                <div className='input-icon'>
                  <i className='mdi mdi-email' />
                  <input
                    type='email'
                    className='form-control rt-input'
                    placeholder='name@email.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                   // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                   pattern ="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|yahoo|outlook)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    title="Please register with email other than Yahoo, Hotmail and Outlook"
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className='form-group mb-0 small-screen-small-detail-text'>
                <label>Password</label>{checkPassword.length>0 ?
                    (checkPassword.length>1 ?
                    " must contain "+checkPassword[0]+" including "+checkPassword[1]
                    :" must contain "+checkPassword[0] )
                    :null}
                <div className='input-icon'>
                  <i className='mdi mdi-lock' />
                  <span
                    className='passtoggle mdi mdi-eye toggle-'
                    onClick={togglePassword}
                  />
                  <input
                    // if showPassword is true => type = text; else type = password
                    type={showPassword ? 'text' : 'password'}
                    className='form-control rt-input mb-0'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={e => (setPassword(e.target.value),handlePassword(e))}
                    required
                  />
                  <PasswordStrengthMeter password={password} />
                </div>
              </div>
              <div className='form-group mt-0'>
                <label>Confirm Password</label>
                <div className='input-icon'>
                  <i className='mdi mdi-lock' />
                  <span
                    className='passtoggle mdi mdi-eye toggle-'
                    onClick={toggleConfirmPassword}
                  />
                  <input
                    // if showPassword is true => type = text; else type = password
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={confirmPassword!=''?password==confirmPassword?'form-control rt-input':'error-form-control form-control rt-input':'form-control rt-input'}
                    placeholder='Repeat Your Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* <div className=" form-check text-center terms-and-conditions-check h-45 pt-2"> */}
                <div className="form-check text-center terms-and-conditions-check h-45 pt-2">
                <div id="r8-balloon-radio-group-wrapper-register">
                  <ul className="register-check-agree">
                    <li className="singup-radio-button-list">
                      <input className="radio r8-radio-float"
                             id="terms-co-check" type="checkbox"
                             name="balloon-radio-group"/>
                    </li>
                  </ul>
                </div>
                <div className="signup-tac">
                <label htmlFor="terms-co-check" onClick={handleAcceptBox} id="terms-co-check-accept">I Accept</label>
                <label id ="terms-and-conditions-link" onClick={showTermsAndCo} >&nbsp;Terms and Conditions</label>
                </div>
              </div>
            
              
                

              
              

                {/* large screen */}
                <div className="row sign-up-footer small-screen-disappear justify-content-center">
                  <div className="signup-submit-btn">
                    <button
                      className="pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-login-submit btn-c"
                      onClick={handlePasswordStrength}>
                      Submit
{/*                      {isSendingEmail ? (
                        <Spinner size='lg' spinning='spinning' />
                      ) : (
                        'Submit'
                      )}*/}
                    </button>
                  </div>
                </div>

                {/* small screen */}
                <div className="row qualification-footer  small-screen-appear d-none">
                  <div className="col-md-7 mb-1">
                    <button
                      className="pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c "
                      disabled={isSendingEmail}
                      onClick={handlePasswordStrength}>
                      Submit
{/*                      {isSendingEmail ? (
                        <Spinner size='lg' spinning='spinning' />
                      ) : (
                        'Submit'
                      )}*/}
                    </button>
                  </div>
                </div>
              <div>
                <p className="mb-0 mt-4 text-center">
                  <div className="login-link-to-create-account"> Already have an account? <Link to='/login'>Sign in -></Link>
                  </div></p>
              </div>

            </form> 
          </div>
              
          {/* register with linkedin form */}
          <div id='linkedin-register-form' className="white-bcg">
            <div 
              className="p-5 gray-shadow-box mt-4" 
              id='form-register'
              >
              {/* <h5 className="text-center mb-4 text-gradient">Register with LinkedIn</h5> */}
              <p className="text-gradient">Please, accept Terms and Conditions to register with us</p>
              <div className=" form-check text-center terms-and-conditions-check h-45 pt-2">
  {/*              <input  id="terms-co-check" type="checkbox" className="check-filter rt-input" />*/}
                <div id="r8-balloon-radio-group-wrapper-register">
                  <ul className="register-check-agree">
                    <li>
                      <input className="radio r8-radio-float"
                            id="terms-co-check-linkedin" type="checkbox"
                            name="balloon-radio-group"
                            />
                    </li>
                  </ul>
                </div>
                <label htmlFor="terms-co-check" onClick={handleAcceptBox} id="terms-co-check-accept">I Accept</label><label id ="terms-and-conditions-link" onClick={showTermsAndCo} >&nbsp;Terms and Conditions</label>
              </div>
              <hr className="qualification-line mb-3"></hr>
              
              {/* large screen */}
              <div className="row qualification-footer small-screen-disappear">
                <div className="col-md-5 mb-1">
                  <button 
                    onClick={hideLinkedinRegisterForm}
                    className="btn btn-block btn-c secondary-button-no-margin-hover">
                    Cancel
                  </button>
                </div>
                <div className="col-md-7">
                  <button
                    className="pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c linkedin-button"
                    onClick={checkTerm}>
                    {isSendingEmail ? (
                      <Spinner size='lg' spinning='spinning' />
                    ) : (
                      'Register with LinkedIn'
                    )}
                  </button>
                </div>
              </div>
              {/* small screen */}
              <div className="row qualification-footer  small-screen-appear d-none">
                <div className="col-md-7 mb-1">
                  <button
                    className="pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c linkedin-button"
                    onClick={checkTerm}>
                    {isSendingEmail ? (
                      <Spinner size='lg' spinning='spinning' />
                    ) : (
                      'Register with LinkedIn'
                    )}
                  </button>
                </div>
                <div className="col-md-5">
                  <button 
                    onClick={hideLinkedinRegisterForm}
                    className="btn btn-block btn-c secondary-button-no-margin-hover">
                    Cancel
                  </button>
                </div>
              </div>

            </div>  
          </div>

          {/* register with google form */}
          <div id='google-register-form' className="white-bcg">
            <div className="p-5 gray-shadow-box mt-4" id='form-register'>
              <p className="text-gradient">Please, accept Terms and Conditions to register with us</p>
              
              <div className=" form-check text-center terms-and-conditions-check h-45 pt-2">
                <div id="r8-balloon-radio-group-wrapper-register">
                  <ul className="register-check-agree">
                    <li>
                      <input className="radio r8-radio-float"
                        id="terms-co-check-google" type="checkbox"
                        name="balloon-radio-group"
                        onClick={handleAcceptBox}
                        />
                    </li>
                  </ul>
                </div>
                <label htmlFor="terms-co-check" onClick={handleAcceptBox} id="terms-co-check-accept">I Accept</label><label id ="terms-and-conditions-link" onClick={showTermsAndCo} >&nbsp;Terms and Conditions</label>
              </div>
              {/* <h5 className="text-center mb-4 text-gradient">Register with Google</h5> */}
              <hr className="qualification-line mb-3"></hr>

              {/* large screen */}
              <div className="row qualification-footer small-screen-disappear">
                <div className="col-md-5 mb-1">
                  <button 
                    onClick={hideGoogleRegisterForm}
                    className="btn btn-block btn-c secondary-button-no-margin-hover">
                    Cancel
                  </button>
                </div>
                <div className="col-md-7">
                  <GoogleLogin
                    className='pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c google-button text-white p-2 opacity-100'
                    clientId={googleurl}                  
                    onSuccess={responseFromGoogle}
                    onFailure={responseFromGoogle}
                    disabled={isGoolgeButton} 
                    cookiePolicy={'single_host_origin'}>                                                                              
                    <div 
                      className="small-screen-google-button"
                      onClick={setGoolgeButton} 
                      style={{width: '100%'}}>
                      Register with Google{' '}
                    </div>
                  </GoogleLogin>
                </div>
              </div>
              {/* small screen */}
              <div className="row qualification-footer  small-screen-appear d-none">
                <div className="col-md-7 mb-1">
                  <GoogleLogin
                    className='pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c google-button text-white p-2 opacity-100'
                    clientId={googleurl}                  
                    onSuccess={responseFromGoogle}
                    onFailure={responseFromGoogle}
                    disabled={isGoolgeButton} 
                    cookiePolicy={'single_host_origin'}>                                                                              
                    <div 
                      className="small-screen-google-button"
                      onClick={setGoolgeButton} 
                      style={{width: '100%'}}>
                      Register with Google{' '}
                    </div>
                  </GoogleLogin>
                </div>
                <div className="col-md-5">
                  <button 
                    onClick={hideGoogleRegisterForm}
                    className="btn btn-block btn-c secondary-button-no-margin-hover">
                    Cancel
                  </button>
                </div>
              </div>
              
            </div> 
            
          </div>



              
              
              
             
              
              
            </div>
          </div>
           <div id='modal-container-TermsAndCo' className='status-modal'>
                <div id='terms-co-box'>
                  <div onClick={hideTermsAndCo} className='dot'></div>
                  <h1 className='status-alert'>
                    EDUCATOR Ts & Cs</h1>
                  <div className='status-alert-message overflow-auto'>
                    
                    <p className='terms-co-box-subtitle'>                      
                      ReadyTeacher provides the ReadyTeacher digital platform that 
                      connects CRICOS registered teaching and training organisations 
                      and study tour providers with relief and contract teachers.                
                    </p>
                    <ol className="ordered">
                    <h4>
                      <li className="list"> TERMS AND CONDITIONS OF USE</li></h4>
                    <p>
                      <ol className ="ordered">
                        <li className ="list">The Educator agrees that ReadyTeacher may propose Placements 
                            for the Educator at Colleges.</li>
                        <li className ="list">Where the Educator accepts a Placement, the Educator agrees that:
                          <ol className ="ordered">
                            <li className ="list">ReadyTeacher shall charge the College the Educator Rate and collect Superannuation on behalf of the Educator; and</li>
                            <li className ="list">The Educator will pay to ReadyTeacher (by way of deduction by ReadyTeacher) a 10% Placement Fee.</li>
                          </ol>
                        </li>
                        <li className ="list">ReadyTeacher will make Placements:
                          <ol className ="ordered">
                            <li className ="list">Via the Platform; and/or</li>
                            <li className ="list">Dealing directly with the Educator and the College.</li>
                          </ol>
                        </li>
                        <li className ="list">To use the Platform, the Educator must also accept the Terms of Service and Privacy Policy when registering on the Platform.</li>
                        <li className ="list">The Educator must provide ReadyTeacher with its own ABN in order to receive payments from ReadyTeacher.</li>
                        <li className ="list">As a material condition of this Agreement, the Educator warrants that:
                          <ol className ="ordered">
                            <li className ="list">All information it submits to ReadyTeacher, or a College, is true and accurate to the best of the Educator’s knowledge, including with regard to the Educator’s experience and work history;</li>
                            <li className ="list">It is holds all current qualifications and licences it represents as holding; and</li>
                            <li className ="list">It will only accept Placements for which it is suitably qualified and experienced.</li>
                          </ol>
                        </li>
                      </ol>                     
                    </p>

                    
                    <h4><li className ="list">RELATIONSHIP</li></h4>
                    <p>
                      <ol className ="ordered">
                        <li className ="list">The Educator agrees and acknowledges that:
                          <ol className ="ordered">
                            <li className ="list">The Educator is not an employee or subcontractor of ReadyTeacher, and the Educator does not provide any services to Colleges on behalf of ReadyTeacher;</li>
                            <li className ="list">ReadyTeacher is only the Educator’s agent for the purpose of arranging Placements and receiving payments from the College;</li>
                            <li className ="list">The Educator is not an employee of the College; and</li>
                            <li className ="list">ReadyTeacher is not an agent of the College.</li>
                          </ol>
                        </li>
                        <li className ="list">The Educator agrees that it is solely responsible for the provision of its services to the College.</li>
                        <li className ="list">ReadyTeacher is under no obligation to ensure that an Educator receives a Placement, and makes no warranty or representation that:
                          <ol className ="ordered">
                            <li className ="list">The Educator will receive a Placement; or</li>
                            <li className ="list">That a Placement will last for a particular duration.</li>
                          </ol>
                        </li>
                        <li className ="list">ReadyTeacher accepts no responsibility for any Placement that is cancelled.</li>
                        <li className ="list">In no event may an Educator sub-contract a Placement to a third-party.</li>
                      </ol>
                    </p>
                    <h4><li className ="list">INTRODUCTIONS, EXCLUSIVITY AND ONGOING PLACEMENTS</li></h4>
                    <p>
                      <ol className ="ordered">
                        <li className ="list">In the event that an Educator is introduced to a College via the ReadyTeacher Platform, this is considered as a ReadyTeacher Introduction.</li>
                        <li className ="list">In the event that an Educator is introduced to a College via Seek.com or by self-introduction (cold-calling or CV drop-in), this is considered as a Self-introduction.</li>
                        <li className ="list">In the event of a ReadyTeacher-Teacher Introduction, whereby a successfully matched placement has occurred and the Parties wish to continue their relationship outside the Platform, the College is required to observe a 4-week (or 80-hour) Fee-free Employee Trial (FET). The College should not use the ReadyTeacher Platform to source ongoing staff at a cost to ReadyTeacher.</li>
                        <li className ="list">In the event whereby a successfully matched placement has occurred and the Parties wish to continue their relationship outside the Platform, and the College and Educator fail to complete a 4-week (or 80-hour) Fee-free Employee Trial (FET), both parties will be excluded from the Platform without appeal.</li>                        
                      </ol>
                    </p>
                    <h4><li className ="list">LIABILITY AND INDEMNITY</li></h4>
                    <ol className ="ordered">
                      <p>
                        <li className ="list">The Educator agrees to indemnify ReadyTeacher for any loss, damage, cost or expense that ReadyTeacher may suffer or incur as a result of or in connection with:
                          <ol className ="ordered">
                            <li className ="list">The Educator’s conduct on a Placement; and</li>
                            <li className ="list">The Educator’s breach of this Agreement and/or the Terms of Service.</li>
                          </ol>
                        </li>

                      </p>
                    </ol>
                    </ol>
                    <br />
                     {/* large screen */}
                    <div className="row small-screen-disappear" style={{margin:'0px'}}>
                      <div className="col-md-6">
                        <button onClick={(event) => { acceptButtonCheck(false); hideTermsAndCo();}} className="btn btn-block btn-c secondary-button-no-margin-hover">Cancel</button>
                      </div>
                      <div className="col-md-6 pr-4 register-alert-button">
                        <button onClick={(event) => { acceptButtonCheck(true); hideTermsAndCo();}} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">Accept</button>
                      </div>
                    </div> 

                    {/* small screen */}
                    <div className="row small-screen-appear d-none" style={{margin:'0px'}}>
                      <div className="col-md-6 pr-4 register-alert-button mb-1">
                        <button onClick={(event) => { acceptButtonCheck(true); hideTermsAndCo();}} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">Accept</button>
                      </div>
                      <div className="col-md-6">
                        <button onClick={(event) => { acceptButtonCheck(false); hideTermsAndCo();}} className="btn btn-block btn-c secondary-button-no-margin-hover">Cancel</button>
                      </div>
                    </div>   
                <br />                 
                  </div>                  
                </div>         
              </div>
             
        </div>
        <div className='col-xl-6 auth-right d-xl-flex d-none bg-photoregister'>
          <div className='bg-gradient'></div>

          <div className='logo-container'>
            <img src={logo} alt='logo' className='logo logo_right' />
          </div>

          <div className='shape'></div>
        </div>
      </div>
    </>
  );
};

export default Register;
