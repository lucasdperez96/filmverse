//POP-UP

// Get the modal
const modal = document.querySelector("#pelicula");
const video = document.querySelector("#ifr");

// Get the <span> element that closes the modal
const closeModal = document.getElementsByClassName("close")[0];



// Get the button that opens the modal
const btn = document.querySelectorAll(".cartelPelicula");
const enter = document.querySelectorAll(".buscador");



for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        modal.style.display = "block";
    });
}

for (let i = 0; i < enter.length; i++) {
    enter[i].addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            modal.style.display = "block";
        }
    });
}

// When the user clicks the button, open the modal
enter.onkeypress = function (e) {
    video.src = 'https://image.tmdb.org/t/p/w500${poster_path}';
    modal.style.display = "block";

};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
    modal.style.display = "none";
    video.src = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// Javascript search API
// Inicio con un texto por default
const inicio = document.getElementById('renderizado-datos').innerHTML = `Inserte su busqueda en el buscador`


function getApiInfo(valuesInput) {
    // URL de la API
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=026bb8c96a5c47d0912cdf70616d9379&language=es-MX&query=${valuesInput}`;
    
    // Method
    const miInit = { method: 'GET' };

    // Realizo el Fetch para obtener datos    
    fetch(apiUrl, miInit)
        .then(response => response.json())
        .then(data => {

            // Obtengo data un array de las peliculas mas cercanas que encontro; filtro el primer array [0]
            let filtradoSearch = data.results[0]

            // Valido si me viene undefinend si la pelicula no se encontro
            if (filtradoSearch === undefined) {

                document.getElementById("renderizado-datos")
                    .innerHTML = `La pelicula no se encontro`;

                // Si encontro la pelicula renderizo datos
            } else {
                // destructuring
                const { poster_path, title, overview, vote_average, vote_count, release_date, id } = filtradoSearch;

                const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=026bb8c96a5c47d0912cdf70616d9379&language=es-MX`;

                fetch(videoUrl, miInit)
                    .then(response => response.json())
                    .then(video => {

                        let filtradoVideo = video.results[0]
                        const { key, type, site, official } = filtradoVideo;

                        document.getElementById("renderizado-datos")
                            .innerHTML = `
                            <style>
                            .sinopsis {
                                flex: 2;
                                max-width: 100%;
                                padding: 1rem 1rem;
                            }
                        
                            .close,
                            .close-imp {
                                color: #aaa;
                                font-size: 2rem;
                                font-weight: bold;
                                padding: 0 1rem;
                                border-radius: 2px;
                                transition: 0.4s ease-out;
                                display: block;
                                text-align: end;
                            }
                        
                            .close:hover,
                            .close:focus,
                            .close-imp:hover,
                            .close-imp:focus {
                                color: #111;
                                text-decoration: none;
                                cursor: pointer;
                            }
                        
                            .tituloPelicula {
                                display: flex;
                                justify-content: space-between;
                                font-family: "Patua One", cursive;
                                font-size: 3.5rem;
                                margin: 0;
                                padding: 0;
                            }
                        
                            .cuerpo {
                                display: flex;
                                padding: 30px 0;
                            }
                        
                            .tituloPelicula {
                                padding-top: 2rem;
                            }
                        
                            .final {
                                padding-bottom: 2rem;
                            }
                        
                            h1 {
                                font-family: "Patua One", cursive;
                                text-align: center;
                                font-size: 3rem;
                            }
                        
                            .peliInfo {
                                width: 50%;
                                display: flex;
                            }
                        
                            .peliInfo span {
                                margin-left: 30px;
                                color: #fff;
                            }
                        
                            .final {
                                padding: 0 48px;
                            }
                        

                            .cartelera-pelicula p {
                                color: #fff;
                              }

                            .modalTitle {
                                width: 80%;
                                font-size: 33px;
                                margin: 10px auto;
                                text-align: center;
                                text-transform: capitalize;
                                font-style: italic;
                            }


                        </style>
                        
                        
                        <div class="contenido">
                            <p class="modalTitle">${title}</p>
                            <div class="final">
                                <div class="Sinopsis">
                                    <p> <b>Sinopsis</b><br>
                                        ${overview}</p>
                                </div>
                                <div class="cuerpo">
                                    <div class="peliInfo">
                                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" width="140" height="210"><a
                                            href=""></a>
                                        <span>
                                            <p> <b>Ficha Técnica:</b><br><br>
                                            <div id="estrellas"></div>
                                            Estrellas: ${vote_average}<br />
                                            Año: ${release_date}<br />
                                            Votos: ${vote_count}<br />
                                        </span>
                        
                                    </div>
                                    <div class="trailer" id="t1">
                                        <iframe id="ifr" width="680" height="375" src="https://www.youtube.com/embed/${key}"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                            `;
                    })
            }
            // function para crear estrellas
            function starRanking() {
                // redondear el numero que me llega
                const star = Math.round(`${filtradoSearch.vote_average}`)
                var text = "";

                // loop
                for (i = 0; i < star; i++) {
                    text += `<i class="fas fa-star"></i>`;
                }
                document.getElementById("estrellas").innerHTML = text;
            }
            starRanking();

            // prueba de otro fetch
            console.log(`test ${filtradoSearch.id}`)
        })
        .catch(error => console.error(error));

};

function getCardInfo(event) {
    const cardInput1 = document.getElementById('cardImg').alt;
    const cardInput = cardInput1.replace(/\s/g, '+');
    
    getApiInfo(cardInput);
}

function getImgInfo(img) {
    const imgInput1 = img.alt;
    const imgInput = imgInput1.replace(/\s/g, '+');

    getApiInfo(imgInput);
}


function getApiSearch(event) {
    const searchInput1 = document.getElementById('search-input').value;
    if (event.key === "Enter") {

        const searchInput = searchInput1.replace(/\s/g, '+');

        getApiInfo(searchInput);
    }
}

