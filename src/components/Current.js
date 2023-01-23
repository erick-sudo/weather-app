import React from "react";

import { current } from "../data/weatherdata";

function Current({currentWeather : {location, current, location}})) {
    return (
        <div>
            <div className="location">
                <h1>{location["name"]}</h1>
                <p>Region : {location["country"]}</p>
            </div>
        </div>
    )
}

export default Current;