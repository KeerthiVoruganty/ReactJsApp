import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import { PORT } from '../../config'
import logo from "../../assets/img/logo.png"
import './RegisterCollege.css';

const RegisterCollege = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState(false);

    const URL = PORT

    const handleSubmit = (event) => {
        event.preventDefault()
        if(password === confirmPassword){
            setError(false);
            axios.post(`${URL}/register`,{
                "user": {
                    email,
                    password,
                    "email_verification_status": false
                }
            })
            .then( res => {
                console.log(res)
                setIsRegistered(true)
            })
            .catch( err => {
                console.log('Register.js: ',err)
            })
        }
        else {
            setError(true);
        }
    }
    const togglePassword = () => {
        //Toggles between showing and hiding password
        setShowPassword(!showPassword)
    }

    return (
        <>
            {/* If isRegistered is true => redirect to home; else stay at login */}
            {isRegistered ? <Redirect to={{ pathname: "/" }} /> : null}
            <div className="row">
                <div className="col-lg-6 auth-left">
                    <div className="row auth-form mb-4 login-form-container">
                        <div className="col-12 col-sm-12">
                            <div className="auth-text-top mb-5">
                                <h1>Create Account</h1>(College)
                                <hr></hr>
                                <small>Already have an account?</small>
                            </div>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                    <label>Institute Name</label>
                                    <div className="input-icon">
                                    <i className="mdi mdi-home-modern" />
                                        <input 
                                        type="text" 
                                        className="form-control rt-input" 
                                        id="institutename" 
                                        name="institutename" 
                                        placeholder="Enter The Institute Name"
                                        autoFocus 
                                        required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label>Email</label>
                                    <div className="input-icon">
                                        <i className="mdi mdi-email" />
                                        <input
                                            type="email"
                                            className="form-control rt-input"
                                            placeholder="Enter Your Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            autoFocus
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-1">
                                    <label>Password</label>
                                    <div className="input-icon">
                                        <i className="mdi mdi-lock" />
                                        <span className="passtoggle mdi mdi-eye toggle-" onClick={togglePassword}/>
                                        <input
                                        // if showPassword is true => type = text; else type = password
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control rt-input"
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mt-0">
                                    <label>Confirm Password</label>
                                    <div className="input-icon">
                                        <i className="mdi mdi-lock" />
                                        <span className="passtoggle mdi mdi-eye toggle-" onClick={togglePassword} />
                                        <input
                                        // if showPassword is true => type = text; else type = password
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control rt-input"
                                            placeholder="Repeat Your Password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        {error ? <span class="error"> Password does not match </span> : null}
                                    </div>
                                </div>
                                <div className="d-flex form-check terms-and-conditions-check">
                                    <input type="checkbox" className="check-filter rt-input" />
                                    <label >I Accept Terms and Conditions</label>
                                </div>

                                <button className="btn btn-primary btn-block btn-c mt-5 mb-4">Register</button>
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
                        </div>
                    </div>
                    
                    <div className="shape"></div>
                </div>
            </div>
        </>
    );
}

export default RegisterCollege

