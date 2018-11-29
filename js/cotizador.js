class Cotizador {

    // Obtiene todo el JSON con las criptomonedas
    async obtenerMonedasApi() {
        // Fetch a la API 
        const urlObtenerMonedas = await fetch('https://api.coinmarketcap.com/v1/ticker/');

        // Respuesta a JSON de las monedas
        const monedas = await urlObtenerMonedas.json();

        return {
            monedas
        }
    } 

    async obtenerValores(moneda, criptomoneda) {
        const urlConvertir = await fetch
        (`https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`);

        const resultado = await urlConvertir.json();

        return { resultado }
    }
}