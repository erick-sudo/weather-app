import React from "react";

import {Routes, Route} from "react-router-dom";
import rocket from "../assets/rocket-loop.gif"

function Home() {
    return (
    <div className="center home">
        <h1>Home Page</h1>
        <img src={rocket} />
    </div>
    )
}

export default Home;