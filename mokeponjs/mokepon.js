let ataqueJugador = "";
let ataqueEnemigo;
let vidasEnemigo = 3;
let vidasMascota = 3;

function iniciarJuego() {
  document.getElementById("seleccionar-ataque").style.display = "none";
  document.getElementById("reiniciar").style.display = "none";

  let botonMascotaJugador = document.getElementById("botonMascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  let botonFuego = document.getElementById("botonFuego");
  let botonAgua = document.getElementById("botonAgua");
  let botonTierra = document.getElementById("botonTierra");

  botonFuego.addEventListener("click", () => seleccionarAtaque("FUEGO 🔥"));
  botonAgua.addEventListener("click", () => seleccionarAtaque("AGUA 💧"));
  botonTierra.addEventListener("click", () => seleccionarAtaque("TIERRA 🌻"));

  let botonReiniciar = document.getElementById("reiniciar");
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  document.getElementById("seleccionar-ataque").style.display = "block";
  document.getElementById("seleccionar-mascota").style.display = "none";
  //.querySelector: devuelve el primer elemento que coincida con el selector CSS.
  const mascotaElegida = document.querySelector(
    'input[name="mascota"]:checked'
  );
  let spanMascotaJugador = document.getElementById("mascotaJugador");

  if (mascotaElegida) {
    const nombreMascota = mascotaElegida.nextElementSibling.textContent;
    spanMascotaJugador.innerHTML = nombreMascota;

    alert(`SELECCIONASTE A TU MASCOTA!: ${nombreMascota}`);

    seleccionarMascotaEnemigo();
  } else {
    alert("No has seleccionado ninguna mascota.");
  }
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(1, 6);
  let nombreMascotaEnemigo = "";
  switch (mascotaAleatoria) {
    case 1:
      nombreMascotaEnemigo = "Charizard";
      break;
    case 2:
      nombreMascotaEnemigo = "Vulpix";
      break;
    case 3:
      nombreMascotaEnemigo = "Milotic";
      break;
    case 4:
      nombreMascotaEnemigo = "Vaporeon";
      break;
    case 5:
      nombreMascotaEnemigo = "Garchomp";
      break;
    case 6:
      nombreMascotaEnemigo = "Diglett";
      break;
  }

  let spanMascotaEnemigo = document.getElementById("mascotaEnemigo");
  spanMascotaEnemigo.innerHTML = nombreMascotaEnemigo;
  alert(`La mascota enemiga es: ${nombreMascotaEnemigo}`);
}

function seleccionarAtaque(ataque) {
  ataqueJugador = ataque;
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO 🔥";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA 💧";
  } else {
    ataqueEnemigo = "TIERRA 🌻";
  }

  resultadoBatalla();
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo}. ${resultado}`;
  sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("mensajes");
  let parrafo = document.createElement("h3");
  parrafo.innerHTML = resultadoFinal;
  sectionMensajes.appendChild(parrafo);

  document.getElementById("reiniciar").style.display = "block";
}

function resultadoBatalla() {
  let spanVidasMascota = document.getElementById("vidasMascota");
  let spanVidasEnemigo = document.getElementById("vidasEnemigo");
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE 🤝");
  } else if (
    (ataqueJugador === "FUEGO 🔥" && ataqueEnemigo === "TIERRA 🌻") ||
    (ataqueJugador === "TIERRA 🌻" && ataqueEnemigo === "AGUA 💧") ||
    (ataqueJugador === "AGUA 💧" && ataqueEnemigo === "FUEGO 🔥")
  ) {
    crearMensaje("GANASTE! 😃🎉");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE! 😫❌");
    vidasMascota--;
    spanVidasMascota.innerHTML = vidasMascota;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo === 0) {
    desactivarBotones();
    alert("¡Felicidades, ganaste la batalla! 🎉");
    crearMensajeFinal("¡FELICITACIONES! 🥳");
  } else if (vidasMascota === 0) {
    desactivarBotones();
    alert("Oh no, perdiste la batalla. 😢");
    crearMensajeFinal("¡Suerte para la próxima! 🍀");
  }
}

function desactivarBotones() {
  document.getElementById("botonFuego").disabled = true;
  document.getElementById("botonAgua").disabled = true;
  document.getElementById("botonTierra").disabled = true;
}

function reiniciarJuego() {
  location.reload(); //Recarga la página
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
