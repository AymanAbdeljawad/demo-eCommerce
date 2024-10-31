package com.stripe.stripe.dto;

import com.stripe.stripe.dto.cartdto.CartDTO;

public class OrderUpdateResult {
    private String status;
    private CartDTO cartDTO;

    public OrderUpdateResult(String status, CartDTO cartDTO) {
        this.status = status;
        this.cartDTO = cartDTO;
    }

    public String getStatus() {
        return status;
    }

    public CartDTO getCartDTO() {
        return cartDTO;
    }
}
