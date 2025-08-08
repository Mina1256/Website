import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import Nav from "./Components/nav/nav"
import Projects from './Components/projects/projects';
import About from "./Components/about/about";
import Experience from "./Components/experience/experience";
import News from "./Components/news/news";
import AirplaneModel from "./Components/AirplaneModel/Airplane";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ top: 0, left: 100, backgroundColor: "rgb(221, 221, 221)" }}>
      <Nav/>
      <AirplaneModel />
      <About />
      <Experience />
      <Projects />
      <News />
    </div>
  );
}

export default App
