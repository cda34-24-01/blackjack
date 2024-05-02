<?php
require_once "models/manager/GlobalManager.php";
require_once "models/manager/UserManager.php";

class GlobalController
{
    private $globalManager;
    private $userManager;

    public function __construct()
    {
        $this->userManager = new UserManager;
        $this->globalManager = new GlobalManager;
    }

    public function displayHomePage()
    {
        require "views/accueil_view.php";
    }

    public function displayTable() 
    {
        require "views/table_view.php";
    }

    public function displayAccount()
    {
        require "views/account_view.php";
    }

    public function displayInscription()
    {
        require "views/inscription_view.php";
    }

    public function displayConnexion()
    {
        require "views/connexion_view.php";
    }

    public function displayCompte()
    {
        $this->userManager->getUserById($_SESSION['id']);
        require "views/compte_view.php";
    }
    

}
