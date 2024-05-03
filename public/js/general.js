import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

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

// variable pour stocker les donnes du User
let player1;

// le input hidden avec la valeur id du utilisateur
const userId = document.getElementById('user_id'); 
getUserInfos(userId.value)
.then(userInfos => {
        // Instancier l'objet joueur avec les donnes de la BDD
        player1 = new player(userInfos.pseudo, userInfos.money, cardsInGame, deck )
    })
    .catch(error => {
        console.error(error);
    });

function resetGame () {
    // cardsInGame = cards;
    // deck.innerHTML = '';
    messageModal.classList.add('hidden');
    player1.reset();
    playerScore.textContent = player1.score;
}

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
            resetGame();
        });
    };
}

// Bouton pour demander une carte (Hit)
btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault();
    player1.demanderUneCarte();
    cardsInGame = player1.refreshCardsInGame();
    playerScore.textContent = player1.score;
    playerMoney.textContent = player1.argent;
    checkScore(player1);
});
