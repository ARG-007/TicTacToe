import { useState } from 'react';
import './App.css';

const possibleWinMoves = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8]
];

function Square({ value, onSquareClick }) {
  return (
    <button
      className='square'
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ player, squareValues, onPlay }) {

  function handleClick(id) {
    if (isAWinOp(squareValues) || squareValues[id]) return;

    const nextMove = squareValues.slice();
    if (player)
      nextMove[id] = "X";
    else
      nextMove[id] = "O";

    onPlay(nextMove);
  }


  let status, win = isAWinOp(squareValues);
  if (win) {
    let [winner, winMoves] = win;
    status = `${winner} WON`;
  } else {
    status = `Next Player : ${player ? 'X' : 'O'}`;
  }

  return (
    <div className='play'>
      <h1>{status}</h1>
      <div id="board">
        <Square value={squareValues[0]} onSquareClick={() => handleClick(0)} id="0" />
        <Square value={squareValues[1]} onSquareClick={() => handleClick(1)} id="1" />
        <Square value={squareValues[2]} onSquareClick={() => handleClick(2)} id="2" />
        <Square value={squareValues[3]} onSquareClick={() => handleClick(3)} id="3" />
        <Square value={squareValues[4]} onSquareClick={() => handleClick(4)} id="4" />
        <Square value={squareValues[5]} onSquareClick={() => handleClick(5)} id="5" />
        <Square value={squareValues[6]} onSquareClick={() => handleClick(6)} id="6" />
        <Square value={squareValues[7]} onSquareClick={() => handleClick(7)} id="7" />
        <Square value={squareValues[8]} onSquareClick={() => handleClick(8)} id="8" />
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const player = move % 2 === 0;

  function handlePlay(squares) {
    const nextHistory = [...history.splice(0,currentMove+1),squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function goto(move) {
    setCurrentMove(move);
  }

  const moves = history.map(
    (squareValues, move) => {
      let des;
      if (move > 0) {
        des = `Goto Move ${move}`;
      } else {
        des = "Reset Game";
      }
      return <li key={squareValues}><button onClick={() => goto(move)}>{des}</button></li>;
    }
  );

  return (
    <div id='game'>
      <Board player={player} squareValues={currentSquares} onPlay={handlePlay} />
      <div id="history"><ul>{moves}</ul></div>
    </div>
  );
}

function isAWinOp(xoArray) {
  for (let i of possibleWinMoves) {
    let check = xoArray[i[0]];
    if (check && check === xoArray[i[1]] && check === xoArray[i[2]])
      return [check, i];
  }
  return null;
}