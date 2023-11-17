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

  return { startSingleplayer, respondCoords, highlightHover, changeAxis };
})();

export default App;
