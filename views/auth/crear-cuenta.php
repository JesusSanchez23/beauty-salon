<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear tu cuenta</p>

<?php
include_once __DIR__."/../templates/alertas.php";
?>

<div class="errores">

</div>
<form action="/crear-cuenta" method="POST">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input 
        type="text" 
        name="nombre" 
        id="nombre"
        placeholder="Tu Nombre"
        value="<?php  echo s($usuario->nombre)?>">
    </div>
    <div class="campo">
        <label for="apellido">Apellido</label>
        <input 
        type="text" 
        name="apellido" 
        id="apellido"
        placeholder="Tu apellido"
        value="<?php  echo s($usuario->apellido)?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input 
        type="tel" 
        name="telefono" 
        id="telefono"
        placeholder="Tu Teléfono"
        value="<?php  echo s($usuario->telefono)?>">
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input 
        type="email" 
        name="email" 
        id="email"
        placeholder="Tu Email"
        value="<?php  echo s($usuario->email)?>">
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
        type="password" 
        name="password" 
        id="password"
        placeholder="Tu Password">
    </div>

    <input type="submit" value="Registrarse" class="boton">
</form>

<div class="acciones">
    <a href="/">Ya tengo cuenta</a>
    <a href="/olvide">No recuerdo mi contraseña</a>
</div>