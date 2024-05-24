<?php
require_once "models/manager/UserManager.php";

if (!isset($_SESSION['id'])) {
    header('Location: connexion');
    exit;
}


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
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

</head>

<body>
    <audio id="cardHit" src="/public/Audio/cardPlace3.ogg"></audio>
    <audio id="moneyPick" src="/public/Audio/chipsHandle5.ogg"></audio>
    <audio id="playerWinSound" src="/public/Audio/player-wins.ogg"></audio>

    <input id="user_id" type="hidden" value=<?= $_SESSION['id'] ?>>
    <div class="container">
        <header>
            <div>
                <p>Money 💵: <span class="ui_money" ><?= $user['money'] ?></span></p>
                <p>Mise : <span class="ui_mise"></span></p>
            </div>
            <div class="player_ui">
                <p class="ui_wins">Wins : <?= $user['wins'] ?></p>
                <p class="ui_loses">Loses : <?= $user['loses'] ?></p>
            </div>
            <div class="logo">BlackJack</div>
            <nav>
                <a href="aide" target="_blank"><img src="public/images/icons/help.svg" /></a>
                <a id="audioMute"><img id="volume_btn" src="public/images/icons/volume.svg" /></a>
                <a href="connexion"><img src="public/images/icons/logout.svg" /></a>
            </nav>
        </header>
        <div class="table">

            <!-- croupier section -->

            <div class="cpu_desk">
                <div>
                    <div class="score_container">
                        <p id="croupier_score">0</p>
                    </div>
                </div>
                <div id="cardsCroupier" class="cards_container">
                    <img class="cartes_back" src="../public/images/cartes/card_back.png" />
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>

            <!-- player section -->

            <div id="player_desk" class="player_desk">
                <!-- desk hors split -->
                <div class="cards_container ">
                    <div id="cardsPlayer1">
                        <!-- Cards rendues avec le script general.js -->
                    </div>
                    <div class="score_container">
                        <p id="player_score">0</p>
                    </div>
                </div>
                <!-- desk avec split -->
                <div id="cardsPlayer1Split" class="cards_container hidden split">

                    <div class="leftHand">
                        <div id="cartes_split_left" class="cartesSplit">
                            <!-- Cards rendues avec le script general.js -->
                        </div>
                        <div class="score_container">
                            <p id="score_split_left">0</p>
                        </div>
                        <div class="action_btn">
                            <button id="btn_split_hit_left" class="btnsSplit">Hit</button>
                        </div>
                    </div>
                    <div class="rightHand">
                        <div id="cartes_split_right" class="cartesSplit">
                            <!-- Cards rendues avec le script general.js -->
                        </div>
                        <div class="score_container">
                            <p id="score_split_right">0</p>
                        </div>
                        <div class="action_btn">
                            <button id="btn_split_hit_right" class="btnsSplit">Hit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="money_btn">
                <button class="btnMoney" data-value="1">
                    <p class="position-absolute z-index-top noir valueCoin">1</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="5">
                    <p class="position-absolute z-index-top noir valueCoin">5</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="25">
                    <p class="position-absolute z-index-top noir valueCoin">25</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="50">
                    <p class="position-absolute z-index-top noir valueCoin">50</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="100">
                    <p class="position-absolute z-index-top noir valueCoin">100</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="500">
                    <p class="position-absolute z-index-top noir valueCoin">500</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
                <button class="btnMoney" data-value="1000">
                    <p class="position-absolute z-index-top noir valueCoin">1000</p>
                    <img src="public/images/Chips/chipBlueWhite.png" alt="chips coins" />
                </button>
            </div>
            <div class="action_btn">
                <button id="leave">Leave</button>
                <button id="hit">Hit</button>
                <button id="stay">Stay</button>
                <button id="start">Start</button>
                <button id="double">Double</button>
                <button id="split">Split</button>
            </div>

        </div>
        <!-- message modal (win ou lose) -->
        <div class="hidden message_modal">
            <p> <!-- Message rendu depuis general.js --> </p>
            <div class="div">
                <button id="btn_continue_game">Continuer</button>
            </div>
        </div>
    </div>

    <input type="hidden" id="user" value="<?= $user['id_utilisateur'] ?>">
    <input type="hidden" id="url" value="<?= URL ?>">
    <script type="module" src="<?= URL . "public/js/general.js" ?> "></script>
</body>

</html>