package com.stripe.stripe.dto.orderdto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderDTO implements Serializable {
    private static long SerialVersionID = 1L;

    private Long orderId;
    private String token;
    private String cartId;
    private String username;
    private Double totalPrice;
    private Integer stutseOrderPayment;
}

