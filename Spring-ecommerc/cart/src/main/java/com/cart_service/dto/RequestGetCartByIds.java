package com.cart_service.dto;

import com.cart_service.common.dto.InfoDTO;

import java.util.List;

public class RequestGetCartByIds extends InfoDTO {
    private List<Long> cartIds;

    public List<Long> getCartIds() {
        return cartIds;
    }

    public void setCartIds(List<Long> cartIds) {
        this.cartIds = cartIds;
    }
}