import { cards } from "./cartes.js";
import { player } from "./player.js";

let cardsInGame = cards;

const btnTakeCart = document.getElementById('hit');
const deck = document.getElementById('cardsPlayer1');


const player1 = new player('facu', 1000, cardsInGame, deck );

btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault();
    player1.demanderUneCarte();
    console.log(player1.playerCards);
    console.log(player1.score);
})
