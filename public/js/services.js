import { id_user } from "./general.js";

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
          callback(response); // Pass the user data to the callback
        } else {
          console.log("Erreur de récupération des données utilisateur");
        }
      },
      error: function (xhr, status, error) {
        reject("Erreur AJAX : " + error);
      },
    });
  }
  