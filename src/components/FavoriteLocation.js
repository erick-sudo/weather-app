import React, { useEffect, useState } from "react"

const api_key = "9c2d8d365ef64a2998762134223112"


function FavoriteLocation({curr, pos}) {

    const[forecast, setForecast] = useState(curr)
    const { location, current } = forecast

    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${pos.lat},${pos.lon}&days=7`)
        .then(response => response.json())
        .then(data => {
            setForecast(data)
        })
    }, [forecast])

    return (
        <div className="favorite">
            <h1>{location["region"]}</h1>
            <div className="top">
                <div className="weather-image">{current["condition"]["text"]}<img src={"https:"+current["condition"]["icon"]} alt="weather" /></div>
                <div className="weather-data">
                    <div>Wind: {current["wind_mph"]} mph</div>
                    <div>Precip: {current["precip_in"]} in</div>
                    <div>Pressure: {current["pressure_in"]} in</div>
                    <h2>{current["temp_c"]} °f</h2>
                </div>
            </div>
            <div className="days">
                {
                    forecast.forecast.forecastday.map((day, index) => {
                        return (
                            <div key={index} className="dys" >
                                <div>{day.date}</div>
                                <img src={"https:"+day.day.condition.icon} alt="condition"/>
                                <h1>{day.day["avgtemp_f"]} °f</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FavoriteLocation;