const iconoMenu = document.querySelector('#icono-menu'),
    menu = document.querySelector('#menu')

iconoMenu.addEventListener('click', (e) => {

    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');

    const rutaActual = e.target.getAttribute('src');

})

const fila1 = document.querySelector(".contenedor-carousel1");
const fila2 = document.querySelector(".contenedor-carousel2");
const filaSpotlight1 = document.querySelector(".Spotlight1"); //AHORA HACEMOS REFERENCIA AL DIV NUEVO, QUE ES EL QUE SE MUEVE
const filaSpotlight2 = document.querySelector(".Spotlight2");
const peliculas = document.querySelector(".pelicula");

const flechaDerechaSpotlight1 = document.getElementById(
  "flecha-derecha-spotlight1"
);
const flechaIzquierdaSpotlight1 = document.getElementById(
  "flecha-izquierda-spotlight1"
); //LÓGICA BOTÓN IZQ

const flechaDerechaSpotlight2 = document.getElementById(
  "flecha-derecha-spotlight2"
);
const flechaIzquierdaSpotlight2 = document.getElementById(
  "flecha-izquierda-spotlight2"
);

const flechaIzquierda1 = document.getElementById("flecha-izquierda1");
const flechaDerecha1 = document.getElementById("flecha-derecha1");

const flechaIzquierda2 = document.getElementById("flecha-izquierda2");
const flechaDerecha2 = document.getElementById("flecha-derecha2");

// LÓGICA BOTON DERECHO 1
flechaDerechaSpotlight1.addEventListener("click", () => {
  const scrollAmount = filaSpotlight1.offsetWidth;
  filaSpotlight1.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

// LÓGICA BOTÓN IZQ 1
flechaIzquierdaSpotlight1.addEventListener("click", () => {
  const scrollAmount = filaSpotlight1.offsetWidth;
  filaSpotlight1.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

// LÓGICA BOTON DERECHO 2
flechaDerechaSpotlight2.addEventListener("click", () => {
  const scrollAmount = filaSpotlight2.offsetWidth;
  filaSpotlight2.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

// LÓGICA BOTÓN IZQ 2
flechaIzquierdaSpotlight2.addEventListener("click", () => {
  const scrollAmount = filaSpotlight2.offsetWidth;
  filaSpotlight2.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

flechaDerecha1.addEventListener("click", () => {
  fila1.scrollLeft += fila1.offsetWidth;
});

flechaIzquierda1.addEventListener("click", () => {
  fila1.scrollLeft -= fila1.offsetWidth;
});

flechaDerecha2.addEventListener("click", () => {
  fila2.scrollLeft += fila2.offsetWidth;
});

flechaIzquierda2.addEventListener("click", () => {
  fila2.scrollLeft -= fila2.offsetWidth;
});

// API themoviedb

const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzVmMzAxMTM4ZDgxMDMzNWNlZTIzMGQ1MDg2MDJjYiIsInN1YiI6IjY0NjU4YTUwZDE4NTcyMDEyMDdmNThmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAKpsjWVYSPmWUlM0eXIGu5ERlqFHdX5mo4_mzG-7w8",
    },
  };


// Descubrir peliculas

let displayedMovieIds = [];

// Función para obtener películas al azar
function getRandomMovies() {
  const page = Math.floor(Math.random() * 500) + 1;
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc`;

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      const discoverMovieList = data.results.filter(
        (movie) => !displayedMovieIds.includes(movie.id)
      );

      if (discoverMovieList.length === 0) {
        displayedMovieIds = [];
        getRandomMovies();
        return;
      }

      const randomMovies = [];
      while (randomMovies.length < 4) {
        const randomIndex = Math.floor(Math.random() * discoverMovieList.length);
        const randomMovie = discoverMovieList[randomIndex];
        randomMovies.push(randomMovie);
        displayedMovieIds.push(randomMovie.id); // Guardar los IDs de las películas mostradas
        discoverMovieList.splice(randomIndex, 1); // Eliminar la película de la lista para evitar duplicados
      }

      // Mostrar las películas aleatorias
      const movieData = {};

      randomMovies.forEach((movie, i) => {
        const miniaturePath = movie.backdrop_path;
        const miniatureUrl = `https://image.tmdb.org/t/p/w500${miniaturePath}`;
        const posterPath = movie.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const movieTitle = movie.title;
        const releaseDate = movie.release_date;
        const id = movie.id;
        const descripcion = movie.overview;
        const promVotos = movie.vote_average;
        const totalVotos = movie.vote_count;

        movieData[i] = {
          miniatureUrl: miniatureUrl,
          movieTitle: movieTitle,
          releaseDate: releaseDate,
          posterUrl: posterUrl,
          id: id,
          descripcion: descripcion,
          promVotos: promVotos,
          totalVotos: totalVotos
        };

        const imageElement = document.getElementById(`movieDiscovery${i}`);
        if (imageElement) {
          imageElement.src = movieData[i].miniatureUrl;
          imageElement.alt = movieData[i].movieTitle;
          
        }

        const titleElement = document.getElementById(`movieTitle${i}`);
        if (titleElement) {
          titleElement.textContent = `${movieData[i].movieTitle}`;
        }

        const releaseDateElement = document.getElementById(`releaseDate${i}`);
        if (releaseDateElement) {
          releaseDateElement.textContent = `Lanzamiento: ${movieData[i].releaseDate}`;
        }

        configureMovieSelection(i);
      });

      function configureMovieSelection(movieIndex) {
        const selectMovie = document.getElementById(`selectMovie${movieIndex}`);
        const descripSelec = document.getElementById('descripSelec');
        const poster = document.getElementById('poster');
        const titulo = document.getElementById('titulo');
        const fecha = document.getElementById('fecha');
        const descripcion = document.getElementById('descripcion');

        selectMovie.addEventListener('click', () => {
          descripSelec.classList.add('show');
          const movie = movieData[movieIndex];
          descripSelec.style.display = 'flex';
          poster.src = movie.posterUrl;
          poster.alt = movie.movieTitle;
          titulo.textContent = movie.movieTitle;
          fecha.textContent = `Lanzamiento: ${movie.releaseDate}`;
          descripcion.textContent = movie.descripcion;
          descripSelec.scrollIntoView({ behavior: 'smooth' });
        });
      }
    })
    .catch((err) => console.error(err));
}

getRandomMovies();


// Descubrir series

let displayedTVShowIds = [];

function getRandomTVShows() {
  const page = Math.floor(Math.random() * 26) + 1; // Obtener una página aleatoria entre 1 y 500
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_origin_country=US`;

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      const topRatedTVShowsList = data.results.filter(
        (tvshow) => !displayedTVShowIds.includes(tvshow.id)
      );

      if (topRatedTVShowsList.length === 0) {
        displayedTVShowIds = [];
        getRandomTVShows();
        return;
      }

      const randomTVShows = [];
      while (randomTVShows.length < 4) {
        const randomIndex = Math.floor(Math.random() * topRatedTVShowsList.length);
        const randomTVShow = topRatedTVShowsList[randomIndex];
        randomTVShows.push(randomTVShow);
        displayedTVShowIds.push(randomTVShow.id);
        topRatedTVShowsList.splice(randomIndex, 1);
      }

      const tvshowData = {};

      randomTVShows.forEach((tvshow, i) => {
        const tvshowName = tvshow.name;
        const id = tvshow.id;
        const miniaturePath = tvshow.backdrop_path;
        const miniatureUrl = `https://image.tmdb.org/t/p/w500${miniaturePath}`;
        const posterPath = tvshow.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const firstAirDate = tvshow.first_air_date;
        const descripcion = tvshow.overview;
        const popularity = tvshow.popularity;
        const promVotos = tvshow.vote_average;
        const totalVotos = tvshow.vote_count;

        tvshowData[i] = {
          miniatureUrl: miniatureUrl,
          posterUrl: posterUrl,
          id: id,
          tvshowName: tvshowName,
          firstAirDate: firstAirDate,
          descripcion: descripcion,
          popularity: popularity,
          promVotos: promVotos,
          totalVotos: totalVotos
        };

        const imageElement = document.getElementById(`tvshowDiscovery${i}`);
        if (imageElement) {
          imageElement.src = tvshowData[i].miniatureUrl;
          imageElement.alt = tvshowData[i].tvshowName;
        }

        const nameElement = document.getElementById(`tvshowName${i}`);
        if (nameElement) {
          nameElement.textContent = tvshowData[i].tvshowName;
        }

        const firstAirDateElement = document.getElementById(`firstAirDate${i}`);
        if (firstAirDateElement) {
          firstAirDateElement.textContent = `Lanzamiento: ${tvshowData[i].firstAirDate}`;
        }

        configureShowSelection(i);
      });

      function configureShowSelection(showIndex) {
        const selectShow = document.getElementById(`selectShow${showIndex}`);
        const descripSelec = document.getElementById('descripSelec');
        const poster = document.getElementById('poster');
        const titulo = document.getElementById('titulo');
        const fecha = document.getElementById('fecha');
        const descripcion = document.getElementById('descripcion');

        selectShow.addEventListener('click', () => {
          descripSelec.classList.add('show');
          const show = tvshowData[showIndex];
          descripSelec.style.display = 'flex';
          poster.src = show.posterUrl;
          poster.alt = show.tvshowName;
          titulo.textContent = show.tvshowName;
          fecha.textContent = `Lanzamiento: ${show.firstAirDate}`;
          descripcion.textContent = show.descripcion;
          descripSelec.scrollIntoView({ behavior: 'smooth' });
        });
      }
    })
    .catch((err) => console.error(err));
}

getRandomTVShows();

// TOP 10 Peliculas

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const popularMovieList = data.results;

    console.log(popularMovieList);

    const moviePromises = popularMovieList.map((movie) =>
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=es-ES`, options)
        .then((movieResponse) => movieResponse.json())
        .then((movieData) => {
          return {
            miniatureUrl: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            movieTitle: movie.title,
            releaseDate: movieData.release_date,
            descripcion: movieData.overview,
          };
        })
        .catch((err) => {
          console.error(`Error al obtener la información para la película ${movie.title}`, err);
          return null;
        })
    );

    Promise.all(moviePromises)
      .then((movieDetails) => {
        for (let i = 0; i <= 9; i++) {
          const movie = movieDetails[i];
          if (movie) {
            const imageElement = document.getElementById(`topMovie${i}`);
            if (imageElement) {
              imageElement.src = movie.miniatureUrl;
              imageElement.alt = movie.movieTitle;
              configureTopMovieSelection(i, movie);
            }
          } else {
            console.error(`Error al obtener la información para la película ${i}`);
          }
        }
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

function configureTopMovieSelection(movieIndex, movieData) {
  const selectMovie = document.getElementById(`topMovie${movieIndex}`);
  const descripSelec = document.getElementById('descripSelec');
  const poster = document.getElementById('poster');
  const titulo = document.getElementById('titulo');
  const fecha = document.getElementById('fecha');
  const descripcion = document.getElementById('descripcion');

  selectMovie.addEventListener('click', () => {
    descripSelec.classList.add('show');
    descripSelec.style.display = 'flex';
    poster.src = movieData.posterUrl;
    poster.alt = movieData.movieTitle;
    titulo.textContent = movieData.movieTitle;
    fecha.textContent = `Lanzamiento: ${movieData.releaseDate}`;
    descripcion.textContent = movieData.descripcion;
    descripSelec.scrollIntoView({ behavior: 'smooth' });
  });
}



// TOP 10 Series
fetch("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=popularity.desc&with_origin_country=AR", options)
  .then((response) => response.json())
  .then((data) => {
    const popularTVShowList = data.results;

    console.log(popularTVShowList);

    let tvshowIndex = 0;

    for (let i = 0; i <= 9; i++) {
      let serie = popularTVShowList[tvshowIndex];
      let imagePath = serie.backdrop_path;
      const tvshowName = serie.name;
      const posterPath = serie.poster_path;

      while (!imagePath && tvshowIndex < popularTVShowList.length - 1) {
        tvshowIndex++;
        serie = popularTVShowList[tvshowIndex];
        imagePath = serie.backdrop_path;
      }

      if (!imagePath) {
        break;
      }

      const id = serie.id;
      const miniatureUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
      const descripcion = serie.overview;
      const fecha = serie.first_air_date;

      const tvshowData = {
        miniatureUrl: miniatureUrl,
        tvshowName: tvshowName,
        descripcion: descripcion,
        fecha: fecha,
      };

      const imageElement = document.getElementById(`topTVShow${i}`);
      if (imageElement) {
        imageElement.src = tvshowData.miniatureUrl;
        imageElement.alt = tvshowData.tvshowName;
        configureTopTVShowSelection(i, tvshowData, posterPath);
      }

      tvshowIndex++;
    }
  })
  .catch((err) => console.error(err));

function configureTopTVShowSelection(tvshowIndex, tvshowData, posterPath) {
  const selectTVShow = document.getElementById(`topTVShow${tvshowIndex}`);
  const descripSelec = document.getElementById('descripSelec');
  const poster = document.getElementById('poster');
  const titulo = document.getElementById('titulo');
  const fecha = document.getElementById('fecha');
  const descripcion = document.getElementById('descripcion');

  selectTVShow.addEventListener('click', () => {
    descripSelec.classList.add('show');
    descripSelec.style.display = 'flex';
    if (posterPath != null) {
      poster.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      poster.src = tvshowData.miniatureUrl;
    }
    poster.alt = tvshowData.tvshowName;
    titulo.textContent = tvshowData.tvshowName;
    fecha.textContent = tvshowData.fecha;
    descripcion.textContent = tvshowData.descripcion;
    descripSelec.scrollIntoView({ behavior: 'smooth' });
  });
}
