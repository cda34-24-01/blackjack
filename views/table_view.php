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

</head>

<body>
    <header>
        <div class="logo">BlackJack</div>
        <div class="user"><?= $user['pseudo'] ?></div>
    </header>
    <input id="user_id" type="hidden" value=<?= $_SESSION['id'] ?>>
    <div class="table">
        <!-- croupier section -->
        <section class="cards_section">
            <div class="player_desk">
                <img class="cartes_back" src="../public/images/cartes/card_back.png"/>
                <div id="cardsCroupier" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="score_container">
                <p id="croupier_score">0</p>
            </div>
        </section>
        <!-- player section -->
        <section class="cards_section">
            <div class="player_desk">
                <div id="cardsPlayer1" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="score_container">
                <p id="player_score">0</p>
            </div>
            <div class="btn_section">
                <button id="act2" >action2</button>
                <button id="hit" >Hit</button>
                <button id="act3" >action3</button>
            </div>
        </section>
        <!-- bouttons section -->
        <section>
            <button class="btn btnMoney" data-value="<?= password_hash("1", PASSWORD_BCRYPT, array('cost' => 12)) ?>">
                +1
            </button>
            <button class="btn btnMoney" data-value="<?= password_hash("5", PASSWORD_BCRYPT, array('cost' => 12)) ?>">
                +5
            </button>
            <button class="btn btnMoney">
                +25
            </button>
            <button class="btn btnMoney">
                +50
            </button>
            <button class="btn btnMoney">
                +100
            </button>
            <button class="btn btnMoney">
                +500
            </button>
            <button class="btn btnMoney">
                +1000
            </button>
            <div class="player_ui">
                <p class="ui_money" >Money 💵: <?= $user['money'] ?></p>
                <p class="ui_wins">Wins : <?= $user['wins'] ?></p>
                <p class="ui_loses">Loses : <?= $user['loses'] ?></p>
            </div>
        </section>

        <!-- message modal (win ou lose) -->
        <div class="hidden message_modal">
            <p>  <!-- Message rendu depuis general.js -->  </p> 
            <button id="btn_continue_game">Continuer</button>
            <button id="btn_exit_game">Sortir</button>
        </div>
    </div>
    <input type="hidden" id="url" value="<?= URL ?>">
    <script type="module" src="<?= URL . "public/js/general.js" ?> "></script>
    <script type="module" src="<?= URL . "public/js/table.js" ?> "></script>
</body>

</html>
