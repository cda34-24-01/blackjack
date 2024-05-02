<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="<?= URL . "public/css/general.css" ?>">
    <link rel="stylesheet" href="<?= URL . "public/css/connexion.css" ?>">
</head>

<body>
<?php
    $rdm = rand(1, 2);
    if ($rdm == 1) { ?>
        <div class="backdrop" style="background-image: url('<?= URL . "public/images/blackjack1.png" ?>');"></div>
    <?php } elseif ($rdm == 2) { ?>
        <div class="backdrop" style="background-image: url('<?= URL . "public/images/blackjack2.png" ?>');"></div>
    <?php } ?>

    <div class="login_form">
        <h1>Connecter vous a votre compte</h1>
        <form action="connexion_validation" method="POST" class="d-flex flex-column flex-md-row" id="connexionForm">
            <div class="col-md-12">
                <div class="form-group mb-2 mt-2">
                    <label class="blanc fw-bold">Identifiants :</label>
                    <input type="text" name="identifier" placeholder="E-mail / pseudo" class="form-control">
                </div>
                <div class="form-group">
                    <label class="blanc fw-bold">Mot de passe :</label>
                    <input type="password" name="password" placeholder="******" class="form-control">
                </div>
                <div class="button-group mt-4 mb-3">
                    <button class="btn bgRouge family w-100" type="submit">Connexion</button>
                </div>
                <div class="mb-3">
                    <span class="blanc">Pas de compte ? <a href="<?= URL . "inscription" ?>" class="yellow">S'inscrire ici</a></span>
                </div>
            </div>
        </form>
    </div>

</body>

</html>