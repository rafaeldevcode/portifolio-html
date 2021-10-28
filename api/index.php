<?php

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $menssagem = $_POST['menssagem'];

    $data = date('d/m/y');
    $hora = date('H:I:S');

    $corpo_emmail = "
        <html>
            <p><b>Nome: {$nome}</b></p>
            <p><b>E-mail: {$email}</b></p>
            <p><b>Telefone: {$telefone}</b></p>
            <p><b>Mensagem: {$menssagem}</b></p>

            <p>Esse E-mail foi enviado no dia {$data} às {$hora}.</p>
        <html>";

    $destino = 'rafaelvieirapalmital@outlook.com';
    $assunto = 'Mensagem enviada através do site de portifólio';

    $headers = "MIME-Version: 1.0\n";
    $headers += "Content-type: text/html; charset=iso-8859-1\n";
    $headers += "From: {$nom3} <{$destino}>";

    email($destino, $assunto, $corpo_emmail, $headers);

    echo '<meta http-equiv="refresh" content="10; URL="../">';