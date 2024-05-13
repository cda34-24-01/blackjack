const user = document.querySelector(".user");
const table = document.querySelector(".table");
const iaCardSection = document.querySelector(".ia_card_section");
const iaCard = document.querySelector(".ia_card");
const iaCard1 = document.querySelector(".ia_card_1");
const iaCard2 = document.querySelector(".ia_card_2");
const iaNumber = document.querySelector(".ia_number");
// player
const userCardSection = document.querySelector(".user_card_section");

const playerCard = document.querySelector(".player_card");
const playerCard1 = document.querySelector(".player_card_1");
const playerCard2 = document.querySelector(".player_card_2");
const playerCard3 = document.querySelector(".player_card_3");
const playerCard4 = document.querySelector(".player_card_4");
const playerCard5 = document.querySelector(".player_card_5");
const playerNumber = document.querySelector(".player_number");

// ui player
const playerUi = document.querySelector(".player_ui");
const uiMoney = document.querySelector(".ui_money");
const uiWins = document.querySelector(".ui_wins");
const uiLoses = document.querySelector(".ui_loses");

let url = document.getElementById("url").value;
let $moneyValues = [1, 5, 25, 50, 100, 500, 1000];

let btnMoney = document.querySelectorAll(".btnMoney");
btnMoney.forEach((element) => {
  element.addEventListener("click", function (event) {
    let money = element.dataset.value;

    if (!$moneyValues.includes(parseInt(money))) {
      console.log("Erreur");
      exit(); // Cette ligne ne fonctionnera pas en JavaScript, voir la note ci-dessous
    } else {
      event.preventDefault();
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
      /* window.location.href = url + "removeMoney/" + money; */
      xhttp.open("GET", url + "removeMoney/" + money, true);
      /* xhttp.open("GET", `${url}removeMoney/${money}&_=${new Date().getTime()}`, true); */
      xhttp.send();
      btnMoney.forEach((element) => {
        element.disabled = true;
        setTimeout(() => {
          element.disabled = false;
        }, 2000);
      });
    }
  });
});

// audio  version teste

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
