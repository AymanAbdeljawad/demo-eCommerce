package com.order_service.dto.cartdto;

import com.order_service.common.dto.InfoDTO;

import java.util.List;

public class RequestGetCartByIds extends InfoDTO {
    private List<String> cartIds;

    public List<String> getCartIds() {
        return cartIds;
    }

    public void setCartIds(List<String> cartIds) {
        this.cartIds = cartIds;
    }
}