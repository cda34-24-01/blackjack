import { cards } from "./cartes.js";
import { player } from "./player.js";

// Prendre les elements HTML
const btnTakeCart = document.getElementById('hit');
const deck = document.getElementById('cardsPlayer1');
const playerScore = document.getElementById('player_score');
const playerMoney = document.querySelector('.ui_money');
const messageModal = document.querySelector('.message_modal');
const btnContinuePlaying = document.getElementById('btn_continue_game'); 
const btnExitGame = document.getElementById('btn_exit_game'); 

// Initialiser le jeu de cartes
let cardsInGame = cards;
// Instancier l'objet joueur (le nom et argante doivent venir depuis la session)
let userArgent = 1000;
const player1Name = 'facu';

let player1 = new player(player1Name, userArgent, cardsInGame, deck );


/* function newGame () {
    cardsInGame = cards;
    deck.innerHTML = '';
    player1.argent = 
}
 */
// verifier le score et afficher le message s'il faut
function checkScore(player) {
    if (player.score === 21) {
        messageModal.firstElementChild.textContent = 'You Win!';
        messageModal.classList.toggle('hidden');
    } else if (player.score > 21) {
        messageModal.firstElementChild.textContent = 'You Lose!';
        messageModal.classList.toggle('hidden');
    };
    if (!messageModal.classList.contains('hidden')) {
        btnContinuePlaying.addEventListener('click', () => {
            console.log(deck.innerHTML)
        });
    };
}

// Bouton pour demander une carte (Hit)
btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault();
    player1.demanderUneCarte();
    cardsInGame = player1.RefreshCardsInGame();
    playerScore.textContent = player1.score;
    player1.argent += 100;
    playerMoney.textContent = player1.argent;
    checkScore(player1);
});
