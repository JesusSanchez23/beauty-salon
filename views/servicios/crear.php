<h1 class="nombre-pagina">Nuevo Servicios</h1>
<p class="descripcion-pagina">Llena los campos</p>

<?php
include_once __DIR__. '/../templates/barra.php';
include_once __DIR__. '/../templates/alertas.php';

?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php 
include_once __DIR__ .'/formulario.php';
    ?>
    <input type="submit" value="Guardar servicios" class="boton">
</form>