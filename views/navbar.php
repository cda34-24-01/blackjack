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
                        <a class="nav-link text-light" href="<?= URL ?>"><?= $langue['Accueil'] ?></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="<?= URL . "nouveautes" ?>"><?= $langue['Nouveautes'] ?></a>
                    </li>
                    <li class="nav-item dropdown"> <!-- Dropdown pour Films -->
                        <a class="nav-link text-light dropdown-toggle" href="#" id="filmsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <?= $langue['Films'] ?>
                        </a>
                        <div class="dropdown-menu bgDarkBlue ddGenres" aria-labelledby="filmsDropdown">
                            <div class="dropright"> <!-- Dropdown pour Genres de Films -->
                                <a class="dropdown-item dropdown-toggle-split text-white" href="#" id="filmsGenresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <?= $langue['Genres'] ?> ▸
                                </a>
                                <div class="dropdown-menu bgDarkBlue genres-dropdown" aria-labelledby="filmsGenresDropdown">
                                    <?php // Trier le tableau par ordre alphabétique
                                    sort($data_film_genre);
                                    foreach ($data_film_genre as $genre) { ?>
                                        <a class="dropdown-item text-white" href="<?= URL ?>film/1/<?= $genre ?>"><?= ucfirst($langue[$genre]) ?></a>
                                    <?php } ?>
                                </div>
                            </div>
                            <a class="dropdown-item text-white" href="<?= URL ?>film"><?= $langue['Aleatoire'] ?></a>
                        </div>
                    </li>

                    <li class="nav-item dropdown"> <!-- Dropdown pour Séries -->
                        <a class="nav-link text-light dropdown-toggle" href="#" id="seriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <?= $langue['Series'] ?>
                        </a>
                        <div class="dropdown-menu bgDarkBlue ddGenres" aria-labelledby="seriesDropdown">
                            <div class="dropright"> <!-- Dropdown pour Genres de Séries -->
                                <a class="dropdown-item dropdown-toggle-split text-white" href="#" id="seriesGenresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <?= $langue['Genres'] ?> ▸
                                </a>
                                <div class="dropdown-menu bgDarkBlue genres-dropdown" aria-labelledby="seriesGenresDropdown">
                                    <?php // Trier le tableau par ordre alphabétique
                                    sort($data_serie_genre);
                                    foreach ($data_serie_genre as $genre) { ?>
                                        <?php if ($genre == $langue['horreur']) { ?>
                                            <a class="dropdown-item text-white disabled" href="#"><?= ucfirst($langue[$genre]) ?></a>
                                        <?php } else { ?>
                                            <a class="dropdown-item text-white" href="<?= URL ?>serie/1/<?= $genre ?>"><?= ucfirst($langue[$genre]) ?></a>
                                        <?php } ?>
                                    <?php } ?>
                                </div>
                            </div>
                            <a class="dropdown-item text-white" href="<?= URL ?>serie"><?= $langue['Aleatoire'] ?></a>
                        </div>
                    </li>
                </ul>
            </div>

            <form class="d-flex formIndex" role="search" action="#" method="GET" id="searchForm2">

                <div class="hero">
                    <div id="searchBox">
                        <i class="fas fa-search yellow p-2 ms-1" id="searchIcon"></i>
                        <input type="text" class="text-white inputNav" id="searchInput" placeholder="<?= $langue['Recherche...'] ?>" data-url="<?= URL ?>" autocomplete="off">
                    </div>
                </div>



                <!-- <div class="border border-2 rounded p-1 boxResearch">
                    <span class="d-flex">
                        <a href="#" class="d-flex align-items-center text-decoration-none"><i class="fas fa-search yellow"></i></a>
                        <input type="text" id="searchInput2" placeholder="Titre film/serie" data-url="<?= URL ?>" class="text-white bg-transparent ms-1 w-100 searchInput">
                    </span>
                </div> -->
            </form>

            <div class="language ms-2 me-1">
                <div class="dropdown">
                    <button id="dropdownButtonLanguage" class="btn btnCyan dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <?php if ($_SESSION['langue'] == 'fr') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png" alt="Français" class="flag m-0" />
                        <?php } elseif ($_SESSION['langue'] == 'en-US') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt="English" class="flag m-0" />
                        <?php } elseif ($_SESSION['langue'] == 'de') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png" alt="Deutsch" class="flag m-0" />
                        <?php } elseif ($_SESSION['langue'] == 'es') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1920px-Flag_of_Spain.svg.png" alt="Español" class="flag m-0" />
                        <?php } elseif ($_SESSION['langue'] == 'it') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png" alt="Italiano" class="flag m-0" />
                        <?php } elseif ($_SESSION['langue'] == 'cn') { ?>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png" alt="中文" class="flag m-0" />
                        <?php } ?>
                    </button>

                    <ul class="dropdown-menu bgBlue borderWhite" aria-labelledby="dropdownSortByTriage">
                        <?php if ($_SESSION['langue'] != 'fr') { ?>
                            <li>
                                <a href="<?= URL ?>langue/fr" class="d-flex align-items-center me-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png" alt="Français" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                        <?php if ($_SESSION['langue'] != 'en-US') { ?>
                            <li>
                                <a href="<?= URL ?>langue/en-US" class="d-flex align-items-center me-2 mt-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt="English" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                        <?php if ($_SESSION['langue'] != 'de') { ?>
                            <li>
                                <a href="<?= URL ?>langue/de" class="d-flex align-items-center me-2 mt-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png" alt="Deutsch" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                        <?php if ($_SESSION['langue'] != 'es') { ?>
                            <li>
                                <a href="<?= URL ?>langue/es" class="d-flex align-items-center me-2 mt-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1920px-Flag_of_Spain.svg.png" alt="Español" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                        <?php if ($_SESSION['langue'] != 'it') { ?>
                            <li>
                                <a href="<?= URL ?>langue/it" class="d-flex align-items-center me-2 mt-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png" alt="Italiano" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                        <?php if ($_SESSION['langue'] != 'cn') { ?>
                            <li>
                                <a href="<?= URL ?>langue/cn" class="d-flex align-items-center me-2 mt-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png" alt="中文" class="flag me-1" />
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>

            <?php $isNotificationsEnAttente = false; ?>
            <?php if (isset($_SESSION['id']) && $_SESSION['role'] == "admin" || isset($_COOKIE['id']) && $_SESSION['role'] == "admin") {
                if ($isPendingRequestFriend != null || count($isPendingComments) > 0 || count($isPendingBa) > 0 || count($isPendingAvatar) || count($isPendingNotification) > 0 || $nbAvertissements > 0 || count($isPendingMessage) > 0 || $adminTicketCount > 0) { ?>
                    <?php $isNotificationsEnAttente = true ?>
                    <?php $nbNotifications = count($isPendingRequestFriend) + count($isPendingComments) + count($isPendingBa) + count($isPendingAvatar) + count($isPendingNotification) + $nbAvertissements + count($isPendingMessage) + $adminTicketCount ?>
                <?php } ?>

                <?php } else if (isset($_SESSION['id']) || isset($_COOKIE['id'])) {
                if ($isPendingRequestFriend != null || count($isPendingNotification) > 0 || $nbAvertissements > 0 || count($isPendingMessage) > 0 || $userTicketCount > 0) { ?>
                    <?php $isNotificationsEnAttente = true ?>
                    <?php $nbNotifications = count($isPendingRequestFriend) + count($isPendingNotification) + $nbAvertissements + count($isPendingMessage) + $userTicketCount ?>
            <?php
                }
            }
            ?>


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