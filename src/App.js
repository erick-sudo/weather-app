import React from "react";
import { Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Current from "./components/Current"
import Statistics from "./components/Statistics"
import About from "./components/About"
import Navigationbar from "./components/Navigationbar"
import Footer from "./components/Footer";

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
      <Footer />
    </>
  );
}

export default App;
