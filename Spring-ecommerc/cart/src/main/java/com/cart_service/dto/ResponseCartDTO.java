package com.cart_service.dto;

import com.cart_service.common.dto.InfoDTO;

import java.util.List;

public class ResponseCartDTO extends InfoDTO {
    private CartDTO cartDTO;

    private List<CartDTO> cartDTOs;

    public ResponseCartDTO() {
    }

    public ResponseCartDTO(CartDTO cartDTO) {
        this.cartDTO = cartDTO;
    }
    public ResponseCartDTO(Integer clientId, String tracingId, String errorCode, String errorDesc, String token) {
        super(clientId, tracingId, errorCode, errorDesc, token);
        this.cartDTO = cartDTO;
    }

    public ResponseCartDTO(Integer clientId, String tracingId, String errorCode, String errorDesc, CartDTO cartDTO) {
        super(clientId, tracingId, errorCode, errorDesc);
        this.cartDTO = cartDTO;
    }

    public ResponseCartDTO(Integer clientId, String tracingId, String errorCode, String errorDesc,String token, List<CartDTO> cartDTOs) {
        super(clientId, tracingId, errorCode, errorDesc,token);
        this.cartDTOs = cartDTOs;
    }

    public ResponseCartDTO(Integer clientId, String tracingId, String errorCode, String errorDesc, String token, CartDTO cartDTO) {
        super(clientId, tracingId, errorCode, errorDesc, token);
        this.cartDTO = cartDTO;
    }

    public ResponseCartDTO(Integer clientId, String tracingId, String errorCode, String errorDesc, String token, String username, CartDTO cartDTO) {
        super(clientId, tracingId, errorCode, errorDesc, token , username);
        this.cartDTO = cartDTO;
    }

    public List<CartDTO> getCartDTOs() {
        return cartDTOs;
    }

    public void setCartDTOs(List<CartDTO> cartDTOs) {
        this.cartDTOs = cartDTOs;
    }

    public CartDTO getCartDTO() {
        return cartDTO;
    }

    public void setCartDTO(CartDTO cartDTO) {
        this.cartDTO = cartDTO;
    }
}
