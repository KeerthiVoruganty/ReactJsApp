import React, {useState} from 'react';
import logo from '../../assets/img/logo.png';
import {PORT} from '../../config';
import axios from 'axios';
import { notify } from 'react-notify-toast';


const ResetSendEmail = (props) => {
  const [email, setEmail] = useState ('');
  const URL = PORT;

  const handleSendEmail = event => {
    event.preventDefault()
    axios.post (`${URL}/resetSendEmail`, {
        user:{
          email
        }    
      })
      .then (res => {
        props.history.push("/login")
        notify.show("Check your email to reset the password.")        
      })
      .catch (err => {
        notify.show("User not found.");
      });    
  };

  return (
    <div className="row">
      <div className="col-lg-6 auth-left">
        <div className="row auth-form mb-4 small-screen-reset-password-container login-form-container">
          <div className="col-12 col-sm-12">
            <div className="auth-text-top mb-4">
              <h1>Reset Password</h1>
              <hr />
              <small>
                Enter your email address and we'll send you an email with instructions to reset your password.
              </small>
            </div>
            <form onSubmit={handleSendEmail}>
              <div className="form-group">
                <label >Email Address</label>
                <div className="input-icon">
                  <i className="mdi mdi-email" />
                  <input
                    type="email"
                    className="form-control rt-input"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                  />
                </div>
              </div>
              <button                
                className="btn btn-primary btn-block btn-c mt-5 mb-4"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6 auth-right d-lg-flex d-none bg-photoregister">

        <div className="bg-gradient" />

        <div className="logo-container">

          <img src={logo} alt="logo" className="logo" />

          <div className="heading">
            {/* <h2>Welcome to </h2> */}
            <h2 className="name"> ReadyTeacher</h2>
            <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
          </div>
        </div>

        <div className="shape" />
      </div>
    </div>
  );
};

export default ResetSendEmail;
