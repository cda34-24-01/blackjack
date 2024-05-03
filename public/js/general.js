import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
const btnTakeCart = document.getElementById('hit');
const Playe1Deck = document.getElementById('cardsPlayer1');
const playerScore = document.getElementById('player_score');
const playerMoney = document.querySelector('.ui_money');
const messageModal = document.querySelector('.message_modal');
const btnContinuePlaying = document.getElementById('btn_continue_game'); 
const btnExitGame = document.getElementById('btn_exit_game');
    // le croupier
const croupierDeck = document.getElementById('cardsCroupier');
const crupierScore = document.getElementById('croupier_score');

// Initialiser le jeu de cartes
let cardsInGame = cards;

// Instancier l'objet joueur pour le croupier
const croupier = new player('Croupier', 1000, cardsInGame, croupierDeck);
while (croupier.score < 17) {
    handleHitCart(croupier);
    crupierScore.textContent = croupier.score;
}


// variable pour stocker les donnes du User
let player1;
// Instancier l'objet joueur avec les donnes de la BDD
// le input hidden contient la valeur id du utilisateur
const userId = document.getElementById('user_id');
getUserInfos(userId.value)
.then(userInfos => {
        player1 = new player(userInfos.pseudo, userInfos.money, cardsInGame, Playe1Deck);
        // initialiser le jeu avec 2 cartes
        handleHitCart(player1);
        handleHitCart(player1);
    })
    .catch(error => {
        console.error(error);
    });

function newRound () {
    messageModal.classList.add('hidden');
    player1.reset();
    playerScore.textContent = player1.score;
    handleHitCart(player1);
    handleHitCart(player1);
};

function handleHitCart(player) {
    player.demanderUneCarte();
    cardsInGame = player.refreshCardsInGame();
    playerScore.textContent = player.score;
    playerMoney.textContent = player.argent;
    checkScore(player);
};

// verifier le score et afficher le message s'il faut
function checkScore(player) {
    if (player.score === 21) {
        messageModal.firstElementChild.textContent = 'You Win!';
        messageModal.classList.remove('hidden');
    } else if (player.score > 21) {
        messageModal.firstElementChild.textContent = `${player.name} You Lose!`;
        messageModal.classList.remove('hidden');
    };
    if (!messageModal.classList.contains('hidden')) {
        btnContinuePlaying.addEventListener('click', () => {
            newRound();
        });
    };
}

window.onload = () => {
    

}

// Bouton pour demander une carte (Hit)
btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault();
    handleHitCart(player1);
});
