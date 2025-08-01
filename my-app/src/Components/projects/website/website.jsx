import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import websiteImg1 from "./website Images/website1.png";
import websiteImg2 from "./website Images/website2.png";
import websiteImg3 from "./website Images/website3.png";
import './website.css';
import { useNavigate } from 'react-router-dom';

const Website = () => {
    const navigate = useNavigate();

    // State to track whether each image has loaded
    const [imagesLoaded, setImagesLoaded] = useState({
        img1: false,
        img2: false,
        img3: false
    });

    // Function to update the state when an image is loaded
    const handleImageLoad = (imageKey) => {
        setImagesLoaded((prevState) => ({
            ...prevState,
            [imageKey]: true
        }));
    };

    return (
        <div className="websiteProject">
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Researcher's Website</h1>
                    <h2 className="projectSkills">#CSS, #Front-End, #Squarespace</h2>
                    <h3 className="projectText">This project was a website for a researcher created using various front-end web-design tools and CSS.</h3>
                    <Link className="visit" to="https://www.saleeblab.com/" target="_blank">Visit</Link>
                </div>
            </div>
            <div className="content">
                {/* Image 1 */}
                {!imagesLoaded.img1 && <div className="image-loader">Loading...</div>}
                <img
                    src={websiteImg1}
                    alt="Website Screenshot 1"
                    className={`websiteImage ${imagesLoaded.img1 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img1')}
                />

                {/* Image 2 */}
                {!imagesLoaded.img2 && <div className="image-loader">Loading...</div>}
                <img
                    src={websiteImg2}
                    alt="Website Screenshot 2"
                    className={`websiteImage ${imagesLoaded.img2 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img2')}
                />

                {/* Image 3 */}
                {!imagesLoaded.img3 && <div className="image-loader">Loading...</div>}
                <img
                    src={websiteImg3}
                    alt="Website Screenshot 3"
                    className={`websiteImage ${imagesLoaded.img3 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img3')}
                />
            </div>
        </div>
    );
};

export default Website;