"use strict";

const Game = {
  prev: null,
  wins: 0,
  losses: 0,
  streak: 0,
  els: {},

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  },

  initElements(ids) {
    for (const key in ids) {
      this.els[key] = document.getElementById(ids[key]);
    }
    this.updateUI();
  },

  showDice(value) {
    const dice = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    this.els.dice.textContent = dice[value - 1];
  },

  setMessage(text, status = "") {
    const el = this.els.message;
    el.textContent = text;
    el.className = "message " + status;
  },

  updateUI() {
    this.els.prevDisplay.textContent = this.prev ?? "—";
    this.els.wins.textContent = this.wins;
    this.els.losses.textContent = this.losses;
    this.els.streak.textContent = this.streak;
  },

  rollFirst() {
    this.prev = this.rollDice();
    this.showDice(this.prev);
    this.setMessage("Kies hoger of lager");
    this.updateUI();
  },

  handleGuess(guess) {
    if (this.prev === null) {
      this.setMessage("Klik eerst op Startwaarde");
      return;
    }

    const next = this.rollDice();
    this.showDice(next);

    if (next === this.prev) {
      this.setMessage("Gelijkspel!", "tie");
      this.streak = 0;
    } else if (
      (guess === "higher" && next > this.prev) ||
      (guess === "lower" && next < this.prev)
    ) {
      this.setMessage("Goed geraden!", "win");
      this.wins++;
      this.streak++;
    } else {
      this.setMessage("Fout!", "lose");
      this.losses++;
      this.streak = 0;
    }

    this.prev = next;
    this.updateUI();
  },

  reset() {
    this.prev = null;
    this.wins = 0;
    this.losses = 0;
    this.streak = 0;
    this.els.dice.textContent = "—";
    this.setMessage("Klik op Startwaarde om te beginnen");
    this.updateUI();
  }
};

window.Game = Game;
