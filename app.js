//------Selección de Elementos---------//
const btnEncriptar = document.querySelector(".btn-encriptar");
const txtEncriptar = document.querySelector(".contenedor-textarea-uno");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector(".contenedor-textarea-dos");
const contenido = document.querySelector(".contenedor-card");
const btnCopiar = document.querySelector(".btn-copiar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

//------Funciones Reutilizables---------//

function mostrarAviso(mensaje) {
  aviso.style.background = "#0A3871";
  aviso.style.color = "#FFFF";
  aviso.style.fontWeight = "800";
  aviso.textContent = mensaje;

  setTimeout(() => {
    aviso.removeAttribute("style");
  }, 1500);
}

function limpiarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, " ");
}

function validarTexto(texto, txt) {
  if (texto === "") {
    mostrarAviso("El campo no debe estar vacío");
    return false;
  } else if (texto !== txt) {
    mostrarAviso("No debe tener acentos y caracteres especiales");
    return false;
  } else if (texto !== texto.toLowerCase()) {
    mostrarAviso("El texto debe ser todo en minúscula");
    return false;
  }
  return true;
}

function encriptarTexto(texto) {
  return texto
    .replace(/e/gm, "enter")
    .replace(/i/gm, "imes")
    .replace(/a/gm, "ai")
    .replace(/o/gm, "ober")
    .replace(/u/gm, "ufat");
}

function desencriptarTexto(texto) {
  return texto
    .replace(/enter/gm, "e")
    .replace(/imes/gm, "i")
    .replace(/ai/gm, "a")
    .replace(/ober/gm, "o")
    .replace(/ufat/gm, "u");
}

function manejarEncriptar() {
  let texto = txtEncriptar.value;
  let txt = limpiarTexto(texto);

  if (validarTexto(texto, txt)) {
    let textoEncriptado = encriptarTexto(texto);
    respuesta.innerHTML = textoEncriptado;
    btnCopiar.style.visibility = "inherit";
    contenido.remove();
  }
}

function manejarDesencriptar() {
  let texto = txtEncriptar.value;
  let txt = limpiarTexto(texto);

  if (validarTexto(texto, txt)) {
    let textoDesencriptado = desencriptarTexto(texto);
    respuesta.innerHTML = textoDesencriptado;
    btnCopiar.style.visibility = "inherit";
    contenido.remove();
  }
}

function copiarAlPortapapeles() {
  // Crear un textarea temporal
  const textarea = document.createElement("textarea");

  // Asignar el valor del texto que se quiere copiar sin espacios adicionales
  textarea.value = respuesta.textContent.trim(); // textContent sin espacios innecesarios

  // Evitar que el textarea sea visible y agregarlo al documento
  textarea.style.position = "fixed"; // Evita que se mueva por el viewport
  textarea.style.opacity = 0; // Hacerlo invisible
  document.body.appendChild(textarea);

  // Seleccionar y copiar el contenido del textarea
  textarea.select();
  document.execCommand("copy");

  // Eliminar el textarea del DOM
  document.body.removeChild(textarea);
}


//------Eventos de Botones---------//
btnEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  manejarEncriptar();
});

btnDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  manejarDesencriptar();
});

btnCopiar.addEventListener("click", (e) => {
  e.preventDefault();
  copiarAlPortapapeles();
});
