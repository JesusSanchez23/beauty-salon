<h1 class="nombre-pagina">login</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>


<form action="/" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input 
        type="email" 
        id="email" 
        placeholder="Tu email" 
        name="email">
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
        type="password"
        id="password"
        placeholder="Tu Password"
        name="password">
    </div>

    <input type="submit" value="Iniciar sesión" class="boton">
</form>

<div class="acciones">
    <a href="/crear-cuenta">Crear cuenta</a>
    <a href="/olvide">No recuerdo mi contraseña</a>
</div>