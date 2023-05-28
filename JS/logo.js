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
