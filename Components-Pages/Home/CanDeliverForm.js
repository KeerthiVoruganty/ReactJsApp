import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getClass } from '../../Helper';
import { PORT } from "../../config";
import axios from 'axios';
import uuid from "uuid/v4";
import { notify } from 'react-notify-toast';
import "./model_style.css"
import $ from "jquery";
import Select from "react-select";


function CanDeliverForm(props) {

    const [course_class_delivered, setcourse_class_delivered] = useState([]);
    const [can_deliver, setcan_deliver] = useState();
    const [user, SetUser]=useState();
    const can_deliver_type = props.user.can_deliver.map((c,index) =>{
        return { value: `${c.can_deliver}`, label: `${c.can_deliver}` };
    })

    // get the class from Helper files
    // should decides if we want to define class in database or just in Helper
    const class_type = getClass();
    const class_types = class_type.map((c, index) => {
        return { value: `${c.name}`, label: `${c.name}` };
    });

    const handleClose = () => {
        props.showPopup(false)
    };
    const updateCanDeliver = cds => {
        let canDelivers = [];
        const setCanDeliver = (cd, c) => {
            return {
                _id: uuid(),
                can_deliver: cd.value,
                bg_color: c.bg_color,
                whole_name: c.whole_name,
                short_name: c.short_name
            };
        };

        cds.forEach(cd => {
            class_type.forEach(c => {
                if (c.name === cd.value) {
                    canDelivers.push(setCanDeliver(cd, c));
                }
            });
        });
        console.log(canDelivers)
        const newUser = Object.assign({}, props.user);

        newUser.can_deliver = [...canDelivers];

/*        const filterCandeliver = () => {
            if (newUser.can_deliver && newUser.can_deliver.length > 0){
                canDelivers.forEach(function(cd) {
                    newUser.can_deliver = newUser.can_deliver.filter(c => c.can_deliver !== cd.can_deliver);
                    if (newUser.can_deliver.includes(cd.can_deliver)) {

                    }else{
                        newUser.can_deliver.push(cd);
                    }
                });
            }else{
                newUser.can_deliver = [...newUser.can_deliver,...canDelivers];
            }

        };
        filterCandeliver();*/
        setcan_deliver(newUser.can_deliver);
        SetUser(newUser);
        console.log(newUser)
    };
    const handleDDLChange = e => {
        if (e !== null) {
            e.length > 0
                ? setcourse_class_delivered(e)
                : setcourse_class_delivered([]);
            if (e.length > 0) {
                updateCanDeliver(e);
            }
        }
    };
    const handleSave = () => {
        props.showPopup(false)
        //Todo: save the class_type into database
        axios.put(`${PORT}/updateUser`,{
            user: user
          })
          .then( res => {
            notify.show("Class added successfully");

          })
          .catch( err => {
            console.log(err)
          })
    }
    // show={show} onHide={handleClose}
    return (
      <>
          <Modal show={true} onHide={handleClose} className="model-for-addform custom-for-addCanDeliver">
              <Modal.Header>
                  <Modal.Title>Add Can Deliver</Modal.Title>
                  <div onClick={handleClose} className='dot'></div>
              </Modal.Header>
              <Modal.Body>
                  <div className="main-content-select">
                      <label htmlFor="ge_class">Class:</label>
       {/*               <select className="form-control" id="ge_class" defaultValue={class_type[0].name}>
                          {class_type.map((c, index) => {
                              return (<option key={index}>{c.name}</option>)
                          })}
                      </select>*/}

                      <Select
                          id="course_class_delivered"
                          name="course_class_delivered"
                          onChange={handleDDLChange}
                          options={class_types}
                          isSearchable
                          isMulti
                          required
                          defaultValue={can_deliver_type}
                      ></Select>

                  </div>

                  <div className="row qualification-footer">
                      <div className="col-md-6">
                          <Button variant="secondary" onClick={handleClose} className="btn btn-block btn-c secondary-button-no-margin-hover">
                              Cancel
                          </Button>
                      </div>
                      <div className="col-md-6">
                          <Button variant="info" onClick={handleSave} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover position-above-cancel">
                              Submit
                          </Button>
                      </div>
                  </div>

              </Modal.Body>
          </Modal>
      </>
    );
  }
  
export default CanDeliverForm;
