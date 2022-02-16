<?php

namespace Controllers;

use Classes\Email;
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

                // verificar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();
                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{

                    // hashear el psw

                    $usuario->hashPassword();
                    // no esta registrado

                    $usuario->crearToken();
                    
                    // enviar el email

                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);

                    $email->enviarConfirmacion();

                    // crear el usuario
                    $resultado = $usuario->guardar();

                    if($resultado){
                        header('location: /mensaje');
                    }
                
                }
            }
        }
        $router->render('auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router){
        $router->render('auth/mensaje');
    }
}
