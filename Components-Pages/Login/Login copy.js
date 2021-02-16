import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../../config';
import logo from '../../assets/img/logo.png';
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
    
  };

  const responseFromGoogle = (response) => {

    console.log(response)
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
            const path = {
              pathname: '/beforeEmailConfirm',
            }
            props.history.push(path)
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
        <div className='col-lg-6 auth-left'>
          <div className='row auth-form mb-4 login-form-container'>
            <div className='col-12 col-sm-12'>
              <div className='auth-text-top mb-5'>
                <h1>Welcome</h1>
                <hr></hr>
                <small>
                  Please login to your account or{' '}
                  <Link to='/register'>Create Account</Link>
                </small>
              </div>
              
              <form onSubmit={handleSubmit}>
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
                  </div>
                </div>
                <div className='d-flex form-check terms-and-conditions-check'>
{/*                  <input
                    type='checkbox'
                    className='check-filter'
                    id='remember'
                  />*/}
                  {/*change the radio style*/}
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
                <button type='submit' className='btn btn-primary btn-block btn-c mt-5 mb-4 login-button'>
                  Login
                </button>
                <p className='divider'>Or</p>
                <GoogleLogin
                  className='btn btn-block btn-c google-button login-button pt-0'
                  clientId={googleurl}
                  buttonText='Login with Google	'
                  onSuccess={responseFromGoogle}
                  onFailure={responseFromGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </form>
              <a href={linkedinAPI} className='login-button linkedin-button'>
                 <LinkedInLoginButton align={"center"} className="login-button"/>
              </a>
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
              <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
            </div>
          </div>

          <div className='shape'></div>
        </div>
      </div>
    </>
  );
};

export default Login;
