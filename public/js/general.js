import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
const btnHit = document.getElementById("hit");
const btnStay = document.getElementById("stay");
const btnLeave = document.getElementById("leave");
const btnSplit = document.getElementById("split");
const btnsMises = document.querySelectorAll(".btnMoney");

const playerScore = document.getElementById("player_score");
const playerWins = document.querySelector(".ui_wins");
const playerLoses = document.querySelector(".ui_loses");
const playerCardsContainer = document.getElementById("cardsPlayer1");
const playerMoneyDisplay = document.querySelector(".ui_money");

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
let currentPlayer = new player;
let currentMise = 0;
let currentMoney = 0;

// Instancier l'objet joueur avec les donnes de la BDD
// le input hidden contient la valeur id du utilisateur
const userId = document.getElementById("user_id");
getUserInfos(userId.value)
  .then((userInfos) => {
    const { pseudo, money, wins, loses } = userInfos;
    currentPlayer.name = pseudo;
    currentPlayer.money = money;
    currentPlayer.cardsInGame = cardsInGame;
    currentPlayer.deck = playerCardsContainer;
    currentPlayer.wins = wins;
    currentPlayer.loses = loses;
    currentMoney = money;
  })
  .catch((error) => {
    console.error(error);
  });
console.log(currentPlayer)
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

// si c'est false on ne peut pas cliquer les boutons
let areBtnsAvailables = false;

function startGame(currentPlayer) {
  areBtnsAvailables = false;
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
    areBtnsAvailables = true;
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
  currentMise = 0;
  // startGame(currentPlayer);
};

function handleHitCart(player) {
  player.cardsInGame = cardsInGame;
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
    console.log(cardsInGame.length);
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
  if (!areBtnsAvailables && currentMise === 0) return;
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
  areBtnsAvailables = false;
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
    currentMoney += currentMise;
    playerMoneyDisplay.style.color = '#8bc959';
    playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
    player.addWin();
};
function handleLose(player, blackJack = false) {
  showModal('You Lose!', '#ff8e8e', moneySound);
  if (blackJack) {
    console.log('you lose by backjack... lol')
  }
  currentMoney -= currentMise;
  playerMoneyDisplay.style.color = '#ff8e8e';
  playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
  player.addLose();
};


// Boutons pour les misses
let url = document.getElementById("url").value;
let $moneyValues = [1, 5, 25, 50, 100, 500, 1000];
btnsMises.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentMise !== 0) return;
    let money = btn.dataset.value;

    if (!$moneyValues.includes(parseInt(money))) {
      console.log("Erreur");
      // exit(); // Cette ligne ne fonctionnera pas en JavaScript, voir la note ci-dessous
      return;
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            console.log("ok");
            // si tout est ok on comence le jeu avec la mise selectione
            currentMise = parseInt(money);
            startGame(currentPlayer);
          } else {
            console.error("Erreur");
          }
        }
      };
      // window.location.href = url + "removeMoney/" + money;
      xhttp.open("GET", url + "removeMoney/" + money, true);
      // xhttp.open("GET", `${url}removeMoney/${money}&_=${new Date().getTime()}`, true);
      xhttp.send();
      btnsMises.forEach((e) => {
        e.disabled = true;
        setTimeout(() => {
          e.disabled = false;
        }, 2000);
      });
    }
    });
});
// Bouton pour Split
/* btnSplit.addEventListener("click", (e)=> {
    e.preventDefault();
    const deckContainer = document.querySelector(".player_desk");
    deckContainer.style.width = "400px";

    playerCardsContainer.removeChild(playerCardsContainer.lastChild);
    const cardSplited = document.createElement('img');

    cardSplited.src = currentPlayer.usedCards[1].image;
    deckContainer.lastElementChild.appendChild(cardSplited);
    // console.log(currentPlayer.usedCards)
    console.log(currentPlayer.usedCards[1])
}) */

// Bouton pour abandonner
btnLeave.addEventListener("click", (e)=> {
    if (!areBtnsAvailables && currentMise === 0) return;
    e.preventDefault();
    console.log("mise devise en 2");
});
// Bouton pour demander une carte (Hit)
btnHit.addEventListener("click", (e) => {
  if (!areBtnsAvailables && currentMise === 0) return;
  cardSound.play();
  e.preventDefault();
  handleHitCart(currentPlayer);
});
// Bouton pour stay
btnStay.addEventListener("click", (e) => {
  if (!areBtnsAvailables && currentMise === 0) return;
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