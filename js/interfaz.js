class Interfaz {

    constructor() {
        
        this.init();
    }

    init() {
        
        this.construirSelect();
    }

    construirSelect() {

        cotizador.obtenerMonedasApi()
            .then(data => {
                // Crear un select con las monedas
                const arrayMoneda = data.monedas;
                const select = document.getElementById('criptomoneda');

                // Construir select desde la api
                arrayMoneda.map(moneda => {
                    // Añadir el id y el valor y después asignarlo al select
                    const option = document.createElement('option');
                    option.value = moneda.id;
                    option.appendChild(document.createTextNode(moneda.name));
                    select.appendChild(option);
                });
            });
    }

    mostrarMensajes(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        // Div para mensajes
        const divMenssaje = document.querySelector('.mensajes');
        divMenssaje.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    // Imprimir el resultado de la cotización
    mostrarResultado(resultado, moneda) {

        // En caso de que haya un resultado anterior, borrarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        // Mostrar el spinner
        this.mostrarSpinner();
        
        // Obtener la etiqueta de la moneda
        const etiMoneda = `price_${moneda}`;

        // Leer el valor del resultado
        const valor = resultado[etiMoneda];

        // Volver a poner el nombre de la moneda en mayúsculas
        const monedaUpper = moneda.toUpperCase();

        // Convierte la hora de UNIX a horas y minutos
        const hora = new Date(resultado.last_updated * 1000);
        const horaUpdate = `${hora.getHours()}:${hora.getMinutes()}`;

        // Crear el template
        let templateHtml = ``;
        templateHtml += `
        
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title"> Resultado:</span>
                    <p>El precio de ${resultado.name} a moneda ${monedaUpper} es de ${valor}</p>
                    <p>Última hora: ${resultado.percent_change_1h}</p>
                    <p>Último día: ${resultado.percent_change_24h}</p>
                    <p>Últimos 7 días: ${resultado.percent_change_7d}</p>
                    <p>Última actualización: ${horaUpdate} horas</p>
                </div>
            </div>
        `;
        // Ocultar spinner y mostrar resultado
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHtml;
            document.querySelector('.spinner img').remove();
        }, 3000);
    }

    // Muestra un spinner mientras de cotiza
    mostrarSpinner() {
        const spinner = document.createElement('img');
        spinner.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinner);
    }
}