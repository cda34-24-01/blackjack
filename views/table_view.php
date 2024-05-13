<?php 
require_once "models/manager/UserManager.php";
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blackjack</title>
    <link rel="stylesheet" href="<?= URL . "public/css/general.css" ?>">
    <link rel="stylesheet" href="<?= URL . "public/css/table.css" ?>">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

</head>

<body>
    <audio id="cardHit" src="/public/Audio/cardPlace3.ogg"></audio>
    <audio id=moneyPick src="/public/Audio/chipsHandle5.ogg"></audio>
    <audio id=playerWinSound src="/public/Audio/player-wins.ogg"></audio>

<input id="user_id" type="hidden" value=<?= $_SESSION['id'] ?>>
<div class="container">
    <header>
    <div >
    <p class="ui_money" >Money 💵: <?= $user['money'] ?></p>

    </div>
        <div class="logo">BlackJack</div>
        <nav>
          <a href="compte"><img src="public/images/icons/person.svg" /></a>
          <a href="aide"><img src="public/images/icons/help.svg" /></a>
          <a id="audioMute" ><img src="public/images/icons/volume.svg" /></a>
          <a href="connexion"><img src="public/images/icons/logout.svg" /></a>
        </nav>
    </header>
    <div class="table">
        <!-- croupier section -->
            <div class="cpu_desk">
                <img class="cartes_back" src="../public/images/cartes/card_back.png"/>
                <div id="cardsCroupier" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="score_container">
                <p id="croupier_score">0</p>
            </div>
        <!-- player section -->
            <div class="player_desk">
                <div id="cardsPlayer1" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
                <div id="cardsPlayer1Split" class="cards_container split">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="score_container">
                <p id="player_score">0</p>
            </div>
            <div class="money_btn">
            <button class="btn btnMoney" data-value="1">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            </button>
            <button class="btn btnMoney" data-value="5">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            </button>
            <button class="btn btnMoney" data-value="25">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            </button>
            <button class="btn btnMoney" data-value="50">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            <button class="btn btnMoney" data-value="100">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            <button class="btn btnMoney" data-value="500">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            <button class="btn btnMoney" data-value="1000">
            <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
            </div>
                <div class="action_btn">
                <button id="leave" >Leave</button>
                <button id="hit" >Hit</button>
                <button id="stay" >Stay</button>
                <button id="split" class="hidden" >Split</button>
                </div>
                <div class="player_ui">
                <p class="ui_wins">Wins : <?= $user['wins'] ?></p>
                <p class="ui_loses">Loses : <?= $user['loses'] ?></p>
            </div>
            </div>
        </div>
        <!-- bouttons section -->

       
            

        <!-- message modal (win ou lose) -->
        <div class="hidden message_modal">
            <p>  <!-- Message rendu depuis general.js -->  </p> 
            <div class="div">
                <button id="btn_continue_game">Continuer</button>
                <button id="btn_exit_game">Sortir</button>
            </div>
        </div>
    </div>
    <input type="hidden" id="url" value="<?= URL ?>">
    <script type="module" src="<?= URL . "public/js/general.js" ?> "></script>
    <script type="module" src="<?= URL . "public/js/table.js" ?> "></script>
</body>

</html>

element a utiliser plus tard

<div class="user"><?= $user['pseudo'] ?></div>
