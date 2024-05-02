<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blackjack</title>
    <link rel="stylesheet" href="<?= URL . "public/css/table.css" ?>">

</head>
<body>
<header>
    <div class="logo">BlackJack</div>
    <div class="user">Marceau</div>
    </header>
    <div class="table">
        <div class="ia_card_section">
            <div class="ia_card">
                <div class="ia_card_1 cards_container "></div>
                <div class="ia_card_2 cards_container "></div>
            </div>
            <div class="ia_number"><p>8</p></div>
        </div>
        <div class="user_card_section">
          
            <div class="player_card">
                <div id="cardsPlayer1" class="player_card_1 cards_container">
                </div>
                <!-- <div id="cardsPlayer2" class="player_card_2 card"></div>
                <div id="cardsPlayer3" class="player_card_3 card"></div>
                <div id="cardsPlayer4" class="player_card_4 card "></div>
                <div id="cardsPlayer5" class="player_card_5 card "></div> -->
            </div>
            <div class="player_number">
                <p>21</p>
            </div>
        <div class="btn_section">
            <button id="act1" >Action1</button>
            <button id="act2" >action2</button>
            <button id="act3" >action3</button>
        </div>
        </div>

        <div class="player_ui">
            <div class="ui_money">Money : 1000</div>
            <div class="ui_wins">Wins = 10</div>
            <div class="ui_loses">Loses = 5</div>
        </div>
    </div>

<<<<<<< HEAD
<script src="<?= URL . "public/js/general.js" ?>"></script>
=======
    <script type="module" src="<?= URL . "public/js/general.js" ?>"></script>
    
>>>>>>> a4433d750b2aff67e0c5dbdcbed6c53979913cdb
</body>
</html>