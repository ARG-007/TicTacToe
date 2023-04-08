import { useState } from "react";
import "./App.css";

const possibleWinMoves = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8],
];

function Square({ id, value, onSquareClick, winSquare, style }) {
  return (
    <button
      className="square"
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
    if (player) nextMove[id] = "X";
    else nextMove[id] = "O";

    onPlay(nextMove,id);
  }

  let status,
    win = isAWinOp(squareValues),
    winner,
    winMoves = [];
  if (win) {
    [winner, winMoves] = win;
    status = `${winner} WON`;
  } else if (squareValues.indexOf(null) === -1) {
    status = "DRAW!";
  } else {
    status = `Player : ${player ? "X" : "O"}`;
  }

  const squares = squareValues.map((square, id) => {
    return {
      value: square,
      onSquareClick: () => handleClick(id),
      key: id,
      id: id,
      winSquare: "false",
    };
  });
  for (let i in winMoves) {
    let winMove = winMoves[i];
    squares[winMove].style = { "--order": i };
    squares[winMove].winSquare = "true";
  }

  return (
    <>
      <div className="title" id="status">
        {status}
      </div>
      <div id="board">
        {squares.map((square) => (
          <Square {...square} />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), move: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [doSort,setDoSort] = useState(false);

  const currentSquares = history[currentMove].squares;

  const player = currentMove % 2 === 0;

  function handlePlay(squares,move) {
    const nextHistory = [...history.slice(0, currentMove + 1), 
      {
        squares:squares,
        move:move
      }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function goto(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squareValues, move) => {
    let des;
    let moveEx = squareValues.move;
    let row = moveEx/3>>0,col=moveEx%3;

    if (move > 0) {
      des = `Move ${move} @ [${row} ${col}]`;
    } else {
      des = "Reset Game";
    }
    return (
      <button
        key={squareValues.squares}
        onClick={() => goto(move)}
        isselected={move === currentMove ? "true" :"false"}
      >
        {des}
      </button>
    );
  });

  return (
    <div id="game">
      <Board
        player={player}
        squareValues={currentSquares}
        onPlay={handlePlay}
      />
      <div className="title" id="histBar">
        <button onClick={()=>setDoSort(false)}>ASS</button>
        <button onClick={()=>setDoSort(true)}>DESS</button>
        <div>History</div>
      </div>
      <div id="history">{doSort?moves.reverse():moves}</div>
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
