import React from "react";

interface SVGIconProps {
  stroke?: string;
}

const AlertIcon: React.FC<SVGIconProps> = ({ stroke = "black" }) => (
  <svg
    width="50"
    height="35"
    viewBox="0 0 50 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM11 6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V11C9 11.5523 9.44771 12 10 12C10.5523 12 11 11.5523 11 11V6ZM10 13C9.44771 13 9 13.4477 9 14C9 14.5523 9.44771 15 10 15H10.01C10.5623 15 11.01 14.5523 11.01 14C11.01 13.4477 10.5623 13 10.01 13H10Z"
      fill="#AA0000"
    />
  </svg>
);

export default AlertIcon;
