import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { notify } from 'react-notify-toast';
import Spinner from '../../Components/Spinner';
import { PORT } from '../../config';
import logo from '../../assets/img/logo.png';
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
      if (password === confirmPassword) {

        if(passwordStrength >= 3){
          if (document.getElementById('terms-co-check').checked === true) {
            setError(false);
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
                setIsRegistered(true);
              })
              .catch(err => {
                console.log('Register.js: ', err);
              });
          } else {
            notify.show('Please accept terms and condtions.');
          }
        }else{

          notify.show("Please set a stronger password");
        }
      } else {
        setError(true);
      }
    }
    const togglePassword = () => {
        //Toggles between showing and hiding password
        setShowPassword(!showPassword)
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

  const checkTerm = () => {
    if(!document.getElementById('terms-co-check').checked){
      notify.show('Please accept terms and condtions.');
    }else{
      window.location = `${PORT}/auth/linkedin/login`
    }
  };

  const setGoolgeButton = () => {
    if(!document.getElementById('terms-co-check').checked){
      notify.show('Please accept terms and condtions.');
      setIsGoolgeButton(true)
    }
  }

  const handleAcceptBox = () => {
    if(!document.getElementById('terms-co-check').checked){
      setIsGoolgeButton(false)
    }else{
      setIsGoolgeButton(true)
    }
  }

  const showTermsAndCo = () => {
    document.getElementById('modal-container-TermsAndCo').style.display =
      'block';
    //document.getElementById("container").style.height = "0px";
  };
  const hideTermsAndCo = () => {
    document.getElementById('modal-container-TermsAndCo').style.display =
      'none';
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
        <div className='col-lg-6 auth-left'>
          <div className='row auth-form mb-4 login-form-container'>
            <div className='col-12 col-sm-12'>
              <div className='auth-text-top mb-5'>
                <h1>Create Account</h1>(Teacher)
                <hr></hr>
                <small>
                  Already have an<Link to='/login'>account</Link>
                  ?
                </small>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-4'>
                  <label>Email</label>
                  <div className='input-icon'>
                    <i className='mdi mdi-email' />
                    <input
                      type='email'
                      className='form-control rt-input'
                      placeholder='name@email.com'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      autoFocus
                      required
                    />
                  </div>
                </div>
                <div className='form-group mb-1'>
                  <label>Password</label>
                  <div className='input-icon'>
                    <i className='mdi mdi-lock' />
                    <span
                      className='passtoggle mdi mdi-eye toggle-'
                      onClick={togglePassword}
                    />
                    <input
                      // if showPassword is true => type = text; else type = password
                      type={showPassword ? 'text' : 'password'}
                      className='form-control rt-input'
                      placeholder='Enter Your Password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                      className='form-control rt-input'
                      placeholder='Repeat Your Password'
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    {error ? (
                      <span class='error'> Password does not match </span>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex form-check terms-and-conditions-check">
                  <input  id="terms-co-check" type="checkbox" className="check-filter rt-input" />
                  <label htmlFor="terms-co-check" onClick={handleAcceptBox} id="terms-co-check-accept">I Accept</label><label id ="terms-and-conditions-link" onClick={showTermsAndCo} >&nbsp;Terms and Conditions</label>
                </div>

                <button
                  className="btn btn-primary btn-block btn-c mt-5 mb-4"
                  disabled={isSendingEmail}
                  onClick={handlePasswordStrength}
                >
                  {isSendingEmail ? (
                    <Spinner size='lg' spinning='spinning' />
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
              <div id='modal-container-TermsAndCo' className='status-modal'>
                <div id='terms-co-box'>
                  <div onClick={hideTermsAndCo} className='dot'></div>
                  <div className='status-alert-message'>
                    <h1 className='status-alert'>TERMS AND CONDITIONS!</h1>
                    <p className='terms-co-box-subtitle'>
                      {' '}
                      This agreements bla bla bla. <br></br>Please, accept
                      following agreement or you won't be able to register!!{' '}
                    </p>
                    <h4>Section 1</h4>
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
                    <h4>Section 2</h4>
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
                    <h4>Section 3</h4>
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
                  <button onClick={(event) => { acceptButtonCheck(false); hideTermsAndCo();}} className="term-n-co-button-cancel">I don't accept it</button>
                <button onClick={(event) => { acceptButtonCheck(true); hideTermsAndCo();}} className="term-n-co-button-ok btn">Accept</button>
                </div>         
              </div>
              <p className='divider'>Or</p>
              <GoogleLogin
                className='btn btn-block btn-c google-button'
                clientId={googleurl}
                disabled={isGoolgeButton}
                onSuccess={responseFromGoogle}
                onFailure={responseFromGoogle}
                cookiePolicy={'single_host_origin'}>
                <div onClick={setGoolgeButton} style={{ width: '100%' }}>
                  Register with Google{' '}
                </div>
              </GoogleLogin>
              <LinkedInLoginButton onClick={checkTerm} disabled={isGoolgeButton} align={'center'} className='login-button linkedin-button'>
                <span>Register with LinkedIn</span>
              </LinkedInLoginButton>
            </div>
          </div>
        </div>
        <div className='col-lg-6 auth-right d-lg-flex d-none bg-photoregister'>
          <div className='bg-gradient'></div>

          <div className='logo-container'>
            <img src={logo} alt='logo' className='logo' />

            <div className='heading'>
              {/* <h2>Welcome to </h2> */}
              <h2 className='name'> ReadyTeacher</h2>
            </div>
          </div>

          <div className='shape'></div>
        </div>
      </div>
    </>
  );
};

export default Register;
