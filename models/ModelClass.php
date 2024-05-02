<?php
abstract class Model
{
    private $pdo;

    private function setDB()
    {
        $this->pdo = new PDO("mysql:host=localhost;dbname=blackjack;port=3306;charset=utf8", 'maganor', 'azerty');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    protected function getDB()
    {
        if ($this->pdo == null) {
            $this->setDb();
        }
        return $this->pdo;
    }
}

