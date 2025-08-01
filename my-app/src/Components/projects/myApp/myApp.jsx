import './myApp.css';
import React from 'react';
import { Link } from 'react-router-dom';
import appImg1 from "./myApp Images/myApp1.png";
import appImg2 from "./myApp Images/myApp2.png";
import appImg3 from "./myApp Images/myApp3.png";
import { useNavigate } from 'react-router-dom';

const MyApp = () => {
    const navigate = useNavigate();

    return (
        <div className='appProject'>
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Coptic Dictionary App</h1>
                    <h2 className="projectSkills">#SwiftUI, #UIKit</h2>
                    <h3 className="projectText">This is a Coptic dictionary app created for those who still use Coptic in the world. It is the liturgical language of the Coptic Orthodox Church. The app includes a keyboard that can be added to the device as well as a variety of alogirthms. This project took about 6 months.</h3>
                    <Link className="visit" to="https://apps.apple.com/ca/app/coptic-dictionary/id6474273352" target="_blank">Visit</Link>
                </div>
            </div>
            <div className="content">
                <img src={appImg1} alt="" className="appImage"/>
                <img src={appImg2} alt="" className="appImage"/>
                <img src={appImg3} alt="" className="appImage"/>
            </div>
        </div>
    )
}

export default MyApp;