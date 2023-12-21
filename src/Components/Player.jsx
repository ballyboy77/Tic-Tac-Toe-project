import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [edit, setEdit] = useState(false);

  function changeEdit() {
    setEdit(() => !edit);

    if (edit) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  let editName = <span className="player-name">{playerName}</span>;
  if (edit) {
    editName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          <span className="player-name">{editName}</span>
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={changeEdit}>{edit ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
