// =================================================================
// 1. EXTENSIÓN DE CONSTANTES (Mismos que antes)
// =================================================================
const OPERACION_RAIZ = 6;
const OPERACION_POTENCIA = 7;
const OPERACION_LOG = 8;
const OPERACION_LN = 9;
const OPERACION_SIN = 10;
const OPERACION_COS = 11;
const OPERACION_TAN = 12;
const OPERACION_FACTORIAL = 13;
const OPERACION_SIGNO = 14;

const ACTION_UNARY_OP = 4;


// =================================================================
// 2. FUNCIONES MATEMÁTICAS Y LÓGICA UNARIA (Mismas que antes)
// =================================================================

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculateUnary(op, a) {
    // Usar parseFloat para manejar decimales
    const num = parseFloat(a); 
    if (isNaN(num)) return NaN;
    
    // Se asume que las funciones trigonométricas operan en grados
    const angleInRadians = num * (Math.PI / 180); 

    switch (op) {
        case OPERACION_RAIZ: return Math.sqrt(num);
        case OPERACION_POTENCIA: return Math.pow(num, 2);
        case OPERACION_LOG: return Math.log10(num);
        case OPERACION_LN: return Math.log(num);
        case OPERACION_SIN: return Math.sin(angleInRadians);
        case OPERACION_COS: return Math.cos(angleInRadians);
        case OPERACION_TAN: return Math.tan(angleInRadians);
        case OPERACION_FACTORIAL: return factorial(Math.floor(num));
        case OPERACION_SIGNO: return num * -1;
        default: return num;
    }
}

function operateUnary(operator) {
    stateMachine(ACTION_UNARY_OP, operator);
}

function deleteLast() {
    let display = document.getElementById("display");
    // Esto asegura que la lógica de la máquina de estados no se vea afectada por el borrado.
    if (state === ESTADO_RESULTADO) {
        cleanDisplay();
        state = ESTADO_CAPTURA_A; // O el estado deseado después de borrar un resultado
    } else {
        display.value = display.value.slice(0, -1);
    }
}


// =================================================================
// 3. SOBREESCRITURA DE LA MÁQUINA DE ESTADOS (STATE MACHINE)
// =================================================================

// Guardamos la referencia a la función original de la calculadora.js
const originalStateMachine = stateMachine; 

stateMachine = function(action, parameter) {
    const displayValue = document.getElementById("display").value;

    if (action === ACTION_UNARY_OP) {
        // Ejecutar la operación unaria inmediatamente
        let result = calculateUnary(parameter, displayValue);
        document.getElementById("display").value = result;
        state = ESTADO_RESULTADO; 
        return; 
    }

    // Si no es una acción unaria, llama a la lógica de la máquina de estados básica
    originalStateMachine(action, parameter);
};


// =================================================================
// 4. INICIALIZACIÓN DE BOTONES CIENTÍFICOS (Función Extensora)
// =================================================================

// **SOLUCIÓN AL DOBLE MARCADO:**
// Nos enfocamos en los botones NUEVOS y REEMPLAZAMOS el listener del botón de signo.
function initCientifica() {
    // A) REEMPLAZAR BOTÓN DE SIGNO (+/-)
    // El listener del botón de Signo en calculadora.js es simple o inexistente.
    // Lo sobrescribimos para usar la lógica unaria.
    let buttonSigno = document.getElementById("buttonSigno");
    
    // Es difícil remover el listener genérico del archivo base sin una referencia,
    // pero al añadir un nuevo listener, el nuevo se ejecuta.
    // Lo más limpio es re-conectar:
    buttonSigno.addEventListener("click", () => operateUnary(OPERACION_SIGNO));

    // B) CONECTAR BOTONES CIENTÍFICOS (NUEVOS)
    document.getElementById("buttonRaiz").addEventListener("click", () => operateUnary(OPERACION_RAIZ));
    document.getElementById("buttonPotencia").addEventListener("click", () => operateUnary(OPERACION_POTENCIA));
    document.getElementById("buttonLog").addEventListener("click", () => operateUnary(OPERACION_LOG));
    document.getElementById("buttonLN").addEventListener("click", () => operateUnary(OPERACION_LN));
    document.getElementById("buttonSin").addEventListener("click", () => operateUnary(OPERACION_SIN));
    document.getElementById("buttonCos").addEventListener("click", () => operateUnary(OPERACION_COS));
    document.getElementById("buttonTan").addEventListener("click", () => operateUnary(OPERACION_TAN));
    document.getElementById("buttonFactorial").addEventListener("click", () => operateUnary(OPERACION_FACTORIAL));
    
    // C) CONECTAR BOTONES DE CONTROL ÚNICOS
    document.getElementById("buttonDEL").addEventListener("click", deleteLast); 

    // D) CONSTANTES Y PARÉNTESIS
    document.getElementById("buttonPi").addEventListener("click", () => addDisplay(Math.PI.toFixed(10)));
    document.getElementById("buttonEXP").addEventListener("click", () => addDisplay(Math.E.toFixed(10)));
    document.getElementById("buttonParentesisAbre").addEventListener("click", () => addDisplay("("));
    document.getElementById("buttonParentesisCierra").addEventListener("click", () => addDisplay(")"));
}

// Sobrescribir la función 'load' original para llamarla y luego inicializar la científica.
const originalLoad = load; 

load = function() {
    // 1. Llama a la inicialización de la calculadora básica
    originalLoad(); 
    
    // 2. Conecta solo los elementos de la calculadora científica
    initCientifica();
};