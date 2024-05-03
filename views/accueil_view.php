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
<link href="https://fonts.googleapis.com/css2?family=Sedan+SC&display=swap" rel="stylesheet">

    <link rel="icon" type="image/svg+xml" href="<?= URL . "public/images/cineramaimg.svg" ?>">
</head>

<body class="">
    <header>
        <?php
        /* include("navbar.php"); */
        ?>
    </header>

    <main>
        
    <div class="title">
<h1>Black Jack</h1>

</div>
<div class="button_main">
<?php if (isset($_SESSION['id'])) { ?>
            <div >
                <button id="play_btn" class="log_btn">PLAY<a href="table" ></a></button>
            </div>
        <?php } else { ?>
            <div >
                <button class="log_btn">CONNEXION<a href="connexion" ></a></button>
            </div>
            <div class="">
                <button class="log_btn">INSCRIPTION<a href="inscription" ></a></button>
            </div>
        <?php } ?>
        <?php if (isset($_SESSION['id'])) { ?>
            <div class="">
                <button class="log_btn">DECONNEXION<a href="deconnexion" ></a></button>
            </div>
        <?php } ?>
</div>

   


    </main>

    <footer>
        <?php
        //include("footer.php");
        ?>
    </footer>

    <script src="<?= URL . "public/js/general.js" ?>"></script>
</body>

</html>