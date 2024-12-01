package com.servipet.backend.EnvioCorreos.Servicio;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class ServicioEmail {
    private final JavaMailSender mailSender;
    @Autowired
    public ServicioEmail(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    public void enviarEmail(String destinatario, String asunto, String mensajeHtml) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(mensajeHtml, true); // El segundo parámetro `true` indica que es HTML.
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar correo", e);
        }
    }

}
