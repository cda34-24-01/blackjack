import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
const btnHit = document.getElementById("hit");
const btnStay = document.getElementById("stay");
const btnLeave = document.getElementById("leave");
const btnSplit = document.getElementById("split");
const btnsMises = document.querySelectorAll("btnMoney");

const playerScore = document.getElementById("player_score");
const playerWins = document.querySelector(".ui_wins");
const playerLoses = document.querySelector(".ui_loses");
const playerCardsContainer = document.getElementById("cardsPlayer1");
const playerMoney = document.querySelector(".ui_money");

const messageModal = document.querySelector(".message_modal");
const btnContinuePlaying = document.getElementById("btn_continue_game");
const btnExitGame = document.getElementById("btn_exit_game");
// le croupier
const croupierDeck = document.getElementById("cardsCroupier");
const crupierScore = document.getElementById("croupier_score");
const cardSound = document.getElementById("cardHit");
const moneySound = document.getElementById("moneyPick");
const playerWinSound = document.getElementById("playerWinSound");
const audioBtn = document.getElementById("audioMute");
let musicNone = false;

audioBtn.addEventListener("click", () => {
  if (musicNone == false) {
    musicNone = true;
    Array.from(document.querySelectorAll("audio")).forEach(
      (el) => (el.muted = true)
    );
  } else {
    musicNone = false;

    Array.from(document.querySelectorAll("audio, video")).forEach(
      (el) => (el.muted = false)
    );
  }
});

// Initialiser le jeu de cartes
let cardsInGame = cards;

// variable pour stocker les donnes du User
let currentPlayer;
// Instancier l'objet joueur avec les donnes de la BDD
// le input hidden contient la valeur id du utilisateur
const userId = document.getElementById("user_id");
getUserInfos(userId.value)
  .then((userInfos) => {
    const { pseudo, money, wins, loses } = userInfos;
    currentPlayer = new player(
      pseudo,
      money,
      cardsInGame,
      playerCardsContainer,
      wins,
      loses
    );
    // initialiser le jeu
    startGame(currentPlayer);
  })
  .catch((error) => {
    console.error(error);
  });

// Instancier l'objet joueur pour le croupier
let croupierWins = 0;
let croupierLoses = 0;
const croupier = new player(
  "Croupier",
  1000,
  cardsInGame,
  croupierDeck,
  croupierWins,
  croupierLoses
);


function startGame(currentPlayer) {
    // 1 carte pour le player
    setTimeout(() => handleHitCart(currentPlayer), 500);
    // 1 carte pour le croupier
    setTimeout(() => handleHitCart(croupier), 1000);
    // 1 autre carte pour le player
    setTimeout(() => handleHitCart(currentPlayer), 1500);
    // 1 autre carte pour le croupier (cachée)
    setTimeout(() => {
      handleHitCart(croupier);
      croupierDeck.lastChild.src = './public/images/cartes/card_back.png';
    }, 2000);
  


  };
  // case de split
  /* currentPlayer.currentHand = [2, 2]
  console.log(currentPlayer.currentHand);
  if (currentPlayer.currentHand[0] === currentPlayer.currentHand[1]) {
      btnSplit.classList.remove("hidden");
  } */

function newRound() {
  messageModal.classList.add("hidden");
  currentPlayer.reset();
  croupier.reset();
  crupierScore.textContent = 0;
  playerScore.textContent = 0;
  playerWins.textContent = `Wins: ${currentPlayer.wins}`;
  playerLoses.textContent = `Loses: ${currentPlayer.loses}`;
  startGame(currentPlayer);
};

function handleHitCart(player) {
    player.demanderUneCarte();
    cardsInGame = player.refreshCardsInGame();
    if (player.name === 'Croupier') {
        crupierScore.textContent = player.currentHand[0];
    } else {
        playerScore.textContent = player.score;
        // On a blackjack ou on depasse 21 alors on ne peut pas jouer plus des cartes
        if (player.score > 21) {
            handleLose(currentPlayer);
        }
    }
};

function checkScores(player) {
  const playerPass21 = player.score > 21;
  const croupierPass21 = croupier.score > 21;
  const playerWin = player.score > croupier.score;
  const croupierWin = player.score < croupier.score;
  const playerBlackJack = player.score === 21;
  const croupierBlackJack = croupier.score === 21;

    if (playerWin && !playerPass21 && !playerBlackJack) {
      handleWin(player);
  } else if (croupierPass21 && !playerPass21 && !playerBlackJack) {
      handleWin(player);
  } else if (playerBlackJack && !croupierBlackJack) {
      // on gagne avec blackjack
      handleWin(player, true);
  } else if ((playerPass21 && croupierPass21) || player.score === croupier.score) {
      handleEquality(player);
  } else if (!playerBlackJack && croupierBlackJack) {
      // on perde pour blackjack
      handleLose(player, true);
  } else if (croupierWin && !croupierPass21) {
      handleLose(player);
  } else if (playerPass21 && !croupierPass21) {
      handleLose(player);
  } else if (croupier.usedCards.length === 2 && croupierBlackJack && playerBlackJack) {
      // ici on rembourse la mise...
      handleEquality(player);
  }
};
async function handleStay(player) {
  croupierDeck.lastChild.src = croupier.usedCards[1].image;
  crupierScore.textContent = croupier.score;

  // Le croupier demandera une carte s'il n'as pas 17 points
  for (let delay = 500; croupier.score < 17; delay += 500) {
    await new Promise(resolve => setTimeout(resolve, delay));
    croupier.demanderUneCarte();
    cardsInGame = croupier.refreshCardsInGame();
    crupierScore.textContent = croupier.score;
  }

  // Comparer les scores
  checkScores(player);
}
function showModal(message, colorAlert, sound) {
    sound.play();
    messageModal.firstElementChild.textContent = message;
    messageModal.classList.remove("hidden");
    messageModal.style.backgroundColor = colorAlert;
}
function handleEquality(player) {
    showModal('Equality!', '#8bc959', playerWinSound);
};
function handleWin(player, blackJack = false) {
    showModal('You win!', '#8bc959', playerWinSound);
    if (blackJack) {
        console.log('BlackJack!!');
    }
    player.addWin();
};
function handleLose(player, blackJack = false) {
    showModal('You Lose!', '#ff8e8e', moneySound);
    if (blackJack) {
        console.log('you lose by backjack... lol')
    }
    player.addLose();
};
// Boutons pour les misses
/* btnsMises.forEach(btn => {
    btn.addEventListener(()=> {
        console.log(btn.dataset.value);
    })
}) */
// Bouton pour Split
btnSplit.addEventListener("click", (e)=> {
    e.preventDefault();
    const deckContainer = document.querySelector(".player_desk");
    deckContainer.style.width = "400px";

    playerCardsContainer.removeChild(playerCardsContainer.lastChild);
    const cardSplited = document.createElement('img');

    cardSplited.src = currentPlayer.usedCards[1].image;z
    deckContainer.lastElementChild.appendChild(cardSplited);
    // console.log(currentPlayer.usedCards)
    console.log(currentPlayer.usedCards[1])
})

// Bouton pour abandonner
btnLeave.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("mise devise en 2");
});
// Bouton pour demander une carte (Hit)
btnHit.addEventListener("click", (e) => {
  cardSound.play();
  e.preventDefault();
  handleHitCart(currentPlayer);
});
// Bouton pour stay
btnStay.addEventListener("click", (e) => {
    e.preventDefault();
    handleStay(currentPlayer);
});
// Bouton pour new round
btnContinuePlaying.addEventListener("click", (e) => {
  e.preventDefault();
  newRound();
});


/* 
Distribution des cartes :
     
Une carte pour moi façe visible
Une carte pour lui (croupier) façe visible
Une deuxième carte pour moi façe visible
Et une deuxième carte pour le croupier MAIS façe cachée.

Ensuite : 
Le joueur tire autant de cartes qu'il souhaite SAUF si il dépasse 21 dans quel cas, le jeu s'arrete et le croupier gagne.

Dès que le joueur appuis sur STAY
Révélation de la carte face cachée du croupier ( donc calcul de ses deux cartes )

Ensuite :
Le croupier tire des cartes tant qu'il n'a pas 17 maximum. ( si il a plus de 17 le jeu s'arrête et celui qui a la plus grosse main, gagne. )

Spécificité : 
Si le croupier tire un AS façe visible ( donc sa première carte ) Et que sa carte cachée est un 10 ou une tête 
     
Le jeu s'arrete et le croupier gagne SAUF si le joueur a un blackjack aussi alors le jeu s'arrête quand même mais le joueur est remboursée de sa somme misée.
*/