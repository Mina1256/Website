import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wordleImg1 from "./wordle Images/wordle1.png";
import wordleImg2 from "./wordle Images/wordle2.png";
import './wordle.css';
import { useNavigate } from 'react-router-dom';

const Wordle = () => {
    const navigate = useNavigate();

    // State to track whether each image has loaded
    const [imagesLoaded, setImagesLoaded] = useState({
        img1: false,
        img2: false
    });

    // Function to update the state when an image is loaded
    const handleImageLoad = (imageKey) => {
        setImagesLoaded((prevState) => ({
            ...prevState,
            [imageKey]: true
        }));
    };

    return (
        <div className="wordleProject">
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Wordle App</h1>
                    <h2 className="projectSkills">#SwiftUI, #UIKit</h2>
                    <h3 className="projectText">This is a Wordle game app that works under the normal conditions of the game: it checks spelling, checks letter positioning, has 5 tries, etc.</h3>
                    <Link className="visit" to="https://apps.apple.com/ca/app/wordle/id123456789" target="_blank">Visit</Link>
                </div>
            </div>
            <div className="content">
                {/* Image 1 */}
                {!imagesLoaded.img1 && <div className="image-loader">Loading...</div>}
                <img
                    src={wordleImg1}
                    alt="Wordle Screenshot 1"
                    className={`wordleImage ${imagesLoaded.img1 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img1')}
                />

                {/* Image 2 */}
                {!imagesLoaded.img2 && <div className="image-loader">Loading...</div>}
                <img
                    src={wordleImg2}
                    alt="Wordle Screenshot 2"
                    className={`wordleImage ${imagesLoaded.img2 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img2')}
                />
            </div>
        </div>
    );
};

export default Wordle;