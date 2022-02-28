document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

function iniciarApp() {
  buscarFecha();
}

function buscarFecha() {
  const fechaInput = document.querySelector("#fecha");

  fechaInput.addEventListener("input", (e) => {
    const fechaSeleccionada = e.target.value;
    console.log(fechaSeleccionada);

    window.location = `?fecha=${fechaSeleccionada}`;
  });
}
