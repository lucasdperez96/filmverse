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

flechaDerechaSpotlight1.addEventListener("click", () => {
  filaSpotlight1.scrollLeft += filaSpotlight1.offsetWidth;
});

//LÓGICA BOTÓN IZQ
flechaIzquierdaSpotlight1.addEventListener("click", () => {
  filaSpotlight1.scrollLeft -= filaSpotlight1.offsetWidth;
});

flechaDerechaSpotlight2.addEventListener("click", () => {
  filaSpotlight2.scrollLeft += filaSpotlight2.offsetWidth;
});

//LÓGICA BOTÓN IZQ
flechaIzquierdaSpotlight2.addEventListener("click", () => {
  filaSpotlight2.scrollLeft -= filaSpotlight2.offsetWidth;
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

// Variables para almacenar los IDs de las películas mostradas
let displayedMovieIds = [];

// Función para obtener películas al azar
function getRandomMovies() {
  const page = Math.floor(Math.random() * 500) + 1; // Obtener una página aleatoria entre 1 y 500
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc`;

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      const discoverMovieList = data.results.filter(
        (movie) => !displayedMovieIds.includes(movie.id)
      );

      if (discoverMovieList.length === 0) {
        // Si no hay películas disponibles, limpiar el array y volver a intentar
        displayedMovieIds = [];
        getRandomMovies();
        return;
      }

      // Obtener 3 películas al azar
      const randomMovies = [];
      while (randomMovies.length < 4) {
        const randomIndex = Math.floor(Math.random() * discoverMovieList.length);
        const randomMovie = discoverMovieList[randomIndex];
        randomMovies.push(randomMovie);
        displayedMovieIds.push(randomMovie.id); // Guardar los IDs de las películas mostradas
        discoverMovieList.splice(randomIndex, 1); // Eliminar la película de la lista para evitar duplicados
      }

      // Mostrar las películas aleatorias
      randomMovies.forEach((movie, i) => {
        const imagePath = movie.backdrop_path;
        const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
        const movieTitle = movie.title;
        const releaseDate = movie.release_date;
        const movieData = {
          imageUrl: imageUrl,
          movieTitle: movieTitle,
          releaseDate: releaseDate,
        };

        const imageElement = document.getElementById(`movieDiscovery${i}`);
        if (imageElement) {
          imageElement.src = movieData.imageUrl;
          imageElement.alt = movieData.movieTitle;
        }

        const titleElement = document.getElementById(`movieTitle${i}`);
        if (titleElement) {
            titleElement.textContent = `${movieData.movieTitle}`;
        }

        // Mostrar la fecha de lanzamiento
        const releaseDateElement = document.getElementById(`releaseDate${i}`);
        if (releaseDateElement) {
          releaseDateElement.textContent = `Lanzamiento: ${movieData.releaseDate}`;
        }
      });
    })
    .catch((err) => console.error(err));
}

getRandomMovies();

// Descubrir series

let displayedTVShowIds = [];
function getRandomTVShows() {
    const page = Math.floor(Math.random() * 500) + 1; // Obtener una página aleatoria entre 1 y 500
    const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=${page}`;
  
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        const topRatedTVShowsList = data.results.filter(
          (tvshow) => !displayedTVShowIds.includes(tvshow.id)
        );
  
        if (topRatedTVShowsList.length === 0) {
            isplayedTVShowIds = [];
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

      randomTVShows.forEach((tvshow, i) => {
        const imagePath = tvshow.backdrop_path;
        const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
        const tvshowName = tvshow.name;
        const firstAirDate = tvshow.first_air_date;
        const tvshowData = {
          imageUrl: imageUrl,
          tvshowName: tvshowName,
          firstAirDate: firstAirDate, 
        };
        const imageElement = document.getElementById(`tvshowDiscovery${i}`);
        if (imageElement) {
          imageElement.src = tvshowData.imageUrl;
          imageElement.alt = tvshowData.tvshowName;
        }

        const nameElement = document.getElementById(`tvshowName${i}`);
        if (nameElement) {
          nameElement.textContent = tvshowData.tvshowName;
        }

        const firstAirDateElement = document.getElementById(`firstAirDate${i}`);
        if (firstAirDateElement) {
          firstAirDateElement.textContent = `Lanzamiento: ${tvshowData.firstAirDate}`;
        }
      });
    })
    .catch((err) => console.error(err));
}

// Llamar a la función para obtener las series al azar
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

    let movieIndex = 0;

    for (let i = 0; i <= 9; i++) {
      let movie = popularMovieList[movieIndex];
      let imagePath = movie.backdrop_path;
      const movieTitle = movie.title;

      while (!imagePath && movieIndex < popularMovieList.length - 1) {
        movieIndex++;
        movie = popularMovieList[movieIndex];
        imagePath = movie.backdrop_path;
      }

      if (!imagePath) {
        break;
      }

      const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
      const movieData = {
        imageUrl: imageUrl,
        movieTitle: movieTitle,
      };

      fetch(movieData.imageUrl, movieData)
        .then((imageResponse) => {
          if (imageResponse.ok) {
            const imageElement = document.getElementById(`topMovie${i}`);
            if (imageElement) {
              imageElement.src = movieData.imageUrl;
              imageElement.alt = movieData.movieTitle;
            }
          } else {
            console.error(
              `Error al obtener la información para la película ${i}`
            );
          }
        })
        .catch((err) => {
          console.error(
            `Error al obtener la información para la película ${i}`,
            err
          );
        });

      movieIndex++;
    }
  })
  .catch((err) => console.error(err));

// TOP 10 Series
fetch("https://api.themoviedb.org/3/tv/popular?language=es-ES&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    const popularTVShowList = data.results;

    console.log(popularTVShowList);

    let tvshowIndex = 0;

    for (let i = 0; i <= 9; i++) {
      let serie = popularTVShowList[tvshowIndex];
      let imagePath = serie.backdrop_path;
      const tvshowName = serie.name;

      while (!imagePath && tvshowIndex < popularTVShowList.length - 1) {
        tvshowIndex++;
        serie = popularTVShowList[tvshowIndex];
        imagePath = serie.backdrop_path;
      }

      if (!imagePath) {
        break;
      }

      const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
      const tvshowData = {
        imageUrl: imageUrl,
        tvshowName: tvshowName,
      };

      fetch(tvshowData.imageUrl, tvshowData)
        .then((imageResponse) => {
          if (imageResponse.ok) {
            const imageElement = document.getElementById(`topTVShow${i}`);
            if (imageElement) {
              imageElement.src = tvshowData.imageUrl;
              imageElement.alt = tvshowData.tvshowName;
            }
          } else {
            console.error(`Error al obtener la información para la serie ${i}`);
          }
        })
        .catch((err) => {
          console.error(
            `Error al obtener la información para la serie ${i}`,
            err
          );
        });

      tvshowIndex++;
    }
  })
  .catch((err) => console.error(err));
