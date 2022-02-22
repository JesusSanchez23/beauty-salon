let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

const cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion();
  tabs(); //cambia la seccion al resionar los tabs
  botonesPaginador(); //agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();
  consultarAPI(); //CONSULTA LA api EN EL BACKEND DE php
  nombreCliente(); //añade el nombre del cliente al objeto de cita;
  seleccionarFecha(); //añade la fecha de la cita en el objeto
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

async function consultarAPI() {
  try {
    const url = "http://localhost:8000/api/servicios";
    const resultado = await fetch(url);
    const servicios = await resultado.json();

    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;
    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `$${precio}`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add("servicio");
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;
  // identificar el elemento al que se le da clic
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  // comprobar si un servicio ya fue agregado o quitarlo
  if (servicios.some((agregado) => agregado.id === id)) {
    // eliminarlo
    // console.log("ya esta agregado");
    cita.servicios = servicios.filter((agregado) => agregado.id !== id);
    divServicio.classList.remove("seleccionado");
  } else {
    // agregarlo
    // console.log("sin agregar");
    cita.servicios = [...servicios, servicio];
    divServicio.classList.add("seleccionado");
  }

  console.log(cita);
}

function nombreCliente() {
  const nombre = document.querySelector("#nombre").value;
  cita.nombre = nombre;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", (e) => {
    const dia = new Date(e.target.value).getUTCDay();
    if ([6, 0].includes(dia)) {
      e.target.value = "";
      mostrarAlerta("Fines de semana no permitidos", "error");
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function mostrarAlerta(mensaje, tipo) {
  // previene que se cree más de una alarta
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) return;

  // const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  const formulario = document.querySelector(".formulario");
  formulario.appendChild(alerta);

  // eliminar alerta tras cierto tiempo
  setTimeout(() => {
    alerta.remove();
  }, 2000);
}
