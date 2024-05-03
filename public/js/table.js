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

let btnMoney = document.querySelectorAll(".btnMoney");
btnMoney.forEach(element => {
    element.addEventListener("click", function (event) {
        let money = element.dataset.value;
        /* event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_money.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                // Gérer la réponse comme nécessaire
                            } else {
                                // Gérer les erreurs si nécessaire
                            }
                        }
                    };
                    xhttp.open("GET", url + "removeMoney/" + money, true);
                    xhttp.send();
                } else {
                    // Gérer les erreurs si nécessaire
                }
            }
        };
        xhr.send(); */
        console.log(money)
        event.preventDefault();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    //console.log("ok");   
                } else {
                    //console.error("Erreur");
                }
            }
        };
        window.location.href = url + "removeMoney/" + money;
        /* xhttp.open("GET", url + "removeMoney/" + money, true);
        xhttp.send(); */

    });
});


