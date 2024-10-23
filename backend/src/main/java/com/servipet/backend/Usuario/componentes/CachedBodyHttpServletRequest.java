package com.servipet.backend.Usuario.componentes;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.io.*;

public class CachedBodyHttpServletRequest extends HttpServletRequestWrapper {
    private final byte[] body;

    public CachedBodyHttpServletRequest(HttpServletRequest request) throws IOException {
        super(request);
        InputStream inputStream = request.getInputStream();
        this.body = inputStream.readAllBytes();

    }

    @Override
    public ServletInputStream getInputStream() {
        return new CachedBodyServletInputStream(this.body);
    }

    @Override
    public BufferedReader getReader() {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(this.body);
        return new BufferedReader(new InputStreamReader(byteArrayInputStream));
    }
    private static class CachedBodyServletInputStream extends ServletInputStream {

        private final ByteArrayInputStream byteArrayInputStream;

        public CachedBodyServletInputStream(byte[] body) {
            this.byteArrayInputStream = new ByteArrayInputStream(body);
        }

        @Override
        public int read() {
            return this.byteArrayInputStream.read();
        }

        @Override
        public boolean isFinished() {
            return byteArrayInputStream.available() == 0;
        }

        @Override
        public boolean isReady() {
            return true;
        }

        @Override
        public void setReadListener(ReadListener listener) {

        }
    }
}

