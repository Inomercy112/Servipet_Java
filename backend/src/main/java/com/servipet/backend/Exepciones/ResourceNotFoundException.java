package com.servipet.backend.Exepciones;

public class ResourceNotFoundException extends Exception{
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }

    public ResourceNotFoundException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}
