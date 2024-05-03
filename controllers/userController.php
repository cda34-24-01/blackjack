<?php
session_start();
require_once "models/manager/UserManager.php";

class UserController
{
    private $userManager;

    public function __construct()
    {
        $this->userManager = new UserManager;
    }

    public function addWin($id)
    {
        $this->userManager->addWin($id);
    }

    public function addLose($id)
    {
        $this->userManager->addLose($id);
    }

    public function addMoney($id, $money)
    {
        $this->userManager->addMoney($id, $money);
    }

    public function getWins($id)
    {
        return $this->userManager->getWins($id);
    }

    public function getLoses($id)
    {
        return $this->userManager->getLoses($id);
    }

    public function getMoney($id)
    {
        return $this->userManager->getMoney($id);
    }

    public function inscription_validation()
    {
        try {
            if (empty($_POST['pseudo']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['password_confirm'])) {
                //throw new Exception("Veuillez remplir tous les champs");
                $_SESSION['error'] = "Veuillez-remplir tous les champs";
                $this->redirectInscription();
            }

            // Utilisation d'une expression régulière pour détecter les balises HTML
            $pattern = "/<[^>]+>/";
            preg_match_all($pattern, $_POST['pseudo'], $matches);

            // Vérifier s'il y a des balises HTML détectées
            if (!empty($matches[0])) {
                $_SESSION['error'] = "Les balises HTML ne sont pas autorisées";
                $this->redirectInscription();
            }

            if ($_POST['password'] != $_POST['password_confirm']) {
                //throw new Exception("Les mots de passe ne correspondent pas");
                $_SESSION['error'] = "Les mots de passe ne correspondent pas";
                $this->redirectInscription();
            }
            /* if (strlen($_POST['password']) < 8) {
                //throw new Exception("Le mot de passe doit contenir au moins 8 caractères");
                $_SESSION['error'] = "Le mot de passe doit contenir au moins 8 caractères";
                $this->redirectInscription();
            } */
            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                //throw new Exception("L'adresse email n'est pas valide");
                $_SESSION['error'] = "L'adresse email n'est pas valide";
                $this->redirectInscription();
            }
            /*             if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $_POST['password'])) {
                $_SESSION['error'] = "Le mot de passe doit contenir au moins un caractère spécial";
                $this->redirectInscription();
            }
            if (!preg_match('/[A-Z]/', $_POST['password'])) {
                $_SESSION['error'] = "Le mot de passe doit contenir au moins une majuscule";
                $this->redirectInscription();
            } */
            $user = $this->userManager->FindUserByPseudo($_POST['pseudo']);
            if (!empty($user)) {
                //throw new Exception("Ce pseudo est déjà utilisé");
                $_SESSION['error'] = "Ce pseudo est déjà utilisé";
                $this->redirectInscription();
            }
            $user = $this->userManager->FindUserByEmail($_POST['email']);
            if (!empty($user)) {
                //throw new Exception("Cette adresse email est déjà utilisée");
                $_SESSION['error'] = "Cette adresse email est déjà utilisée";
                $this->redirectInscription();
            }

            if (isset($_SESSION['error'])) {
                throw new Exception($_SESSION['error']);
                header("Location: /inscription");
                return;
            }


            $pseudo = $_POST["pseudo"];
            $_SESSION["pseudo"] = $pseudo;
            $email = $_POST["email"];
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT, array('cost' => 12));

            $resultInsert = $this->userManager->insertUserDB($email, $pseudo, $password);

            if ($resultInsert) {
                header("Location: /connexion");
            } else {
                throw new Exception("Erreur lors de l'inscription");
            }
            /* header("Location: /connexion"); */

            // fin de connexion automatique
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function connexion_validation()
    {
        try {
            if (empty($_POST['identifier']) || empty($_POST['password'])) {
                $_SESSION['error'] = "Veuillez remplir tous les champs";
                header("Location: /connexion");
                return;
                /* throw new Exception("Veuillez remplir tous les champs"); */
            }
            $user = $this->userManager->getUserByIdentifier($_POST['identifier']);

            if (!empty($user)) {

                if (password_verify($_POST['password'], $user['mdp'])) {
                    $this->sessionUser($user);
                    header("Location: /accueil");
                } else {
                    throw new Exception("Mot de passe incorrect");
                    $_SESSION['error'] = "Identifiant ou mot de passe incorrect";
                    header("Location: /connexion");
                    return;
                }
            } else {
                throw new Exception("Pseudo incorrect");
                $_SESSION['error'] = "Identifiant ou mot de passe incorrect";
                header("Location: /connexion");
                return;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function redirectInscription()
    {
        /* header("Location: /inscription"); */
    }

    public function sessionUser($user)
    {
        $_SESSION['id'] = $user['id_utilisateur'];
    }

    public function deconnexionUser()
    {
        unset($_SESSION['id']);
        header("Location: /accueil");
    }
}
