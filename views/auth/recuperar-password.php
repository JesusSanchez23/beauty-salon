<h1 class="nombre-pagina">Recuperar Password</h1>

<p class="descripcion-pagina">Escribe tu nuevo password a continuación</p>
<?php
include_once __DIR__ . "/../templates/alertas.php";
?>


<?php if ($error){
return;
}
    ?>

<form method="POST" class="formulario">

    <div class="campo">
        <label for="password">Escribe la contraseña</label>
        <input type="password" name="password" id="password" placeholder="Tu nuevo password">
    </div>

    <input type="submit" value="Actualizar Contraseña" class="boton">
</form>

<div class="acciones">
    <a href="/">Iniciar sesión</a>
    <a href="/crear-cuenta">Crear Cuenta</a>
</div>