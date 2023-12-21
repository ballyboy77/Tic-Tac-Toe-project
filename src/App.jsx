import { useState } from "react";
import Player from "./Components/Player";
import Gameboard from "./Gameboard";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./Gameover";

const initialgameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derieveplayers(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

export default function App() {
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derieveplayers(gameTurns);

  let gameBoard = [...initialgameboard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;
  const draw = gameTurns.length === 9 && !winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = player[firstSquare];
    }
  }

  function handleSelect(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derieveplayers(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function restartMatch() {
    setGameTurns([]);
  }
  function handleNameChange(symbol, newName) {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          ></Player>
          <Player
            initialName={"player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          ></Player>
        </ol>
        {(winner || draw) && (
          <Gameover winner={winner} startAgain={restartMatch} />
        )}
        <Gameboard onSelectSquare={handleSelect} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
