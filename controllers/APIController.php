<?php


namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController{
    public static function index(){
        $servicios = Servicio::all();

        echo json_encode($servicios);
    }

    public static function guardar(){

        // Almacena los datos de la tabla Cita y devuelve el ID
        $cita = new Cita($_POST);
        $resultado = $cita -> guardar();

        $id = $resultado['id'];

        // Almacena los datos de la tabla citaServicios
        $idServicios = explode(',', $_POST['servicios']);

        foreach($idServicios as $idServicio){
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio,
            ];

            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        };

        // retornamos una respuesta
        echo json_encode(['resultado' => $resultado]);
    }
}