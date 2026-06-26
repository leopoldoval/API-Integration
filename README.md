# Integración de APIs y Arquitectura de Servicios

Este repositorio contiene la solución al proyecto escolar de consumo de servicios web externos y manejo de datos asíncronos. La solución se desarrolló bajo la modalidad de **Proyectos Independientes**, estructurando el código de manera lógica en cuatro módulos independientes utilizando tecnologías nativas del frontend (HTML5, JavaScript Asíncrono y Bootstrap 5 para el diseño responsivo).

---

## Estructura del Repositorio

El repositorio está organizado exactamente en 4 carpetas, una para cada categoría requerida en las instrucciones del proyecto:

* **`/geolocation-api` (Geolocalización)**: Consume la API de *OpenWeather* para consultar el clima actual de cualquier ciudad del mundo en tiempo real, renderizando datos dinámicos mediante peticiones `fetch`.
* **`/opendata-api` (Bases de Datos / Open Data)**: Conecta con la API APOD de la *NASA* para obtener de forma asíncrona la imagen astronómica del día junto con su correspondiente título y descripción científica.
* **`/social-api` (Social Media)**: Lector de feeds y tendencias que consume la API REST abierta de *Tabnews*, exponiendo las publicaciones, autores y contadores de interacción más relevantes de la comunidad.
* **`/streaming-api` (Streaming)**: Plataforma multimedia que interactúa con la API nativa de JavaScript para el control de elementos de video en HTML5, permitiendo alternar de manera dinámica flujos de streaming (.mp4) desde servidores de datos abiertos (*Archive.org*).
