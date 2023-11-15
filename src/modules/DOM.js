const DOM = (() => {
  const elements = {};

  function add(query) {
    elements[query] = document.querySelector(query);
  }

  function load() {
    add(".player1-name");
    add(".player1-board");
    add(".player2-name");
    add(".player2-board");
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
