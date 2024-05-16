<?php
abstract class Model
{
    private $pdo;

    private function setDB()
    {
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=blackjack;port=3306;charset=utf8", 'admin', 'admin');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        } catch (PDOException $e) {
            // Handle connection failure gracefully
            throw new Exception("Failed to connect to database: " . $e->getMessage());
        }
    }

    protected function getDB()
    {
        if ($this->pdo == null) {
            $this->setDb();
        }
        return $this->pdo;
    }
}

