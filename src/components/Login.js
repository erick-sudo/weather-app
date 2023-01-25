import React from "react";

function Login({credentials, logUser}) {
    return (
        <button onClick={() => {
            logUser()
        }} className="login-state-btn">
            {credentials ? 'Sign Out' : 'Sign In'}
        </button>
    )
}

export default Login;