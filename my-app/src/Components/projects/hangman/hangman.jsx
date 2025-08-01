import React from 'react';
import { useEffect } from 'react';
import './hangman.css';
import hangmanImg from "./Hangman Images/hangmanImage.jpg";
import hangmanImg1 from "./Hangman Images/hangmanImage (1).jpg";
import hangmanImg2 from "./Hangman Images/hangmanImage (2).jpg";
import hangmanImg3 from "./Hangman Images/hangmanImage (3).jpg";
import hangmanImg4 from "./Hangman Images/hangmanImage (4).jpg";
import hangmanImg5 from "./Hangman Images/hangmanImage (5).jpg";
import hangmanImg6 from "./Hangman Images/hangmanImage (6).jpg";
import hangmanImg7 from "./Hangman Images/hangmanImage (7).jpg";
import hangmanImg8 from "./Hangman Images/hangmanImage (8).jpg";
import { useNavigate } from 'react-router-dom';

const hangmanImages = [hangmanImg1, hangmanImg2, hangmanImg3, hangmanImg4, hangmanImg5, hangmanImg6, hangmanImg7, hangmanImg8];

const Hangman = () => {

  const words = ["ADULTHOOD", "HIJACKERS", "EXPERTISE", "PARALYZED", "ABILITIES", "TEXTBOOKS", "TECHNIQUE", "BLEACHERS", "UNPLUGGED", "REFLEXIVE"];
  var word = words[Math.floor(Math.random() * 9)]; 
  let buttonsClicked = Array.from({ length: 26 }).fill(0);
  let prevGuessesPos = 0;
  const navigate = useNavigate();

  useEffect (() => {
    const prevGuesses = Array.from(document.querySelectorAll(".prev"));
    const wordLetters = Array.from(document.querySelectorAll(".wordLetter"));
    const buttons = document.querySelectorAll(".hangmanButtons button");
    let img = document.querySelector(".hangmanGameImage");
    const gameResult = document.querySelector(".gameResult");
    const gameResultTxt = document.querySelector(".gameResultTxt");
    const gameResultButton = document.querySelector(".gameResultButton");
    const resetButton = document.querySelector(".reset")
    const returnButton = document.querySelector(".return");

    buttons.forEach(b => {
      b.addEventListener("click", () => {
        const letter = b.innerText;
        if (buttonsClicked[letter.charCodeAt(0)-"A".charCodeAt(0)]) return;
        buttonsClicked[letter.charCodeAt(0)-"A".charCodeAt(0)] = 1;
        b.style.backgroundColor = "rgb(100, 100, 100)";
        b.style.textDecoration = "line-through";
        if (word.includes(letter)) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
              wordLetters[i].innerText = letter;
            }
          }
        }
        else {
          if (prevGuessesPos != 8) {
            prevGuesses[prevGuessesPos].innerText = letter;
            img.src = hangmanImages[prevGuessesPos];
          }
          prevGuessesPos++;
        }

        let won = true;
        for (let i = 0; i < 9; i++) {
          if (wordLetters[i].innerText == "_")  won = false;
        }
        if (won) {
          gameResultTxt.innerText = "You have won!";
          gameResult.style.display = "flex";
        }
        else if (prevGuessesPos == 9) {
          gameResultTxt.innerText = "You have lost. The word was " + word;
          gameResult.style.display = "flex";
        }
      })
    })

    function resetGame() {
      word = words[Math.floor(Math.random() * 9)];
      buttonsClicked = Array.from({ length: 26 }).fill(0);
      prevGuessesPos = 0;

      for (let i = 0; i < 9; i++) wordLetters[i].innerText = "_";
      for (let i = 0; i < 8; i++) prevGuesses[i].innerText = "...";

      gameResult.style.display = "none";
      img.src = hangmanImg;

      buttons.forEach(button => {
        button.style.textDecoration = "none";
        button.style.backgroundColor = "darkgray";
      })
    }

    gameResultButton.addEventListener("click", resetGame)
    resetButton.addEventListener("click", resetGame)
  }, []);

  return (
    <div className="hangmanProject">
      <div className="projectTextContainer">
        <div className='projectTextSubContainer'>
          <button className="return" onClick={() => navigate(-1)}>←</button>
          <h1 className="projectTitle">Hangman</h1>
          <h2 className="projectSkills">#Java, #JS, #CSS, #HTML, #React</h2>
          <h3 className="projectText">This is an updated version of the Hangman game I created as my final project for grade 11 computer science (the old version is shown below). This program rejects not-character input and rejects previously inputed answers. Please test out the game (lowercase and uppercase letters are accepted)!</h3>
          <button className="reset">Reset</button>
        </div>
      </div>
      <div className="content">
        <div className="game">
          <div className="hangmanImageGuesses">
            <img src={hangmanImg} alt="" className="hangmanGameImage"/>
            <div>
              <h4>Previous Guesses</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4>
              <h4 className="prev">...</h4> 
            </div>
          </div>
          <div className="hangmanUnknownWordContainer">
            <div className="hangmanUnknownWord">
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
              <h4 className="wordLetter">_</h4>
            </div>
          </div>
          <div className="hangmanButtonsContainer">
            <div className="hangmanButtons">
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
              <button>E</button>
              <button>F</button>
              <button>G</button>
              <button>H</button>
              <button>I</button>
              <button>J</button>
              <button>K</button>
              <button>L</button>
              <button>M</button>
            </div>
            <div className="hangmanButtons">
              <button>N</button>
              <button>O</button>
              <button>P</button>
              <button>Q</button>
              <button>R</button>
              <button>S</button>
              <button>T</button>
              <button>U</button>
              <button>V</button>
              <button>W</button>
              <button>X</button>
              <button>Y</button>
              <button>Z</button>
            </div>
          </div>
          <div className="gameResult">
            <h3 className="gameResultTxt"></h3>
            <button className="gameResultButton">Play Again</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hangman;
