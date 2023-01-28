import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginlogo from "../assets/cartoons/Fingerprint-bro.svg"
import signuplogo from "../assets/cartoons/Fingerprint-pana.svg"
import { MdAccountCircle } from "react-icons/md";

function LoginButton({loggedIn, setLoggedIn}) {
    const navigate = useNavigate();

    return (
        <button onClick={(e) => {
            if(e.target.textContent === "Sign Up") {
                navigate("/signup")
            } else {
                setLoggedIn(false)
                navigate("/login")
            }
        }} className="login-state-btn">
            {loggedIn ? 'Sign Out' : 'Sign Up'}
        </button>
    )
}

function LoginForm({setLoggedIn}) {
    const navigate = useNavigate()

    const [wrongDetails, setWrongDetails] = useState(false)

    function handleLogin(event) {
        event.preventDefault()

        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        fetch(`http://localhost:8001/users?username=${formData.username}`)
        .then(res => res.json())
        .then(user => {
            if(user.length === 1) {
                if(user[0].password === formData.password) {
                    setLoggedIn(true)
                    navigate("/home")
                } else {
                    setWrongDetails(true)
                }
            } else {
                setWrongDetails(true)
            }
        })
    }

    return (
        <>
        <MdAccountCircle />
        <div id="login">
            <div><img src={loginlogo} alt="logo" /></div>
            <form onSubmit={handleLogin}>
                <input name="username" type="text" placeholder="username" required/>
                <input name="password" type="password" placeholder="password" required />
                {wrongDetails ? <p className="error-messages">wrong username or password</p> : null}
                <input type="submit" value="Login" />
                <a onClick={(e) => {
                    e.preventDefault()
                    navigate("/signup")
                }} className="createacc" href="/signup">Create Account</a>
            </form>
        </div>
        </>
    )
}
function SignupForm() {
    const navigate = useNavigate()

    function handleSignup (event) {
        event.preventDefault()


        const formData = {
            username: event.target.username.value,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        fetch("http://localhost:8001/users", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(user => {
            navigate("/login")
        })
    }

    return (
        <>
        <div id="login" >
            <div> <img src={signuplogo} alt="logo" /></div>
            <form method="POST" onSubmit={handleSignup}>
                <input name="username" type="text" placeholder="Choose a user name" required/>
                <input name="firstname" type="text" placeholder="First Name" required/>
                <input name="lastname" type="text" placeholder="Last Name" required/>
                <input name="email" type="text" placeholder="Email" required />
                <input name="password" type="password" placeholder="password" required />
                <input type="submit" value="Sign Up" />
                <a onClick={(e) => {
                    e.preventDefault()
                    navigate("/login")
                }} className="createacc" href="/login">Login</a>
            </form>
        </div>
        </>
    )
}

export { LoginButton, LoginForm, SignupForm };