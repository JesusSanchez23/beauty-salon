<?php

$db = mysqli_connect('162.241.2.40', 'blentoom_salon', 'Chocorrol999.', 'blentoom_belleza');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
