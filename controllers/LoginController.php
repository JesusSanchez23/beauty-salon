<?php

namespace Controllers;

use MVC\Router;

class LoginController
{

    public static function login(Router $router)
    {

        $router->render('auth/login');
    }

    public static function logout()
    {
        echo 'en el logout';
    }

    public static function olvide()
    {
        echo 'Olvide';
    }

    public static function recuperar()
    {
        echo 'recuperar';
    }
}
