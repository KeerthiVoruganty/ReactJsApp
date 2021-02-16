import React from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react";
import "./Tabs.css";
import DropdownMenu from 'react-dd-menu';
import TabButton from './TabButton'
import { useState } from "react";
import "../Navbar/react-dd-menu.css"

function Tabs(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log("test")

  const toggle = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const close = () => {
    setIsMenuOpen(false);
  };

  const activeTab = props.tabs.find(tab => tab.active);

  const menuOptions = {
    isOpen: isMenuOpen,
    close: close,
    toggle: <span onClick={toggle}>{activeTab.text} <span className="mdi mdi-menu-down item-icon"></span></span>,
    align: 'center',
    textAlign: "center",
    size: "sm",
    className: "dropdown-menu-fix mobileTabMenu",
    animate: false
  };

  return (
    <>
      <div className='buttonTabGroup'>
        {props.tabs.map((tab, index) => {

          return <TabButton type={tab.active ? 'active' : ''} text={tab.text} pathName={tab.pathname} target={(tab.newWindow ? "blank" : null)} data={tab.data} disabled={tab.disabled} key={index} />
        })}

      </div>
      <div className="buttonTabGroupMobile">
        <div className="tabButton tabButtonActive">
          <DropdownMenu {...menuOptions}>
            {props.tabs.map(tab => {
              return (
                !tab.disabled ?
                  <li>
                    <Link
                      to={{
                        pathname: tab.pathname,
                        data: tab.data
                      }}
                      target={tab.newWindow ? "blank" : null}
                    >
                      {tab.text}
                    </Link>
                  </li>
                  :
                  <li className="menu-item-disabled">{tab.text}</li>
              )
            })}
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default Tabs;