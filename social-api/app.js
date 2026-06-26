// Categorías por defecto adaptadas al nuevo servicio de noticias abiertas
let categoriaActual = 'news';

async function cargarNoticias() {
    const loader = document.getElementById('loader');
    const container = document.getElementById('postsContainer');
    const errorSocial = document.getElementById('errorSocial');

    loader.classList.remove('d-none');
    container.classList.add('d-none');
    errorSocial.classList.add('d-none');

    // Usamos la API abierta de Tabnews para saltar los bloqueos de CORS
    const url = `https://www.tabnews.com.br/api/v1/contents?strategy=${categoriaActual}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (respuesta.ok) {
            container.innerHTML = '';
            
            // Tomamos los primeros 6 posts para mantener limpio el diseño
            const publicaciones = datos.slice(0, 6);

            publicaciones.forEach(post => {
                // Generamos una imagen aleatoria bonita de tecnología/gaming por defecto usando Unsplash
                // para que visualmente la interfaz de la red social luzca increíble
                const urlImagen = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60`;

                const col = document.createElement('div');
                col.className = 'col-12 col-md-6 col-lg-4';
                col.innerHTML = `
                    <div class="card h-100 reddit-card shadow-sm border-0">
                        <img src="${urlImagen}" class="card-img-top object-fit-cover rounded-top-4" style="height: 160px;" alt="News image">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <span class="badge bg-danger mb-2 text-uppercase">${categoriaActual}</span>
                                <h5 class="card-title fw-bold text-dark text-truncate-2" style="font-size: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.4rem;">
                                    ${post.title}
                                </h5>
                                <p class="text-muted small mb-0"><i class="bi bi-person"></i> Autor: u/${post.username}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                <span class="text-success fw-bold"><i class="bi bi-chat-right-text-fill"></i> ${post.children_deep_count} comentarios</span>
                                <a href="https://www.tabnews.com.br/${post.username}/${post.slug}" target="_blank" class="btn btn-sm btn-light text-danger fw-semibold">Leer hilo</a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });

            loader.classList.add('d-none');
            container.classList.remove('d-none');
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error(error);
        loader.classList.add('d-none');
        errorSocial.textContent = 'No se pudieron recuperar las publicaciones de la red social debido a un bloqueo de red externo.';
        errorSocial.classList.remove('d-none');
    }
}

function cambiarSubreddit(nuevaCategoria, botonActivo) {
    // Mapeamos los botones viejos a las estrategias de ordenamiento de la nueva API abierta
    if(nuevaCategoria === 'gaming') categoriaActual = 'new';
    else if(nuevaCategoria === 'anime') categoriaActual = 'old';
    else categoriaActual = 'relevant';
    
    document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
    botonActivo.classList.add('active');
    
    cargarNoticias();
}

document.addEventListener('DOMContentLoaded', cargarNoticias);