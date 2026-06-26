/**
 * Cambia el flujo de video actual interactuando con la API del reproductor
 * @param {string} urlVideo - Enlace directo al archivo de video en el servidor abierto
 */
function cambiarCanal(urlVideo) {
    const video = document.getElementById('videoPlayer');
    const source = document.getElementById('videoSource');

    // 1. Cambiamos la URL de origen del stream
    source.src = urlVideo;

    // 2. La API de video requiere recargar el componente para montar el nuevo flujo
    video.load();

    // 3. Reproducir automáticamente el nuevo canal
    video.play().catch(error => {
        console.log("El navegador bloqueó el autoplay inicial, esperando interacción del usuario.");
    });

    console.log(`[Streaming API] Conectado exitosamente al flujo de datos: ${urlVideo}`);
}