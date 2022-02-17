<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController
{

    public static function login(Router $router)
    {

        $alertas = [];
        // inicializamos los valores que queremos pasar en el render
        // $auth = new Usuario();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();

            if (empty($alertas)) {

                $usuario = Usuario::where('email', $auth->email);

                if ($usuario) {
                    // verificar el password
                    if ($usuario->comprobarPasswordAndVerificado($auth->password)) {

                        if (!isset($_SESSION)) {
                            session_start();
                        }
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;


                        // redireccionamiento

                        if($usuario->admin){
                            $_SESSION['admin'] = $usuario->admin ?? null;

                            header('Location: /admin');
                        }else{
                            header('Location: /cita');
                        }

                        debuguear($_SESSION);
                    }
                } else {
                    Usuario::setAlerta('error', 'Usuario no encontrado');
                }
                // comprobar que exista el usuario
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/login', [
            'alertas' => $alertas,
            // para tener los valores de l usuario y pasarlos a la vista los declaramos aqui
            // 'auth' => $auth
        ]);
    }

    public static function logout()
    {
        echo 'en el logout';
    }

    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password', []);
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

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();


            // revisar que $alertas este vacio

            if (empty($alertas)) {

                // verificar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();
                if ($resultado->num_rows) {
                    $alertas = Usuario::getAlertas();
                } else {

                    // hashear el psw

                    $usuario->hashPassword();
                    // no esta registrado

                    $usuario->crearToken();

                    // enviar el email

                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);

                    $email->enviarConfirmacion();

                    // crear el usuario
                    $resultado = $usuario->guardar();

                    if ($resultado) {
                        header('location: /mensaje');
                    }
                }
            }
        }
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router)
    {
        $alertas = [];
        $token = s($_GET['token']);
        $usuario = Usuario::where('token', $token);

        if (empty($usuario)) {
            //mostrar mensaje de error
            Usuario::setAlerta('error', 'el Token proporcionado no es valido');
        } else {
            // modificar a usuario confirmado
            $usuario->confirmado = "1";
            $usuario->token = null;
            $usuario->guardar();
            Usuario::setAlerta('exito', 'Usuario registrado correctamente');
        }
        // obtener alertas
        $alertas = Usuario::getAlertas();
        // renderizar la vista
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }
}
