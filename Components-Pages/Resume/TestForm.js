import React, { useState, useEffect } from 'react';
import './Resume.css';

function ModalForm(props) {

    return(
        <>
            <div id='modal-container-HireMe' className='status-modal'>
                <div id='HireMe-box'>
                  <div onClick={hideHireMe} className='dot'></div>
                  <div className='status-alert-message overflow-unset'>
                    <h1 className='status-alert blue-text mb-1'>HIRE ME!</h1>
                    <div className="row pl-5 pr-5">
                      <div className="col-2">
                        <div className='rounded-polygon alert-profile-picture' >
                          <img
                            src='../../assets/img/avatar.jpg'
                            className='img-thumbnail img-avatar-ellipse'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className="col-10">
                      <h4>If you like my profile, have a look at my resume or hire me by clicking the button below</h4>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's
                          standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a
                          type specimen book. It has survived not only five
                          centuries, but also the leap into electronic typesetting,
                          remaining essentially unchanged. It was popularised in the
                          1960s with the release of Letraset sheets containing Lorem
                          Ipsum passages,{' '}
                        </p>
                      </div>
                            <label htmlFor="institution">Institution:</label>
                            <input type="text" className="form-control" name="institution" id="institution"  />


                            <label htmlFor="degree">Course or Degree:</label>
                            <input type="text" className="form-control" name="degree" id="degree" />
                                
                            <label htmlFor="details">Description:</label>
                            <input type="text" className="form-control" name="details" id="details" />
                                

                            <label htmlFor="year">Year Award:</label>
                            <input type="text" className="form-control" name="year" id="year"/>                    
                    </div>
                  </div>
                  <div>
                    <button onClick={(event) => {  hideHireMe();}} className="term-n-co-button-cancel btn btn-block btn-c secondary-button-no-margin-hover">Cancel</button>
                    <button onClick={(event) => {  hideHireMe();}} className="term-n-co-button-ok btn share-profile-btn-ok">Save!</button>
                  </div>
                </div>         
              </div>  
        </>
    )
}
export default ModalForm;
