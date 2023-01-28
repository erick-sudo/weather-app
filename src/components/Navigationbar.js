import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { LoginButton } from "./Login";



const linkStyles = {
    display: "inline-block",
    padding: "0.08em 0.8em",
    margin: "0 6px 6px",
    textDecoration: "none",
    color: "rgba(14, 174, 238)",
    fontWeight: "bolder",
    fontSize: "1.4em",
    border: "1px solid rgba(14, 174, 238, .2)",
    borderRadius: "5px",
  };

function Navigationbar({theme,loggedIn, toggleTheme}) {

    const [credentials, setCredentials] = useState("")

    function logUser() {
        setCredentials(credentials ? null : "Erick")
    }

    return (
        <div className={`navigation-bar`}>
            <button onClick={() => {
                toggleTheme(theme === "dark"? "light" : "dark")
            }} className="theme-btn">{theme === "light" ? "🌒" : "🌞"}</button>
            <div className="nav-links">
                {loggedIn ? <>
                    <NavLink to="/" style={linkStyles} >Home</NavLink>
                    <NavLink to="/current" style={linkStyles}>Current</NavLink>
                    <NavLink to="/statistics" style={linkStyles}>Statistics</NavLink>
                    <NavLink to="/about" style={linkStyles}>About</NavLink>
                </> : null}
            </div>
            <LoginButton loggedIn={loggedIn} credentials={credentials} logUser={logUser} />
        </div>
    )
}

export default Navigationbar;