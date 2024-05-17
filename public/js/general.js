import { cards } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
let divJetons = document.querySelector(".money_btn");
const btnStart = document.getElementById("start");
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
let playerMiseDisplay = document.querySelector(".ui_mise");

const messageModal = document.querySelector(".message_modal");
const btnContinuePlaying = document.getElementById("btn_continue_game");
const btnExitGame = document.getElementById("btn_exit_game");

// le croupier
const croupierDeck = document.getElementById("cardsCroupier");
const croupierScore = document.getElementById("croupier_score");
const cardSound = document.getElementById("cardHit");
const moneySound = document.getElementById("moneyPick");
const playerWinSound = document.getElementById("playerWinSound");
const audioBtn = document.getElementById("audioMute");
let musicNone = false;
const volumeBtn = document.getElementById("volume_btn");

document.addEventListener("DOMContentLoaded", () => {
  btnStay.style.display = "none";
  btnHit.style.display = "none";
  btnLeave.style.display = "none";
  btnSplit.style.display = "none";
  btnStart.disabled = true;
});

audioBtn.addEventListener("click", () => {
  if (musicNone == false) {
    musicNone = true;
    volumeBtn.src = "http://localhost/public/images/icons/volume_off.png";

    Array.from(document.querySelectorAll("audio")).forEach(
      (el) => (el.muted = true)
    );
  } else {
    musicNone = false;
    volumeBtn.src = "http://localhost/public/images/icons/volume.svg";

    Array.from(document.querySelectorAll("audio, video")).forEach(
      (el) => (el.muted = false)
    );
  }
  toggleSound();
});

function turnOffSound() {
  Array.from(document.querySelectorAll("audio")).forEach((el) => (el.muted = true));
  musicNone = true;
  volumeBtn.src = "http://localhost/public/images/icons/volume_off.png";
}


// Initialiser le jeu de cartes
let cardsInGame = cards;

// variable pour stocker les donnes du User
let currentPlayer = new player();
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
    croupierDeck.lastChild.src = "./public/images/cartes/card_back.png";
    areBtnsAvailables = true;
  }, 2000);
}
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
  croupierScore.textContent = 0;
  playerScore.textContent = 0;
  playerWins.textContent = `Wins: ${currentPlayer.wins}`;
  playerLoses.textContent = `Loses: ${currentPlayer.loses}`;
  currentMise = 0;
  playerMiseDisplay.textContent = `${currentMise}`;
  btnStart.style.display = "block";
  btnStart.disabled = true;
  btnLeave.style.display = "none";
  btnHit.style.display = "none";
  btnStay.style.display = "none";
  divJetons.style.display = "block";
  totalMise = 0;
  // startGame(currentPlayer);
}

function handleHitCart(player) {
  player.cardsInGame = cardsInGame;
  player.demanderUneCarte();
  cardsInGame = player.refreshCardsInGame();
  if (player.name === "Croupier") {
    croupierScore.textContent = player.currentHand[0];
  } else {
    playerScore.textContent = player.score;
    // On a blackjack ou on dépasse 21 alors on ne peut pas jouer plus des cartes
    if (player.score > 21) {
      handleLose(currentPlayer);
    }
  }
}

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
  } else if (
    (playerPass21 && croupierPass21) ||
    player.score === croupier.score
  ) {
    handleEquality(player);
  } else if (!playerBlackJack && croupierBlackJack) {
    // on perde pour blackjack
    handleLose(player, true);
  } else if (croupierWin && !croupierPass21) {
    handleLose(player);
  } else if (playerPass21 && !croupierPass21) {
    handleLose(player);
  } else if (
    croupier.usedCards.length === 2 &&
    croupierBlackJack &&
    playerBlackJack
  ) {
    // ici on rembourse la mise...
    handleEquality(player);
  }
}
async function handleStay(player) {
  if (!areBtnsAvailables && currentMise === 0) return;
  croupierDeck.lastChild.src = croupier.usedCards[croupier.usedCards.length - 1].image;
  croupierScore.textContent = croupier.score;
  const hitTo17 = () => {
    croupier.demanderUneCarte();
    cardsInGame = croupier.refreshCardsInGame();
    croupierScore.textContent = croupier.score;
  }
  let delay = 500;
  while (croupier.score < 17) {
    areBtnsAvailables = false;
    hitTo17();
    
  }
  // Le croupier demandera une carte s'il n'as pas 17 points
  /* for (let delay = 500; croupier.score < 17; delay += 500) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    croupier.demanderUneCarte();
    cardsInGame = croupier.refreshCardsInGame();
    croupierScore.textContent = croupier.score;
  } */
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
  showModal("Equality!", "#8bc959", playerWinSound);
  currentMoney += totalMise * 2;
  playerMoneyDisplay.style.color = "#8bc959";
  playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
  addMoney(totalMise);
};
function handleWin(player, blackJack = false) {
  showModal("You win!", "#8bc959", playerWinSound);
  if (blackJack) {
    console.log("BlackJack!!");
  }
  currentMoney += totalMise * 2;
  playerMoneyDisplay.style.color = "#8bc959";
  playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
  addMoney(totalMise * 2);
  player.addWin();
}
function handleLose(player, blackJack = false) {
  showModal("You Lose!", "#ff8e8e", moneySound);
  if (blackJack) {
    console.log("you lose by blackjack... lol");
  }
  //currentMoney -= currentMise;
  playerMoneyDisplay.style.color = "#ff8e8e";
  //playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
  player.addLose();
}

// Boutons pour les mises
let url = document.getElementById("url").value;
let id_user = document.getElementById('user').value;
let totalMise = 0;
let $moneyValues = [1, 5, 25, 50, 100, 500, 1000];
btnsMises.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    $.ajax({
      type: "GET",
      url: "get_user_infos.php",
      data: {
        userId: id_user,
      },
      dataType: "json",
      success: function (response) {
        if (!response.error) {
          /* if (currentMise !== 0) return; */
          let money = btn.dataset.value;
          console.log(money);
          if (response.money < money) {
            console.log("Vous n'avez pas assez d'argent");
          } else {
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
                    // si tout est ok on commence le jeu avec la mise sélectionné
                    btnStart.disabled = false;
                    // Assuming money is a valid number or a string that can be converted to a number

                    currentMise = parseInt(money);

                    // Check if playerMiseDisplay.textContent contains a number
                    totalMise = parseInt(playerMiseDisplay.textContent) || 0;


                    // Add currentMise to totalMise
                    totalMise += currentMise;

                    // Update playerMiseDisplay.textContent with the calculated total
                    playerMiseDisplay.textContent = `${totalMise}`;

                    currentMoney -= currentMise;
                    playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
                  } else {
                    console.error("Erreur");
                  }
                }
              };
              // window.location.href = url + "removeMoney/" + money;
              xhttp.open("GET", url + "removeMoney/" + money, true);
              xhttp.send();
            }
          }
        } else {
          console.log("Erreur de récupération des données utilisateur");
        }
      },
      error: function (xhr, status, error) {
        reject("Erreur AJAX : " + error);
      },
    });
  });
});

function addMoney(money) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("ok");
      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", url + "addMoney/" + money, true);
  xhttp.send();
}
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

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  btnStart.style.display = "none";
  btnLeave.style.display = "block";
  btnHit.style.display = "block";
  btnStay.style.display = "block";
  divJetons.style.display = "none";
  startGame(currentPlayer);
});

// Bouton pour abandonner
btnLeave.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  e.preventDefault();
  console.log("mise devise en 2");
});
// Bouton pour demander une carte (Hit)
btnHit.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  cardSound.play();
  e.preventDefault();
  handleHitCart(currentPlayer);
});
// Bouton pour stay
btnStay.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  e.preventDefault();
  handleStay(currentPlayer);
});
// Bouton pour new round
btnContinuePlaying.addEventListener("click", (e) => {
  e.preventDefault();
  newRound();
});

function toggleSound() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("Sound Toggle");
      }
    }
  };
  // window.location.href = url + "removeMoney/" + money;
  xhttp.open("GET", url + "toggleSound", true);
  xhttp.send();
}


/* 
Distribution des cartes :
     
Une carte pour moi face visible
Une carte pour lui (croupier) face visible
Une deuxième carte pour moi face visible
Et une deuxième carte pour le croupier MAIS face cachée.

Ensuite : 
Le joueur tire autant de cartes qu'il souhaite SAUF si il dépasse 21 dans quel cas, le jeu s’arrête et le croupier gagne.

Dès que le joueur appuis sur STAY
Révélation de la carte face cachée du croupier ( donc calcul de ses deux cartes )

Ensuite :
Le croupier tire des cartes tant qu'il n'a pas 17 maximum. ( si il a plus de 17 le jeu s'arrête et celui qui a la plus grosse main, gagne. )

Spécificité : 
Si le croupier tire un AS face visible ( donc sa première carte ) Et que sa carte cachée est un 10 ou une tête 
     
Le jeu s’arrête et le croupier gagne SAUF si le joueur a un blackjack aussi alors le jeu s'arrête quand même mais le joueur est remboursée de sa somme misée.
*/

