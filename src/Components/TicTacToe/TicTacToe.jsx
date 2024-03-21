import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";
import axios from "axios";
import HomePage from "../HomePage/HomePage";

let data = ["", "", "", "", "", "", "", "", ""];
const TicTacToe = ({formData}) => {
    const { player1Name, player2Name } = formData;
    let [count,setCount] = useState(0)
    let [lock,setLock] = useState(false)
    let [player1Score, setPlayer1Score] = useState(0) 
    let [player2Score, setPlayer2Score] = useState(0)
    let [drawScore, setDrawScore] = useState(0)
    let [matchDone, setMatchDone] = useState(false) 

    const [currentPage, setCurrentPage] = useState('TicTacToe');
    const navigateToHome = () => {
        reset()
		setCurrentPage('HomePage');
	};

    let titleRef = useRef(null)

    let box1 = useRef(null), box2 = useRef(null), box3 = useRef(null), 
        box4 = useRef(null), box5 = useRef(null), box6 = useRef(null), 
        box7 = useRef(null), box8 = useRef(null), box9 = useRef(null)

    let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9]
 
    const toggle = (e, num) => {
        if (lock) return 0
        if (data[num] === ''){
            if (count % 2 === 0){
                e.target.innerHTML = `<img src='${cross_icon}'>`
                data[num] = 'x'
                setCount(++count)
            } else {
                e.target.innerHTML = `<img src='${circle_icon}'>`
                data[num] = 'o'
                setCount(++count)
            }
            checkWin()
        }
    }

    const checkWin = () => {
        console.log(data)
        if(data[0] === data[1] && data[1] === data[2] && data[2]!=="") won(data[2])
        else if(data[3] === data[4] && data[4] === data[5] && data[5]!=="") won(data[5])
        else if(data[6] === data[7] && data[7] === data[8] && data[8]!=="") won(data[8])
        else if(data[0] === data[3] && data[3] === data[6] && data[6]!=="") won(data[6])
        else if(data[1] === data[4] && data[4] === data[7] && data[7]!=="") won(data[7])
        else if(data[2] === data[5] && data[5] === data[8] && data[8]!=="") won(data[8])
        else if(data[0] === data[4] && data[4] === data[8] && data[8]!=="") won(data[8])
        else if(data[0] === data[1] && data[1] === data[2] && data[2]!=="") won(data[2])
        else if(data[2] === data[4] && data[4] === data[6] && data[6]!=="") won(data[6])
        else if (data.every(str => str !== "")) won('draw')
    }

    const won = (winner) => {
        setLock(true)
        setMatchDone(true)
        console.log(`Winner: ${winner}`)
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: ${player1Name}`
            console.log(player1Score)
            setPlayer1Score(player1Score + 1)
        }
        if (winner === "o") {
            titleRef.current.innerHTML = `Congratulations: ${player2Name}`
            setPlayer2Score(player2Score + 1)
        }
        if (winner === "draw"){
            titleRef.current.innerHTML = `Draw`
            setDrawScore(drawScore + 1)
        }
    }

    const reset = () => {
        setLock(false)
        setMatchDone(false)
        setCount(0)
        data = ["", "", "", "", "", "", "", "", ""]
        titleRef.current.innerHTML = 'Tic Tac Toe'
        boxArray.map((e) => {
            return e.current.innerHTML = ''
        })
    }

    const stop = () => {
        reset()
        axios.post('http://localhost:3001/games', {
            player1Name: player1Name,
            player2Name: player2Name,
            player1Wins: player1Score,
            player2Wins: player2Score
        }).then(response => {
            console.log('Score saved successfully:', response.data)
        }).catch(err => console.error(err))
        setCurrentPage('HomePage');
    }

    return (
        <>
        {currentPage === 'HomePage' && <HomePage/>}
        {currentPage === 'TicTacToe' && (
        <div className="container">
        <h1 className="title" ref={titleRef}>Tic Tac Toe</h1>
            <div className="board">
                <div className="row1">
                <div className="boxes" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
                <div className="boxes" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
                <div className="boxes" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
                </div>
                <div className="row2">
                <div className="boxes" ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
                <div className="boxes" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
                <div className="boxes" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
                </div>
                <div className="row3">
                <div className="boxes" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
                <div className="boxes" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
                <div className="boxes" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
            <div className="score">
                <p className="score">{player1Name} - {player1Score} vs {player2Name} - {player2Score}</p>
                <p className="score">{drawScore > 0 ? `Draws: ${drawScore}` : ''}</p>
                {!matchDone && (<button className="button" onClick={()=>{navigateToHome()}}>HOME</button>)}
                {!matchDone && (<button className="button" onClick={()=>{reset()}}>RESET</button>)}
                {matchDone && (<button className="button" onClick={()=>{stop()}}>STOP</button>)}
                {matchDone && (<button className="button" onClick={()=>{reset()}}>CONTINUE</button>)}
            </div>        
        </div>)}
        </>
    );
};

export default TicTacToe;
