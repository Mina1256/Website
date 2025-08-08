import React from "react";
import AppOuter from "./appOuter";
import WordleOuter from "./wordleOuter";
import TicOuter from "./ticOuter";
import HangmanOuter from "./hangmanOuter";
import WebsiteOuter from "./websiteOuter";
import OldWebsiteOuter from "./oldWebsite";
import "./projects.css";

const Projects = () => {
  return (
    <div className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <AppOuter />
      <WordleOuter />
      <OldWebsiteOuter />
      <TicOuter />
      <HangmanOuter />
      <WebsiteOuter />
    </div>
  );
};

export default Projects;
