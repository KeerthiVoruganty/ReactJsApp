import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Slider from "react-slick";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function SimpleModal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  const generateQBadge = () => {
    return props.badgeList.map((badge, index) => {
      return (
        <div key={"qbadge" + badge + index}>
          <img
            className="d-block badge-modal-image rounded-circle"
            src={props.badgesIcon}
            onClick={() => {
              setSelect(badge);
            }}
          />
          <h3 className="badge-modal-image-title">{badge}</h3>
        </div>
      );
    });
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <img src={props.badgesIcon} alt={props.badge} className="badge-img" />
        <button className="rating-flex-center">Select</button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className="rating-badge-modal">
          <div className="rating-slider-wrapper">
            <h2 className="text-white">Now, choose to award a based on XXXX's strengss</h2>
            <Slider {...settings}>{generateQBadge()}</Slider>
            {select ? (
              <>       
                <div className="rating-submit-text">
                  You're adding '{select}' badge to XXXX's profife 
                </div>
                
                <button
                  className="p-2 btn rating-button"
                  onClick={() => props.submitBadge(select)}
                >
                  Submit
                </button>
              </>
            ) : null}
          </div>
        </div>
      </Modal>
    </div>
  );
}
