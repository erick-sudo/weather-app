import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/lock.png"

function LoginButton({credentials, loggedIn, logUser}) {
    return (
        <button onClick={() => {
            logUser()
        }} className="login-state-btn">
            {loggedIn ? 'Sign Out' : 'Sign Up'}
        </button>
    )
}

function LoginForm({setLoggedIn}) {
    const navigate = useNavigate()
    return (
        <>
        <div id="login">
            <div><img src={logo} alt="logo" /></div>
            <form onSubmit={(event) => {
                alert("Logging in")
                event.preventDefault()
                setLoggedIn(true)
                navigate("/home")
            }}>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <input type="submit" value="Login" />
                <a className="createacc" href="/signup">Create Account</a>
            </form>
        </div>
        </>
    )
}
function SignupForm() {
    return (
        <>
        <div id="login">
            <div><img src={logo} alt="logo" /></div>
            <form>
                <input name="username" type="text" placeholder="Choose a user name" />
                <input name="firstname" type="text" placeholder="First Name" />
                <input name="lastname" type="text" placeholder="Last Name" />
                <input name="email" type="text" placeholder="Email" />
                <input name="password" type="password" placeholder="password" />
                <input type="submit" value="Login" />
                <a className="createacc" href="/login">Login</a>
            </form>
        </div>
        </>
    )
}

export { LoginButton, LoginForm, SignupForm };