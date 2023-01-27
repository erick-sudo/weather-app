import React, { useEffect, useState } from "react";

import { forecast as defaultData } from "../data/weatherdata";
import Time from "./Time"
import QueryForm from "./QueryForm";

const api_key = "9c2d8d365ef64a2998762134223112"
// const coords = "q=48.8567,2.3508"

function Current({pos}) {
    const {lat, lon} = pos
    const [curr, setCurr] = useState(defaultData)
    const [coordinates, setCoordinates] = useState({lat: lat, lon: lon})

    function resetCoordinates(coord) {
        setCoordinates(coord)
    }

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${coordinates.lat},${coordinates.lon}`)
        .then(res => res.json())
        .then(data => setCurr(data))
    }, [ coordinates ])

    const { location, current } = curr

    return (
        <div className="center current">
            <QueryForm resetCoordinates={resetCoordinates} />
            <div className="location">
                <h1>{location["name"]}
                <span>, {location["region"]}</span>
                <span>, {location["country"]}</span>
                <span>:  [Lat {location["lat"]} , Lon {location["lon"]} ]</span>
                </h1>

                <Time time={{localtime: location["localtime"], epoch: location["localtime_epoch"]}} />
            </div>
            <div className="current-weather">
                <div className="row">
                    <div className="cellsl">
                        <span>⏱️   EPOCH</span>
                        <span>{current["last_updated_epoch"]}</span>
                    </div>
                    <div className="cellsr">
                        <span>🕒 Last Updated</span>
                        <span>{current["last_updated"]}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="cellsl">
                        <span>🌡️ : Degree Celsius</span>
                        <span>{current["temp_c"]} °C</span>
                    </div>
                    <div className="cellsr">
                        <span>🌡️ : Fahrenheight</span>
                        <span>{current["temp_f"]} °F</span>
                    </div>
                </div>
                <div className="row">
                    <div className="cellsl">
                        <span className="day-night">{current["is_day"] === 0 ? "🌑" : "☀️"}</span>
                    </div>
                    <div className="cellsr">
                        <span>Weather Condition</span>
                        <span>{current["condition"]["text"]}</span>
                        <img src={"https:"+current["condition"]["icon"]} alt={current["condition"]["text"]}/>
                        <span>{current["condition"]["code"]}</span>
                    </div>
                </div>
            </div>
            <div className="weather-aspects">
                <div className="wind">
                    <label>Wind</label>
                    <table>
                        <tbody>
                        <tr>
                            <td>{current["wind_mph"]} MPH</td>
                            <td>{current["wind_kph"]} KPH</td>
                        </tr>
                        <tr>
                            <td>{current["wind_degree"]}°</td>
                            <td>{current["wind_dir"]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pressure">
                <label>Pressure</label>
                    <table>
                        <tbody>
                        <tr>
                            <td>{current["pressure_mb"]} mb</td>
                            <td>{current["pressure_in"]} in</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="precipitation">
                <label>Precipitation</label>
                    <table>
                        <tbody>
                        <tr>
                            <td>{current["precip_mm"]} mm</td>
                            <td>{current["precip_in"]} in</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="other-aspects">
                    <div className="humidity">
                        <label>Humidity</label>
                        <h1>{current["humidity"]}</h1>
                    </div>
                    <div className="cloud">
                    <label>Cloud Cover</label>
                        <h1>{current["cloud"]}</h1>
                    </div>
                    <div className="gust">
                    <label>Gust</label>
                        <h1>{current["gust_mph"]} MPH</h1>
                        <h1>{current["gust_kph"]} KPH</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Current;