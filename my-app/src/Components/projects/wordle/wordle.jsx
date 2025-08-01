import React from 'react';
import { useEffect } from 'react';
import wordleImg1 from "./wordle Images/wordle1.png";
import wordleImg2 from "./wordle Images/wordle2.png";
import { useNavigate } from 'react-router-dom';

const Wordle = () => {
    const navigate = useNavigate();

    return (
        <div className='appProject'>
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" id="wordleReturn" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Wordle App</h1>
                    <h2 className="projectSkills">#SwiftUI, #UIKit</h2>
                    <h3 className="projectText">This is a Wordle game app that works under the normal conditions of the game: it checks spelling, checks letter positioning, has 5 tries, etc.</h3>
                </div>
            </div>
            <div className="content">
                <img src={wordleImg1} alt="" className="appImage"/>
                <img src={wordleImg2} alt="" className="appImage"/>
            </div>
        </div>
    )
}

export default Wordle;