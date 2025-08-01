import { useEffect } from 'react';
import './tic.css';
import { useNavigate } from 'react-router-dom';

const Tic = () => {
    const navigate = useNavigate();
    useEffect (() => {
        const squares = document.querySelectorAll(".ticBoxes")
        const line = document.querySelector(".ticLine")
        let board = [["M","M","M"], ["M","M","M"], ["M","M","M"]];
        let turn = 0;
        let gameIsOver = false;
        const returnButton = document.querySelector(".return");
        const resetButton = document.querySelector(".reset")

        resetButton.addEventListener("click", () => {
            turn = 0;
            gameIsOver = false;
            line.style.display = "none";
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    board[i][j] = "M";
                    squares[i + j*3].innerText = ""
                }
            }
        })

        const isComplete = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == "M") return false;
                }
            }
            return true;
        }
        
        const checkWinner = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != "M") {
                    if (board[i][0] == "O") return 1;
                    else return -1;
                }
            }

            for (let i = 0; i < 3; i++) {
                if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != "M") {
                    if (board[0][i] == "O") return 1;
                    else return -1;
                }
            }

            // check first diagonal
            if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "M") {
                if (board[0][0] == "O") return 1;
                else return -1;
            }

            // check second diagonal
            if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "M") {
                if (board[0][2] == "O") return 1;
                else return -1;
            }

            // Tie
            return 0;
        }

        function drawLine() {
            line.style.height = "";
            line.style.width = "";
            line.style.marginTop = "";
            line.style.marginLeft = "";
            line.style.transform = "";

            // win via row
            for (let i = 0; i < 3; i++) {
                if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != "M") {
                    line.style.height = "15px";
                    line.style.width = "min(70vw, 100vh)";
                    if (i == 0) {
                        line.style.marginTop = "min(11vw, 15.5vh)";
                    }
                    else if (i == 1) {
                        line.style.marginTop = "min(35vw, 50vh)";
                    }
                    else {
                        line.style.marginTop = "min(59vw, 84.5vh)";
                    }
                    line.style.transform = "translateY(-50%)";
                    line.style.display = "block";
                    return;
                }
            }

            // win via column
            for (let i = 0; i < 3; i++) {
                if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != "M") {
                    line.style.height = "min(70vw, 100vh)";
                    line.style.width = "15px";
                    if (i == 0) {
                        line.style.marginLeft = "min(11vw, 15.5vh)";
                    }
                    else if (i == 1) {
                        line.style.marginLeft = "min(35vw, 50vh)";
                    }
                    else {
                        line.style.marginLeft = "min(59vw, 84.5vh)";
                    }
                    line.style.transform = "translateX(-50%)";
                    line.style.display = "block";
                    return;
                }
            }

            if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "M") {
                line.style.transform = "translateY(-50%) translateX(max(-9vw, -12.5vh)) rotate(45deg)";
                line.style.marginTop = "min(35vw, 50vh)";
                line.style.width = "min(88vw, 125vh)"
                line.style.height = "15px";
                line.style.display = "block";
                return;
            }

            if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "M") {
                line.style.transform = "translateY(-50%) translateX(max(-9vw, -12.5vh)) rotate(-45deg)";
                line.style.marginTop = "min(35vw, 50vh)";
                line.style.width = "min(88vw, 125vh)"
                line.style.height = "15px";
                line.style.display = "block";
            }

        }

        function bestMove() {
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Available spot
                    if (board[i][j] == "M") {
                        board[i][j] = "O";
                        let score = minimax(false)
                        board[i][j] = "M";
                        if (score > bestScore) {
                            bestScore = score;
                            move = {i, j};
                        }
                    }
                }
            }
            board[move.i][move.j] = "O"
        }

        function minimax(isMaximizing) {
            let outcome = checkWinner()
            if (outcome != 0) return outcome;
            else if (isComplete()) return outcome;

            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] == "M") {
                            board[i][j] = "O"
                            let score = minimax(false);
                            board[i][j] = "M"
                            bestScore = Math.max(score, bestScore)
                        }
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] == "M") {
                            board[i][j] = "X"
                            let score = minimax(true);
                            board[i][j] = "M"
                            bestScore = Math.min(score, bestScore)
                        }
                    }
                }
                return bestScore;
            }
        }

        const handleClick = (row, column) => {

            if (board[row][column] == "M" && !gameIsOver) {
                board[row][column] = "X";

                turn+=2;
                if (turn < 9) bestMove(board);
                
                //output 
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] != "M") squares[i + j*3].innerText = board[i][j];
                    }
                }

                let result = checkWinner();
                if (result != 0) {
                    drawLine()
                    gameIsOver = true;
                } 
                else if (turn == 9) {
                    console.log("tie")
                    gameIsOver = true;
                }
            }
        }

        squares.forEach((square, index) => {
            let row, column;
            if (index >= 6) {
                column = 2;
                row = index - 6
            }
            else if (index >= 3) {
                column = 1;
                row = index-3;
            }
            else {
                column = 0;
                row = index;
            }
            square.addEventListener("click", () => handleClick(row, column))
        })

        return () => {
            squares.forEach((square, index) => {
                let row, column;
                if (index >= 6) {
                    column = 2;
                    row = index - 6
                }
                else if (index >= 3) {
                    column = 1;
                    row = index-3;
                }
                else {
                    column = 0;
                    row = index;
                }
                square.removeEventListener("click", () => handleClick(row, column))
            })
          };
    }, []);



    return(
        <div className="ticContainer">
            <div className="projectTextContainer">
                <div className='projectTextSubContainer'>
                    <button className="return" onClick={() => navigate(-1)}>←</button>
                    <h1 className="projectTitle">Tic Tac Toe</h1>
                    <h2 className="projectSkills">#JS, #CSS, #HTML, #AI, #Minimax</h2>
                    <h3 className="projectText">This project is a Tic Tac Toe game that cannot be beat! Go ahead and try! You may tie, but you certainly won't win. It uses a minimax alogirhtm. Esentially, it check all the possibile outcomes and plays.</h3>
                    <button className="reset">Reset</button>
                </div>
            </div>
            <div className="ticGameBoardContainer">
                <div className="ticGameBoard">
                    <div className="ticRow1">
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                    </div>
                    <div className="ticRow2">
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                    </div>
                    <div className="ticRow3">
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                        <div className="ticBoxes"></div>
                    </div>
                    <div className="ticLine"></div>
                </div>
            </div>
        </div>
    )
}

export default Tic;