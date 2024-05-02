<?php
session_start();
$_SESSION['previous_url'] = $_SERVER['REQUEST_URI'];
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

    <link rel="icon" type="image/svg+xml" href="<?= URL . "public/images/cineramaimg.svg" ?>">
</head>

<body class="">
    <header>
        <?php
        /* include("navbar.php"); */
        ?>
    </header>
    <main>
        <div>
            <h1>BlackJack</h1>
            <p>Le BlackJack est un jeu de cartes très populaire dans les casinos. Le but du jeu est de battre le croupier en obtenant un total de points supérieur à celui-ci sans dépasser 21. Le jeu se joue avec un ou plusieurs jeux de 52 cartes. Chaque carte a une valeur qui lui est propre. Les cartes numérotées de 2 à 10 valent leur valeur faciale. Les figures (valet, dame et roi) valent 10 points. L'as vaut 1 ou 11 points, au choix du joueur. Le croupier distribue deux cartes à chaque joueur et une à lui-même. Les joueurs peuvent alors demander des cartes supplémentaires (« tirer une carte ») pour se rapprocher de 21. Si le total des points des cartes d'un joueur dépasse 21, il perd la partie. Le croupier doit tirer des cartes supplémentaires jusqu'à ce qu'il atteigne un total de 17 ou plus. Si le croupier dépasse 21, tous les joueurs encore en jeu gagnent. Si le croupier ne dépasse pas 21, les joueurs ayant un total de points supérieur au sien gagnent. Si le croupier et un joueur ont le même total de points, il y a égalité.</p>
        </div>
        <div>
            <h2>Comment jouer ?</h2>
            <p>Le joueur doit choisir la mise qu'il souhaite placer en cliquant sur les jetons. Il peut ensuite cliquer sur le bouton "Distribuer" pour recevoir ses deux premières cartes. Le joueur peut alors choisir de "Rester" ou de "Tirer une carte". S'il choisit de tirer une carte, il peut continuer à en tirer jusqu'à ce qu'il décide de rester ou qu'il dépasse 21. Le croupier tire ensuite des cartes jusqu'à ce qu'il atteigne un total de 17 ou plus. Le joueur gagne si son total de points est supérieur à celui du croupier sans dépasser 21. Le joueur peut également gagner en obtenant un Blackjack
            </p>
        </div>
        <div>
            <h2>Les règles du Blackjack</h2>
            <p>Le Blackjack est un jeu de cartes très populaire dans les casinos. Le but du jeu est de battre le croupier en obtenant un total de points supérieur à celui-ci sans dépasser 21. Le jeu se joue avec un ou plusieurs jeux de 52 cartes. Chaque carte a une valeur qui lui est propre. Les cartes numérotées de 2 à 10 valent leur valeur faciale. Les figures (valet, dame et roi) valent 10 points. L'as vaut 1 ou 11 points, au choix du joueur. Le croupier distribue deux cartes à chaque joueur et une à lui-même. Les joueurs peuvent alors demander des cartes supplémentaires (« tirer une carte ») pour se rapprocher de 21. Si le total des points des cartes d'un joueur dépasse 21, il perd la partie. Le croupier doit tirer des cartes supplémentaires jusqu'à ce qu'il atteigne un total de 17 ou plus. Si le croupier dépasse 21, tous les joueurs encore en jeu gagnent. Si le croupier ne dépasse pas 21, les joueurs ayant un total de points supérieur au sien gagnent. Si le croupier et un joueur ont le même total de points, il y a égalité.</p>
        </div>
        <div>
            <h2>Les combinaisons gagnantes</h2>
            <p>Le joueur gagne s'il obtient un total de points supérieur à celui du croupier sans dépasser 21. Le joueur peut également gagner en obtenant un Blackjack, c'est-à-dire un total de 21 points avec ses deux premières cartes. Le Blackjack est composé d'un as et d'une carte valant 10 points. Le joueur gagne alors 1,5 fois sa mise. Si le croupier obtient un Blackjack, tous les joueurs ayant un total de points inférieur à 21 perdent leur mise. Si le joueur et le croupier ont tous les deux un Blackjack, il y a égalité et le joueur récupère sa mise.</p>
        </div>
        <div>
            <h2>Les combinaisons perdantes</h2>
            <p>Le joueur perd s'il dépasse 21 points. Il perd également s'il obtient un total de points inférieur à celui du croupier sans dépasser 21. Si le croupier obtient un total de points supérieur à 21, tous les joueurs encore en jeu gagnent. Si le joueur et le croupier ont le même total de points, il y a égalité et le joueur récupère sa mise.</p>
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