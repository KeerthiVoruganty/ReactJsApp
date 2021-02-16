import React from "react";
import { Button, Modal } from "react-bootstrap";


class ConfirmationBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  // get the class from Helper files
  // should decides if we want to define class in database or just in Helper
  handleClose = () => {
    console.log(this.props)
    this.props.togglePopup(false);
  };

  handleDelete = () => {
    // ======= Close popup =======
    this.props.togglePopup(true);
  };

  render() {
    return (
      <Modal
        show={true}
        onHide={this.handleClose}
        className="model-for-deleteform"
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
          <div onClick={this.handleClose} className="dot"></div>
        </Modal.Header>
        <Modal.Body>
          <div className="main-content-word">
            <h5>Are you sure you want to delete it?</h5>
          </div>

          <div className="row qualification-footer">
            <div className="col-md-5">
              <Button
                variant="secondary"
                onClick={this.handleClose}
                className="btn btn-block btn-c secondary-button-no-margin-hover"
              >
                Cancel
              </Button>
            </div>
            <div className="col-md-7">
              <Button
                variant="info"
                onClick={this.handleDelete}
                className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ConfirmationBox;
