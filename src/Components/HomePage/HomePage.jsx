import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import NewGame from '../NewGame/NewGame';
import moment from "moment";

const HomePage = () => {
	const [currentPage, setCurrentPage] = useState('HomePage');
	const navigateToNewGame = () => {
		setCurrentPage('NewGame');
	};
	
	const [games, setGames] = useState([])
	useEffect(() => {
		axios.get('http://localhost:3001/games')
			.then(games => setGames(games.data))
			.catch(err => console.error(err))
	}, [])

	return (
		<>
		{currentPage === 'HomePage' && 
			<>
			<h1 className="title">Welcome To Tic Tac Toe</h1>
			<div className="buttonContainer">
			<button className="homePageButtons" onClick={navigateToNewGame}>START</button>
			</div>
			
			<h2 className="subtitle">Game History</h2>
			<div className="game-history-container">
				<table className="game-history-table">
					<thead>
					<tr>
						<th>Game</th>
						<th>Score</th>
						<th>Date</th>
					</tr>
					</thead>
					<tbody>
					{games.slice(0, 10).map((game, index) => (
						<tr key={index}>
						<td>{game.player1Name} vs. {game.player2Name}</td>
						<td>{game.player1Wins} - {game.player2Wins}</td>
						<td>{moment(game.matchDate).format('MMMM DD, YYYY h:mm A')}</td>
						</tr>
					))}
					</tbody>
				</table>
				
				</div> 
				</>
		}

		{currentPage === 'NewGame' && <NewGame/>}
		</>
	);
};

export default HomePage;
