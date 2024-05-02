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
</head>

<body class="">
<?php
    $rdm = rand(1, 2);
    if ($rdm == 1) { ?>
        <div class="backdrop" style="background-image: url('<?= URL . "public/images/blackjack1.png" ?>');"></div>
    <?php } elseif ($rdm == 2) { ?>
        <div class="backdrop" style="background-image: url('<?= URL . "public/images/blackjack2.png" ?>');"></div>
    <?php } ?>
    <div class="background"></div>
    <div class="center">
        <div class="row justify-content-center w-25 inscriptionDivParent">
            <div class="inscriptionDiv bgVertClair rounded p-3 border">
                <div class="d-flex justify-content-center">
                    <div class="d-flex">
                        <h1 class="jaune mb-2">BlackJack</h1>
                    </div>

                </div>
                <h4 class="blanc mb-1 fs-5">Inscription</h4>
                <p class="error yellow">* champs obligatoires</p>
                <form action="inscription_validation" method="POST" class="mb-2" id="inscriptionForm">
                    <div class="d-flex flex-column flex-md-row divInsc">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="blanc fw-bold">Pseudo* :<?php if (!empty($error) && $error == "2") { ?>
                                    <small class="rouge">incorrect</small>
                                <?php } ?></label>
                                <input type="text" name="pseudo" placeholder="Pseudonyme" class="form-control">
                            </div>

                            <div class="form-group mt-2">
                                <label class="blanc fw-bold">E-mail* :<?php if (!empty($error) && $error == "1") { ?>
                                    <small class="rouge">incorrect</small>
                                <?php } ?></label>
                                <input type="email" name="email" placeholder="Adresse_e-mail" class="form-control">
                            </div>
                            <div class="form-group mt-2">
                                <label class="blanc fw-bold">Mot_de_passe* :<?php if (!empty($error) && $error == "5") { ?>
                                    <small class="rouge">incorrect</small>
                                <?php } ?></label>
                                <input type="password" name="password" placeholder="********" class="form-control" id="mdpInput">

                            </div>
                            <div class="form-group mt-2">
                                <label class="blanc fw-bold">Confirmation* :</label>
                                <input type="password" name="password_confirm" placeholder="********" class="form-control">
                            </div>
                            <div class="infosMdp">
                                <ul class="mt-1 blanc">
                                    <li class="mdpLenght">8 caracteres minimum</li>
                                    <li class="mdpUpper">1 majuscule</li>
                                    <li class="mdpSpecial">1 caractere special</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn btnDarkCyan w-100">Valider</button>
                    </div>
                </form>
                <span class="blanc">Déjà inscrit ? <a href="<?= URL . "connexion" ?>" class="yellow">Se connecter</a></span>
            </div>
        </div>
    </div>
    <script src="<?= URL . "public/js/inscription.js" ?>"></script>
</body>

</html>