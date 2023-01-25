import React, { useEffect, useState } from "react";

function Statistics() {

    const [stats, setStats] = useState({
        astro: {},
        date: "",
        date_epoch: 0,
        day: {},
        hour: []
    })

    useEffect(() => {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=9c2d8d365ef64a2998762134223112&q=Paris")
        .then(res => res.json())
        .then(data => {
            // console.log((data.forecast.forecastday[0]))
            setStats(data.forecast.forecastday[0])
        })
    }, [])


    const {astro, date, day, hour} = stats

    // console.log(Object.keys(hour[0]))

    const keys = ['temp_c', 'temp_f', 'wind_mph', 'wind_kph', 'wind_degree', 'pressure_mb', 'pressure_in', 'precip_mm', 'precip_in', 'humidity', 'cloud', 'feelslike_c', 'feelslike_f', 'windchill_c', 'windchill_f', 'heatindex_c', 'heatindex_f', 'dewpoint_c', 'dewpoint_f', 'vis_km', 'vis_miles', 'gust_mph', 'gust_kph', 'uv']

    return (
        <div className="center statisctics">
            <h1 className="h1">24 Hour Stats</h1>
            <div className="hour">
                {
                    keys.map(k => {
                        return <Hours hours={hour} aspect={k} />
                    })
                }
            </div>
        </div>
    )
}

function Hours({hours, aspect}) {
    const W = window.innerWidth*0.8, H = 100;
    const canvasRef = React.useRef()

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")
        drawGraph(ctx, hours.map(hour => hour[aspect]), W, canvasRef.current)
    }, [canvasRef, hours, W, aspect])
    return (
        <div className="hours">
            <span className="keys">{aspect.split("_").map(s => {
                            let str = s.split("")
                            return str[0].toUpperCase()+str.slice(1).join("")
                        }).join(" ")}</span>
            <canvas ref={canvasRef} height={H} width={W}></canvas>
        </div>
    )
}

function drawGraph(ctx, vals, L, CANVAS) {
    gridCanvas(CANVAS, "blue")
    let p = {x: 0, y: 0}
    let interval = L / 24
    vals.forEach(val => {
        p = drawLine(ctx, p.x, p.y, p.x+interval,val)
    });
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    return {x: x2, y: y2}
}


function gridCanvas(canvas, color) {
    const ctx = canvas.getContext("2d");
    for(let i=0;i<canvas.width;i+=10) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.width);
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for(let i=0;i<canvas.height;i+=10) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
}

export default Statistics;