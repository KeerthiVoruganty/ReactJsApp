import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/img/logo.png';
import { PORT } from '../../config';
import { notify } from 'react-notify-toast';

const URL = PORT;
const isNumeric = (value) => {
  return /^[0-9]*$/.test(value);
}
class SecondaryRegistrationCollege extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: props.location.state ? props.location.state.email: '',
      full_name: '',
      role: '',
      secret_answer1: '',
      main_campus_name: '',
      main_campus_city: '',
      main_campus_reg: '',
    };

    this.hanldeSecretAnswer1 = this.hanldeSecretAnswer1.bind(this);
    this.hanldeFullName = this.hanldeFullName.bind(this);
    this.handleClickRgister = this.handleClickRgister.bind(this);
    this.handleIcon = this.handleIcon.bind(this)
  }

  hanldeFullName(event) {
    event.preventDefault();
    this.setState({
      full_name: event.target.value
    });
  }

  handleClickRgister(event) {
    event.preventDefault();
    const props = this.props
    
      if( /^[aA-zZ-]+$/g.test(this.state.full_name)){
        axios.put(`${URL}/user/secret`,{
          email: this.state.email,
          full_name: this.state.full_name,
          secret_question1: document.querySelector("#secret_question1").value,
          secret_answer1: this.state.secret_answer1
        })
        .then( res => {
            window.localStorage.setItem('token',res.data.token)
            const path = {
                pathname: `/`,
                state: res.data,
            }
            props.history.push(path)
        })
        .catch( err => {
            console.log(err)
        })
    }    
  }

  hanldeSecretAnswer1(event) {
    event.preventDefault();
    this.setState({
      secret_answer1: event.target.value
    });
  }

  handleIcon() {
    this.setState({
      icon:'mdi mdi-checkbox-marked-circle float-right check-green',
      hovered_text: 'Verified'
    })
  }

  render() {

    return (
      <div className='row'>
        <div className='col-lg-6 auth-left'>
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
                        <label>Full Name</label>
                        <div className='input-icon'>
                        <i className='mdi mdi-account-circle-outline' />
                        <input
                            type='text'
                            className='form-control rt-input'
                            id='fullname'
                            name='fullname'
                            placeholder='Full Name'
                            value={this.state.full_name}
                            onChange={this.hanldeFullName}
                            autoFocus
                            required
                        />
                        </div>
                    </div>
                    
                    <div className='form-group mb-2'>
                        <label htmlFor='password'>Choose your secret question</label>
                        <div className='input-icon'>
                        <i className='mdi mdi-account-check'></i>
                        <div className='form-group dropdown-box'>
                            <select className='form-control rt-input' id='secret_question1'>
                            <option defaultValue='Mother’s maiden name'>What is your mother’s maiden name?</option>
                            <option value='First pet’s name'>What was your first pet’s name?</option>
                            <option value='Favourite movie'>What is your favourite movie?</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div className='form-group mb-4'>
                        <label>Answer</label>
                        <div className='input-icon'>
                        <i className='mdi mdi-account-alert-outline' />
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

            <div className='heading'>
              {/* <h2>Welcome to </h2> */}
              <h2 className='name'> ReadyTeacher</h2>
              <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
            </div>
          </div>
          <div className='shape'></div>
        </div>
      </div>
    );
  }
}

export default SecondaryRegistrationCollege;
