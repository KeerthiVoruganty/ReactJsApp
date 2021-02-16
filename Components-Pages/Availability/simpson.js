import React from "react";
import ReactDOM from "react-dom";
// import styled from "@emotion/styled";

const Simpson = ({ resource, el }) => {
  // extendedProps is used to access additional event properties.
  const content = (
    <SimpsonDetail>
      <img src={resource.extendedProps.imageUrl} alt={resource.title} />
      <div>{resource.title}</div>
    </SimpsonDetail>
  );
  ReactDOM.render(content, el);
  return el;
};

export const SimpsonPortal = ({ resource, el }) => {
  // extendedProps is used to access additional event properties.
  const content = (
    <SimpsonDetail>
      <img src={resource.extendedProps.imageUrl} alt={resource.title} />
      <div>{resource.title}</div>
    </SimpsonDetail>
  );
  ReactDOM.createPortal(content, el);
  return el;
};

export default Simpson;

// This is only a wrapper so the component reads nicer in React Debugger. It is completely unnecessary.
const SimpsonDetail = ({ ...props }) => (
  {/* <StyledSimpson>{props.children}</StyledSimpson> */}
);

// const StyledSimpson = styled("div")`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   white-space: normal;
//   padding: 4px;

//   img {
//     height: 44px;
//     margin-right: 4px;
//   }
// `;
