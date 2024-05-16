<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="<?= URL . "public/css/general.css" ?>">
    <link rel="stylesheet" href="<?= URL . "public/css/connexion.css" ?>">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

</head>

<body>



    <div class="form_section">

        <div class="header_text">
            <h1>Connexion</h1>
        </div>
        <form action="connexion_validation" method="POST">
            <div>
                <div class="label_div">
                    <label for="username">Nom d'utilisateur </label>
                    <p>*</p>
                </div>
                <input type="text" name="identifier" id="identifier" placeholder="Entre un nom d'utilisateur">
            </div>

            <div>
                <div class="label_div">
                    <label for="password">Mot de passe </label>
                    <p>*</p>
                </div>

                <input type="password" name="password" id="password" placeholder="Entre un mot de passe">
            </div>

            <div>
                <input class="submit_btn" type="submit" value="Se connecter">
            </div>

            <div>
                <p>Vous n'avez pas de compte ?</p>
                <a href="inscription">Crée un compte</a>
            </div>
        </form>


    </div>

    <div class="form_bg">

    </div>

        <!-- <?php
            // function displayAlert($alertClass, $alertMessage)
            // {
            //     echo "<style>";
            //     echo ".alert { top: 10%; left: 50%; transform: translateX(-50%); z-index: 999; width: fit-content; opacity: 1; transition: opacity 0.5s ease-in-out; }";
            //     echo "@media (max-width: 767px) { .alert { width: 80%; text-align: center; } }";
            //     echo "</style>";
            //     echo "<div class='alert $alertClass' role='alert'>$alertMessage</div>";
            //     echo "<script>setTimeout(function(){ 
            //         var alert = document.querySelector('.alert');
            //         alert.style.opacity = '0';
            //         setTimeout(function() {
            //             alert.style.display = 'none';
            //         }, 500);
            //     }, 8000);
            // </script>";
            // }

            // if ($_SESSION["success"]) {
            //     displayAlert("alert-success", $_SESSION["success"]);
            //     unset($_SESSION["success"]);
            // }

            // if ($_SESSION["error"]) {
            //     displayAlert("alert-danger", $_SESSION["error"]);
            //     unset($_SESSION["error"]);
            // }
            // 
            ?> -->
</body>

</html>