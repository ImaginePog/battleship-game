<a name="top"></a>

<br />

<h3 align="center">
  <a href="https://imaginepog.github.io/battleship-game">Battleship</a>
</h3>
  <p align="center">
    A simple naval game played against the Computer
  </p>
</div>

## Table of Contents

- [About The Project](#about-the-project)
  - [Tools Used](#tools-used)
  - [Game Rules](#game-rules)
- [What I Learned](#what-i-learned)
- [Future updates](#future-updates)
- [Live Github page](#live-github-page)

## About The Project

A game of **Battleship**, following a set of [rules](#rules). Currently, only playable against the computer. The project was started and made with the goal of learning **Test Driven Development(TDD)** and hence the graphics is minimal. (Default HTML elements and styles). The main focus of this project was the starting phase where all objects were tested with basic and advanced tests following the **Red-Green-Refactor** method of **TDD**. This experience took some time to get used to but persevering resulted in deep understanding of the **TDD** process and how important it is in projects of larger scale.

### Tools Used

- Javascript
- NPM
- Webpack
- Jest

### Game Rules

Currently only the singleplayer mode is available.

- The board is 10x10 squares in size
- There are 5 ships each with different sizes that can be placed on the board:
  - Carrier: 5 squares
  - Battle: 4 squares
  - Destroyer: 3 squares
  - Submarine: 3 squares
  - Patrol: 2 squares
- The ships can be placed horizontally or vertically
- The ships cannot overlap or occupy adjacent squares
- Same number and types of ships are allowed for each player
- The placements of ships are hidden to the opponent player
- Each turn, players shoot a square in the opponent's board
- The game is won by the player who first shoots all the squares of all the ships

<p align="right">(<a href="#top">back to top</a>)</p>

## What I Learned

- **Principals of Test Driven Development:** I got familiar with the process of **Red-Green-Refactor** which is the fundamental principal of **Test Driven Development** as I made test suites for each object in the game.

- **Jest:** The testing framework used in this project was **Jest** and I got to learn the beautful workings of it.

- **Creating proper test suites:** A lot of thinking went into making test suites in **Jest** before starting to program the game and this made me familiar with describing and modelling test suites in **Jest**

- **Game AI:** Although not perfect, the opponent computer for the game required intelligence to make the game challenging and in trying to build a computer that could sink a ship after detecting it I had to use different methods like shooting adjacent squares, determining the axis of the ship, queuing possible sqaures etc. which gave me an insight on simple AI.

<p align="right">(<a href="#top">back to top</a>)</p>

## Future updates

- **Polish and update graphics:** Right now all elements of the game are represented by colored squares, graphics update was ignored due to the current goal of the project, maybe update graphics in the future.

- **Add multiplayer:** Currently only singleplayer mode is available since implementing a multiplayer mode required handling how the boards are dispalyed and changing the complete structure of the game. In the future, multiplayer should be added for more playability.

- **Improve AI:** The current AI can win some games but it is not perfect or efficient, perhaps in the future I can use some probability algorithms that can efficiently find and sink ships.

<p align="right">(<a href="#top">back to top</a>)</p>

## Live GitHub page

[Hosted live on github pages][gh-page]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LINKS -->

[gh-page]: https://imaginepog.github.io/battleship-game/
