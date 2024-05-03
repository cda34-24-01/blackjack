function getUserInfos(userId) {
    console.log(userId)
    $.ajax({
        type: "GET",
        url: "get_user_infos.php",
        data: {
            userId: userId,
        },
        dataType: "json",
        success: function (response) {
            if (!response.error) {
                console.log(response)
            } else {
                console.error("Erreur de récupération des données utilisateur");
            }
        },
        error: function (xhr, status, error) {
            console.log("Erreur AJAX : " + error);
            console.error(
                "Une erreur s'est produite lors de la récupération des données utilisateur"
            );
        },
    });
} 