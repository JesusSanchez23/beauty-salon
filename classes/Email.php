<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        //crear el objeto de email

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'f622f30bedd912';
        $mail->Password = '510f1c8c90ce7d';

        $mail->setFrom('cuentas@blentoom.com');
        $mail->addAddress('cuentas@blentoom.com', 'blentoom.com');
        $mail->Subject = 'Confirma tu cuenta';


        // set HTML

        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';
        $contenido = "<html>";
        $contenido .= "<p>Hola <strong>" . $this->nombre . "</strong> has creado tu cuenta en blentoom.com solo debes de confirmar presionando el siguiente enlace </p>";
        $contenido .= "<p>Presiona aqui <a href='http://localhost:8000/confirmar-cuenta?token=".$this->token."'>Confirmar cuenta</a></p>";
        $contenido .="<p> Si tu no silicitaste la cuenta, ignora el mensaje </p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        // Enviar el email

        $mail->send();
    }
}
