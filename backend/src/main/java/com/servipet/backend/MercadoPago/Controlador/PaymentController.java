package com.servipet.backend.MercadoPago.Controlador;


import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.servipet.backend.Pedido.DTO.PedidoDto;
import com.servipet.backend.Pedido.Servicio.ServicioPedido;
import com.servipet.backend.Producto.Modelo.ProductoMongo;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final ServicioPedido servicioPedido;
    private final RepositorioProducto repositorioProducto;
    private final ServicioProducto servicioProducto;
    private final RepositorioUsuario repositorioUsuario;
    @Value("${mercado_pago.access_token}")
    private String accessToken;

    public PaymentController(ServicioPedido servicioPedido, RepositorioProducto repositorioProducto, ServicioProducto servicioProducto, RepositorioUsuario repositorioUsuario) {
        this.servicioPedido = servicioPedido;
        this.repositorioProducto = repositorioProducto;
        this.servicioProducto = servicioProducto;
        this.repositorioUsuario = repositorioUsuario;
    }

    @PostMapping("/create_preference")
    public String createPreference(@RequestBody PedidoDto pedidoDto){
        try {
            MercadoPagoConfig.setAccessToken(accessToken);
            PreferenceClient client = new PreferenceClient();
            System.out.println(pedidoDto.getProductosDto());
            List<PreferenceItemRequest> items = pedidoDto.getProductosDto().stream().map(producto->
                    PreferenceItemRequest.builder()
                            .id(producto.getIdDto())
                            .title("Producto vendido por: " + producto.getQuienVendeDto())
                            .quantity(producto.getCantidadProductoDto())
                            .unitPrice(BigDecimal.valueOf(producto.getPrecioActualDto()))
                            .currencyId("COP")
                            .build()

            ).toList();
            servicioPedido.registrarPedido(pedidoDto);
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(PreferenceBackUrlsRequest.builder()
                            .success("https://www.youtube.com/watch?v=SC4xMk98Pdc")
                            .failure("https://www.youtube.com/watch?v=pgN-vvVVxMA")
                            .pending("https://www.youtube.com/watch?v=4kLOu3813BU")
                            .build()
                    ).autoReturn("approved")
                    .build();
            Preference preference = client.create(preferenceRequest);
            return preference.getId().toString();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }


}

