"use strict"

window.onload=start;


function start()
{
    bindButtons();
}

document.addEventListener('DOMContentLoaded', ()=>{
Game.initElements({
prevDisplay: 'prevDisplay',
dice: 'dice',
message: 'message',
wins: 'wins',
losses: 'losses',
streak: 'streak',
higher: 'higher',
lower: 'lower',
rollFirst: 'rollFirst',
reset: 'reset'
});


Game.els.higher.addEventListener('click', ()=> Game.handleGuess('higher'));
Game.els.lower.addEventListener('click', ()=> Game.handleGuess('lower'));
Game.els.rollFirst.addEventListener('click', ()=> Game.rollFirst());
Game.els.reset.addEventListener('click', ()=> Game.reset());


Game.updateUI();
});

