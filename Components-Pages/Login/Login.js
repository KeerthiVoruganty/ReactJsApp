import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Divider } from 'semantic-ui-react'
import axios from 'axios';
import { PORT } from '../../config';
import logo from '../../assets/img/logo_right-removebg.png';
import './Login.css';
import { googleurl } from '../../config';
import { GoogleLogin } from 'react-google-login';
import { notify } from 'react-notify-toast';
import { LinkedInLoginButton } from "react-social-login-buttons"; 

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const URL = PORT;
  const linkedinAPI = `${PORT}/auth/linkedin/login`
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const handleSubmit = event => {
    event.preventDefault();
    // if remember me checked the expire time would be three month
    // else 1 day
    const token_exp = document.querySelector("#remember").checked ? (3600 * 24 *30 * 3) : (3600 * 24 * 15)
    axios
      .post(`${URL}/login`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':  'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials':true
        },
        user: {
          email,
          password,
          token_exp
        }
      })
      .then(res => {
        window.localStorage.setItem('token',res.data.user['token'])
        const data = res.data.user
        const path = {
          pathname: '/',
          state: data,
        }
        props.history.push(path)
      })
      .catch(err => {
        if(err.response.data.error !== 'User is not verified'){
          notify.show('Invalid Email address or password.');
        }
        else{
          notify.show('User must verify the email.');
        }
      });
  };

/*  const hideEmailAndPassLoginForm = () => {
    document.getElementById('emailandpass-login-form').style.display = 'none';
  }
  const showEmailAndPassLoginForm = () => {
    document.getElementById('emailandpass-login-form').style.display = 'block';
  }*/

  const togglePassword = () => {
    setShowPassword(!showPassword);
    
  };

  const responseFromGoogle = (response) => {
    const { history } = props;
    console.log(response)
    if (response.profileObj){
      axios({
        method: 'get',
        url: `${URL}/user/loginGoogle/${response.profileObj.email}`
      }).then(res => {
        const data = res.data.user
        let path = "";
        if(data.email_verification_status){
         path = {
          pathname: '/',
          state: data,
        }
        history.push(path)
        window.localStorage.setItem('token',res.data.user['token'])
        }else{
          path = `/confirm?id=${data._id}`
            // state: data,
          window.location.href = path;
          }
       
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
            const path = {
              pathname: '/beforeEmailConfirm',
            }
           history.push(path)
          })
          .catch(err => {
            console.log(err)
        });
        
      });
    }else{
      console.log("Fail")
      console.log(response)
    }
  }

  return (
    <>
      <script src='https://apis.google.com/js/platform.js' async defer></script>
      <div className='row'>
        <div className='col-lg-6 auth-left mobile-background-registration'>

          <div className='row auth-form p-0 login-form-container'>
            <div className='col-12 col-sm-12'>

              {/* large screen */}
              <div className='auth-text-top small-screen-disappear login-welcome-back'>
                Welcome Back
              </div>
              

              {/* small screen */}
              <div className='auth-text-top row small-screen-appear d-none'>
                <img src={logo} alt="logo" className="logo logo-before-profile" />

{/*                <div className="d-flex row">
                  <h4 className="float-left mx-auto  login-active">LOGIN</h4>
                  <Link to='/register' className="float-right mx-auto login-inactive">SIGNUP</Link>
                </div>

                <hr className="w-100 white-border"></hr>*/}
            
              </div>




              <div className="row justify-content-center">
                <div className="google-button-style">
                  <GoogleLogin
                    className='btn btn-block btn-c mx-2 my-2 gray-shadow-box'
                    clientId={googleurl}
                    buttonText='Login in with Google'
                    onSuccess={responseFromGoogle}
                    onFailure={responseFromGoogle}
                    cookiePolicy={'single_host_origin'}
                    theme = 'dark'
                  />
                </div>
{/*                <a
                  // href={linkedinAPI}
                  className="my-auto ml-3 mr-4 "
                  title="Login with Linkedin">
                  <LinkedInLoginButton
                    align={"center"}
                    className="h-60 w-60 linkedin-button my-auto "
                    text=""/>
                </a>
                <button
                  id="email-and-pssw-button"
                  title="Login with Email & Password"
                  className="h-60 w-60 btn btn-primary btn-block btn-c my-auto primary-button-no-margin-hover rt-button"
                  onClick={showEmailAndPassLoginForm}
                  ><i className='mdi mdi-email rt-button-icon'></i>
                </button>*/}
              </div>

              <div className="login-divider-google-and-email">
                <Divider horizontal>Or</Divider>
              </div>


              {/* register with email & password form */}
              <div id='emailandpass-login-form'>
                <form onSubmit={handleSubmit} className="padding-for-login-form mt-4 white-bcg small-screen-small-padding" >

                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <div className='input-icon'>
                      <i className='mdi mdi-email'></i>
                      <input
                        type='email'
                        className='form-control rt-input'
                        id='email'
                        name='email'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <div className='input-icon'>
                      <i className='mdi mdi-lock'></i>
                      <span
           F             className='passtoggle mdi mdi-eye toggle-'
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
                    </div>
                  </div>

                  <div className='d-flex form-check terms-and-conditions-check'>
                    <div id="r8-balloon-radio-group-wrapper-login">
                      <ul>
                        <li>
                          <input className="radio r8-radio-float"
                            type='checkbox'
                            id='remember'
                            name="balloon-radio-group"/>
                        </li>
                      </ul>
                    </div>
                    <label htmlFor='remember'>Remember me</label>
                    <Link className='ml-auto font-s' to='/resetSendEmail'>Forgot Password?</Link>
                  </div>

                  {/* large screen */}
                  <div className="row qualification-footer small-screen-disappear justify-content-center">
                    <div className="mb-1">
                      <button
                          type='submit'
                          className='pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-login-submit btn-c'>
                        Login
                      </button>
                    </div>
                  </div>

                  {/* small screen */}
                  <div className="row qualification-footer small-screen-appear d-none">
                    <div className="col-md-7 mb-1">
                      <button
                        type='submit'
                        className='pr-0 btn btn-primary btn-block primary-button-no-margin-hover btn-c'>
                        Login
                      </button>
                    </div>
                  </div>

                </form>
              </div>

              <div className="login-link-to-create-account">
                New User?{' '}
                <Link to='/RegisterOption'>Create Account -></Link>
              </div>



            </div>
          </div>
        </div>
        <div className='col-lg-6 auth-right d-lg-flex d-none bg-photoregister'>
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

export default Login;
