export default function Gameover({ winner, startAgain }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>Draw !!</p>}

      <button onClick={startAgain}>Rematch</button>
    </div>
  );
}
