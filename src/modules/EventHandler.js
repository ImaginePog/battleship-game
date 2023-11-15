import DOM from "./DOM";

const EventHandler = (() => {
  let coords = {};

  function recordCoordinates(e) {
    const cell = e.target;
    if (!e.target.classList.contains("game-cell")) {
      return;
    }
    const board = e.target.closest(".game-board");

    coords = {
      x: cell.dataset.x,
      y: cell.dataset.y,
      player: board.dataset.player,
    };
  }

  function getRecordedCoordinates() {
    const copy = Object.assign({}, coords);

    // Clear recorded coordinates
    coords = {};
    return copy;
  }

  function listen() {
    const gameContainer = DOM.getElement(".game-container");
    gameContainer.addEventListener("click", recordCoordinates);
  }

  return { listen, getRecordedCoordinates };
})();

export default EventHandler;
