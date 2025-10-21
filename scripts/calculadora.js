let numero1;
let numero2;
let operation;
let state;

// Operaciones
const OPERACION_SUMA = 1;
const OPERACION_RESTA = 2;
const OPERACION_MULTIPLICACIONA = 3;
const OPERACION_DIVISION = 4;
const OPERACION_PORCENTAJE = 5;

// Estados
const ESTADO_INICIAL = 1;
const ESTADO_CAPTURA_A = 2;
const ESTADO_CALCULO = 3;
const ESTADO_CAPTURA_B = 4;
const ESTADO_RESULTADO = 5;

// Acciones
const ACTION_NUMBER = 1;
const ACTION_OPERATION = 2;
const ACTION_RESULT = 3;

function load() {
    for(let i=0; i<10; i++) {
        let button = document.getElementById("button"+i);
        button.addEventListener("click", function () {
            pressNumber(i);
        });
    }
    let buttonPunto = document.getElementById("buttonPunto");
    buttonPunto.addEventListener("click", function () {
        addDisplay(".")
    });

    let buttonSuma = document.getElementById("buttonSuma");
    buttonSuma.addEventListener("click", function() {
        operate(OPERACION_SUMA);
    });
    let buttonResta = document.getElementById("buttonResta");
    buttonResta.addEventListener("click", function () {
        operate(OPERACION_RESTA);
    });
    let buttonMultiplica = document.getElementById("buttonMultiplica");
    buttonMultiplica.addEventListener("click",function () {
        operate(OPERACION_MULTIPLICACIONA);
    });
    let buttonDivide = document.getElementById("buttonDivision");
    buttonDivide.addEventListener("click", function () {
        operate(OPERACION_DIVISION);
    });
    let buttonPorcentaje = document.getElementById("buttonPorcentaje");
    buttonPorcentaje.addEventListener("click", function () {
        operate(OPERACION_PORCENTAJE)
    });
    let buttonCalcular = document.getElementById("buttonCalcular");
    buttonCalcular.addEventListener("click", function () {
        stateMachine(ACTION_RESULT);
    });
    let buttonClear = document.getElementById("buttonAC");
    buttonClear.addEventListener("click", function () {
        cleanDisplay();
    });
    state = ESTADO_INICIAL;
}


///////// Funciones de la calculadora

function suma(a, b) {
    return a+b;
}

function resta(a, b) {
    return a - b;
}

function multiplica (a, b) {
    return a * b;
}

function divide (a, b) {
    return a/b;
}

function porcentaje (a, b) {
    return a * b / 100;
}

//// Funciones de la interfaz de la calculadora

function pressNumber(i) {
    stateMachine(ACTION_NUMBER);
    addDisplay(i);
}

function cleanDisplay() {
    let display = document.getElementById("display");
    display.value = "";
}

function addDisplay(value) {
    let display = document.getElementById("display");
    display.value = display.value + value;
}

function operate(operator) {
    stateMachine(ACTION_OPERATION, operator);
}

function stateMachine(action, parameter) {
    if(state == ESTADO_INICIAL && action == ACTION_NUMBER) {
        state = ESTADO_CAPTURA_A;
    } else if(state == ESTADO_CAPTURA_A && action == ACTION_NUMBER) {
        state == ESTADO_CAPTURA_A;
    } else if(state == ESTADO_CAPTURA_A && action == ACTION_OPERATION) {
        state = ESTADO_CALCULO;
        operation = parameter;
        numero1 = parseInt(document.getElementById("display").value);
        cleanDisplay();
    } else if (state == ESTADO_CALCULO && action == ACTION_OPERATION) {
        state = ESTADO_CALCULO;
    }  else if (state == ESTADO_CALCULO && action == ACTION_NUMBER) {
        state = ESTADO_CAPTURA_B;
    } else if (state == ESTADO_CAPTURA_B 
            && (action == ACTION_OPERATION || action == ACTION_RESULT)) {
        numero2 = parseInt(document.getElementById("display").value);
        state = ESTADO_RESULTADO;
        resultado = calcular();
    }
}

function calcular() {
    if(operation === OPERACION_SUMA) {
        let resultado = suma(numero1,numero2);
        let display = document.getElementById("display");
        display.value = resultado;
    }
    else if(operation === OPERACION_RESTA) {
        let resultado = resta(numero1,numero2);
        let display = document.getElementById("display");
        display.value = resultado;
    }
    else if(operation === OPERACION_MULTIPLICACIONA) {
        let resultado = multiplica(numero1,numero2);
        let display = document.getElementById("display");
        display.value = resultado;
    }
    else if(operation === OPERACION_DIVISION) {
        let resultado = divide(numero1,numero2);
        let display = document.getElementById("display");
        display.value = resultado;
    }
    else if(operation === OPERACION_PORCENTAJE) {
        let resultado = porcentaje(numero1,numero2);
        let display = document.getElementById("display");
        display.value = resultado;
    }

}