package com.servipet.backend.MercadoPago.Controlador;


import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.servipet.backend.Pedido.DTO.PedidoDto;
import com.servipet.backend.Pedido.Servicio.ServicioPedido;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final ServicioPedido servicioPedido;
    @Value("${mercado_pago.access_token}")
    private String accessToken;

    public PaymentController(ServicioPedido servicioPedido) {
        this.servicioPedido = servicioPedido;
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

