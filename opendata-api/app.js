async function obtenerFotoNasa() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('nasaContent');
    const errorNasa = document.getElementById('errorNasa');
    const mediaContainer = document.getElementById('mediaContainer');

    // URL oficial de la NASA con la Demo Key abierta
    const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Ocultamos el cargador y mostramos el contenedor principal
            loader.classList.add('d-none');
            content.classList.remove('d-none');

            // Inyectamos textos base
            document.getElementById('nasaTitle').textContent = datos.title;
            document.getElementById('nasaDate').textContent = `Fecha: ${datos.date}`;
            document.getElementById('nasaExplanation').textContent = datos.explanation;

            // Limpiamos el contenedor multimedia por seguridad
            mediaContainer.innerHTML = '';

            // Validación del tipo de archivo (Imagen vs Video)
            if (datos.media_type === 'image') {
                mediaContainer.innerHTML = `
                    <img src="${datos.url}" alt="${datos.title}" class="img-fluid img-space shadow">
                `;
            } else if (datos.media_type === 'video') {
                // Si es un video, creamos un iframe responsivo adaptado para reproductores como YouTube
                mediaContainer.innerHTML = `
                    <div class="ratio ratio-16x9">
                        <iframe src="${datos.url}" title="${datos.title}" allowfullscreen class="rounded"></iframe>
                    </div>
                `;
            }

        } else {
            loader.classList.add('d-none');
            errorNasa.textContent = `Error de la NASA: ${datos.error.message}`;
            errorNasa.classList.remove('d-none');
        }
    } catch (error) {
        console.error(error);
        loader.classList.add('d-none');
        errorNasa.textContent = 'No se pudo establecer conexión con los servicios de datos abiertos de la NASA.';
        errorNasa.classList.remove('d-none');
    }
}

// Ejecutar la llamada automáticamente al abrir la aplicación
obtenerFotoNasa();