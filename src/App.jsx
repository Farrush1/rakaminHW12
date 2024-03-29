import './App.css';
import * as React from 'react';

function Board() {
  const [history, setHistory] = React.useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  function selectSquare(square) {
    const current = history.slice(0, stepNumber + 1);
    const currentStep = current[current.length - 1];
    const squares = currentStep.squares.slice();
    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    squares[square] = calculateNextValue(squares);
    setHistory(current.concat([{ squares: squares }]));
    setStepNumber(current.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function restart() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {history[stepNumber].squares[i] || '    '}
      </button>
    );
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status = calculateStatus(winner, current.squares, calculateNextValue(current.squares));

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="board-container">
      <div className="game-board">
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className='restart-button' onClick={restart}>
        <h2>Restart </h2></button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : <h2> NEXT PLAYER {nextValue}</h2>;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;

