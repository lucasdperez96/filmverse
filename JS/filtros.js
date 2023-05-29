//ESTE CÓDIGO SE ENCARGA DE QUE EL LOGO CAMBIEN CON EL SCROLL//

window.onscroll = function () {
   scrollFunction()
};

function scrollFunction() {
   if (document.body.scrollTop <= 90 &&
       document.documentElement.scrollTop <= 90) {

       document.getElementById("logo")
           .style.flexDirection = "column";
   }
   else {

       document.getElementById("logo")
           .style.flexDirection = "row";
       document.getElementById("logo")
           .style.alignItems = "center";
       document.getElementById("nombre")
           .style.margin = "0 0 0 8px"
   }
};

























   let todoo=document.getElementById("todo")
   todoo.classList.add("active")
   //remover clase active 
      function filtro(botonutilizado){
      
      let botones=document.querySelectorAll('.boton');
      console.log(botones);
      for(let i=0;i<botones.length;i++){
         botones[i].classList.remove("active");
      }
   //agregar clase active al botonutilizado
      botonutilizado.classList.add("active")

   //conseguir el id
      let idbotonutilizado=botonutilizado.id;
      console.log(idbotonutilizado)
   //comparar el nombre del id con la funcion 
      switch (idbotonutilizado) {
            case "seriesp":
               todo();
               seriesp();
               break;
            case "seriesn":
               todo();
               seriesn();
               break;
            case "pelisp":
               todo();
               pelisp();
               break;
            case "pelisn":
               todo();
               pelisn();
               break;
            case "todo":
               todo();
               break;
            default:
               break;
         }
   }
   




   function sp(){
            let d =document.querySelectorAll(".seriesp")
            for(var i=0;i<d.length;i++){
               document.querySelectorAll(".seriesp")[i].classList.add("hidden");
            }
   
         }
   function sn(){ 
                  let x =document.querySelectorAll(".seriesn");
                  for(var i=0;i<x.length;i++){
                        x[i].classList.add("hidden");
                  
                  
               }
            
               }
    function pn(){
               var c =document.querySelectorAll(".pelisn")
                    
               for(var i=0;i<c.length;i++){
                  c[i].classList.add("hidden");
               }
            }
    function pp(){
               let y =document.querySelectorAll(".pelisp")
               for(var i=0;i<y.length;i++){
                  y[i].classList.add("hidden");
               }
   }
            

   function seriesp(){
         
         sn();pn();pp();
         }
   
   function seriesn(){
            sp();pn();pp();
         }
   function pelisn(){
            pp();sp();sn();
        }
   function pelisp(){
            pn();sn();sp();
        }
   function todo(){
      let elementos=document.querySelectorAll(".elementos")
      for(let i=0;i<elementos.length;i++)
      elementos[i].classList.remove("hidden")
   }
      
      

      
      
               




      






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
const cartel=document.getElementById("renderizado-datos");

// TOP 10 pelis new


fetch(
  "https://api.themoviedb.org/3/movie/upcoming?language=es-MX",
  options
 )
  .then((response) => response.json())
  .then((data) => {
    const popularMovieList = data.results;
 
    console.log(popularMovieList);
 
    const moviePromises = popularMovieList.map((movie) =>
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=es-MX`, options)
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
        for (let i = 0; i <= 49; i++) {
 
         
         cartel.innerHTML += `
                             <div class="elementos pelisn">
                 <img class="pelis" id="newMovie${i}" src="" alt="">
                 <p class="titulo">${movieDetails[i].movieTitle}</p>
                 <div class="play">
                     <i class="fa-solid fa-circle-play icono "></i>
                 </div>
             </div>     
                       `;
 
          const movie = movieDetails[i];
          if (movie) {
            const imageElement = document.getElementById(`newMovie${i}`);
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
  const selectMovie = document.getElementById(`newMovie${movieIndex}`);
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
fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=026bb8c96a5c47d0912cdf70616d9379&include_adult=false&language=es-ES", options)
.then((response) => response.json())
.then((data) => {
  const popularTVShowList = data.results;

  console.log(popularTVShowList);

  let tvshowIndex = 0;

  for (let i = 0; i <= 9; i++) {
   cartel.innerHTML += `
                           <div class="elementos seriesn">
               <img class="pelis" id="newTVShow${i}" src="" alt="">
               <p class="titulo">${popularTVShowList[tvshowIndex].name}</p>
               <div class="play">
                   <i class="fa-solid fa-circle-play icono "></i>
               </div>
           </div>     
                     `;
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

    const imageElement = document.getElementById(`newTVShow${i}`);
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
const selectTVShow = document.getElementById(`newTVShow${tvshowIndex}`);
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

// TOP 10 Peliculas pelisp


fetch(
 "https://api.themoviedb.org/3/movie/popular?language=es-MX",
 options
)
 .then((response) => response.json())
 .then((data) => {
   const popularMovieList = data.results;

   console.log(popularMovieList);

   const moviePromises = popularMovieList.map((movie) =>
     fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=es-MX`, options)
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
       for (let i = 0; i <= 49; i++) {

        
        cartel.innerHTML += `
                            <div class="elementos pelisp">
                <img class="pelis" id="topMovie${i}" src="" alt="">
                <p class="titulo">${movieDetails[i].movieTitle}</p>
                <div class="play">
                    <i class="fa-solid fa-circle-play icono "></i>
                </div>
            </div>     
                      `;

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
fetch("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-MXS&page=1&sort_by=popularity.desc&with_origin_country=AR", options)
 .then((response) => response.json())
 .then((data) => {
   const popularTVShowList = data.results;

   console.log(popularTVShowList);

   let tvshowIndex = 0;

   for (let i = 0; i <= 9; i++) {
    cartel.innerHTML += `
                            <div class="elementos seriesp">
                <img class="pelis" id="topTVShow${i}" src="" alt="">
                <p class="titulo">${popularTVShowList[tvshowIndex].name}</p>
                <div class="play">
                    <i class="fa-solid fa-circle-play icono "></i>
                </div>
            </div>     
                      `;
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
