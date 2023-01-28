import React, {useState, useEffect} from "react";
import { Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Current from "./components/Current"
import Statistics from "./components/Statistics"
import About from "./components/About"
import Navigationbar from "./components/Navigationbar"
import Footer from "./components/Footer";
import { forecast as defaultData } from "./data/weatherdata";

import error from "./assets/error-404.png"
import { LoginForm, SignupForm } from "./components/Login";

function PageNotFound({pageFound, setPageFound}) {
  return (
    <div className="error">
      <img src={error} alt="error" />
      <h1>Page not found</h1>
    </div>
  )
}

function App() {

  const [theme, setTheme] = useState("dark");
  const [currentLocation, setCurrentLocation] = useState({lat: -1, lon: 37});

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({lat: position.coords.latitude, lon: position.coords.longitude})
    })
  }, [])

  function toggleTheme(th) {
    setTheme(th)
  }

  return (
    <div className={theme}>
      <Navigationbar theme={theme} setLoggedIn={setLoggedIn} loggedIn={loggedIn} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<Home pos={currentLocation} curr={defaultData} />} />
        <Route exact path="/current" element={<Current pos={currentLocation} />} />
        <Route exact path="/statistics" element={<Statistics pos={currentLocation} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {loggedIn ? <Footer /> : null}
    </div>
  );
}

export default App;
