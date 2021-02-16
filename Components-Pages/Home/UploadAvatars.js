import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { getClass } from "../../Helper";
import { PORT } from "../../config";
import axios from "axios";
import uuid from "uuid/v4";
import { notify } from "react-notify-toast";
import { useArray, useForceUpdate } from "../../Hook";
import "./model_style.css";
import ReactDOM from "react-dom";
import Avatar from "react-avatar-edit";

class UploadAvatars extends React.Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      preview: null,
      src,
      file: null,
      Name: null,
      newFileName: new Date().getDate(),
      oldFileName: null,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.UploadAvatarsNow = this.UploadAvatarsNow.bind(this);
    this.onCropDefault = this.onCropDefault.bind(this);
    this.urltoFile = this.urltoFile.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)

  }

  urltoFile = (url, filename, mimeType) => {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || "")[1];
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
    // this.setState({src:})

    this.urltoFile(preview, this.state.Name).then((file) => {
      this.setState({ file: file });
    });
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].type === "application/pdf"){
      elem.target.value = "";
      notify.show("Invalid file format, please select file type other than pdf");
    };
  }

  UploadAvatarsNow = () => {
    const file = this.state.file;


    if (file) {
        const [fileName, fileType] = file.name.split(".");
        this.setState({ oldFileName: fileName });
        axios
          .post(`${PORT}/s3`, {
            fileName: `profilePic${this.state.newFileName}`,
            fileType: fileType,
            _id: this.props.user._id,
          })
          .then((response) => {
            const returnData = response.data.data.returnData;
            const signedRequest = returnData.signedRequest;
            const url = returnData.url;
            // Put the fileType in the headers for the upload
            const options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            axios
              .put(signedRequest, file, options)
              .then((response2) => {
                // save the img_url into user and change the ui
                const newUser = Object.assign({}, this.props.user);
                newUser.img_url = url;
                newUser.profile_photo_name = this.state.oldFileName;
                this.props.setUser(newUser);
                window.localStorage.setItem("user", JSON.stringify(newUser));
                axios
                  .put(`${PORT}/updateUser`, {
                    user: newUser,
                  })
                  .then((res) => {
                    this.forceUpdate();
                    this.props.showPopup(false);
                    notify.show("Profile picture added successfully");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((error) => {
                alert("ERROR " + JSON.stringify(error));
              });
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
      
    } else {
      // show uploading error
      console.log("upload error");
    }
  };

  onCropDefault(preview) {
    this.setState({ defaultPreview: preview });
  }

  onFileLoad = (e) => {
      this.setState({ file: e });
      this.setState({ Name: e.name });
  };

  onhide = () => {
    this.props.showPopup(false);
  };

  render() {
    return (
      <Modal show={true} className="model-for-upload-avatar-form">
        <Modal.Header>
          <Modal.Title>Upload a Professional Photo</Modal.Title>
          <div className="dot" onClick={this.onhide}></div>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="row upload-avatar-form-box">
              <div className="upload-avatar-form">
                <Avatar
                  id="imgupload"
                  width={290}
                  height={290}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src={this.state.preview}
                  onFileLoad={this.onFileLoad}
                  onBeforeFileLoad={this.onBeforeFileLoad}

                  alt="Preview"
                />
              </div>
            </div>
            <div className="row upload-button-box">
              <div className="col-md-6">
                <button
                  onClick={this.onhide}
                  className="btn btn-block btn-c secondary-button-no-margin-hover"
                >
                  Cancel
                </button>
                {/* <Button className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>Cancel</Button> */}
              </div>
              <div className="col-md-6">
                <Button
                  onClick={this.UploadAvatarsNow}
                  className="btn btn-primary btn-block btn-c primary-button-no-margin-hover position-above-cancel "
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadAvatars;
