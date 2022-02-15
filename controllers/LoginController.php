<?php

namespace Controllers;

use Model\Usuario;
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

    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password',[

        ]);
    }

    public static function recuperar()
    {
        echo 'recuperar';
    }

    public static function crear(Router $router)
    {
        $usuario = new Usuario;


        // alertas vacias
        $alertas = [];

        if($_SERVER['REQUEST_METHOD']=== 'POST'){
            $usuario -> sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();
           

            // revisar que $alertas este vacio

            if(empty($alertas)){
                echo "Pasaste la validación";
            }
        }
        $router->render('auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
}