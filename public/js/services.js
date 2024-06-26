import { id_user } from "./general.js";

// Cette fonction return le user pour l'implementer apres dans différentes fonctions callback
export function checkUser(callback) {
  $.ajax({
    type: "GET",
    url: "get_user_infos.php",
    data: {
      userId: id_user,
    },
    dataType: "json",
    success: function (response) {
      if (!response.error) {
        callback(response);
      } else {
        console.log("Erreur de récupération des données utilisateur");
      }
    },
    error: function (xhr, status, error) {
      reject("Erreur AJAX : " + error);
    },
  });
}

export function addWin() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("add win ok");
      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", "/addWin", true);
  xhttp.send();
}

export function addLose() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("add lose ok");
      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", "/addLose", true);
  xhttp.send();
}

export function addMoney(money) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(`add money ok : ${money}`);
      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", "/addMoney/" + money, true);
  xhttp.send();
}

export function removeMoney(money) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(`Remove money ok : ${money}`);

      } else {
        console.error("Erreur");
      }
    }
  };
  xhttp.open("GET", "/removeMoney/" + money, true);
  xhttp.send();
}

export function toggleSound() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("Sound Toggle");
      }
    }
  };
  xhttp.open("GET", "/toggleSound", true);
  xhttp.send();
}