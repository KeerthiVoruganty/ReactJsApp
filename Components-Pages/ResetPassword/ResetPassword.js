import React, { useState } from 'react'
import logo from "../../assets/img/logo.png"
import axios from 'axios'
import { PORT } from '../../config'
import { notify } from 'react-notify-toast';
import PasswordStrengthMeter from '../Register/PasswordStrengthMeter';

// This page is opened when user opens the link reveived through email.
const ResetPassword = (props) => {
    const id = window.location.search.substring(1).split('id=')[1]
    
    axios.get(`${PORT}/user/${id}`)
    .then( res => {
        //console.log(res.data.user.email)
        setEmail(res.data.user.email)
    }).catch( err => {
      console.log(err)
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState(false);
    
    /*const handleResetPassword = (event) => {
        event.preventDefault()
        console.log('Testing')
    }*/
    
    const togglePassword = () => {
        //Toggles between showing and hiding password
        setShowPassword(!showPassword)
    }

    const toggleConfirmPassword = () => {
        //Toggles between showing and hiding password
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleSubmit = (event) => {
        console.log(document.querySelector("progress").value)
        event.preventDefault()
        if(password === confirmPassword){
            if(parseInt(document.querySelector("progress").value) >= 3){
            setError(false);
            //console.log(email," ",password)
            axios.put(`${PORT}/ResetPassword`,{
                email:email,
                password:password
            })
            .then( res => {
                console.log("data sent to backend")
                props.history.push("/login")
                notify.show("Your password is updated")
                
                
            })
            .catch( err => {
                console.log('ResetPassword.js: ',err)
            })
        }
    else {
        notify.show("Please set atleast Good strength password")
    }
} else {
            setError(true);
            //notify.show("Password doesn't match with the comfirmed password.")
        }
    }

    return (
        <div className="row">
            <div className="col-lg-6 auth-left">
                <div className="row auth-form mb-4 login-form-container small-screen-reset-password-container">
                    <div className="col-12 col-sm-12">
                        <div className="auth-text-top mb-4">
                            <h1>Reset Password</h1>
                            <hr></hr>
                            <small>Enter your new password.</small>
                        </div>
                        <form>
                            <div className="form-group">
                                <label htmlfor="email">Email Address</label>
                                <div className="input-icon">
                                    <i className="mdi mdi-email"></i>
                                    <input 
                                        className="form-control rt-input" 
                                        id="email" 
                                        name="email"
                                        value={email}
                                        placeholder="Enter Your Email" 
                                        autoFocus 
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-1">
                                <label>Password</label>
                                <div className="input-icon">
                                    <i className="mdi mdi-lock" />
                                    <span
                                    className="passtoggle mdi mdi-eye toggle-"
                                    onClick={togglePassword}
                                    />
                                    <input
                                    // if showPassword is true => type = text; else type = password
                                    type={showPassword ? "text" : "password"}
                                    className="form-control rt-input"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    />
                                    <PasswordStrengthMeter password={password} />
                                </div>
                            </div>
                            <div className="form-group mt-0">
                                <label>Confirm Password</label>
                                <div className="input-icon">
                                    <i className="mdi mdi-lock" />
                                    <span
                                    className="passtoggle mdi mdi-eye toggle-"
                                    onClick={toggleConfirmPassword}
                                    />
                                    <input
                                    // if showPassword is true => type = text; else type = password
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control rt-input"
                                    placeholder="Repeat Your Password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    />
                                    {error ? (
                                    <span class="error"> Password does not match </span>
                                    ) : null}
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="btn btn-primary btn-block btn-c mt-5 mb-4">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 auth-right d-lg-flex d-none bg-photoregister">

                    <div className="bg-gradient"></div>

                    <div className="logo-container">
                        
                        <img src={logo} alt="logo" className="logo"/>
                        
                        <div className="heading">
                            {/* <h2>Welcome to </h2> */}
                            <h2 className="name"> ReadyTeacher</h2>
                            <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
                        </div>
                    </div>
                    
                    <div className="shape"></div>
                </div>
        </div>
    );
}

export default ResetPassword
