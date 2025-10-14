function load() {
  console.log("La página ha cargado completamente");
  for (let i = 0; i <= 9; i++) { // Ajusta el límite del bucle si solo tienes hasta 9
    let button = document.getElementById("button" + i);

    // SOLUCIÓN: Verifica si el botón NO es null antes de usarlo
    if (button) {
      button.addEventListener("click", function () {
        let display = document.getElementById("display");
        display.value = display.value + i;
      });
    } else {
      // (Opcional) Te ayuda a ver qué ID falta
      console.warn("Advertencia: No se encontró el botón con ID: button" + i);
    }
  }
}



//// funciones de la calculadora ////

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplica(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: División por cero";
  }
  return a / b;
}
function porcentaje(a, b) {
  return (a * b) / 100;
}
//// funciones de la interfaaz de la calculadora ////
function clean() {
  let display = document.getElementById("display");
}