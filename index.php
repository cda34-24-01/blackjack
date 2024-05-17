<?php

/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */


require_once "controllers/UserController.php";
require_once "controllers/GlobalController.php";


define("URL", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]"));

$userController = new UserController;
$globalController = new GlobalController;


try {

    if (isset($_GET['page'])) {
        $url = explode("/", filter_var($_GET['page']), FILTER_SANITIZE_URL);
    }

    // si GET page est vide on redirige vers l'accueil
    if (empty($url[0])) {
        $globalController->displayHomePage();
    } else {
        //switch de GET page pour savoir vers quelle page renvoyer l'utilisateur

        switch ($url[0]) {
            
            case 'accueil':
                $globalController->displayHomePage();
                break;

            case 'table':
                $globalController->displayTable();
                break;

            case 'account':
                $globalController->displayAccount();
                break;

            case 'inscription':
                $globalController->displayInscription();
                break;

            case 'inscription_validation':
                $userController->inscription_validation();
                break;
            
            case 'connexion':
                $globalController->displayConnexion();
                break;

            case "connexion_validation":
                $userController->connexion_validation();
                break;

            case "compte":
                $globalController->displayCompte();
                break;


            case "deconnexion":
                $userController->deconnexionUser();
                break;

            case "addMoney":
                $userController->addMoney($url[1]);
                break;

            case "removeMoney":
                $userController->removeMoney($url[1]);
                break;

            case "toggleSound":
                $userController->toggleSound();
                break;

            case "aide":
                require "views/aide_view.php";
                break;
            
 

            default:
                $globalController->displayHomePage();
                exit();
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
