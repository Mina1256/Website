import './websiteOuter.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MacbookModel from './MacbookModel';

const OldWebsiteOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const seeProject = document.getElementById("seeProjectWebsite")
  
        const toWebsite = () => {
            setTimeout(() => {
                // navigate('/website');
                // window.location.pathname = "/website"
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
                    <MacbookModel mediaSrc="/oldWebsite.mov" isVideo={true} ></MacbookModel>
                </div>

                <div className="projectTextHome">
                    <h1 className="projectTitleHome">Old Portfolio Website</h1>
                    <h4 className="projectBriefHome">My older portfolio website created with HTML, CSS, and JavaScript.</h4>
                    <button 
                        className="seeProject" 
                        // id="seeProjectWebsite" 
                        onClick={() => window.open('https://website-old-wheat.vercel.app/', '_blank')}
                    >
                        See More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OldWebsiteOuter;