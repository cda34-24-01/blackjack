<?php
require_once "models/ModelClass.php";

class UserManager extends Model
{
    public function addWin($id)
    {
        
    }

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

        return $req->fetch();
    }

    public function findUserByPseudo($pseudo)
    {
        $sql = "SELECT * FROM utilisateurs WHERE pseudo = :pseudo";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "pseudo" => $pseudo
        ]);

        return $req->fetch();
    }
    public function getUserByIdentifier($identifier)
    {
        $sql = "SELECT * FROM utilisateurs WHERE email = :identifier OR pseudo = :identifier";
        $req = $this->getDB()->prepare($sql);
        $req->execute([
            "identifier" => $identifier
        ]);

        return $req->fetch();
    }
}