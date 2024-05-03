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
    <title>BlackJack - Compte</title>
    <meta name="description" content="Test BlackJack">

    <link href="<?= URL . "public/css/general.css" ?>" rel="stylesheet" type="text/css">

    <link rel="icon" type="image/svg+xml" href="<?= URL . "public/images/cineramaimg.svg" ?>">
</head>

<body class="">
    <header>
        <?php
        /* include("navbar.php"); */
        ?>
    </header>
    <main>
        <div class="compte">
            <p class="noir"><?= $user['pseudo'] ?></p>
        </div>
        <?php var_dump($user); ?>
        <?php die; ?>
    </main>

    <footer>
        <?php
        //include("footer.php");
        ?>
    </footer>

    <script src="<?= URL . "public/js/general.js" ?>"></script>
</body>

</html>