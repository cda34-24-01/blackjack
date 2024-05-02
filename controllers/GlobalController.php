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
        require "views/accueil.php";
    }
}
