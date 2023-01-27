import React from "react";

function About() {
    return (
        <div className="center about">
            <h1>About us</h1>
            <p>The increasing frequency of extreme weather events, droughts and floods is in line with what climate scientists have been predicting for decades - and evidence is mounting that what's happening is more severe than predicted, and will get far worse still if we fail to act.<br/>
            Read more at <a href="https://www.brainyquote.com/topics/weather-quotes">weather</a></p>

            <p>The weather and my mood have little connection. I have my foggy and my fine days within me; my prosperity or misfortune has little to do with the matter.</p>

            <div className="pics">
                <img src="https://cdn.pixabay.com/photo/2016/12/14/04/08/thunderbolt-1905603__340.png" alt="weather" />
                <img src="https://cdn.pixabay.com/photo/2017/05/01/12/24/ship-2275399__340.jpg" alt="weather" />
            </div>

            <h1 className="final-quote">It is only in sorrow bad weather masters us; in joy we face the storm and defy it. Bad weather always looks worse through a window.</h1>
        </div>
    )
}

export default About;