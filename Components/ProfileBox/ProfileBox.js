import React from "react";
import "../../Components-Pages/Home/Home.css";

function ProfileBox(props) {
  return (
    <div className="availability-table  top-floor-row-table-1 profile-qualification-container gray-shadow-box">

      <div className="compliments-header-bckg"></div>
      <h4 className="font-xlg mt-4 text-left ml-3 pl-4 left-0 qualifications-card-title text-front">{props.header.toUpperCase()}</h4>

      <div className="row pl-5 pr-5 margin-bottom-for-profile-box">
        <ul className="profile-list-qualifications w-100">

          {props.children ?
            props.children :
            <div className="row only-qualification-empty-container">
              <div className="empty-folder-container only-for-profile-empty-folder-container"></div>
              <div className="m-auto m-auto-content-size">
                <p className="no-data-message">Unfortunately there is no data to display yet.</p>
              </div>
            </div>
          }
        </ul>
      </div>
      {props.seeResumeFooter}
      {props.footer}
    </div>
  )
}

export default ProfileBox;