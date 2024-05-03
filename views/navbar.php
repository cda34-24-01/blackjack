<?php
require_once "models/managers/UserManager.php";
require_once "models/managers/GlobalManager.php";
require_once "controllers/UserController.php";
require_once "controllers/GlobalController.php";
$globalManager = new GlobalManager();
$userManager = new UserManager();
$userController = new UserController();
$globalController = new GlobalController();


if ($_SESSION['id']) {
    $me = $userManager->getUserById($_SESSION['id']);
}
?>

<nav class="navbar navbar-expand-lg fixed-top navbarContent p-0">
    <div class="container-fluid navbarContent">
        <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="<?= URL ?>">
            <p class="family yellow cineramaLogo m-0 ms-3">BLACKJACK</p>
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <div class="w-100">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-4">
                    <li class="nav-item">
                        <a class="nav-link text-light" href="<?= URL ?>">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="<?= URL . "table" ?>">Jouer</a>
                    </li>
                </ul>
            </div>


            <div class="position-relative dropdown navLinkContainer">
                <?php if (isset($_SESSION['id']) || isset($_COOKIE['id'])) { ?>
                    <?php if ($isNotificationsEnAttente) : ?>
                        <span class="badge bg-danger rounded-circle position-absolute">
                            <?= $nbNotifications ?>
                        </span>
                        <!-- <i class="fa-regular fa-bell fs-6 text-white me-1 mt-2 position-absolute"></i> -->
                    <?php endif; ?>
                <?php } ?>



                <?php if (isset($_SESSION['id']) || isset($_COOKIE['id'])) : ?>
                    <?php $class = "m-2 imgAvatar"; ?>
                    <?php if ($_SESSION['bordure'] != null) {
                        $class = "m-2 imgAvatar " . $_SESSION['bordure'];
                    } ?>
                    <?php if ($_SESSION['photo_profil'] == null) : ?>
                        <?php
                        $avatarUrl = "public/images/avatars/deadpool.png";
                        $_SESSION['photo_profil'] = "deadpool.png";
                        ?>
                        <!-- <img src="<?= $avatarUrl ?>" alt="img_avatar" class="<?= $class ?>"> -->
                        <div class="<?= $class ?>" id="imgApercu" style="background-image: url('<?= $avatarUrl ?>');"></div>
                    <?php else : ?>
                        <?php
                        $avatarPath = "public/images/avatars/" . $_SESSION['photo_profil'];
                        $avatarUrl = URL . $avatarPath;
                        ?>
                        <?php if (file_exists($avatarPath)) : ?>
                            <div class="<?= $class ?>" id="imgApercu" style="background-image: url('<?= $avatarUrl ?>');"></div>
                            <!-- <img src="<?= $avatarUrl ?>" alt="img_avatar" class="<?= $class ?>"> -->
                        <?php else : ?>
                            <?php
                            $avatarPath = "public/images/uploads/" . $_SESSION['photo_profil'];
                            $avatarUrl = URL . $avatarPath;
                            ?>
                            <div class="<?= $class ?>" id="imgApercu" style="background-image: url('<?= $avatarUrl ?>');"></div>
                            <!-- <img src="<?= $avatarUrl ?>" alt="img_avatar" class="<?= $class ?>"> -->
                        <?php endif; ?>
                    <?php endif; ?>
                <?php else : ?>
                    <a href="#" class="nav-link text-light ms-2 fs-4"><i class="fa-solid fa-user"></i></a>
                <?php endif; ?>

                <div class="dropdown-content bgDarkBlue borderWhite rounded menuUser">
                    <?php if (!isset($_SESSION['id']) && !isset($_COOKIE['id'])) { ?>
                        <a href="<?= URL . "connexion" ?>"><i class="fa-solid fa-arrow-right-to-bracket me-2"></i><?= $langue['Se_connecter'] ?></a>
                        <a href="<?= URL . "inscription" ?>"><i class="fa-regular fa-address-card me-2"></i><?= $langue['S_inscrire'] ?></a>
                    <?php } else { ?>
                        <a href="<?= URL . "compte" ?>"><i class="fa-solid fa-user me-2"></i><?= $langue['Mon_compte'] ?></a>
                        <a href="<?= URL . "watchlist/" . "liste_films_a_voir/" . "1" ?>"><i class="fa-solid fa-list-ul me-2"></i><?= $langue['Mes_listes'] ?></a>

                        <?php if (count($isPendingRequestFriend) == 0 && count($isPendingNotification) == 0 && $nbAvertissements == 0 && count($isPendingMessage) == 0) { ?>
                            <a class="disabledLink"><i class="fa-regular fa-envelope me-2"></i><?= $langue['Notifications'] ?></a>
                        <?php } else { ?>
                            <a href="<?= URL . "alertes" ?>" class="orange"><i class="fa-regular fa-envelope me-2"></i><?= $langue['Notifications'] ?> (<?= count($isPendingRequestFriend) + count($isPendingNotification) + $nbAvertissements + count($isPendingMessage) ?>)</a>
                        <?php } ?>
                        <?php if ($_SESSION['role'] == "admin") {
                            if ($totalPending > 0) { ?>
                                <a href="<?= URL . "admin" ?>" class="orange"><i class="fa-solid fa-screwdriver-wrench me-2"></i><?= $langue['Administration'] ?> (<?= $totalPending ?>)</a>
                            <?php } else { ?>
                                <a href="<?= URL . "admin" ?>"><i class="fa-solid fa-screwdriver-wrench me-2"></i><?= $langue['Administration'] ?></a>
                            <?php } ?>
                        <?php } ?>
                        <?php if ($userTicketCount > 0) { ?>
                            <a href="#" onclick="showAide(event)" class="orange"><i class="fa-regular fa-circle-question me-2"></i><?= $langue['Aide'] ?> (<?= $userTicketCount ?>)</a>
                        <?php } else { ?>
                            <a href="#" onclick="showAide(event)"><i class="fa-regular fa-circle-question me-2"></i><?= $langue['Aide'] ?></a>
                        <?php } ?>
                        <a href="<?= URL . "panier" ?>" class="goldIcon"><i class="fa-solid fa-crown goldIcon me-2"></i><?= $langue['Premium'] ?></a>
                        <a href="<?= URL . "deconnexion" ?>" class="redIcon"><i class="fa-solid fa-arrow-right-from-bracket me-2"></i><?= $langue['Se_deconnecter'] ?></a>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</nav>


        <script src="<?= URL . "public/js/navbar.js" ?>"></script>
        <!-- Inclure Bootstrap JavaScript -->
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

        <!-- Votre script JavaScript personnalisé -->