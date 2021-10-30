<?php

    $destino = 'rafaelvieirapalmital@outlook.com';
    $assunto = 'Mensagem enviada através do site de portifólio';

    $dados = $_POST;

    $nome = $dados['nome'];
    $email = $dados['email'];
    $telefone = $dados['telefone'];
    $menssagem = $dados['menssagem'];

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
                <p><b>Mensagem: {$menssagem}</b></p>

                <p>Esse E-mail foi enviado no dia {$data} às {$hora}.</p>
            </div>
        <html>";

    $headers =  "Content-Type:text/html; charset=UTF-8\n";
    $headers .= "De: {$nome}, Para: <{$destino}>";
    $headers .= "X-Sender:  <sistema@dominio.com.br>\n";
    $headers .= "X-Mailer: PHP  v".phpversion()."\n";
    $headers .= "X-IP:  ".$_SERVER['REMOTE_ADDR']."\n";
    $headers .= "Return-Path:  <sistema@dominio.com.br>\n";
    $headers .= "MIME-Version: 1.0\n";

    mail($destino, $assunto, $corpo_emmail, $headers);