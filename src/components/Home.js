import React from "react";

import rocket from "../assets/rocket-loop.gif"
import Blogs from "../components/blogs/Blogs"

function Home() {
    return (
    <div className="center home">
        <div className="background-gif">
            <img src={rocket} alt="rocket-gif"/>
        </div>
        <div className="content">
            <div className="left">
                <h1 className="welcome-text">Wherever you go, no matter what the weather, always bring your own sunshine.</h1>
                <h2 className="welcome-text">Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.</h2>
                <h3 className="welcome-text">Climate is what we expect, weather is what we get.</h3>
            </div>
            <Blogs />
        </div>
    </div>
    )
}

export default Home;