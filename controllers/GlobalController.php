<?php
require_once "models/managers/GlobalManager.php";
require_once "models/managers/UserManager.php";

class GlobalController
{
    private $globalManager;
    private $userManager;

    public function __construct()
    {
        $this->userManager = new UserManager;
        $this->globalManager = new GlobalManager;
    }
}
