(function (window) {
  const Game = {
    prev: null,
    wins: 0,
    losses: 0,
    streak: 0,
    els: {},

    randDie() {
      return Math.floor(Math.random() * 6) + 1;
    },


    _getEl(id) {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Game: element with id "${id}" not found.`);
        
        return {
          textContent: '',
          classList: {
            add() {},
            remove() {},
            contains() { return false; },
            replace() {}
          },
          addEventListener() {},
        };
      }
      return el;
    },

    showDice(n) {
      const unicodeDice = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
      this.els.dice.textContent = unicodeDice[n - 1] || String(n);
    },

    updateUI() {
      this.els.prevDisplay.textContent = this.prev === null ? '—' : String(this.prev);
      this.els.wins.textContent = String(this.wins);
      this.els.losses.textContent = String(this.losses);
      this.els.streak.textContent = String(this.streak);
    },

    
    setMessage(txt, status = '') {
      const el = this.els.message;
      el.textContent = txt;
      el.classList.remove('win', 'lose', 'tie');
      if (status === 'win') el.classList.add('win');
      else if (status === 'lose') el.classList.add('lose');
      else if (status === 'tie') el.classList.add('tie');

      if (!el.classList.contains('message')) el.classList.add('message');
    },

    initElements(mapping) {
      
      this.els.prevDisplay = this._getEl(mapping.prevDisplay);
      this.els.dice = this._getEl(mapping.dice);
      this.els.message = this._getEl(mapping.message);
      this.els.wins = this._getEl(mapping.wins);
      this.els.losses = this._getEl(mapping.losses);
      this.els.streak = this._getEl(mapping.streak);
      this.els.higher = this._getEl(mapping.higher);
      this.els.lower = this._getEl(mapping.lower);
      this.els.rollFirst = this._getEl(mapping.rollFirst);
      this.els.reset = this._getEl(mapping.reset);

      
      if (!this.els.message.classList.contains('message')) {
        this.els.message.classList.add('message');
      }

      this.updateUI();
    },

    handleGuess(guess) {
      if (this.prev === null) {
        this.setMessage('Startwaarde eerst (klik "Startwaarde").', '');
        return;
      }

      const newRoll = this.randDie();
      this.showDice(newRoll);

      if (newRoll === this.prev) {
        this.setMessage(`Gelijkspel! Het was ${newRoll}.`, 'tie');
        this.streak = 0;
      } else {
        const correct = (guess === 'higher' && newRoll > this.prev) ||
                        (guess === 'lower' && newRoll < this.prev);
        if (correct) {
          this.wins += 1;
          this.streak += 1;
          this.setMessage(`Je wint! ${newRoll} is ${guess} dan ${this.prev}.`, 'win');
        } else {
          this.losses += 1;
          this.streak = 0;
          this.setMessage(`Je verliest — ${newRoll} is niet ${guess} dan ${this.prev}.`, 'lose');
        }
      }

      this.prev = newRoll;
      this.updateUI();
    },

    rollFirst() {
      this.prev = this.randDie();
      this.showDice(this.prev);
      this.setMessage('Startwaarde gezet — gok nu hoger of lager!', '');
      this.updateUI();
    },

    reset() {
      this.prev = null;
      this.wins = 0;
      this.losses = 0;
      this.streak = 0;
      this.els.dice.textContent = '—';
      this.setMessage('Klik op "Startwaarde" om te beginnen, gok daarna hoger of lager.', '');
      this.updateUI();
    }
  };

  window.Game = Game;
})(window);

 