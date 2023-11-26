import App from "./App";
import DOM from "./DOM";

const EventHandler = (() => {
  function handleGameClick(e) {
    const cell = e.target;
    if (!e.target.classList.contains("game-cell")) {
      return;
    }
    const board = e.target.closest(".game-board");

    App.respondCoords({
      x: Number(cell.dataset.x),
      y: Number(cell.dataset.y),
      player: board.dataset.player,
    });
  }

  function handleGameRightClick(e) {
    e.preventDefault();
    App.changeAxis();
  }

  function handleGameHover(e) {
    const cell = e.target;
    if (!e.target.classList.contains("game-cell")) {
      return;
    }
    const board = e.target.closest(".game-board");
    App.highlightHover({
      x: Number(cell.dataset.x),
      y: Number(cell.dataset.y),
      player: board.dataset.player,
    });
  }

  function handleSingleplayer(e) {
    e.preventDefault();
    const name = e.target.elements[0].value;
    e.target.reset();
    e.target.classList.add("hidden");
    DOM.getElement(".game-container").classList.remove("hidden");

    App.startSingleplayer(name);
  }

  function handleRestartClick(e) {
    DOM.getElement(".end-container").classList.add("hidden");

    App.restart();

    DOM.getElement(".game-container").classList.remove("hidden");
  }

  function listen() {
    const gameContainer = DOM.getElement(".game-container");
    gameContainer.addEventListener("click", handleGameClick);
    gameContainer.addEventListener("mouseover", handleGameHover);
    gameContainer.addEventListener("contextmenu", handleGameRightClick);

    const singleplayerForm = DOM.getElement(".singleplayer-form");
    singleplayerForm.addEventListener("submit", handleSingleplayer);

    const restartBtn = DOM.getElement(".restart-btn");
    restartBtn.addEventListener("click", handleRestartClick);
  }

  return { listen };
})();

export default EventHandler;
