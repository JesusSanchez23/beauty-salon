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
  seleccionarHora(); //añade la hora de la cita en el objeto

  mostrarResumen(); //muestra el resumen de la cita
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
    mostrarResumen();
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
      mostrarAlerta("Fines de semana no permitidos", "error", ".formulario");
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector("#hora");

  inputHora.addEventListener("input", (e) => {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];

    if (hora < 10 || hora > 18) {
      e.target.value = "";
      mostrarAlerta("Hola no válida", "error", ".formulario");
    } else {
      cita.hora = e.target.value;
      // console.log(cita);
    }
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  // previene que se cree más de una alarta
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) {
    alertaPrevia.remove();
  }

  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  // eliminar alerta tras cierto tiempo

  if (desaparece) {
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarResumen() {
  const resumen = document.querySelector(".contenido-resumen");
  // limpiar el contenido de resumen

  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "Faltan datos de servicios, fecha u hora",
      "error",
      ".contenido-resumen",
      false
    );

    return;
  }

  //formatear el div de resumen

  const { nombre, fecha, hora, servicios } = cita;

  // heading para servicios en resumen
  const headingServicios = document.createElement("H3");
  headingServicios.textContent = "Resumen de servicios";

  resumen.appendChild(headingServicios);
  // iterando y mostrando los servicios que estan en un arreglo
  servicios.forEach((servicio) => {
    const { id, precio, nombre } = servicio;
    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("contenedor-servicio");

    const textoServicio = document.createElement("P");
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio: </span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  // heading para el resumen de la cita
  const headinCita = document.createElement("H3");
  headinCita.classList.add("heading-cita");
  headinCita.textContent = "Resumen de la cita";

  resumen.appendChild(headinCita);

  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span>${nombre}`;

  // formatear la fecha en español
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();
  const fechaUTC = new Date(Date.UTC(year, mes, dia));

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaUTC.toLocaleDateString("es-MX", opciones);

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha: </span>${fechaFormateada}`;

  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora: </span>${hora} horas`;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);

  //boton para crear una cita

  const botonReservar = document.createElement("BUTTON");
  botonReservar.classList.add("boton");
  botonReservar.textContent = "Reservar Cita";

  botonReservar.onclick = reservarCita;

  resumen.appendChild(botonReservar);
}

function reservarCita() {
  console.log("reservando cita");
}
