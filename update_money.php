
<?php
session_start();

if (isset($_POST['money'])) {
    $_SESSION['money'] = $_POST['money'];
}

?>