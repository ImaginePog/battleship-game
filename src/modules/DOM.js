const DOM = (() => {
  const elements = {};

  function add(query) {
    elements[query] = document.querySelector(query);
  }

  function load() {
    add(".singleplayer-form");
    add(".game-container");
    add(".info-container");
    add(".player1-header");
    add(".player1-board");
    add(".player2-header");
    add(".player2-board");

    add(".end-container");
    add(".winner-text");
    add(".player-message");
    add(".restart-btn");
  }

  // Returns the element if it has been loaded
  function getElement(query) {
    if (!elements[query]) {
      console.error("Element not loaded or wrong query");
      return;
    }

    return elements[query];
  }

  return { load, getElement };
})();

export default DOM;
