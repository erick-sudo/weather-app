import React from "react";

function LoginButton({credentials, logUser}) {
    return (
        <button onClick={() => {
            logUser()
        }} className="login-state-btn">
            {credentials ? 'Sign Out' : 'Sign In'}
        </button>
    )
}

function LoginForm() {
    return {
        
    }
}

export default LoginButton;