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
    event.preventDefault();
    let retorno = true;

    try{
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let telefone = document.getElementById("telefone").value;
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
            document.getElementById("menssagem").classList.add("valida");
            return false;
        }else{
            document.getElementById("menssagem").classList.remove("valida");
            document.getElementById("menssagem").style.borderColor = "#7EEA0F";
        }

        let dados = [{Nome: nome, Email: email, Telefone: telefone, Menssagen: msg}];
        let dadosStr = JSON.stringify(dados);

        function enviarForm(){
            $.ajax({
                type: "POST",
                url: "./api/index.php",
                data: { dadosStr: dados },
                success: (response) => {

                    document.getElementById("info").style.color = "#7EEA0F";
                    document.getElementById("info").innerHTML = "Formulário enviado com sucesso!";
                    console.log(response);

                },
                error: (textStatus, errorThrown) => {

                    document.getElementById("info").style.color = "#FF0000";
                    document.getElementById("info").innerHTML = "Erro ao enviar formulário! Tente novamente.";
                    console.log(textStatus, errorThrown);
                    
                },
            });
        }
        enviarForm();
        return retorno;
    } catch {

        document.getElementById("info").style.color = "#FF0000";
        document.getElementById("info").innerHTML = "Erro ao enviar formulário! Tente novamente.";
        console.error(event.message);

    }
}