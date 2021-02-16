import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Divider } from 'semantic-ui-react'
import { notify } from 'react-notify-toast';
import Spinner from '../../Components/Spinner';
import { PORT } from '../../config';
import logo from '../../assets/img/logo_right-removebg.png';
import teacherLogo from '../../assets/img/teacher.jpg';
import institutionLogo from '../../assets/img/institution.jpg';
import './Register.css';
import { Image, Item } from 'semantic-ui-react'
import { googleurl } from '../../config';
import { GoogleLogin } from 'react-google-login';
import PasswordStrengthMeter from './PasswordStrengthMeter';



const RegisterOption = (props) => {


    return (
        <>
            <div className='row'>
                <div className='col-xl-6 col-lg-12 auth-left mobile-background-registration'>
                    <div className='row auth-form p-0 login-form-container'>
                        <div className='col-12 '>

                            {/* large screen */}
                            <div className='auth-text-top login-welcome-back'>
                                Welcome to ReadyTeacher
                            </div>


                            <div className="row justify-content-center">
                                <div className="vice-tittle-for-register-option">Which of these best describes you?</div>
                            </div>

                            <div className="row justify-content-center register-option-content">
                                <Item.Group>
                                    <Item className="register-option-teacher-item">
                                        <Item.Image size='tiny' src={teacherLogo} />
                                        {/* https://react.semantic-ui.com/images/wireframe/image.png */}

                                        <Link to='/Register'  className="link-to-register">
                                        <Item.Content className="register-option-item-content">
                                            <Item.Header>I'm a Teacher</Item.Header>
                                            <Item.Meta>Get access to teaching opportunities</Item.Meta>
                                        </Item.Content>
                                        </Link>
                                    </Item>
                                        <Item className="isDisabled register-option-institute-item ">
                                            <Item.Image size='tiny' src={institutionLogo} />


                                            <Link to='/Register'  className="link-to-register">
                                                <Item.Content className="register-option-item-content">
                                                    <Item.Header>I'm an Institution</Item.Header>
                                                    <Item.Meta>Find the specialist Teachers you need</Item.Meta>
                                                </Item.Content>
                                            </Link>
                                        </Item>
                                </Item.Group>
                            </div>

                            <div>
                                <p className="mb-0 mt-4 text-center">
                                    <div className="login-link-to-create-account"> Already have an account? <Link to='/login'>Sign in -></Link>
                                    </div></p>
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

export default RegisterOption;
