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

        <div class="user_card_section">
            <div class="player_desk">
                <div id="cardsPlayer1" class="cards_container">
                    <!-- Cards rendues avec le script general.js -->
                </div>
            </div>
            <div class="player_number">
                <p></p>
            </div>
            <div class="btn_section">
                <button id="act1">Action1</button>
                <button id="act2">action2</button>
                <button id="act3">action3</button>
            </div>
        </div>

            <button class="btn" onclick="<?= $this->userManager->removeMoney($user['id_utilisateur'], 1) ?>">
                +1
            </button>
            <button class="btn">
                +5
            </button>
            <button class="btn">
                +25
            </button>
            <button class="btn">
                +50
            </button>
            <button class="btn">
                +100
            </button>
            <button class="btn">
                +500
            </button>
            <button class="btn">
                +1000
            </button>
        <div class="player_ui">
            <div class="ui_money">Argent : <?= $user['money'] ?></div>
            <div class="ui_wins">Victoires : <?= $user['wins'] ?></div>
            <div class="ui_loses">Défaites : <?= $user['loses'] ?></div>
        </div>
    </div>
    <script type="module" src="<?= URL . "public/js/general.js" ?> "></script>
</body>

</html>