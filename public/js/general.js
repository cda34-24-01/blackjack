import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
const btnTakeCart = document.getElementById('hit');
const btnStay = document.getElementById('stay');
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


// variable pour stocker les donnes du User
let currentPlayer;
// Instancier l'objet joueur avec les donnes de la BDD
// le input hidden contient la valeur id du utilisateur
const userId = document.getElementById('user_id');
getUserInfos(userId.value)
.then(userInfos => {
        const {pseudo, money, wins, loses} = userInfos;
        currentPlayer = new player(pseudo, money, cardsInGame, Playe1Deck, wins, loses);
        // initialiser le jeu avec 2 cartes
        handleHitCart(currentPlayer);
        handleHitCart(currentPlayer);
        handleCroupierHits();
    })
    .catch(error => {
        console.error(error);
    });

// Instancier l'objet joueur pour le croupier
let croupierWins = 0;
let croupierLoses = 0;
const croupier = new player('Croupier', 1000, cardsInGame, croupierDeck, croupierWins, croupierLoses);
// Demander des cartes jusqu'à 17 points
function handleCroupierHits() {
    while (croupier.score < 17) {
        croupier.demanderUneCarte()
        cardsInGame = croupier.refreshCardsInGame();
        crupierScore.textContent = croupier.score;
    };
    if (croupier.score > 21 && currentPlayer.score != 21) {
        console.log('croupier loses')
        handleWin(currentPlayer);
    } else if (croupier.score === 21 && currentPlayer.score != 21) {
        handleLose(currentPlayer);
    };
};

function newRound () {
    messageModal.classList.add('hidden');
    currentPlayer.reset();
    croupier.reset();
    crupierScore.textContent = 0;
    handleCroupierHits();
    playerScore.textContent = 0;
    handleHitCart(currentPlayer);
    handleHitCart(currentPlayer);
};

function handleHitCart(player) {
    player.demanderUneCarte();
    cardsInGame = player.refreshCardsInGame();
    playerScore.textContent = player.score;
    if (player.score > 21) {
        handleLose(player);
    } else if (player.score === 21) {
        console.log("Black Jack!!")
        handleWin(currentPlayer);
    };
};

function handleStay(player) {
    // Le croupier ne demandera une carte que lorsqu'il perd et qu'il a 17 points
    if (croupier.score === 17 && croupier.score < player.score){
        croupier.demanderUneCarte();
        cardsInGame = croupier.refreshCardsInGame();
        crupierScore.textContent = croupier.score;
    };
    if (croupier.score > player.score && croupier.score <= 21) {
        handleLose(player);
    } else {
        console.log('player win standing')
        handleWin(player);
    };
};
function handleWin(player) {
    player.addWin();
    console.log(player.wins)
    messageModal.firstElementChild.textContent = `You Win!`;
    messageModal.classList.remove('hidden');
    if (!messageModal.classList.contains('hidden')) {
        btnContinuePlaying.addEventListener('click', () => {
            newRound();
        });
    };
};
function handleLose(player) {
    player.addLose();
    console.log(player.loses)
    messageModal.firstElementChild.textContent = `You Lose!`;
    messageModal.classList.remove('hidden');
    if (!messageModal.classList.contains('hidden')) {
        btnContinuePlaying.addEventListener('click', () => {
            newRound();
        });
    };
};

// Bouton pour demander une carte (Hit)
btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault();
    handleHitCart(currentPlayer);
});

// Bouton pour stay
btnStay.addEventListener('click', (e) => {
    e.preventDefault();
    handleStay(currentPlayer);
});
