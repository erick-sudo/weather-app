// 20230123195657
// https://api.weatherapi.com/v1/current.json?key=9c2d8d365ef64a2998762134223112&q=48.8567,2.3508

const current = {
  "location": {
    "name": "Paris",
    "region": "Ile-de-France",
    "country": "France",
    "lat": 48.86,
    "lon": 2.35,
    "tz_id": "Europe/Paris",
    "localtime_epoch": 1674493016,
    "localtime": "2023-01-23 17:56"
  },
  "current": {
    "last_updated_epoch": 1674492300,
    "last_updated": "2023-01-23 17:45",
    "temp_c": 3.0,
    "temp_f": 37.4,
    "is_day": 0,
    "condition": {
      "text": "Mist",
      "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
      "code": 1030
    },
    "wind_mph": 11.9,
    "wind_kph": 19.1,
    "wind_degree": 30,
    "wind_dir": "NNE",
    "pressure_mb": 1033.0,
    "pressure_in": 30.5,
    "precip_mm": 0.0,
    "precip_in": 0.0,
    "humidity": 75,
    "cloud": 75,
    "feelslike_c": -0.9,
    "feelslike_f": 30.4,
    "vis_km": 10.0,
    "vis_miles": 6.0,
    "uv": 1.0,
    "gust_mph": 13.0,
    "gust_kph": 20.9
  }
}

export { current}