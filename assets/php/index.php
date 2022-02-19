<?php

    $destino = 'contato@rafael-vierira.com';
    $assunto = 'Mensagem enviada através do site de portifólio';

    $dados = $_POST;

    // print_r($dados);
    // exit();

    $nome = $dados['dadosStr'][0]['Nome'];
    $email = $dados['dadosStr'][0]['Email'];
    $telefone = $dados['dadosStr'][0]['Telefone'];
    $mensagem = $dados['dadosStr'][0]['Mensagem'];

    $data = date('d/m/y');
    $hora = date('H:I:S');

    $corpo_emmail = "
        <style>
            div{
                width: 98%,
                background: #000,
                border: 2px solid #F90446;
                border-radius: 3px;
            }

            div > p{
                color: #F90446;
                font-size: 1em;
            }
        </style>
        <html>
            <div>
                <p><b>Nome: {$nome}</b></p>
                <p><b>E-mail: {$email}</b></p>
                <p><b>Telefone: {$telefone}</b></p>
                <p><b>Mensagem: {$mensagem}</b></p>

                <p>Esse E-mail foi enviado no dia {$data} às {$hora}.</p>
            </div>
        <html>";

    $headers =  "Content-Type:text/html; charset=UTF-8\n";
    $headers .= "De: {$nome}, Para: <{$destino}>";
    $headers .= "X-Sender:  <contato@rafael-vierira.com>\n";
    $headers .= "X-Mailer: PHP  v".phpversion()."\n";
    $headers .= "X-IP:  ".$_SERVER['REMOTE_ADDR']."\n";
    $headers .= "Return-Path:  <contato@rafael-vierira.com>\n";
    $headers .= "MIME-Version: 1.0\n";

    $enviar_email = mail($destino, $assunto, $corpo_emmail, $headers);