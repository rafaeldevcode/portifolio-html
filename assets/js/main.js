$(document).ready(()=>{
    configDetails();
    menuMobile();
    mascaraTelefone();
    carrossel();
    AOS.init();

    // Mostar botão de voltar ao topo
    let voltar = $(".btn-topo");
    $(document).scroll( function() {
        let scroll = $(document).scrollTop();
        if(scroll >= 160)  $(voltar).fadeIn();
        if(scroll < 159 ) $(voltar).fadeOut();
    });  
});

//////////////// MASCARA PARA TELEFONE /////////////
function mascaraTelefone(){
    $('#telefone').on('input', ()=>{
        let telefone = removerCaracter($('#telefone').val());
        let mascara = `(${telefone.substr(0, 2)}) ${telefone.substr(2, 1)} ${telefone.substr(3, 4)}-${telefone.substr(7, 4)}`;
    
        $('#telefone').val(mascara);
    });
}

function removerCaracter(telefone){
    let regex = /[^0-9]/gi;
    telefone = telefone.replace(regex, '');
    return telefone;
}

/////////////// MENU MOBILE /////////////
function menuMobile(){
    document.getElementsByClassName("menu-mobile")[0].addEventListener("click", ()=>{
        document.getElementsByClassName("nav")[0].classList.remove("fecharMenu");
        document.getElementsByClassName("nav")[0].classList.add("abrirMenu");
    })
    
    document.getElementsByClassName("fechar-menu")[0].addEventListener("click", ()=>{
        document.getElementsByClassName("nav")[0].classList.add("fecharMenu");
        document.getElementsByClassName("nav")[0].classList.remove("abrirMenu");
    });
    
    if(window.screen.width = 1050){
        document.getElementsByClassName("nav")[0].addEventListener("click", ()=>{
            document.getElementsByClassName("nav")[0].classList.add("fecharMenu");
            document.getElementsByClassName("nav")[0].classList.remove("abrir-menu");
        })
    }
}

/////////////// CARROSSEL ///////////////
function carrossel(){
    $('.carrossel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
}

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

//////////////// ADICIONAR ANO NO RODAPÉ //////////////
let data = new Date();
let ano = data.getFullYear();
$("#ano").text(ano);

$("#idade").text(ano - 1998);

/////////////// VALIDAR FORMULÁRIO ///////////////
function valida(event) {
    event.preventDefault();
    let retorno = true;

    try{
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let telefone = `${removerCaracter(document.getElementById("telefone").value)}`;
        let msg = document.getElementById("mensagem").value;

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

        if(telefone != ""){
            if(telefone.length != 11){
                document.getElementById("telefone").classList.add("valida");
                return false;
            }else{
                document.getElementById("telefone").classList.remove("valida");
                document.getElementById("telefone").style.borderColor = "#7EEA0F";
            }
        }else{
            document.getElementById("telefone").style.borderColor = "#7EEA0F";
        }

        if(msg == "" || msg.length < 10){
            document.getElementById("mensagem").classList.add("valida");
            return false;
        }else{
            document.getElementById("mensagem").classList.remove("valida");
            document.getElementById("mensagem").style.borderColor = "#7EEA0F";
        }

        let dados = [{Nome: nome, Email: email, Telefone: telefone, Mensagem: msg}];

        enviarForm(dados);
        return retorno;
    } catch {

        mensagem("danger", "Este é um erro interno! Tente novamente mais tarde.");
        console.error(event);

    }
}

////////////////// ENVIAR FORMULÁRIO ///////////
function enviarForm(dados){
    const headers = {
        'api-key':'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',
        'Content-Type':'application/json',
        'Accept':'application/json'
    };

    const data = {
        'type':'transactional',
        'sender' : {
            "name":dados[0].Nome,
            "email":dados[0].Email
        },
        'to' : [{
            "name":"Rafael Vieira",
            "email":"rafaeldevcode@gmail.com"
        }],
        'subject':'Email enviado do site de portifolio',
        'htmlContent':`<html><head></head><body><p>Olá Rafael;</p><p> Este email foi enviado do seu site de portifolio.</p><p>${dados[0].Mensagem}</p>Meu telefone para contato: ${dados[0].Telefone}</body></html>`
    };

    $.ajax({
        type: "POST",
        url: "https://api.sendinblue.com/v3/smtp/email",
        headers: headers,
        data: JSON.stringify(data),
        success: (response) => {

            limparCampos()
            mensagem("success", "Formulário enviado com sucesso!")
            console.log(response);

        },
        error: (error) => {

            mensagem("danger", error.responseJSON.message)
            console.error(error);
            console.error('Type error: ', error.responseJSON.message);
            
        },
    });

    ////////// FUNÇÃO PARA LIMPAR CAMPOS FORMULÁRIO /////////
    function limparCampos(){
        let inputs = $('.input');

        for(let i = 0; i < inputs.length; i++){
            inputs[i].val('');
            inputs[i].css('border-color', '#000000');
        }

        $('#enviar').val('Enviar');
        $("#mensagem").val('');
        $("#mensagem").css('border-color', '#000000');
    }
}

/////////// FUNÇÃO PARA OCULTAR MENSAGEM DO ENVIO DO FORMULÁRIO ////////////
function mensagem(typeMessage, msg){
    let body = document.querySelector('body');

    let p = document.createElement('p');
        p.setAttribute('id', 'info');
        p.setAttribute('class', typeMessage);
        p.innerHTML = msg;

    let div = document.createElement('div');
        div.setAttribute('class', 'info mostrar')
        div.appendChild(p);

    body.appendChild(div);

    setTimeout(()=>{
        document.getElementsByClassName("info")[0].classList.remove("mostrar");

        setTimeout(()=>{
            document.querySelector('.info').remove();
        }, 500)
    }, 8000)
}

//////////// FUÇÃO PARA DAR ZOOM NA IMAGEM //////////////
let zoom = document.querySelectorAll('.zoom');

for(let i = 0; i < zoom.length; i++){
    zoom[i].addEventListener('click', ()=>{
        let body = document.querySelector('body');
        let alt = zoom[i].alt;
        let src = zoom[i].src.replace('jpeg', 'png').replace('images', 'images/original/');

        let section = document.createElement('section')
            section.setAttribute('class', 'zoom-image zoomImage');

        let div = document.createElement('div');
            div.setAttribute('class', 'fechar-image');
        
        let img = document.createElement('img');
            img.setAttribute('src', src)
            img.setAttribute('alt', alt);

            section.appendChild(div);
            section.appendChild(img);

        let icone = document.createElement('i');
            icone.setAttribute('class', 'fas fa-times')
            icone.setAttribute('id', 'fechar-image')

            div.appendChild(icone);

        body.appendChild(section);
        body.style.overflowY = 'hidden';
        document.querySelector('html').style.overflowY = 'hidden';

        fecharImage(body);
    });
}

function fecharImage(body){

    document.getElementById('fechar-image').addEventListener('click', ()=>{
        document.querySelector('html').style.overflowY = 'auto';
        body.style.overflowY = 'auto';

        document.querySelector('.zoom-image').classList.remove('zoomImage');
        document.querySelector('.zoom-image').classList.add('zoomImageReverse');

        setTimeout(()=>{
            document.getElementsByClassName('zoom-image')[0].remove();
        }, 500);
    });
}

function configDetails(){
    let details = $('#projetos').find('details');

    for (let i = 0; i < details.length; i++) {
        details[i].addEventListener('click', ()=>{
            let parent = details[i].parentNode;

            if(inArray(parent.classList, 'z-index') === true){
                parent.classList.remove('z-index');
            }else{
                closeDetail(details);
                parent.classList.add('z-index');
            }
        });
    }

    function closeDetail(details){
        for (let i = 0; i < details.length; i++) {
            details[i].open = false;
            details[i].parentNode.classList.remove('z-index');
        }
    }
}

function inArray(array, string){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === string){
            return true;
        }
    }

    return false;
}