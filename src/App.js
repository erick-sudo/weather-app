import React from "react";
import { Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./Home"
import Current from "./Current"
import Statistics from "./Statistics"
import About from "./About"
import Navigationbar from "./Navigationbar"

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current" element={<Current />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
