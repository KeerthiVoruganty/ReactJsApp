import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PORT } from "../../config";
import axios from 'axios';
import { notify } from 'react-notify-toast';
import "./model_style.css"


function DeletePopup(props) {

    // get the class from Helper files
    // should decides if we want to define class in database or just in Helper
    const handleClose = () => {
        props.showPopup(false)
    };

    const handleDelete = () => {
        // ======= Close popup =======
        props.showPopup(false)
        // ======= Update user  =======
        props.setUser(props.newUser)
        // ======= Update localStorage =======
        window.localStorage.setItem('user', JSON.stringify(props.newUser))
        console.log(props.newUser)
        //=======  save the class_type into database ======= 
        axios.put(`${PORT}/updateUser`,{
            user: props.newUser
          })
          .then( res => {
            notify.show("Class remove successfully");
          })
          .catch( err => {
            console.log(err)
          })
    }
    return (
      <>
          <Modal show={true} onHide={handleClose} className="model-for-deleteform">
              <Modal.Header>
                  <Modal.Title>Delete</Modal.Title>
                  <div onClick={handleClose} className='dot'></div>
              </Modal.Header>
              <Modal.Body>
                  <div className="main-content-word">
                      <h5>Are you sure you want to delete it?</h5>
                  </div>

                  <div className="row qualification-footer">
                      <div className="col-md-5">
                          <Button variant="secondary" onClick={handleClose} className="btn btn-block btn-c secondary-button-no-margin-hover">
                              Cancel
                          </Button>
                      </div>
                      <div className="col-md-7">
                          <Button variant="info" onClick={handleDelete} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover position-above-cancel">
                              Delete
                          </Button>
                      </div>
                  </div>

              </Modal.Body>
          </Modal>
      </>
    );
  }
  
export default DeletePopup;
