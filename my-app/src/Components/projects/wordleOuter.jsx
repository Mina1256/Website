import React, { useEffect } from 'react';
import './wordleOuter.css';
import { useNavigate } from 'react-router-dom';


const WordleOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const seeProject = document.getElementById("seeProjectWordle")

        const toWordle = () => {
            setTimeout(() => {
                // navigate('/wordle');
                window.location.pathname = "/wordle"
            }, 0);
        }
        seeProject.addEventListener("click", toWordle)
    }, []);

    return(
        <div>
            <div className="separator">
                <div className='separatorLine1'></div>
                <div className='separatorLine2'></div>
            </div>
            <div className='appProjectHome' >
                {/* <WordleViewer/> */}
                <div className='phoneVidContainer'>
                    <video className='phoneVid' playsInline autoPlay controls={null} muted loop>
                        <source src="/wordle_vid.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="projectTextHome">
                <h1 className="projectTitleHome">Wordle Game (*Unpublished)</h1>
                <h4 className="projectBriefHome">A game that models the popular game wordle.</h4>
                <button className="seeProject" id="seeProjectWordle">See More</button>
                </div>
            </div>
        </div>
    )
};

export default WordleOuter;
