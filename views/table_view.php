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

</head>

<body>
    <header>
        <div class="logo">BlackJack</div>
        <div class="user"><?= $user['pseudo'] ?></div>
    </header>
    <div class="table">
        <div class="ia_card_section">
            <div class="ia_card">
                <!-- <div class="ia_card_1 cards_container "></div> -->
                <!-- <div class="ia_card_2 cards_container "></div> -->
            </div>
            <div class="ia_number">
                <p>8</p>
            </div>
        </div>

        <!-- On pourrais mettre plusieurs players avec js si on veut -->
        <div class="user_card_section">
            <div class="player_desk">
                <div id="cardsPlayer1" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="player_number">
                <p id="player_score"></p>
            </div>
            <div class="btn_section">
<<<<<<< HEAD
                <button id="act2" >action2</button>
                <button id="hit" >Hit</button>
                <button id="act3" >action3</button>
            </div>
        </div>
        <div class="player_ui">
            <p >Money 💵: <span class="ui_money" ></span></p>
            <p class="ui_wins">Wins = 10</p>
            <p class="ui_loses">Loses = 5</p>
        </div>
        <!-- message modal (win ou lose) -->
        <div class="hidden message_modal">
            <p>  <!-- Message rendu depuis general.js -->  </p> 
            <button id="btn_continue_game">Continuer</button>
            <button id="btn_exit_game">Sortir</button>
        </div>
    </div>
    <script type="module" src="<?= URL . "public/js/general.js" ?> "></script>
</body>

</html>