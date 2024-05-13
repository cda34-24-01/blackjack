<?php
/* session_start();
if ($_SESSION['id'] || $_COOKIE['id']) {
    if (isset($_SESSION['previous_url'])) {
        $previous_url = $_SESSION['previous_url'];
        unset($_SESSION['previous_url']); // Supprimer l'URL enregistrée
        header('Location: ' . $previous_url);
    } else {
        header("Location: " . URL . "/");
    }
}

$_SESSION['previous_url'] = $_SERVER['REQUEST_URI']; */
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack - inscription</title>
    <meta name="description" content="Blackjack">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">

    <link href="<?= URL . "public/css/general.css" ?>" rel="stylesheet" type="text/css">
    <link href="<?= URL . "public/css/inscription.css" ?>" rel="stylesheet" type="text/css">

    <link rel="icon" type="image/svg+xml" href="<?= URL . "public/images/cineramaimg.svg" ?>">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

</head>

<body>



    <div class="form_section">

        <div class="header_text">
            <h1>Inscription</h1>
            <p>crée un compte pour pouvoir jouer au blackjack</p>
        </div>
        <form>
            <div>
                <div class="label_div">
                    <label for="username">Nom d'utilisateur </label>
                    <p>*</p>
                </div>
                <input type="text" name="username" id="username" placeholder="Entre un nom d'utilisateur">
            </div>

            <div>
                <div class="label_div">
                    <label for="email">E-mail </label>
                    <p>*</p>

                </div>

                <input type="email" name="email" id="email" placeholder="Entre une adresse email">
            </div>


            <div>
                <div class="label_div">
                    <label for="password">Mot de passe</label>
                    <p>*</p>

                </div>

                <input type="password" name="password" id="password" placeholder="Entre un mot de passe">
            </div>

            <div>
                <div class="label_div">
                    <label for="password">Confirmez mot de passe </label>
                    <p>*</p>

                </div>
                <div>

                    <input type="password" name="password" id="password" placeholder="Confirmer le mot de passe">
                </div>



                <input class="submit_btn" type="submit" value="S'enregistrer">
            </div>

            <div>
                <p>Vous avez un compte ?</p>
                <a href="connexion">Se connecter</a>
            </div>


        </form>


    </div>

    <div class="form_bg">

    </div>

    <script src="<?= URL . "public/js/general.js" ?>"></script>
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