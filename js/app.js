// Instanciar todas las clases
const cotizador = new Cotizador();
const ui = new Interfaz();


// Obtener el formulario
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Leer la moneda seleccionada
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // Leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    // Comprobar que los datos no esten vacios
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        // Faltan datos, mostrar alerta
        ui.mostrarMensajes('Ambos campos son obligatorios', 'deep-orange darken-4 card-panel');
    } else {
        // Todo correcto, tomar valores del select y ejecutar
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado[0], monedaSeleccionada.toLowerCase());
                console.log(data.resultado[0]);
            });
    }
});