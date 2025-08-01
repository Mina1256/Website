import './ticOuter.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TicOuter = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const seeProject = document.getElementById("seeProjectTic")
  
        const toTic = () => {
            setTimeout(() => {
                // navigate('/tictactoe');
                window.location.pathname = "/tictactoe"
            }, 0);
        }
        seeProject.addEventListener("click", toTic)
    }, []);

    return(
        <div>
            <div className="separator">
                <div className='separatorLine1'></div>
                <div className='separatorLine2'></div>
            </div>
            <div className='ticProjectHome' >
                <div className='imageContainer'>
                    <img src={"/tictactoe_img.png"} alt="" height="300px" />
                </div>

                <div className="projectTextHome">
                    <h1 className="projectTitleHome">Tic Tac Toe Bot</h1>
                    <h4 className="projectBriefHome">A Tic Tac Toe AI that cannot lose!</h4>
                    <button className="seeProject" id="seeProjectTic">See More</button>
                </div>
            </div>
        </div>
    )
};

export default TicOuter;