<?php
require_once "models/ModelClass.php";

class UserManager extends Model
{
    public function insertUserDB($email, $pseudo, $mdp)
    {
        $sql = "INSERT INTO utilisateurs (pseudo,email,mdp) VALUES (:pseudo,:email,:mdp)";
        $req = $this->getDB()->prepare($sql);
        $resultInsert = $req->execute([
            "pseudo" => $pseudo,
            "email" => $email,
            "mdp" => $mdp
        ]);

        return $resultInsert;
    }

    public function findUserByEmail($email)
    {
        $sql = "SELECT * FROM utilisateurs WHERE email = :email";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "email" => $email
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function findUserByPseudo($pseudo)
    {
        $sql = "SELECT * FROM utilisateurs WHERE pseudo = :pseudo";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "pseudo" => $pseudo
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserById($id) 
    {
        $sql = "SELECT id_utilisateur, money, wins, loses, pseudo FROM utilisateurs WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByIdentifier($identifier)
    {
        $sql = "SELECT * FROM utilisateurs WHERE email = :identifier OR pseudo = :identifier";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "identifier" => $identifier
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function addMoney($id, $money)
    {
        $sql = "UPDATE utilisateurs SET money = money + :money WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id,
            "money" => $money
        ]);
    }

    public function removeMoney($id, $money)
    {
        $sql = "UPDATE utilisateurs SET money = money - :money WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id,
            "money" => $money
        ]);
    }

    public function addWin($id)
    {
        $sql = "UPDATE utilisateurs SET wins = wins + 1 WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);
    }

    public function addLose($id)
    {
        $sql = "UPDATE utilisateurs SET loses = loses + 1 WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);
    }

    public function getMoney($id)
    {
        $sql = "SELECT money FROM utilisateurs WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function getWins($id)
    {
        $sql = "SELECT wins FROM utilisateurs WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function getLoses($id)
    {
        $sql = "SELECT loses FROM utilisateurs WHERE id_utilisateur = :id";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function toggleSound($id)
    {
        $sql = 'SELECT sound FROM utilisateurs WHERE id_utilisateur = :id';
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        $sound = $req->fetch(PDO::FETCH_ASSOC);

        if ($sound['sound'] == 1) {
            $sql = 'UPDATE utilisateurs SET sound = 0 WHERE id_utilisateur = :id';
        } else {
            $sql = 'UPDATE utilisateurs SET sound = 1 WHERE id_utilisateur = :id';
        }
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "id" => $id
        ]);

        return $req->fetch(PDO::FETCH_ASSOC);
    }
}