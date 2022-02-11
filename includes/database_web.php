<?php

$db = mysqli_connect('162.241.2.36', 'blentoom_salon', 'Chocorrol99.', 'blentoom_belleza');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
