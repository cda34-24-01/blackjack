<?php

/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */


require_once "controllers/UserController.php";

session_start();

define("URL", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]"));

$userController = new UserController;


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
            case 'home':
                $globalController->displayHomePage();
                break;
            


            default:
                $globalController->displayHomePage();
                exit();
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
