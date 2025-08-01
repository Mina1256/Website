import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import websiteImg1 from "./website Images/website1.png";
import websiteImg2 from "./website Images/website2.png";
import websiteImg3 from "./website Images/website3.png";
import './website.css';
import { useNavigate } from 'react-router-dom';

const Website = () => {
    const navigate = useNavigate();

    return(
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
                <img src={websiteImg1} alt="" className="websiteImage"/>
                <img src={websiteImg2} alt="" className="websiteImage"/>
                <img src={websiteImg3} alt="" className="websiteImage"/>
            </div>
        </div>
    )
}
export default Website;