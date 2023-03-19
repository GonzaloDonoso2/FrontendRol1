<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require "PHPMailer\\src\\Exception.php";
require "PHPMailer\\src\\PHPMailer.php";
require "PHPMailer\\src\\SMTP.php";

class EmisorCorreosElectronicos {

    public function EnviarCorreoElectronico($correoElectronicoCliente, $razonSocialCliente, $rutaPDF, $nombrePDF, $asuntoCorreoElectronico, $mensajeCorreoElectronico, $foliosDisponibles) {

        $mail = new PHPMailer(true);

        try {
            //Ajustes de servidor
            $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;                         //Enable verbose debug output
            $mail->isSMTP();                                                    //Send using SMTP
            $mail->Host = "mail.firmaglobal.cl";                                //Set the SMTP server to send through
            $mail->SMTPAuth = true;                                             //Enable SMTP authentication
            $mail->Username = "facturacion@firmaglobal.cl";                     //SMTP username
            $mail->Password = "Firma.1588";                                     //SMTP password
            $mail->SMTPSecure = "ssl"; //PHPMailer::ENCRYPTION_SMTPS;           //Enable implicit TLS encryption
            $mail->Port = 465;                                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            //Recipientes
            $mail->setFrom("facturacion@firmaglobal.cl", "Facturación Grupo Firma");
            $mail->addAddress($correoElectronicoCliente, $razonSocialCliente);  //Add a recipient
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
            //Adjuntamientos 
            $mail->addAttachment($rutaPDF . $nombrePDF);
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');                //Optional name
            //Contenido
            $mail->CharSet = "UTF-8";
            $mail->setLanguage("es", "language/directory/phpmailer.lang-es.php");
            $mail->addEmbeddedImage("../../Imagenes/Logotipo.png", "Logotipo");
            $mail->isHTML(true);                                                //Set email format to HTML
            $mail->Subject = $asuntoCorreoElectronico;
            $mail->Body = $mensajeCorreoElectronico . "<br><br><br><img src='cid:Logotipo'>";
            $mail->AltBody = $mensajeCorreoElectronico;
            $mail->send();

            //Contenido Admin
            $mail->clearAllRecipients();
            $mail->clearAttachments();
            $mail->addAddress("facturacion@grupofirma.cl", "Grupo Firma");
            $mail->addAttachment($rutaPDF . $nombrePDF);
            $mail->addEmbeddedImage("../../Imagenes/Logotipo.png", "Logotipo");
            $mail->Subject = $asuntoCorreoElectronico;
            $mail->Body = "Estimado Benjamín, se ha realizado una venta a la Razón Social: $razonSocialCliente, y ha sido enviado al cliente de manera exitosa." . "<br><br><br><img src='cid:Logotipo'>";
            $mail->AltBody = $mensajeCorreoElectronico;
            $mail->send();

            //Contenido Aviso CAFs
            if ($foliosDisponibles < 100) {
                $mail->clearAllRecipients();
                $mail->clearAttachments();
                $mail->addAddress("facturacion@grupofirma.cl", "Grupo Firma");
                $mail->addEmbeddedImage("../../Imagenes/Logotipo.png", "Logotipo");
                $mail->Subject = "AVISO: Cantidad de folios actual $foliosDisponibles";
                $mail->Body = "Estimado Administrador, se le informa que actualmente quedan $foliosDisponibles folios disponibles. Se recomienda enviar una nueva solicitud de Documentos CAFs." . "<br><br><br><img src='cid:Logotipo'>";
                $mail->AltBody = $mensajeCorreoElectronico;
                $mail->send();
                //echo 'Message has been sent';
            }
            
        } catch (Exception $e) {
            echo "<script>alert('El mensaje no se pudo enviar. Error de Mailer: ' $mail->ErrorInfo) </script>";
        }
    }
}
