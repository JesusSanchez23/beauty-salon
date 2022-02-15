<h1 class="nombre-pagina">Olvide mi contraseña</h1>
<p class="descripcion-pagina">Si olvidaste tu contraseña, registra tu email para mandarte instrucciones</p>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">email</label>
        <input type="email" 
        name="email"
         id="email"
         placeholder="Tu email">
    </div>

    <input type="submit" value="Enviar correo"
    class="boton">
</form>
<div class="acciones">
    <a href="/">Ya tengo cuenta</a>
    <a href="/crear-cuenta">Crear Cuenta</a>
</div>