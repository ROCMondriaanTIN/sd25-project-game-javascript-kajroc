"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Link HTML elements to the Game object
  Game.initElements({
    prevDisplay: "prevDisplay",
    dice: "dice",
    message: "message",
    wins: "wins",
    losses: "losses",
    streak: "streak",
    higher: "higher",
    lower: "lower",
    rollFirst: "rollFirst",
    reset: "reset"
  });

  // Attach event listeners to buttons
  Game.els.higher.addEventListener("click", () => Game.handleGuess("higher"));
  Game.els.lower.addEventListener("click", () => Game.handleGuess("lower"));
  Game.els.rollFirst.addEventListener("click", () => Game.rollFirst());
  Game.els.reset.addEventListener("click", () => Game.reset());
});

