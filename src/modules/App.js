import DOM from "./DOM";
import Game from "./Game";

const App = (() => {
  let game;

  function startSingleplayer(name) {
    game = new Game("singleplayer", name);
  }

  function startMultiplayer(name1, name2) {
    game = new Game("multiplayer", name1, name2);
  }

  function play(coords) {
    game.play(coords);
  }

  function place(coords) {
    game.place(coords);
  }

  function respondCoords(coords) {
    if (game.state === "placement") {
      place(coords);
    } else if (game.state === "choice") {
      play(coords);
    }
  }

  function changeAxis() {
    if (game.state !== "placement") {
      return;
    }

    game.changeAxis();
  }

  function highlightHover(coords) {
    if (game.state !== "computer") game.highlight(coords);
  }

  function end(winner, turn) {
    const gameContainer = DOM.getElement(".game-container");
    gameContainer.classList.add("hidden");

    const endContainer = DOM.getElement(".end-container");

    // Say who won
    const winText = DOM.getElement(".winner-text");
    winText.innerText = winner.name + " wins!!";

    // Congratulate if player won
    const playerMsg = DOM.getElement(".player-message");
    if (turn) {
      playerMsg.innerText = "Better luck next time!!";
    } else {
      playerMsg.innerText = "Congratulations!!";
    }

    endContainer.classList.remove("hidden");
  }

  function restart() {
    game = new Game("singleplayer", game.player1.name);
  }

  return {
    startSingleplayer,
    respondCoords,
    highlightHover,
    changeAxis,
    end,
    restart,
  };
})();

export default App;
