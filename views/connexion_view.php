<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="<?= URL . "public/css/general.css" ?>">
    <link rel="stylesheet" href="<?= URL . "public/css/connexion.css" ?>">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

</head>

<body>



    <div class="form_section">

        <div class="header_text">
            <h1>Connexion</h1>
        </div>
        <form>
            <div>
                <div class="label_div">
                    <label for="username">Nom d'utilisateur </label>
                    <p>*</p>
                </div>
                <input type="text" name="pseudo" id="pseudo" placeholder="Entre un nom d'utilisateur">
            </div>




            <div>
                <div class="label_div">
                    <label for="password">Mot de passe </label>
                    <p>*</p>
                </div>

                <input type="password" name="password" id="password" placeholder="Entre un mot de passe">
            </div>


            <div>
                <input class="submit_btn" type="submit" value="Se connecter">
            </div>

            <div>
                <p>Vous n'avez pas de compte ?</p>
                <a href="inscription">Crée un compte</a>
            </div>


        </form>


    </div>

    <div class="form_bg">

    </div>

</body>

</html>