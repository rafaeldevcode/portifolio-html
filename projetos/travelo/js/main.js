const sendsForm = ()=>{

    let retorno = true;

        let name = document.getElementById("nome");
        let sobreNome = document.getElementById("sobreNome");
        let data = document.getElementById("data");
        let tel = document.getElementById("tel");
        let email = document.getElementById("email");
        let text = document.getElementById("text");

        if(name.value == ""){
            document.getElementById("nome").style.border = "1px solid red";
            document.getElementById("nome").placeholder = "Este campo deve ser preenchido!";
            return false;
        }else{
            document.getElementById("nome").style.border = "1px solid green";
        }

        if(sobreNome.value == ""){
            document.getElementById("sobreNome").style.border = "1px solid red";
            document.getElementById("sobreNome").placeholder = "Este campo deve ser preenchido!";
            return false;
        }else{
            document.getElementById("sobreNome").style.border = "1px solid green";
        }

        if(data.value == ""){
            document.getElementById("data").style.border = "1px solid red";
            return false;
        }else{
            document.getElementById("data").style.border = "1px solid green";
        }

        if(tel.value.length != 11){
            document.getElementById("tel").style.border = "1px solid red";
            document.getElementById("tel").placeholder = "Este campo deve ser preenchido!";
            return false;
        }else{
            document.getElementById("tel").style.border = "1px solid green";
        }
        
        if(((email.value.indexOf("@") == -1) || (email.value.indexOf("é") != -1) || (email.value.indexOf("ç") != -1) || (email.value.indexOf("ã") != -1) || (email.value.indexOf("ê") != -1))){
            document.getElementById("email").style.border = "1px solid red";
            document.getElementById("email").placeholder = "Este campo deve ser preenchido!";
            return false;
        }else{
            document.getElementById("email").style.border = "1px solid green";
        } 
        
        if(text.value == ""){
            document.getElementById("text").style.border = "1px solid red";
            document.getElementById("text").placeholder = "Este campo deve ser preenchido!";
            return false;
        }else{
            document.getElementById("text").style.border = "1px solid green";
            document.getElementById("h4").innerHTML = "Enviado com sucesso!"
        }

    return retorno;
    
}