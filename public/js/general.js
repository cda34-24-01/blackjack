import { cards, getCard } from "./cartes.js";
import { player } from "./player.js";
import { getUserInfos } from "./getuser.js";

// Prendre les elements HTML
let divJetons = document.querySelector(".money_btn");
const btnStart = document.getElementById("start");
const btnHit = document.getElementById("hit");
const btnStay = document.getElementById("stay");
const btnLeave = document.getElementById("leave");
const btnSplit = document.getElementById("split");
const btnDouble = document.getElementById("double");
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

// elements du split
const deckContainer = document.getElementById('player_desk');
const splitDeck = deckContainer.lastElementChild;
const cartesRight = document.getElementById('cartes_split_right');
const cartesLeft = document.getElementById('cartes_split_left');
const scoreRightDisplay = document.getElementById('score_split_right');
const scoreLeftDisplay =  document.getElementById('score_split_left');
let isSplit = false;

// btns hit et stay du split
const btnSplitHitRight = document.getElementById('btn_split_hit_right');
const btnSplitHitLeft = document.getElementById('btn_split_hit_left');


document.addEventListener("DOMContentLoaded", () => {
  btnStay.style.display = "none";
  btnHit.style.display = "none";
  btnLeave.style.display = "none";
  btnSplit.style.display = "none";
  btnDouble.style.display = "none";
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
  btnLeave.disabled = true;
  btnHit.disabled = true;
  btnStay.disabled = true;
  btnDouble.disabled = true;
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
    btnLeave.disabled = false;
    btnHit.disabled = false;
    btnStay.disabled = false;
    btnDouble.disabled = false;
    // case of split
    if (currentPlayer.currentHand[0] === currentPlayer.currentHand[1]) {
      btnSplit.style.display = "block";
      btnSplit.disabled = false;
    }
  }, 2000);

}
function newRound() {
  messageModal.classList.add("hidden");
  currentPlayer.reset();
  if (isSplit) {
    splitDeck.innerHTML = '';
    handLeft = [];
    handRight = [];
    scoreLeft = 0;
    scoreRight = 0;
    isSplit = false;
    splitDeck.classList.add('hidden');
    deckContainer.firstElementChild.classList.remove('hidden');
  }
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
  btnDouble.style.display = "none";
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
      showModal('You lose!', '#ff8e8e', moneySound); 
    }
  }
}

function checkScores(score, hand) {
  const playerPass21 = score > 21;
  const croupierPass21 = croupier.score > 21;
  const playerWin = score > croupier.score;
  const croupierWin = score < croupier.score;
  const playerBlackJack = score === 21 && hand.length === 2;
  const croupierBlackJack = croupier.score === 21 && croupier.currentHand.length === 2;

  if (playerWin && !playerPass21 && !playerBlackJack) {
    return {result: 'win', blackJack: false};
  } else if (croupierPass21 && !playerPass21 && !playerBlackJack) {
    return {result: 'win', blackJack: false};
  } else if (playerBlackJack && !croupierBlackJack) {
    // on gagne avec blackjack
    return {result: 'win', blackJack: true};
  } else if (
    (playerPass21 && croupierPass21) ||
    score === croupier.score
  ) {
    return {result: 'equality', blackJack: false};
  } else if (!playerBlackJack && croupierBlackJack) {
    return {result: 'lose', blackJack: true};
    // on perde pour blackjack
  } else if (croupierWin && !croupierPass21) {
    return {result: 'lose', blackJack: false};
  } else if (playerPass21 && !croupierPass21) {
    return {result: 'lose', blackJack: false};
  } else if (
    croupier.usedCards.length === 2 &&
    croupierBlackJack &&
    playerBlackJack
  ) {
    // ici on rembourse la mise...
    handleEquality(player);
    return {result: 'equity', blackJack: false};
  }
}
async function handleStay(player, double = false) {
  if (!areBtnsAvailables && currentMise === 0) return;
  croupierDeck.lastChild.src = croupier.usedCards[croupier.usedCards.length - 1].image;
  croupierScore.textContent = croupier.score;
  // Le croupier demandera une carte s'il n'as pas 17 points
  for (let delay = 500; croupier.score < 17; delay += 500) {
    areBtnsAvailables = false;
    await new Promise((resolve) => setTimeout(resolve, delay));
    croupier.demanderUneCarte();
    cardsInGame = croupier.refreshCardsInGame();
    croupierScore.textContent = croupier.score;
  }
  // Comparer les scores
  let message = '';
  if (player.score.length === undefined && !isSplit) {
    const check = checkScores(player.score, player.currentHand); 
    if (check.result === 'win') {
      handleWin(player, [check.blackJack, false], false, double);
      message = 'You win!';
    } else if (check.result === 'lose') {
      handleLose(player, [check.blackJack, false]);
      message = 'You lose!';
    } else if (check.result === 'equality') {
      console.log(check.result)
      handleEquality(player);
      message = 'Equality!';
    }
    showModal(message, check.result === 'lose' ? "#ff8e8e" : "#8bc959", check.result === 'win' ? playerWinSound : moneySound);
    return;
  } else {
    const checkRight = checkScores(player.score[0], player.currentHand[0]);
    const checkLeft = checkScores(player.score[1], player.currentHand[1]);

    const doubleWinSplit = checkLeft.result === 'win' && checkRight.result === 'win';
    const doubleLoseSplit = checkLeft.result === 'lose' && checkRight.result === 'lose';

    if (checkLeft.result === 'win' || checkRight.result === 'win') {
      handleWin(player, [checkLeft.blackJack, checkRight.blackJack], doubleWinSplit, double);
      if (doubleWinSplit) {
        message = 'You Win for double!';
      } else {
        message = 'You Win one!';
      }
    } else if (checkLeft.result === 'lose' || checkRight.result === 'lose') {
      handleLose(player, [checkLeft.blackJack, checkRight.blackJack], doubleLoseSplit);
      if (doubleLoseSplit) {
        message = 'You Lose for double!';
      }
    } else if (checkLeft.result === 'equality' || checkRight.result === 'equality') {
      if (checkLeft.result === 'equality' && checkRight.result === 'equality') {
      handleEquality(player, true);
      message = 'Equality!';
      } else {
        handleEquality(player, false);
      }
    }
    showModal(message, doubleLoseSplit ? "#ff8e8e" : "#8bc959", doubleWinSplit ? playerWinSound : moneySound);
  }
}
function showModal(message, colorAlert, sound) {
  areBtnsAvailables = false;
  btnLeave.disabled = true;
  btnHit.disabled = true;
  btnStay.disabled = true;
  btnDouble.disabled = true;
  btnSplit.style.display = "none";
  sound.play();
  messageModal.firstElementChild.textContent = message;
  messageModal.classList.remove("hidden");
  messageModal.style.backgroundColor = colorAlert;
}
function handleEquality(player, split = false) {
  if (split) {
    addMoney(totalMise / 4);
  } else {
    addMoney(totalMise / 2);
  }
};
function handleWin(player, blackJack = [false, false], split = false, double = false) {
  let moneyToAdd = (blackJack[0] ? (totalMise * 2 + totalMise / 2) : totalMise * 2);
  addMoney(moneyToAdd);
  player.addWin();
  if (split) {
    let moneyToAddSplit = (blackJack[1] ? (totalMise * 2 + totalMise / 2) : totalMise * 2);
    addMoney(moneyToAddSplit);
    player.addWin();
  }
}
function handleLose(player, blackJack = [false, false], split = false) {
  if (blackJack[0] || blackJack[1]) {
    console.log("you lose by blackjack... lol");
  }
  playerMoneyDisplay.style.color = "#ff8e8e";
  if (split) {
    player.addLose();
  }
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
          if (response.money < money) {
            console.log("Vous n'avez pas assez d'argent");
          } else {
            if (!$moneyValues.includes(parseInt(money))) {
              console.log("Erreur");
              // exit(); // Cette ligne ne fonctionnera pas en JavaScript, voir la note ci-dessous
              return;
            } else {
              removeMoney(money);
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

function removeMoney(money) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(`remove money ok : ${money}`);
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
  xhttp.open("GET", url + "removeMoney/" + money, true);
  xhttp.send();
}

function addMoney(money) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(`add money ok : ${money}`);
        currentMoney += money;
        playerMoneyDisplay.textContent = `Money 💵 : ${currentMoney}`;
      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", url + "addMoney/" + money, true);
  xhttp.send();
}

// <<<<<<<<< ---- Split ---- >>>>>>>>>>

function calcScoreSplit(hand) {
  let score = hand.reduce((sum, value) => sum + value, 0);
      let numAces = hand.filter(card => card === 11).length;
      while (score > 21 && numAces > 0) {
          score -= 10;
          numAces--;
      }
      return score;
}

let handLeft = [];
let handRight = [];
let scoreLeft = 0;
let scoreRight = 0;

function handleHitCardOnSplit (side, sideContainer, scoreOfSideDisplay, hand) {
  const { cardSelected, currentsCards } = getCard(cardsInGame);

  hand.push(cardSelected.value);
  
  const currentScore = calcScoreSplit(hand);

  scoreOfSideDisplay.textContent = currentScore;
  
  currentPlayer.currentHand = [handLeft, handRight];
  
  // DOM manipulation
  const newCard = document.createElement('img');
  newCard.src = cardSelected.image;
  sideContainer.appendChild(newCard);
  const cardsOnThisSide = sideContainer.getElementsByTagName('img');

  const totalCards = cardsOnThisSide.length;
  if (side === 'right') {
    for (let i = totalCards -1; i>0; i--) {
      cardsOnThisSide[i].style.transform = `translateX(${ (i === 1? 15: 30) * i - 10}px)`;
      scoreRight = currentScore;
    }
  } else {
    for (let i = 0; i < totalCards; i++) {
      const displacement = 30 * (totalCards - i - 1) + 20;
      cardsOnThisSide[i].style.transform = `translateX(-${displacement}px)`;
      scoreLeft = currentScore;
    }
  }
  currentPlayer.score = [scoreLeft, scoreRight];

  if (currentScore > 21) {
    console.log(sideContainer);
    Array.from(cardsOnThisSide).forEach((card) => {
      console.log(card);
      card.style.filter = "brightness(0.5)";
    })
    if (side === 'right') {
      btnSplitHitRight.disabled = true;
    } else {
      btnSplitHitLeft.disabled = true;
    }
  }
}

btnSplitHitRight.addEventListener('click', ()=> {
  handleHitCardOnSplit('right', cartesRight, scoreRightDisplay, handRight);
})
btnSplitHitLeft.addEventListener('click', ()=> {
  handleHitCardOnSplit('left', cartesLeft, scoreLeftDisplay, handLeft);
})

// Bouton pour Split
btnSplit.addEventListener("click", (e)=> {
    e.preventDefault();
    if(!areBtnsAvailables) return;
    isSplit = true;
    btnHit.disabled = true;
    btnSplit.disabled = true;
    btnDouble.disabled = true;
    removeMoney(totalMise);
    currentPlayer.score = 0;
    // Set the scores
    handRight = [currentPlayer.usedCards[currentPlayer.usedCards.length - 1].value];
    handLeft = [currentPlayer.usedCards[currentPlayer.usedCards.length - 2].value];
    // Hidden le desk normal
    deckContainer.firstElementChild.classList.add('hidden');
    // Visible le desk split
    splitDeck.classList.remove('hidden');
    // Add the cards in any side
    const cardSplitedRight = document.createElement('img');
    const cardSplitedLeft = document.createElement('img');
    cardSplitedRight.src = currentPlayer.usedCards[currentPlayer.usedCards.length - 1].image;
    cardSplitedLeft.src = currentPlayer.usedCards[currentPlayer.usedCards.length - 2].image;
    cartesRight.appendChild(cardSplitedRight);
    cartesLeft.appendChild(cardSplitedLeft);
    // Add the scores
    currentPlayer.score = [handLeft[0], handRight[0]]
    scoreRightDisplay.textContent = handRight[0];
    scoreLeftDisplay.textContent = handLeft[0];
})

btnStart.addEventListener("click", (e) => {
  if(currentMise === 0) return;
  e.preventDefault();
  btnStart.style.display = "none";
  btnLeave.style.display = "block";
  btnHit.style.display = "block";
  btnStay.style.display = "block";
  btnDouble.style.display = "block";
  btnSplit.style.display = "none";
  divJetons.style.display = "none";
  startGame(currentPlayer);
});

// Bouton pour abandonner
btnLeave.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  e.preventDefault();
  showModal(`You leave the game!\nYou lost $${totalMise / 2} of your money!`, '#ff8e8e', moneySound);
  addMoney(totalMise / 2);
});
// Bouton pour demander une carte (Hit)
btnHit.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  cardSound.play();
  e.preventDefault();
  handleHitCart(currentPlayer);
});
// Bouton pour double
btnDouble.addEventListener("click", (e) => {
  if (!areBtnsAvailables || currentMise === 0) return;
  e.preventDefault();
  handleHitCart(currentPlayer);
  removeMoney(totalMise);
  handleStay(currentPlayer);
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

