import { cards, getCard } from "./cartes.js";
import { player } from "./player.js";
import { checkUser, addMoney, removeMoney, toggleSound } from "./services.js";

/* <<<<<<<<<<<< PRENDRE LES ELEMENTS HTML >>>>>>>>>>>>>>>>>> */
// Elements
const playerDeck = document.getElementById('player_desk');
// Boutons
let divJetons = document.querySelector(".money_btn");
const btnStart = document.getElementById("start");
const btnHit = document.getElementById("hit");
const btnStay = document.getElementById("stay");
const btnLeave = document.getElementById("leave");
const btnSplit = document.getElementById("split");
const btnDouble = document.getElementById("double");
const btnsMises = document.querySelectorAll(".btnMoney");
const btnContinuePlaying = document.getElementById("btn_continue_game");

// si c'est false on ne peut pas cliquer les boutons specifies
let areBtnsAvailables = false;
// Elements du display
const playerScore = document.getElementById("player_score");
const playerWins = document.querySelector(".ui_wins");
const playerLoses = document.querySelector(".ui_loses");
const playerCardsContainer = document.getElementById("cardsPlayer1");
const playerMoneyDisplay = document.querySelector(".ui_money");
const playerMiseDisplay = document.querySelector(".ui_mise");
// Elements pour le sound
const cardSound = document.getElementById("cardHit");
const moneySound = document.getElementById("moneyPick");
const playerWinSound = document.getElementById("playerWinSound");
const audioBtn = document.getElementById("audioMute");
let musicNone = false;
const volumeBtn = document.getElementById("volume_btn");
// Les elements du croupier
const croupierDeck = document.getElementById("cardsCroupier");
const croupierScore = document.getElementById("croupier_score");
// Le modal
const messageModal = document.querySelector(".message_modal");
// Ici on peut changer la couleur du bg du modal
const winColorModal = "#8bc959a8";
const loseColorModal = "#dd17177d";



// <<<<<<<<<< CONFIGURATION INITIAL DU JEU >>>>>>>>>>>>
// Configuration des boutons au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  btnStay.style.display = "none";
  btnHit.style.display = "none";
  btnLeave.style.display = "none";
  btnSplit.style.display = "none";
  btnDouble.style.display = "none";
  btnStart.disabled = true;
});

// Initialiser le jeu de cartes
let cardsInGame = cards;
let isSplit = false;


// Instancier l'objet jouer pour le current player
let currentPlayer = new player();
// Cette variable contiendra la mise courante au moment du click sur le géton
let currentMise = 0;
// La argent courante pendant le jeu
let currentMoney = 0;

// L'input hidden dans le HTML contient la valeur ID du utilisateur
// const userId = document.getElementById("user_id");
export const id_user = document.getElementById('user').value;
checkUser((user) => {
  const { pseudo, money, wins, loses } = user;
  currentPlayer.name = pseudo;
  currentPlayer.money = money;
  currentPlayer.cardsInGame = cardsInGame;
  currentPlayer.deck = playerCardsContainer;
  currentPlayer.wins = wins;
  currentPlayer.loses = loses;
  currentMoney = parseFloat(money);
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


/* <<<<<<<<<<<< FONCTIONS POUR LE COMPORTEMENT DU JEU >>>>>>>>>>>>>>>>>> */
// Fonction pour controller les boutons (elle va a évoluer)
function handleDisableBtns(disabled = true) {
  if (disabled) {
    btnLeave.disabled = true;
    btnHit.disabled = true;
    btnStay.disabled = true;
    btnDouble.disabled = true;
  } else {
    btnLeave.disabled = false;
    btnHit.disabled = false;
    btnStay.disabled = false;
    btnDouble.disabled = true;
  }
}
// Repartition initial des cartes
function startGame(currentPlayer) {
  areBtnsAvailables = false;
  handleDisableBtns(true);
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
    handleDisableBtns(false);
    // case double
    const doubleIsPossible = currentPlayer.score === 9 || currentPlayer.score === 10 || currentPlayer.score === 11
    const doubleIsPossibleWithAce = currentPlayer.currentHand.includes(11) && (currentPlayer.score === 16 || currentPlayer.score === 17 || currentPlayer.score === 18)
    if (doubleIsPossible || doubleIsPossibleWithAce) {
      btnDouble.disabled = false;
    } else {
      btnDouble.display = true;
    }
    // case of split
    if (currentPlayer.currentHand[0] === currentPlayer.currentHand[1]) {
      btnSplit.style.display = "block";
      btnSplit.disabled = false;
    }
  }, 2000);

}
// Réinitialiser et actualiser les elements HTML et variables pour un nouveau jeu
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
    playerDeck.firstElementChild.classList.remove('hidden');
  }
  croupier.reset();
  croupierDeck.innerHTML = '<img class="cartes_back" src="../public/images/cartes/card_back.png" />'
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
}
// Verification des scores
// Cette fonction prendre le score et la 'hand' du player
// Return un objet { result: string (win, lose, equality), blackJack: boolean }
function checkScores(score, hand) {
  // Definition des déférents résultats
  const playerPass21 = score > 21;
  const croupierPass21 = croupier.score > 21;
  const playerWin = score > croupier.score;
  const croupierWin = score < croupier.score;
  const playerBlackJack = score === 21 && hand.length === 2;
  const croupierBlackJack = croupier.score === 21 && croupier.currentHand.length === 2;
  // Comparer et returner le résultat
  if (playerWin && !playerPass21 && !playerBlackJack) {
    return { result: 'win', blackJack: false };
  } else if (croupierPass21 && !playerPass21 && !playerBlackJack) {
    return { result: 'win', blackJack: false };
  } else if (playerBlackJack && !croupierBlackJack) {
    // on gagne avec blackjack
    return { result: 'win', blackJack: true };
  } else if (
    (playerPass21 && croupierPass21) ||
    score === croupier.score
  ) {
    return { result: 'equality', blackJack: false };
  } else if (!playerBlackJack && croupierBlackJack) {
    return { result: 'lose', blackJack: true };
    // on perde pour blackjack
  } else if (croupierWin && !croupierPass21) {
    return { result: 'lose', blackJack: false };
  } else if (playerPass21 && !croupierPass21) {
    return { result: 'lose', blackJack: false };
  } else if (
    croupier.usedCards.length === 2 &&
    croupierBlackJack &&
    playerBlackJack
  ) {
    return { result: 'equity', blackJack: false };
  }
}
// Off le sound
function turnOffSound() {
  Array.from(document.querySelectorAll("audio")).forEach((el) => (el.muted = true));
  musicNone = true;
  volumeBtn.src = "http://localhost/public/images/icons/volume_off.png";
}
// Montrer le modal et actualiser les displays de currentMoney et totalMise
function showModal(message, colorAlert, sound) {
  sound.play();
  // desactiver les boutons
  areBtnsAvailables = false;
  handleDisableBtns(true);
  btnSplit.style.display = "none";
  // afficher le modal
  messageModal.firstElementChild.textContent = message;
  messageModal.classList.remove("hidden");
  messageModal.style.backgroundColor = colorAlert;
  // actualiser les displays
  playerMiseDisplay.textContent = `0`;
  playerMoneyDisplay.textContent = currentMoney;
  // Appliquer l'effect aux cartes lors qu'l modal est ouvert
  const cardsImgPlayer = playerDeck.getElementsByTagName('img');
  const cardsImgCroupier = croupierDeck.getElementsByTagName('img');
  Array.from(cardsImgPlayer).forEach((img) => { img.style.filter = "brightness(0.5)" });
  Array.from(cardsImgCroupier).forEach((img) => { img.style.filter = "brightness(0.5)" });
};
function handleEquality(split = false) {
  let moneyToAdd = totalMise / 2;
  if (split === true) {
    moneyToAdd = totalMise / 4;
  }
  currentMoney += moneyToAdd;
  addMoney(moneyToAdd);
};
// Le array blackjack a l'index 0 c'est la hand original et a l'index 1 c'est pour la hand du split
function handleWin(player, blackJack = [false, false], double = false, split = false) {
  // le montant minimum à ajouter en cas de gain
  // la valeur de la mise multipliée par 2, une fois pour récupérer la mise originale et une fois pour le gain
  let newMoney = totalMise * 2;

  // cas de blackjack avec double ou simple
  const doubleBlackJack = blackJack[0] && blackJack[1];
  const singleBlackJack = blackJack[0] || blackJack[1] && !doubleBlackJack;
  
  if (!doubleBlackJack && singleBlackJack) {
    newMoney += totalMise / 2;
  } else if (doubleBlackJack) {
    newMoney += totalMise / 2;
  }

  // cas de split ou double mise
  if (split || double) {
    newMoney += totalMise;
  }

  player.win(newMoney);
  currentMoney += newMoney;
};
function handleLose(player, blackJack = [false, false], split = false) {
  console.log(currentMoney);
  if (blackJack[0] || blackJack[1]) {
    console.log("you lose by blackjack... lol");
  }
  playerMoneyDisplay.style.color = "#ff8e8e";
  if (split) {
    player.lose(currentMise);
  }
  player.lose(currentMise);
};
// SPLIT FONCTIONS
// Verifier que la hand ne dépasse pas 21
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
function handleHitCardOnSplit(side, sideContainer, scoreOfSideDisplay, hand) {
  // 'side' est un string qui spécifie le coté concerné
  // 'sideContainer' c'est le élément HTML conteneur
  // Prendre une carte
  const { cardSelected } = getCard(cardsInGame);
  // Ajouter la valeur a la hand concerné
  hand.push(cardSelected.value);
  const currentScore = calcScoreSplit(hand);
  scoreOfSideDisplay.textContent = currentScore;
  // Actualiser la current hand du player
  currentPlayer.currentHand = [handLeft, handRight];

  // DOM manipulation
  const newCard = document.createElement('img');
  newCard.src = cardSelected.image;
  sideContainer.appendChild(newCard);
  const cardsOnThisSide = sideContainer.getElementsByTagName('img');
  const totalCards = cardsOnThisSide.length;
  // Disposition des cartes avec le translateX appliqué
  if (side === 'right') {
    for (let i = totalCards - 1; i > 0; i--) {
      cardsOnThisSide[i].style.transform = `translateX(${(i === 1 ? 15 : 30) * i - 10}px)`;
      scoreRight = currentScore;
    }
  } else {
    for (let i = 0; i < totalCards; i++) {
      const displacement = 30 * (totalCards - i - 1) + 20;
      cardsOnThisSide[i].style.transform = `translateX(-${displacement}px)`;
      scoreLeft = currentScore;
    }
  }
  // Actualiser la current score du player apres le calcule de chaque coté dans la boucle for
  currentPlayer.score = [scoreLeft, scoreRight];
  // Appliquer le style aux cartes lors qu'on dépasse 21
  if (currentScore >= 21) {
    Array.from(cardsOnThisSide).forEach((card) => {
      card.style.filter = "brightness(0.5)";
    })
    if (side === 'right') {
      btnSplitHitRight.disabled = true;
    } else {
      btnSplitHitLeft.disabled = true;
    }
  }
}
// Fonction pour le double de mises
function handleDouble() {
  removeMoney(totalMise);
  currentMoney -= totalMise;
  playerMoneyDisplay.textContent = currentMoney;
  totalMise += totalMise;
  playerMiseDisplay.textContent = totalMise;
  handleHitCart(currentPlayer);
  if (currentPlayer.score <= 21) {
    handleStay(currentPlayer, true);
  }
}
function handleSplit() {
  console.log('splitting');
  isSplit = true;
  btnHit.disabled = true;
  btnSplit.disabled = true;
  btnDouble.disabled = true;
  removeMoney(totalMise);
  currentMoney -= totalMise;
  playerMoneyDisplay.textContent = currentMoney;
  totalMise += totalMise;
  playerMiseDisplay.textContent = totalMise;
  currentPlayer.score = 0;
  // Set les scores de chaque côté
  handRight = [currentPlayer.usedCards[currentPlayer.usedCards.length - 1].value];
  handLeft = [currentPlayer.usedCards[currentPlayer.usedCards.length - 2].value];
  // Hidden le desk normal
  playerDeck.firstElementChild.classList.add('hidden');
  // Visible le desk split
  splitDeck.classList.remove('hidden');
  // Ajouter les cartes dans les deux côtés
  const cardSplitedRight = document.createElement('img');
  const cardSplitedLeft = document.createElement('img');
  cardSplitedRight.src = currentPlayer.usedCards[currentPlayer.usedCards.length - 1].image;
  cardSplitedLeft.src = currentPlayer.usedCards[currentPlayer.usedCards.length - 2].image;
  cartesRight.appendChild(cardSplitedRight);
  cartesLeft.appendChild(cardSplitedLeft);
  // Montrer les scores et actualiser la valeur dans le objet currentPlayer
  currentPlayer.score = [handLeft[0], handRight[0]]
  scoreRightDisplay.textContent = handRight[0];
  scoreLeftDisplay.textContent = handLeft[0];
}
/* <<<<<<<<<<<< FIN DES FONCTIONS POUR LE COMPORTEMENT DU JEU >>>>>>>>>>>>>>>>>> */

/* <<<<<<<<<<<< FONCTIONS POUR LES ACTIONS DU JOUEUR >>>>>>>>>>>>>>>>>> */
// Demander une carte
function handleHitCart(player) {
  player.cardsInGame = cardsInGame;
  player.demanderUneCarte();
  cardsInGame = player.refreshCardsInGame();
  if (currentPlayer.currentHand.length >= 2) {
    btnDouble.disable = true;
  }
  if (player.name === "Croupier") {
    croupierScore.textContent = player.currentHand[0];
  } else {
    playerScore.textContent = player.score;
    // On a blackjack ou on dépasse 21 alors on ne peut pas jouer plus des cartes
    if (player.score > 21) {
      handleLose(currentPlayer);
      showModal(`You lose! -$${totalMise}`, loseColorModal, moneySound);
    } else if (player.score === 21 && player.currentHand.length === 2) {
      handleWin(player, [true, false], false, false);
      showModal(`BlackJack! +$${totalMise * 1.5}`, winColorModal, playerWinSound);
    }
  }
}
// Le stay du joueur. Prendre le player et le boolean 'double' (false par défaut) pour specifier s'on a doublé la mise  
async function handleStay(player, double = false) {
  // Return si les boutons ne sont pas disponibles
  if (!areBtnsAvailables && totalMise === 0) return;
  croupierDeck.lastChild.src = croupier.usedCards[croupier.usedCards.length - 1].image;
  croupierScore.textContent = croupier.score;
  // Le croupier demandera une carte s'il n'as pas 17 points
  // La promise est implémenté pour donner de delay entre les cartes
  for (let delay = 500; croupier.score < 17; delay += 500) {
    areBtnsAvailables = false;
    await new Promise((resolve) => setTimeout(resolve, delay));
    croupier.demanderUneCarte();
    cardsInGame = croupier.refreshCardsInGame();
    croupierScore.textContent = croupier.score;
  }
  // Comparer les scores et appliquer la fonction pertinent avec le message
  let message = '';
  // Hors split
  if (player.score.length === undefined && !isSplit) {
    const check = checkScores(player.score, player.currentHand);
    if (check.result === 'win') {
      handleWin(player, [check.blackJack, false], false, double);
      message = `You win! +$${totalMise}`;
      if (check.blackJack) {
        message = `BlackJack! +$${totalMise * 1.5}`;
      }
    } else if (check.result === 'lose') {
      handleLose(player, [check.blackJack, false]);
      message = `You lose! -$${totalMise}`;
    } else if (check.result === 'equality') {
      handleEquality(player);
      message = `Equality! +$${totalMise / 2}`;
    }
    showModal(message, check.result === 'lose' ? loseColorModal : winColorModal, check.result === 'win' ? playerWinSound : moneySound);
    return;
  } else {
    // Case de Split
    // CheckScores appliqué a chaque hand du split
    const checkRight = checkScores(player.score[0], player.currentHand[0]);
    const checkLeft = checkScores(player.score[1], player.currentHand[1]);

    const doubleWinSplit = checkLeft.result === 'win' && checkRight.result === 'win';
    const doubleLoseSplit = checkLeft.result === 'lose' && checkRight.result === 'lose';
    const doubleEqualitySplit = checkLeft.result === 'equality' && checkRight.result === 'equality';
    const singleEqualitySplit = checkLeft.result === 'equality' || checkRight.result === 'equality';

    // Comparer les scores et appliquer la fonction pertinent avec le message
    if (checkLeft.result === 'win' || checkRight.result === 'win') {
      handleWin(player, [checkLeft.blackJack, checkRight.blackJack], isSplit, doubleWinSplit);
      if (doubleWinSplit) {
        message = `You Win for double! +$${totalMise}`;
      } else {
        message = `You Win one! +$${totalMise}`;
      };
    };
    if (checkLeft.result === 'lose' || checkRight.result === 'lose') {
      handleLose(player, [checkLeft.blackJack, checkRight.blackJack], doubleLoseSplit);
      if (doubleLoseSplit) {
      message = `You Lose for double! -$${totalMise}`;
      };
    };
    if (singleEqualitySplit) {
      handleEquality(player, true);
      message = `One equality! +$${totalMise / 4}`;
      console.log('equality in split', message);
    } else if (doubleEqualitySplit) {
      message = `Equality x 2!+$${totalMise / 2}`;
      handleEquality(player, true);
      console.log('double equality in split', message);
    };
    showModal(message, doubleLoseSplit ? loseColorModal : winColorModal, doubleWinSplit ? playerWinSound : moneySound);
  };
};
// (le reste de fonctionnalités sont implémentés directement dans les callback du click dans les boutons )
/* <<<<<<<<<<<< FIN FONCTIONS POUR LES ACTIONS DU JOUEUR >>>>>>>>>>>>>>>>>> */

/* <<<<<<<<<<<< BOUTONS >>>>>>>>>>>>>>>>>> */
// Le sound
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
// Boutons pour les mises
let totalMise = 0;
let $moneyValues = [1, 5, 25, 50, 100, 500, 1000];
btnsMises.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkUser((user) => {
      currentMise = parseInt(btn.dataset.value);
      let userMoney = parseFloat(user.money);
      if (userMoney < currentMise) {
        console.log("Vous n'avez pas assez d'argent");
      } else {
        if (!$moneyValues.includes(currentMise)) {
          console.log("Erreur");
          return;
        } else {
          currentMoney = userMoney;
          removeMoney(currentMise);
          currentMoney -= currentMise;
          // si tout est ok on commence le jeu avec la mise sélectionné
          totalMise += currentMise;
          playerMiseDisplay.textContent = totalMise;
          playerMoneyDisplay.textContent = currentMoney;
          btnStart.disabled = false;
        }
      }
    });
  });
});
// Bouton pour start game
btnStart.addEventListener("click", (e) => {
  if (totalMise === 0) return;
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
  if (!areBtnsAvailables || totalMise === 0) return;
  e.preventDefault();
  showModal(`You leave the game!\nYou lost $${totalMise / 2} of your money!`, loseColorModal, moneySound);
  addMoney(totalMise / 2);
});
// Bouton pour demander une carte (Hit)
btnHit.addEventListener("click", (e) => {
  if (!areBtnsAvailables || totalMise === 0) return;
  cardSound.play();
  e.preventDefault();
  handleHitCart(currentPlayer);
});

// Bouton pour doubler
btnDouble.addEventListener("click", (e) => {
  if (!areBtnsAvailables || totalMise === 0) return;
  e.preventDefault();
  checkUser((user) => {
    const userMoney = parseFloat(user.money);
    if (userMoney < totalMise) {
      console.log("Vous n'avez pas assez d'argent");
    } else {
      try {
        handleDouble();
      } catch (error) {
        console.log('Error removing money in double: ', error)
      }

    }
  });

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
// Boutons pour Split
// btns hit du split
const splitDeck = playerDeck.lastElementChild;
const btnSplitHitRight = document.getElementById('btn_split_hit_right');
const btnSplitHitLeft = document.getElementById('btn_split_hit_left');
const cartesRight = document.getElementById('cartes_split_right');
const cartesLeft = document.getElementById('cartes_split_left');
const scoreRightDisplay = document.getElementById('score_split_right');
const scoreLeftDisplay = document.getElementById('score_split_left');

btnSplit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!areBtnsAvailables) return;
  checkUser((user) => {
    const userMoney = parseFloat(user.money);
    if (userMoney < parseInt(totalMise)) {
      console.log("Pas d'argent");
      return;
    } else {
      handleSplit();
    }
  })
})
btnSplitHitRight.addEventListener('click', () => {
  handleHitCardOnSplit('right', cartesRight, scoreRightDisplay, handRight);
})
btnSplitHitLeft.addEventListener('click', () => {
  handleHitCardOnSplit('left', cartesLeft, scoreLeftDisplay, handLeft);
})

// <<<<<<< RÈGLES MISES EN PLACE >>>>>>
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

Double:
Possibilité de doubler avec 9, 10 ou 11 points au total avec les 2 premiers cartes ou 16, 17, 18 s'on a un AS
*/
