import './appOuter.css';
import './wordleOuter.css';
// import './hangmanOuter.css';
// import './ticOuter.css';
// import './websiteOuter.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
      const seeProject = document.getElementById("seeProjectApp")

      const toMyApp = () => {
          setTimeout(() => {
              // navigate('/app');
              window.location.pathname = "/app"
          }, 0);
      }
      seeProject.addEventListener("click", toMyApp)
    }, []);

    return(
      <div className='appProjectHome' >
        <div className='phoneVidContainer'>
            <video className='phoneVid' playsInline autoPlay controls={null} muted loop>
                <source src="/app_vid.mp4" type="video/mp4" />
            </video>
        </div>

        <div className="projectTextHome">
          <h1 className="projectTitleHome">Coptic Dictionary App</h1>
          <h4 className="projectBriefHome">An app that allows people to translate to and from Coptic.</h4>
          <button className="seeProject" id="seeProjectApp">See More</button>
        </div>
      </div>
    )
};

export default AppOuter;
