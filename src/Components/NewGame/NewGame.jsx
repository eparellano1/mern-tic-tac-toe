import React, { useState } from 'react'
import HomePage from '../HomePage/HomePage';
import TicTacToe from '../TicTacToe/TicTacToe';
import './NewGame.css'

const NewGame = () => {
    const [currentPage, setCurrentPage] = useState('NewGame');
	const navigateToGame = () => {
		setCurrentPage('TicTacToe');
	};

    const navigateToHome = () => {
		setCurrentPage('HomePage');
	};

    const [formData, setFormData] = useState({});

    const handleInputChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const isButtonDisabled = !(formData.player1Name?.trim() && formData.player2Name?.trim())
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
      <>
      {currentPage === 'HomePage' && <HomePage/>}
      {currentPage === 'TicTacToe' && <TicTacToe formData={formData}/>}
      {currentPage === 'NewGame' && (
        <>
        <h1 className="title">Welcome To Tic Tac Toe</h1>
		<h2 className="subtitle">Input Player Names</h2>

        <div className="input-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Player 1 Name: <></>
                        <input
                        type="text"
                        name="player1Name"
                        value={formData.player1Name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Player 2 Name: <></>
                        <input
                        type="text"
                        name="player2Name"
                        value={formData.player2Name}
                        onChange={handleInputChange}
                        />
                    </label>
                </form>
            </div>
            <div className="buttons-container">
                <button className="newGameButtons" onClick={navigateToHome}>HOME</button>
                <button className={`newGameButtons ${isButtonDisabled ? 'disabled' : ''}`} onClick={navigateToGame} disabled={isButtonDisabled}>START</button>
            </div>
        </div>
        </> 
        )}
      </> 
    );
  };

export default NewGame