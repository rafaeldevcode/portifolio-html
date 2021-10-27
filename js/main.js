/////////////// VALIDAÇÂO FORMULÁRIO //////////////

/////////////// MENU MOBILE /////////////
document.getElementsByClassName("menu-mobile")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("nav")[0].classList.add("abrir-menu");
})

document.getElementsByClassName("fechar-menu")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("nav")[0].classList.remove("abrir-menu");
})

document.getElementsByClassName("nav")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("nav")[0].classList.remove("abrir-menu");
})

/////////////// CARROSSEL ///////////////
$('.carrossel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});

////////////// SCROLL SUAVE NOS LINKS INTERNOS ////////////
$('.nav a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;
      
    $('html, body').animate({ 
      scrollTop: targetOffset - 0
    }, 500);
});

$('.btn-topo a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;
      
    $('html, body').animate({ 
      scrollTop: targetOffset - 125
    }, 500);
});

$(document).ready( () => {     
    var voltar = $(".btn-topo");
    $(document).scroll( function() {
      var scroll = $(document).scrollTop();
      if(scroll >= 160)  $(voltar).fadeIn();
      if(scroll < 159 ) $(voltar).fadeOut();
    });       
});