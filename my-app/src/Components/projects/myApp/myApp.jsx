import './myApp.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appImg1 from "./myApp Images/myApp1.png";
import appImg2 from "./myApp Images/myApp2.png";
import appImg3 from "./myApp Images/myApp3.png";
import { useNavigate } from 'react-router-dom';

const MyApp = () => {
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
        <div className='appProject'>
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Coptic Dictionary App</h1>
                    <h2 className="projectSkills">#SwiftUI, #UIKit</h2>
                    <h3 className="projectText">This is a Coptic dictionary app created for those who still use Coptic in the world. It is the liturgical language of the Coptic Orthodox Church. The app includes a keyboard that can be added to the device as well as a variety of algorithms. This project took about 6 months.</h3>
                    <Link className="visit" to="https://apps.apple.com/ca/app/coptic-dictionary/id6474273352" target="_blank">Visit</Link>
                </div>
            </div>
            <div className="content">
                {/* Image 1 */}
                {!imagesLoaded.img1 && <div className="image-loader">Loading...</div>}
                <img
                    src={appImg1}
                    alt="App Screenshot 1"
                    className={`appImage ${imagesLoaded.img1 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img1')}
                />

                {/* Image 2 */}
                {!imagesLoaded.img2 && <div className="image-loader">Loading...</div>}
                <img
                    src={appImg2}
                    alt="App Screenshot 2"
                    className={`appImage ${imagesLoaded.img2 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img2')}
                />

                {/* Image 3 */}
                {!imagesLoaded.img3 && <div className="image-loader">Loading...</div>}
                <img
                    src={appImg3}
                    alt="App Screenshot 3"
                    className={`appImage ${imagesLoaded.img3 ? '' : 'hiddenImg'}`}
                    onLoad={() => handleImageLoad('img3')}
                />
            </div>
        </div>
    );
};

export default MyApp;