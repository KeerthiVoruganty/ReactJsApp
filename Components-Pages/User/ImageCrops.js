import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { PORT } from "../../config";
import axios from "axios";
import { notify } from "react-notify-toast";
import "../Home/model_style.css";
import AvatarEditor from "react-avatar-editor";

const rowStyle = {
  display: "flex",
};

const columnStyle = {
  flex: "50%",
  padding: "5px",
};

class ImageCrops extends React.Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      user: this.props.user,
      _id: this.props.user._id,
      preview: null,
      src,
      file: this.props.imageSrc,
      fileName: this.props.fileName,
      newFileName: new Date().getDate(),
      oldFileName: null,
      editor: null,
      fileType: this.props.fileType,
      showPopup: true,
      fileSize: "",
      url: "",
      height:this.props.height,
      width:this.props.width
    };
    console.log(this.props.height);
    this.onClose = this.onClose.bind(this);
    this.onCropDefault = this.onCropDefault.bind(this);
    this.urltoFile = this.urltoFile.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
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

  onScaleChange = (scaleChangeEvent) => {
    const scaleValue = parseFloat(scaleChangeEvent.target.value);
    this.setState({ scaleValue });
  };

  setEditorRef = (editor) => {
    this.setState({ editor });
  };

  onCrop = () => {
    const { editor } = this.state;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      this.setState({ userProfilePic: url });

      this.urltoFile(url, this.state.Name).then((file) => {
        this.setState({ fileSize: file.size });
        this.setState({ file: file });
      });
    }
  };
  onBeforeFileLoad(elem) {
    if (elem.target.files[0].type === "application/pdf") {
      elem.target.value = "";
      notify.show(
        "Invalid file format, please select file type other than pdf"
      );
    }
  }

  // Updates local storage object when any control updates its state
  updateLocalStorage = (field, value) => {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  };

  saveFile = () => {
    this.onCrop();

    const file = this.state.file;
    let fileParts = this.state.fileName.split(".");
    let fileType = fileParts[1];
    let fileName = this.state.fileType;
    console.log(fileName);
    axios
      .post(`${PORT}/s3`, {
        fileName: fileName,
        fileType: fileType,
        _id: this.state._id,
      })
      .then((response) => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        this.setState({ url: url });
        let stateFileName = this.state.fileType + "_filename";
        let stateFileUrl = this.state.fileType + "_url";
        this.setState({ [stateFileName]: this.state.fileName });
        this.setState({ [stateFileUrl]: url });
        this.updateLocalStorage(stateFileName, this.state.fileName);
        this.updateLocalStorage(stateFileUrl, url);
        console.log("Signed request", signedRequest);
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
            const new_fileName= fileName+'_filename';
            // console.log(new_fileName);
            if(fileName=="wwcc"){
            newUser.wwcc_filename = this.state.fileName;
            newUser.wwcc_url = url;
            console.log(newUser.wwcc_filename);
            console.log(newUser.wwcc_url);
          }
             if(fileName=="police_check"){
              newUser.police_check_filename = this.state.fileName;
              newUser.police_check_url = url;
              console.log(newUser.police_check_filename);
              console.log(newUser.police_check_url);
             }
             if(fileName=="identification"){
              newUser.identification_filename = this.state.fileName;
              newUser.identification_url = url;
              console.log(newUser.identification_filename);
              console.log(newUser.identification_url);
             }
            //newUser.stateFileName = this.state.oldFileName;
           // this.props.setState({user:newUser});
            window.localStorage.setItem("user", JSON.stringify(newUser));
          //  alert(newUser.police_check_filename);
            axios
              .put(`${PORT}/updateUser`, {
                user: newUser,
              })
              .then((res) => {
                this.forceUpdate(this.props.action);
                this.setState({ showPopup: false });
                notify.show(fileName+" added successfully");
              })
              .catch((err) => {
                console.log(err);
              });

            // alert("Good " + JSON.stringify(response2));
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        notify.show(JSON.stringify(error), "error");
      });
  };

  onCropDefault(preview) {
    this.setState({ defaultPreview: preview });
  }

  onFileLoad = (e) => {
    this.setState({ file: e });
    this.setState({ Name: e.name });
  };

  onhide = () => {
    this.setState({ showPopup: false });
  };

  render() {
    return (
      <Modal
        show={this.state.showPopup}
        className="model-for-upload-avatar-form"
      >
        <Modal.Header>
          <Modal.Title>Upload a Professional Photo</Modal.Title>
          <div className="dot" onClick={this.onhide}></div>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="row upload-avatar-form-box">
              <div className="upload-avatar-form">
                <div style={rowStyle}>
                  <div style={columnStyle}>
                    <AvatarEditor
                      image={this.props.imageSrc}
                      border={15}
                      scale={this.state.scaleValue}
                      rotate={0}
                      width={300}
                      height={200}
                      ref={this.setEditorRef}
                      className="cropCanvas"
                    />
                  </div>
                  <div style={columnStyle}>
                    <img src={this.state.userProfilePic} alt=" " />
                  </div>
                </div>

                <button
                  onClick={this.onCrop}
                  className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                >
                  Crop
                </button>
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
              </div>
              <div className="col-md-6">
                <Button
                  onClick={this.saveFile}
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

export default ImageCrops;
