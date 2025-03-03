package com.servipet.backend.Google.Servicio;
import com.google.api.client.json.gson.GsonFactory;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleServicio {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    public GoogleIdToken.Payload verifyToken(String token) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        // Verifica el token
        GoogleIdToken idToken = verifier.verify(token);

        if (idToken == null) {
            throw new Exception("Token no válido o mal formado");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        // Verifica el emisor
        if (!payload.getIssuer().equals("https://accounts.google.com")) {
            throw new Exception("Emisor inválido");
        }

        // Verifica la expiración del token
        long currentTimeInSeconds = System.currentTimeMillis() / 1000;
        if (payload.getExpirationTimeSeconds() < currentTimeInSeconds) {
            throw new Exception("Token expirado");
        }
        return payload;
    }
}

