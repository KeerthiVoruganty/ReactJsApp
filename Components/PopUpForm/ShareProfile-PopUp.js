import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { PORT } from "../../config";
import axios from "axios";
import { notify } from "react-notify-toast";
import "../../Components-Pages/Resume/Resume.css";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const POFILE_URL = `https://master.d2ui2xxezlfztd.amplifyapp.com/NavigateToShareProfile?id=`;
function PopUp(props) {

  // debugger;
  const [messgae, setMessage] = useState("I thought you might be interested in viewing this profile.");

  const handleClose = () => {
    props.showPopup(false);
  };

  const copyToClipboard = (e, elementId) => {
    e.preventDefault();
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
  };

  const shareProfile = event => {
    event.preventDefault();

    let msg = document.querySelector("#message").value;
    msg.replace("\n", "\r\n");
    axios
      .put(`${PORT}/shareUserProfile`, {
        id: props.user._id,
        to: document.querySelector("#email").value,
        msg: msg,
        FName: props.user.first_name
      })
      .then(res => {
        notify.show("Profile shared successfully");
        document.querySelector("#email").value = "";
        document.querySelector("#message").value = "";
      })
      .catch(err => {
        console.log(err);
      });
    props.showPopup(false);
  };

  const [showShareForm, setShowShareForm] = useState(false);

  const displayShareForm = () => {
    if (showShareForm == false) {
      document.getElementById("email-share-form").style.display = "block";
      document.getElementById("showShareForm").style.display = "none";
      setShowShareForm(true);
    }
    if (showShareForm == true) {
      document.getElementById("email-share-form").style.display = "none";
      setShowShareForm(false)
    }
  };

  const ShareProfilePopup = () => {
    return (
      <div>
        <Modal show={true} className="model-for-qualificationForm share-profile-modal">
          <Modal.Header className="mx-0">
            <Modal.Title className="m-auto">Share Profile</Modal.Title>
            <div onClick={handleClose} className="dot"></div>
          </Modal.Header>
          <Modal.Body className="py-0">
            <div className="model-main-content">
              <div className="row mb-4 d-flex justify-content-between">

                <div className="col-12 m-auto">
                  <p className=" mb-0 px-0 button-in-share-group">
                    {/* <span>Preview Your Profile</span>*/}
                    <Link
                      className="mdi mdi-file-find-outline preview-profile-link-in-share"
                      to={{
                        pathname: `/NavigateToPreviewProfile?id=${props.user._id}`
                      }}
                      target="_blank"
                    >
                      Preview
                    </Link>

                  </p>
                </div>
              </div>
              <div className="row mb-4 d-flex justify-content-between">
                <div className="col-12 m-auto">
                  <p className=" mb-0 px-0 button-in-share-group">
                    {/*         <span>Copy link</span>*/}
                    <span id={"lnkProfile" + props.user._id} class="d-none">
                      {POFILE_URL + props.user._id}
                    </span>
                    <Link
                      className="mdi mdi-link-variant preview-profile-link-in-share"
                      to={{}}
                      onClick={(e) => {
                        copyToClipboard(e, "lnkProfile" + props.user._id);
                      }}
                    >
                      Copy Link
                    </Link>
                    {/* TODO: when user clicks here, the link is copied */}
                  </p>
                </div>
              </div>
              <div className="row mb-4 d-flex justify-content-between">
                <div className="col-12 m-auto">
                  <p className=" mb-0 px-0 button-in-share-group">
                    {/* <span>Preview Your Profile</span>*/}
                    <Link
                      className="mdi mdi-email-outline preview-profile-link-in-share"
                      onClick={displayShareForm}
                    >
                      Share via Email
                    </Link>

                  </p>
                </div>
              </div>
              <div className="row link-icon-group-style" >
                <div className="col-12 link-profile-button-in-share button-in-share-group-1">
                  {/* <div
                    id="showShareForm"
                    className="col-auto email-shareprofile shareprofile"
                    onClick={displayShareForm}
                  >
                    <icon className="mdi mdi-email-outline"></icon>
                  </div> */}
                  <div className="col-auto m-auto linkedin-shareprofile shareprofile">
                    <icon className="mdi mdi-linkedin"></icon>
                  </div>
                  <div className="col-auto m-auto facebook-shareprofile shareprofile">
                    <icon className="mdi mdi-facebook"></icon>
                  </div>
                  <div className="col-auto m-auto twitter-shareprofile shareprofile">
                    <icon className="mdi mdi-twitter"></icon>
                  </div>
                </div>
              </div>

              <form
                id="email-share-form"
                onSubmit={e => {
                  shareProfile(e);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group w-100 ">
                      <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                        <textarea
                          rows="3"
                          className="form-control mb-0 p-2"
                          id="message"
                          placeholder={
                            "I thought you might be interested in viewing this profile."
                          }
                          onChange={e => setMessage(e.target.value)}
                          value={messgae}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-100 form-group">
                      <div className="input-icon">
                        <i className="mdi mdi-email"></i>
                        <input
                          type="email"
                          className="form-control rt-input"
                          name="email"
                          id="email"
                          placeholder="Enter an Email"
                          autoFocus
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button
                      onClick={handleClose}
                      className="btn btn-block btn-c secondary-button-no-margin-hover"
                    >
                      Cancel
                    </button>
                    {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
                  </div>
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  return <>{props.formType === "shareProfile" && ShareProfilePopup()}</>;
}
export default PopUp;
