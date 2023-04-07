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

function Square({ id, value, onSquareClick, winSquare, style }) {
  return (
    <button
      className='square'
      id={`square-${id}`}
      onClick={onSquareClick}
      winsquare={winSquare}
      style={style}
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


  let status, win = isAWinOp(squareValues), winner, winMoves = [];
  if (win) {
    [winner, winMoves] = win;
    status = `${winner} WON`;
  } else if (squareValues.indexOf(null) === -1) {
    status = "DRAW!";
  } else {
    status = `Next Player : ${player ? 'X' : 'O'}`;
  }

  const squares = squareValues.map(
    (square, id) => {
      return {
        value: square,
        onSquareClick: () => handleClick(id),
        key: id,
        id: id,
        winSquare: 'false',
      }
    }
  );

  for (let i in winMoves) {
    let winMove = winMoves[i];
    squares[winMove].style = { "--order": i };
    squares[winMove].winSquare = 'true';
  }

  return (
    <div className='play'>
      <h1>{status}</h1>
      <div id="board">
        {squares.map((square) => <Square {...square} />)}
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const player = currentMove % 2 === 0;

  function handlePlay(squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
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