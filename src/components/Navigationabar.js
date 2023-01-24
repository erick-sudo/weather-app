import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
    display: "inline-block",
    width: "50px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "blue",
    textDecoration: "none",
    color: "white",
  };

function Navigationbar() {
    return (
        <div>
            <NavLink>Home</NavLink>
            <NavLink>Current</NavLink>
            <NavLink>Statistics</NavLink>
            <NavLink>About</NavLink>
        </div>
    )
}

export default Navigationbar;