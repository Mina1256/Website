import './hangmanOuter.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HangmanOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const seeProject = document.getElementById("seeProjectHagman")
  
        const toHangman = () => {
            setTimeout(() => {
                // navigate('/hangman');
                window.location.pathname = "/hangman"
            }, 0);
        }
        seeProject.addEventListener("click", toHangman)
    }, []);

    return(
        <div>
            <div className="separator">
                <div className='separatorLine1'></div>
                <div className='separatorLine2'></div>
            </div>
            <div className='hangmanProjectHome' >
                <div className='imageContainer'>
                    <img src={"/hangman_img.png"} alt="" height="300px" />
                </div>

                <div className="projectTextHome">
                    <h1 className="projectTitleHome">Hangman Game</h1>
                    <h4 className="projectBriefHome">A hangman game that selects words randomly and draws a hangman!</h4>
                    <button className="seeProject" id="seeProjectHagman">See More</button>
                </div>
            </div>
        </div>
    )
};

export default HangmanOuter;