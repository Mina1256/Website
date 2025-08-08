import './websiteOuter.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MacbookModel from './MacbookModel';

const WebsiteOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const seeProject = document.getElementById("seeProjectWebsite")
  
        const toWebsite = () => {
            setTimeout(() => {
                // navigate('/website');
                window.location.pathname = "/website"
            }, 0);
        }
        seeProject.addEventListener("click", toWebsite)
    }, []);

    return (
        <div>
            <div className="separator">
                    <div className='separatorLine1'></div>
                    <div className='separatorLine2'></div>
                </div>
            <div className='websiteProjectHome'>

                <div className='imageContainer'>
                    {/* <video className='websiteVid' playsInline autoPlay controls={null} muted loop height="250px">
                        <source src="/website_vid.mp4" type="video/mp4" />
                    </video> */}
                    <MacbookModel mediaSrc="/website_vid.mov" isVideo={true} />
                </div>

                <div className="projectTextHome">
                    <h1 className="projectTitleHome">Researcher's Website</h1>
                    <h4 className="projectBriefHome">A website created for a lab.</h4>
                    <button className="seeProject" id="seeProjectWebsite">See More</button>
                </div>
            </div>
        </div>
    )
}

export default WebsiteOuter;