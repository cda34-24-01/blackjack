<?php
require_once "models/managers/UserManager.php";

class UserController
{
    private $userManager;

    public function __construct()
    {
        $this->userManager = new UserManager;
    }

    /* public function addWin($id) {
        $this->userManager->addWin($id);

    } */
}