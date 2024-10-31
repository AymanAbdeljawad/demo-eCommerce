package com.order_service.dto.orderdto;

import com.order_service.common.dto.InfoDTO;
import lombok.Data;

@Data
public class RequestGetOrderByusernameDTO extends InfoDTO {
    private String username;
}
