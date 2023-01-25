import React from "react";

import { current as curr } from "../data/weatherdata";
import Time from "./Time"

function Current() {
    const {location, current} = curr
    return (
        <div className="center location">
            <div >
                <h1>{location["name"]}</h1>
                <p>Region : {location["region"]}</p>
                <p>Country: {location["country"]}</p>
                <p>Latitude: {location["lat"]} Longitute: {location["lon"]}  </p>

                <Time time={{localtime: location["localtime"], epoch: location["localtime_epoch"]}} />
            </div>
            <div className="current-weather">
                <div className="row">
                    <div className="cells">
                        <span>Last Updated EPOCH</span>
                        <span>{current["last_updated_epoch"]}</span>
                    </div>
                    <div className="cells">
                        <span>Last Updated : Date-Time</span>
                        <span>{current["last_updated"]}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="cells">
                        <span>Temperature : Degree Celsius</span>
                        <span>{current["temp_c"]} °C</span>
                    </div>
                    <div className="cells">
                        <span>Temperature : Fahrenheight</span>
                        <span>{current["temp_f"]} °F</span>
                    </div>
                </div>
                <div className="row">
                    <div className="cells">
                        <span>{current["is_day"] === 0 ? "🌑" : "☀️"}</span>
                    </div>
                    <div className="cells">
                        <span>Weather Condition</span>
                        <span>{current["condition"]["text"]}</span>
                        <img src={"https:"+current["condition"]["icon"]} alt={current["condition"]["text"]}/>
                        <span>{current["condition"]["code"]}</span>
                    </div>
                </div>
            </div>
            <div className="weather-aspects">
                <div className="wind">
                    <table>
                        <tr>
                            <td>{current["wind_mph"]} MPH</td>
                            <td>{current["wind_kph"]} KPH</td>
                        </tr>
                        <tr>
                            <td>{current["wind_degree"]}°</td>
                            <td>{current["wind_dir"]}</td>
                        </tr>
                    </table>
                </div>
                <div className="precipitation">
                    <table>
                        <tr>
                            <td>{current["pressure_mb"]} MPH</td>
                            <td>{current["pressure_in"]} KPH</td>
                        </tr>
                    </table>
                </div>
                <div className="precipitation">
                    <table>
                        <tr>
                            <td>{current["precip_mm"]}°</td>
                            <td>{current["precip_in"]}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Current;