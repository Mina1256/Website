import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./about.css";

const About = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["engineer", "coder", "creator", "innovator"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h1 className="about-name">Mina Mikhail</h1>
          <h1 className="typer">
            <span ref={el}></span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;
