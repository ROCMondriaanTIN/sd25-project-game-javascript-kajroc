// view.js — UI only (no game logic)

const View = {
  els: {},

  init(ids) {
    const $ = (id) => document.getElementById(id);

    this.els = {
      prevDisplay: $(ids.prevDisplay),
      dice: $(ids.dice),
      message: $(ids.message),
      wins: $(ids.wins),
      losses: $(ids.losses),
      streak: $(ids.streak),
      higher: $(ids.higher),
      lower: $(ids.lower),
      rollFirst: $(ids.rollFirst),
      reset: $(ids.reset),
    };
  },

  showDice(value) {
    const diceChars = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'];
    this.els.dice.textContent = diceChars[value - 1] || value;
  },

  updateStats({ prev, wins, losses, streak }) {
    this.els.prevDisplay.textContent = prev === null ? '—' : prev;
    this.els.wins.textContent = wins;
    this.els.losses.textContent = losses;
    this.els.streak.textContent = streak;
  },

  setMessage(text, status = '') {
    const el = this.els.message;
    el.textContent = text;
    el.classList.remove('win', 'lose', 'tie');
    if (status) el.classList.add(status);
  },

  bindEvents() {
    this.els.higher.addEventListener('click', () => Game.handleGuess('higher'));
    this.els.lower.addEventListener('click', () => Game.handleGuess('lower'));
    this.els.rollFirst.addEventListener('click', () => Game.rollFirst());
    this.els.reset.addEventListener('click', () => Game.reset());
  }
};

window.View = View;
