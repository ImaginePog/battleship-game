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
    } else {
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
    game.highlight(coords);
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

  return { startSingleplayer, respondCoords, highlightHover, changeAxis, end };
})();

export default App;
