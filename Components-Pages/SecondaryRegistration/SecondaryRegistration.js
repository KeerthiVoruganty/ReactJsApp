import './SecondaryRegistration.css';
import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/img/logo.png';
import { PORT } from '../../config';
import { notify } from 'react-notify-toast';
import "../User/UserProfile.css";

const URL = PORT;
const isNumeric = (value) => {
  return /^[0-9]*$/.test(value);
}
class SecondaryRegistration extends Component {
  constructor(props) {
    super(props);
    // if the user not come from the verification email
    // redirect to home
    // else if the user has first_name means they register their details already
    // redirect to home
    // if(!props.location.state){
    //   props.history.push({pathname:'/'})
    // }else if(props.location.state.first_name){
    //   props.history.push({pathname:'/'})
    // }
    console.log(props.location.state)
    this.state = {
      email: props.location.state ? props.location.state.email : '',
      first_name: '',
      last_name: '',
      contact_no: '',
      secret_answer1: '',
      secret_answer2: '',
      // contact_number_verified: props.location.state.contact_number_verified,
      contact_number_verified: false,
      showPopup: false,
      isMobileValid: false,
      showConfirmNumber: false,
      icon: 'mdi mdi-information-outline',
      user_id: "",
      hovered_text: 'We will use your mobile number to contact you when shifts arise that match your availability'
    };

    this.hanldeSecretAnswer1 = this.hanldeSecretAnswer1.bind(this);
    this.hanldeSecretAnswer2 = this.hanldeSecretAnswer2.bind(this);
    this.hanldeLastName = this.hanldeLastName.bind(this);
    this.hanldeFirstName = this.hanldeFirstName.bind(this);
    this.handleClickRgister = this.handleClickRgister.bind(this);
    this.hanldeContactNo = this.hanldeContactNo.bind(this);
    this.handleRequestOTP = this.handleRequestOTP.bind(this);
    this.handleShowPopUp = this.handleShowPopUp.bind(this)
    this.verify_contact_number = this.verify_contact_number.bind(this)
    this.handleConfirmNumber = this.handleConfirmNumber.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleCancelCode = this.handleCancelCode.bind(this)
    this.handleIcon = this.handleIcon.bind(this)
  }



  hanldeLastName(event) {
    event.preventDefault();
    this.setState({
      last_name: event.target.value
    });
  }

  hanldeFirstName(event) {
    event.preventDefault();
    this.setState({
      first_name: event.target.value
    });
  }

  hanldeContactNo(event) {
    event.preventDefault();
    if (event.target.value.length === 8 && !isNaN(event.target.value.length)) {
      this.setState({
        contact_no: event.target.value,
        isMobileValid: true
      });
    } else {
      this.setState({
        contact_no: event.target.value,
        isMobileValid: false
      });
    }


  }
  handleClickRgister(event) {
    event.preventDefault();
    const props = this.props
    // if (this.state.contact_number_verified) {
    if (true){
      const user_id = this.state.first_name[0].toUpperCase() + this.state.first_name.slice(1)  + "_" + this.state.last_name[0].toUpperCase()
      if (/^[aA-zZ-]+$/g.test(this.state.first_name) && /^[aA-zZ-]+$/g.test(this.state.last_name)) {
        axios.put(`${URL}/user/secret`, {
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          contact_no: this.state.contact_no,
          secret_question1: document.querySelector("#secret_question1").value,
          secret_question2: document.querySelector("#secret_question2").value,
          secret_answer1: this.state.secret_answer1,
          secret_answer2: this.state.secret_answer2,
          user_id: user_id
        })
          .then(res => {
            window.localStorage.setItem('token', res.data.token)
            const path = {
              pathname: `/`,
              state: res.data,
            }
            props.history.push(path)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        notify.show('Please use only letters in first name or last name')
      }

    } else {
      notify.show('Please verify your mobile number to proceed. We will use your number to contact you when shifts arrive that match your availability.', "custom", 5000, { background: 'red', text: "#FFFFFF" })

    }

  }

  hanldeSecretAnswer1(event) {
    event.preventDefault();
    this.setState({
      secret_answer1: event.target.value
    });
  }

  hanldeSecretAnswer2(event) {
    event.preventDefault();
    this.setState({
      secret_answer2: event.target.value
    });
  }

  handleShowPopUp() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  handleConfirmNumber() {
    const mobile = document.querySelector("#mobile").value
    if (mobile.length === 10) {
      if (isNumeric(mobile)) {
        this.setState({
          showConfirmNumber: true,
          isMobileValid: false,
        })
      } else {
        notify.show("Please enter numbers only")
      }
    } else {
      notify.show("Please enter 10 digits")
    }
  }

  handleChangeNumber() {
    this.setState({
      showConfirmNumber: false,
      isMobileValid: false
    })
  }

  handleCancelCode() {
    this.setState({
      showPopup: false
    })
    this.handleChangeNumber()
  }

  verify_contact_number() {
    this.setState({ contact_number_verified: true })
    this.handleIcon()
  }

  handleIcon() {
    this.setState({
      icon: 'mdi mdi-checkbox-marked-circle float-right check-green',
      hovered_text: 'Verified'
    })
  }

  handleRequestOTP(event) {
    event.preventDefault();
    const mobile = document.querySelector("#mobile").value
    const email = document.querySelector("#email").value
    // console.log(document.querySelector("#mobile").value.length)
    this.setState({
      isMobileValid: false,
      showConfirmNumber: false,
    })
    const popup = this.handleShowPopUp;

    axios.get(`${PORT}/requestOTP`, {
      params: {
        email: email,
        mobile: mobile.substring(1)
      }
    })
      .then(function (response) {
        popup()
        console.log(response);
        window.auth_user_id = response.data.auth_user_id
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  togglePopup() {
    const codes = document.querySelector("#verifycode").value
    const popup = this.handleShowPopUp
    const email = document.querySelector("#email").value
    const verify_contact_number = this.verify_contact_number
    if (isNumeric(codes)) {
      axios.get(`${PORT}/verifyOTP`, {
        params: {
          id: window.auth_user_id,
          token: codes,
          email: email
        }
      })
        .then(function (response) {
          popup()
          verify_contact_number()
          console.log(response);
          notify.show("Mobile number verified");
        })
        .catch(function (error) {
          console.log(error);
          notify.show("Please enter the exact code sent to your phone");
        });
    } else {
      console.log("Please enter numbers only")
      notify.show("Please enter numbers only")
    }
  }

  //Auto filling the form
  //A a function will pe added to submit the post the user Data extracted from google

  render() {
    //add a debugger so the application will automatically stop when executed

    return (
      <div className='row secondary-register-box'>
        <div className='col-lg-6 auth-left '>
          <div className='row auth-form mb-4 login-form-container'>
            <div className='col-12 col-sm-12'>
              <form onSubmit={this.handleClickRgister}>
                <div className='auth-text-top mb-5'>
                  <h1>Registration Details</h1>
                  <hr></hr>
                </div>

                <div className="form-group mb-2">
                  <label>Email</label>
                  <div className="input-icon">
                    <i className="mdi mdi-email" />
                    <input
                      type="text"
                      className="form-control rt-input"
                      id="email"
                      name="email"
                      placeholder='Email'
                      disabled={true}
                      defaultValue={this.state.email}
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <div className='form-group mb-2'>
                  <label>First Name</label>
                  <div className='input-icon'>
                    {/* <i className='mdi mdi-account-circle-outline' /> */}
                    <input
                      type='text'
                      className='form-control'
                      id='firstname'
                      name='firstname'
                      placeholder='First Name'
                      value={this.state.first_name}
                      onChange={this.hanldeFirstName}
                      autoFocus
                      required
                    />
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label>Last Name</label>
                  <div className='input-icon'>
                    {/* <i className='mdi mdi-account-circle' /> */}
                    <input
                      type='text'
                      className='form-control'
                      id='lastname'
                      name='lastname'
                      placeholder='Last Name'
                      value={this.state.last_name}
                      onChange={this.hanldeLastName}
                      required
                    />
                  </div>
                </div>
                <div className='form-group mb-4'>
                  <label className="w-100">
                    <p className="float-left mb-0">Mobile Number</p>
                    <div className='span-hovered'>
                      &nbsp;<i className={this.state.icon}></i>
                      <span className="span-hovered-content">{this.state.hovered_text}</span>
                    </div>
                  </label>


                  <div className='d-flex justify-content-between ml-0 mr-0 w-100 input-icon'>
                    <i className='mdi mdi-phone'></i>
                    <input
                      type='text'
                      className='form-control rt-input mb-0 phone'
                      id='mobile'
                      name='mobile'
                      placeholder='04XX XXX XXX'
                      value={this.state.contact_no}
                      onChange={this.hanldeContactNo}
                      autoFocus
                      required
                      pattern="[0-9]+"
                      disabled={this.state.contact_number_verified}
                    />

                    <button
                      type='button'
                      className='ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover'
                      onClick={this.handleConfirmNumber}
                      // hidden={this.state.contact_number_verified}
                      hidden={true}
                    >
                      {this.state.isMobileValid ? "Change" : "Verify"}
                    </button>
                    {this.state.showConfirmNumber ?
                      <div className="popupConfirmNumber">
                        <div className="popup_innerConfirmNumber">
                          <div onClick={this.handleChangeNumber} className='dot'></div>
                          <div className="m-5">
                            <h4 className="contact_numberConfirmation">MOBILE VERIFICATION</h4><br />
                            <h5 className="contact_numberConfirmation1">Is {this.state.contact_no} your number?</h5>
                            <div className="row">
                              <div className="col-md-6">
                                <button type="button" className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={this.handleChangeNumber}>No and Change</button>
                              </div>
                              <div className="col-md-6 pr-4 padding-for-mobile">
                                <button type="button" className="btn btn-primary btn-block btn-c primary-button-no-margin-hover" onClick={this.handleRequestOTP}>Yes and Proceed</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      : null}



                    {this.state.showPopup ?
                      <div className='popupConfirmNumber'>
                        <div className='popup_innerConfirmNumber'>
                          <div onClick={this.handleCancelCode} className='dot'></div>
                          <div className="m-5 pt-3">
                            <h4 className='contact_numberConfirmation'>Confirmation Code</h4>
                            <div className="row px-5 mt-3">
                              <input
                                type='number'
                                className='verifycode form-control rt-input form-control-no-icon popupconfnumb-input'
                                id='verifycode'
                                name='verifycode'
                                placeholder="Enter the code sent to your mobile phone"
                                autoFocus
                              />
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <button type="button" onClick={this.handleCancelCode} className="btn btn-block btn-c secondary-button-no-margin-hover">Cancel</button>
                              </div>
                              <div className="col-md-6 pr-4 padding-for-mobile">
                                <button type="button" onClick={this.togglePopup.bind(this)} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">Verify</button>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                      : null
                    }
                  </div>
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor='password'>Choose your first secret question</label>
                  <div className='input-icon'>
                    <i className='mdi mdi-account-check'></i>
                    <div className='form-group dropdown-box'>
                      <select className='form-control form-control-no-icon' id='secret_question1'>
                        <option defaultValue='Mother’s maiden name'>
                          What is your mother’s maiden name?
                            </option>
                        <option value='First pet’s name'>What was your first pet’s name?</option>
                        <option value='Favourite movie'>What is your favourite movie?</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='form-group mb-4'>
                  <label>Answer</label>
                  <div className='input-icon'>
                    {/* <i className='mdi mdi-account-alert-outline' /> */}
                    <input
                      type='text'
                      className='form-control'
                      id='secret-answer-1'
                      name='secret-answer-1'
                      placeholder='Enter Your Answer'
                      value={this.state.secret_answer1}
                      onChange={this.hanldeSecretAnswer1}
                      required
                    />
                  </div>
                </div>

                <div className='form-group mb-2'>
                  <label htmlFor='password'>
                    Choose your second secret question
                        </label>
                  <div className='input-icon'>
                    <i className='mdi mdi-account-check'></i>

                    <div className='form-group dropdown-box'>
                      <select className='form-control form-control-no-icon' id='secret_question2'>
                        <option defaultValue="Best friend’s name">What is your best friend’s name?</option>
                        <option value="Favourite class type or level to teach">
                          What is your favourite class type or level to teach?
                            </option >
                        <option value="First street">What was the first street where you lived?</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='form-group mb-5'>
                  <label>Answer</label>
                  <div className='input-icon'>
                    {/* <i className='mdi mdi-account-alert-outline' /> */}
                    <input
                      type='text'
                      className='form-control'
                      id='secret-answer-2'
                      name='secret-answer-2'
                      placeholder='Enter Your Answer'
                      value={this.state.secret_answer2}
                      onChange={this.hanldeSecretAnswer2}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className='btn btn-primary btn-block btn-c primary-button-no-margin-hover'>
                  Submit
                    </button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-lg-6 auth-right d-lg-flex d-none bg-photoregister'>
          <div className='bg-gradient'></div>

          <div className='logo-container'>
            <img src={logo} alt='logo' className='logo' />

            {/*            <div className='heading'>
               <h2>Welcome to </h2>
              <h2 className='name'> ReadyTeacher</h2>
              <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
            </div>*/}
          </div>
          <div className='shape'></div>
        </div>
      </div>
    );
  }
}

export default SecondaryRegistration;
