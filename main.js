const fila1 = document.querySelector('.contenedor-carousel1');
const fila2 = document.querySelector('.contenedor-carousel2');
const filaSpotlight1 = document.querySelector('.Spotlight1');//AHORA HACEMOS REFERENCIA AL DIV NUEVO, QUE ES EL QUE SE MUEVE
const filaSpotlight2 = document.querySelector('.Spotlight2');
const peliculas = document.querySelector('.pelicula');

const flechaDerechaSpotlight1 = document.getElementById('flecha-derecha-spotlight1')
const flechaIzquierdaSpotlight1 = document.getElementById('flecha-izquierda-spotlight1')//LÓGICA BOTÓN IZQ

const flechaDerechaSpotlight2 = document.getElementById('flecha-derecha-spotlight2')
const flechaIzquierdaSpotlight2 = document.getElementById('flecha-izquierda-spotlight2')

const flechaIzquierda1 = document.getElementById('flecha-izquierda1');
const flechaDerecha1 = document.getElementById('flecha-derecha1');

const flechaIzquierda2 = document.getElementById('flecha-izquierda2');
const flechaDerecha2 = document.getElementById('flecha-derecha2');


flechaDerechaSpotlight1.addEventListener('click', () => {
    filaSpotlight1.scrollLeft += filaSpotlight1.offsetWidth;
});

//LÓGICA BOTÓN IZQ
flechaIzquierdaSpotlight1.addEventListener('click', () => {
    filaSpotlight1.scrollLeft -= filaSpotlight1.offsetWidth;
});

flechaDerechaSpotlight2.addEventListener('click', () => {
    filaSpotlight2.scrollLeft += filaSpotlight2.offsetWidth;
});

//LÓGICA BOTÓN IZQ
flechaIzquierdaSpotlight2.addEventListener('click', () => {
    filaSpotlight2.scrollLeft -= filaSpotlight2.offsetWidth;
});

flechaDerecha1.addEventListener('click', () => {
    fila1.scrollLeft += fila1.offsetWidth;
});

flechaIzquierda1.addEventListener('click', () => {
    fila1.scrollLeft -= fila1.offsetWidth;
});

flechaDerecha2.addEventListener('click', () => {
    fila2.scrollLeft += fila2.offsetWidth;
});

flechaIzquierda2.addEventListener('click', () => {
    fila2.scrollLeft -= fila2.offsetWidth;
});