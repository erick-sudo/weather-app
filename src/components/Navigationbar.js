import React from "react";
import { NavLink } from "react-router-dom";



const linkStyles = {
    display: "inline-block",
    padding: "0.2em 0.5em",
    margin: "0 6px 6px",
    textDecoration: "none",
    color: "rgb(14, 174, 238)",
    fontWeight: "bolder",
    fontSize: "1.4em",
    border: "1px solid",
    borderRadius: "5px",
  };

function Navigationbar() {
    return (
        <div className="navigation-bar">
            <NavLink style={linkStyles} >Home</NavLink>
            <NavLink style={linkStyles}>Current</NavLink>
            <NavLink style={linkStyles}>Statistics</NavLink>
            <NavLink style={linkStyles}>About</NavLink>
        </div>
    )
}

export default Navigationbar;