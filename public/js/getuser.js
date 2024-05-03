export function getUserInfos(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "get_user_infos.php",
            data: {
                userId: userId,
            },
            dataType: "json",
            success: function (response) {
                if (!response.error) {
                    resolve(response);
                } else {
                    reject("Erreur de récupération des données utilisateur");
                }
            },
            error: function (xhr, status, error) {
                reject("Erreur AJAX : " + error);
            },
        });
    });
}