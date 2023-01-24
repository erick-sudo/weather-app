import React from "react";

import { current as curr } from "../data/weatherdata";
import Time from "./Time"

function Current() {
    const {location, current} = curr
    return (
        <div>
            <div className="location">
                <h1>{location["name"]}</h1>
                <p>Region : {location["region"]}</p>
                <p>Country: {location["country"]}</p>
                <p>Latitude: {location["lat"]} Longitute: {location["lon"]}  </p>

                <Time time={{localtime: location["localtime"], epoch: location["localtime_epoch"]}} />
            </div>
        </div>
    )
}

export default Current;