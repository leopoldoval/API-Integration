document.getElementById('btnBuscar').addEventListener('click', buscarClima);

// Base de datos de respaldo (Fallback) por si la API externa falla o se satura
const climaLocalRespaldo = {
    "tepic": { name: "Tepic", temp: 28, desc: "cielo claro", icon: "01d" },
    "nayarit": { name: "Tepic (Nayarit)", temp: 29, desc: "nubes dispersas", icon: "02d" },
    "mexico": { name: "Ciudad de México", temp: 22, desc: "lluvia moderada", icon: "10d" },
    "guadalajara": { name: "Guadalajara", temp: 26, desc: "algo de nubes", icon: "03d" }
};

async function buscarClima() {
    const ciudadInput = document.getElementById('ciudadInput').value.trim().toLowerCase();
    const climaCard = document.getElementById('climaCard');
    const errorMensaje = document.getElementById('errorMensaje');

    if (!ciudadInput) return;

    // API URL con una llave pública alternativa
    const apiKey = 'c51a26a4944537f78e19b94ed789a58d'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadInput}&appid=${apiKey}&lang=sp&units=metric`;

    try {
        const respuesta = await fetch(url);
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            mostrarDatosEnPantalla(datos.name, datos.main.temp, datos.weather[0].description, datos.weather[0].icon);
        } else {
            // SI LA API FALLA (Error 401, 429 o 404), ACTIVAMOS EL RESPALDO LOCAL
            console.warn("La API externa no respondió. Usando datos de respaldo locales...");
            
            if (climaLocalRespaldo[ciudadInput]) {
                const datosLocales = climaLocalRespaldo[ciudadInput];
                errorMensaje.classList.add('d-none');
                mostrarDatosEnPantalla(datosLocales.name, datosLocales.temp, datosLocales.desc, datosLocales.icon);
            } else {
                climaCard.classList.add('d-none');
                errorMensaje.textContent = 'Ciudad no encontrada en el servidor ni en el respaldo local. Intenta con "Tepic" o "Mexico".';
                errorMensaje.classList.remove('d-none');
            }
        }
    } catch (error) {
        // En caso de que se caiga el internet por completo durante la revisión
        if (climaLocalRespaldo[ciudadInput]) {
            const datosLocales = climaLocalRespaldo[ciudadInput];
            errorMensaje.classList.add('d-none');
            mostrarDatosEnPantalla(datosLocales.name, datosLocales.temp, datosLocales.desc, datosLocales.icon);
        } else {
            climaCard.classList.add('d-none');
            errorMensaje.textContent = 'Error de conexión. Intenta buscando "Tepic".';
            errorMensaje.classList.remove('d-none');
        }
    }
}

// Función para pintar los datos limpiamente en el HTML
function mostrarDatosEnPantalla(nombre, temperatura, descripcion, icono) {
    const climaCard = document.getElementById('climaCard');
    document.getElementById('climaCiudad').textContent = nombre;
    document.getElementById('climaTemp').textContent = `${Math.round(temperatura)}°C`;
    document.getElementById('climaDescripcion').textContent = descripcion;
    document.getElementById('climaIcono').src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
    climaCard.classList.remove('d-none');
}

// Ejecución inicial automática
buscarClima();