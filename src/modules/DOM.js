const DOM = (() => {
  const elements = {};

  function add(query) {
    elements[query] = document.querySelector(query);
  }

  function load() {
    add(".singleplayer-form");
    add(".game-container");
    add(".player-header");
    add(".player-board");
    add(".enemy-name");
    add(".enemy-board");
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
