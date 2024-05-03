<?php
session_start();

require_once "models/manager/userManager.php";
require_once "models/manager/GlobalManager.php";

$userManager = new userManager();
$globalManager = new GlobalManager();

// Inclure votre configuration et initialiser le gestionnaire d'utilisateurs ici
if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Appelez la fonction pour récupérer les informations de l'utilisateur
    $user = $userManager->getUserById($userId);

    if ($user) {
        // Renvoyez les informations de l'utilisateur sous forme de JSON
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Utilisateur non trouvé']);
    }
} else {
    echo json_encode(['error' => 'ID d\'utilisateur manquant']);
}
