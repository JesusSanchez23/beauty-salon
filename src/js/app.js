let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion();
  tabs(); //cambia la seccion al resionar los tabs
  botonesPaginador(); //agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();
}

function mostrarSeccion() {
  // Ocultar las secciones que no tengan la clase de msotrar
  const seccionAnterior = document.querySelector(".mostrar");

  // quitar la clase de actaual al tab anterior
  const quitarSeleccion = document.querySelector(".actual");

  // comprobar si existen las classes
  if (quitarSeleccion) {
    quitarSeleccion.classList.remove("actual");
  }
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  // seleccionar la seccion con el paso
  const slideSeleccionado = `#paso-${paso}`;
  const seccion = document.querySelector(slideSeleccionado);

  seccion.classList.add("mostrar");

  // resalta el tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      paso = parseInt(e.target.dataset.paso);

      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }
  mostrarSeccion();
}
function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", () => {
    if (paso <= pasoInicial) return;
    paso--;

    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    if (paso >= pasoFinal) return;
    paso++;

    botonesPaginador();
  });
}
