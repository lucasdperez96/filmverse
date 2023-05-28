//Carrousel de trailers

var slideIndex = 1;
showSlides(slideIndex); //Funktionsaufruf

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("video-carrousel"); //holt Elemente von HTML
  
  //Wechsel von Slide 3 zu Slide 1
  if (n > slides.length) {
    slideIndex = 1;
  }
  
  //Wechsel von Slide 1 auf Slide 3
  if (n < 1) {
    slideIndex = slides.length;
  }
  
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  
  slides[slideIndex-1].style.display = "block";
} 