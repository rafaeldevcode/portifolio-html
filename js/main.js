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

//////////////// MOSTRAR ICONE DE VOLTAR AO TOPO ////////////////
$(document).ready( () => {     
    var voltar = $(".btn-topo");
    $(document).scroll( function() {
      var scroll = $(document).scrollTop();
      if(scroll >= 160)  $(voltar).fadeIn();
      if(scroll < 159 ) $(voltar).fadeOut();
    });       
});

//////////////// ADICIONAR ANO NO RODAPÉ //////////////
let data = new Date();
let ano = data.getFullYear();
document.getElementById("ano").innerHTML = ano;

/////////////// VALIDAR FORMULÁRIO ///////////////
function valida (event) {

    let retorno = true;

        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let msg = document.getElementById("menssagem").value;

        if(nome == "" || nome.length < 5){
            document.getElementById("nome").classList.add("valida");
            return false;
        }else{
            document.getElementById("nome").classList.remove("valida");
            document.getElementById("nome").style.borderColor = "#7EEA0F";
        }

        if(((email.indexOf("@") == -1) 
            || (email.indexOf("é") != -1) 
            || (email.indexOf("ç") != -1) 
            || (email.indexOf("ã") != -1) 
            || (email.indexOf("ê") != -1))){
            document.getElementById("email").classList.add("valida");
            return false;
        }else{
            document.getElementById("email").classList.remove("valida");
            document.getElementById("email").style.borderColor = "#7EEA0F";
        }

        if(msg == "" || msg.length < 10){
            document.getElementById("msg").classList.add("valida");
            return false;
        }else{
            document.getElementById("msg").classList.remove("valida");
            document.getElementById("msg").style.borderColor = "#7EEA0F";
        }

    return retorno;
};