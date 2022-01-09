mensagem("#FF0000", "FORMULÁRIO AINDA NÃO FUNCIIONAL")

//////////////// MASCARA PARA TELEFONE /////////////
document.getElementById('telefone').addEventListener('keyup', ()=>{
    let telefone = removerCaracter(document.getElementById('telefone').value);
    let mascara = `(${telefone.substr(0, 2)}) ${telefone.substr(2, 1)} ${telefone.substr(3, 4)}-${telefone.substr(7, 4)}`;

    document.getElementById('telefone').value = mascara;
});

function removerCaracter(telefone){
    let regex = /[^0-9]/gi;
    telefone = telefone.replace(regex, '');
    return telefone;
}

function validaEmail(email){
    let regex = /[a-zA-Z0-9]/
}

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

document.getElementById("idade").innerHTML = ano - 1998;

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
                telefone = `+55${telefone}`;

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
        let dadosStr = JSON.stringify(dados);

        enviarForm(dados, dadosStr);
        return retorno;
    } catch {

        mensagem("#FF0000", "Este é um erro interno! Tente novamente mais tarde.");
        console.error(event);

    }
}

////////////////// ENVIAR FORMULÁRIO ///////////
function enviarForm(dados, dadosStr){
    $.ajax({
        type: "POST",
        url: "./php/index.php",
        data: { dadosStr: dados },
        success: (response) => {

            limparCampos()
            mensagem("#7EEA0F", "Formulário enviado com sucesso!")
            console.log(response);

        },
        error: (textStatus, errorThrown) => {

            mensagem("#FF0000", "Erro ao enviar formulário! Tente novamente.")
            console.log(textStatus, errorThrown);
            
        },
    });
}

/////////// FUNÇÃO PARA OCULTAR MENSAGEM DO ENVIO DO FORMULÁRIO ////////////
function mensagem(color, msg){
    let body = document.querySelector('body');

    let p = document.createElement('p');
        p.setAttribute('id', 'info');
        p.style.borderColor = color;
        p.style.color = color;
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

////////// FUNÇÃO PARA LIMPAR CAMPOS FORMULÁRIO /////////
function limparCampos(){
    let inputs = document.querySelectorAll('input');

    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
        inputs[i].style.borderColor = '#000000'
    }

    document.getElementById('enviar').value = 'Enviar'
    document.getElementById("mensagem").value = '';
    document.getElementById("mensagem").style.borderColor = '#000000';
}

//////////// FUÇÃO PARA DAR ZOOM NA IMAGEM //////////////
let zoom = document.querySelectorAll('.zoom');
let mobile =  navigator.userAgentData.mobile;

for(let i = 0; i < zoom.length; i++){
    zoom[i].addEventListener('click', ()=>{
        let body = document.querySelector('body');
        let alt = zoom[i].alt;
        let src = mobile == false ? zoom[i].src.replace('jpeg', 'png').replace('https://www.rafael-vieira.com/images', '') : zoom[i].src.replace('jpeg', 'png').replace('https://rafael-vieira.com/images', '');

        let section = document.createElement('section')
            section.setAttribute('class', 'zoom-image zoomImage');

        let div = document.createElement('div');
            div.setAttribute('class', 'fechar-image');
        
        let img = document.createElement('img');
            img.setAttribute('src', `./images/original/${src}`)
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
    })
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
    })

}