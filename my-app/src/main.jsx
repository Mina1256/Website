import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import MyApp from './Components/projects/myApp/myApp.jsx';
import Wordle from './Components/projects/wordle/wordle.jsx';
import Tic from './Components/projects/Tic Tac Toe/tic.jsx';
import Hangman from './Components/projects/hangman/hangman.jsx';
import Website from './Components/projects/website/website.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<MyApp />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/tictactoe" element={<Tic />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/website" element={<Website />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);