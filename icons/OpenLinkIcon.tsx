import React from "react";

interface SVGIconProps {
  stroke?: string;
}

const OpenLinkIcon: React.FC<SVGIconProps> = ({ stroke = "black" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_511_5267)">
      <path
        d="M5.30469 1.98022H12.3594V9.03491"
        stroke="#2F2D39"
        stroke-linecap="square"
      />
      <line
        x1="11.9004"
        y1="2.8072"
        x2="2.8075"
        y2="11.9001"
        stroke="#2F2D39"
        stroke-linecap="square"
      />
    </g>
    <defs>
      <clipPath id="clip0_511_5267">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default OpenLinkIcon;
