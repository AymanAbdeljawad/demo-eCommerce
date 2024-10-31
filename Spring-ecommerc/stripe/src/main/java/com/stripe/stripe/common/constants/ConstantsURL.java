package com.stripe.stripe.common.constants;

public class ConstantsURL {

    public static final String ORDER_UPDATE_PAYMENT_STATUS = "http://localhost:8086/api/order/updatePaymentStatus";
    public static final String PRODUCTS_UPDATE_QUANTITY_LIST = "http://localhost:8086/api/products/updateQuantityList";
    public static final String CART_GET_ITEMS_FROM_CART_BYID = "http://localhost:8086/api/cart/getItemsFromCartById";
    public static final String ORDER_CREATE_ORDER = "http://localhost:8086/api/order/createOrder";

    public static final String CANCEL_URL = "http://localhost:8086/api/payment/cancel";

    public static final String SUCCESS_URL = "http://localhost:8086/api/payment/success?uniqueId=";
}
