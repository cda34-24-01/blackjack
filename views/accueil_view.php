<?php
/* session_start();
$_SESSION['previous_url'] = $_SERVER['REQUEST_URI']; */
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlackJack - Acceuil</title>
    <meta name="description" content="Test BlackJack">

    <link href="<?= URL . "public/css/general.css" ?>" rel="stylesheet" type="text/css">
    <link href="<?= URL . "public/css/accueil.css" ?>" rel="stylesheet" type="text/css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

    <link rel="icon" type="image/svg+xml" href="<?= URL . "public/images/cineramaimg.svg" ?>">
</head>

<body>





    <div class="form_section">
        <div class="home_div">
            <a href="accueil">Accueil</a>
        </div>
        <div class="header_text">
            <h1>Bienvenue au jeu de Blackjack!</h1>
        </div>
        <div class="text-center">
            <p>


                Que vous soyez un joueur débutant ou un expert en blackjack, vous êtes au bon endroit pour vous amuser et défier vos compétences de jeu.
            </p>
        </div>


    </div>

    <div class="form_bg">
        <div class="nav_div">
            <a href="connexion">Connexion </a>
            <a href="inscription">Inscription</a>
        </div>
    </div>



    <script src="<?= URL . "public/js/general.js" ?>"></script>
</body>

</html>