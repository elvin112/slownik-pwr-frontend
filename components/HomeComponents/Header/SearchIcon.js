import * as React from "react";

const SearchIcon = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="m19.727 17.293-3.895-3.895a.937.937 0 0 0-.664-.273h-.637a8.085 8.085 0 0 0 1.719-5A8.124 8.124 0 0 0 8.125 0 8.124 8.124 0 0 0 0 8.125a8.124 8.124 0 0 0 8.125 8.125c1.887 0 3.621-.64 5-1.719v.637c0 .25.098.488.273.664l3.895 3.895a.934.934 0 0 0 1.324 0l1.106-1.106a.942.942 0 0 0 .004-1.328ZM8.125 13.125c-2.762 0-5-2.234-5-5 0-2.762 2.234-5 5-5 2.762 0 5 2.234 5 5 0 2.762-2.234 5-5 5Z"
        fill="#FFF7F7"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SearchIcon;
