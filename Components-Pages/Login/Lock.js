import React from 'react'
import logo from "../../assets/img/logo.png"

const Lock = () => {

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Testing')
    }

    return (
        <div className="row">
            <div className="col-lg-6 auth-left">
                <div className="row auth-form mb-4">
                    <div className="col-12 col-sm-12">
                        <div className="auth-text-top mb-4 text-center">
                            <div className="rounded-polygon">
                                <img src="assets/img/avatar.jpg" className="img-thumbnail" alt="" />
                            </div>
                            <small>Password to unlock</small>
                        </div>
                        <form>
                            <div className="form-group">
                                <label htmlfor="password">Password</label>
                                <div className="input-icon">
                                    <i className="mdi mdi-lock"></i>
                                    <span className="passtoggle mdi mdi-eye toggle-password"></span>
                                    <input 
                                        type="password" 
                                        className="form-control rt-input" 
                                        id="password" 
                                        name="password"
                                        placeholder="Enter Your Password" 
                                        autoFocus 
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-c mt-4 mb-4">Login</button>
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

export default Lock
