import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import './Order.css';

const Order = () => {
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = Cookies.get('username');

  useEffect(() => {
    const fetchOrder = async () => {
      const requestData = {
        clientId: "0",
        tracingId: "0",
        errorCode: "a",
        errorDesc: "a",
        token: "1600",
        username: username
      };

      try {
        const response = await fetch('/api/order/getbyusername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [username]);

  return (
    <div className="order-container">
      <h2>Order History</h2>
      {loading && <p>Loading your orders, please wait...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {orderData && orderData.cartDTOs && orderData.cartDTOs.length > 0 ? (
        orderData.cartDTOs.map((cart, index) => {
          const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

          return (
            <div key={index} className="cart-summary">
              <h3>Order History {index + 1}</h3>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-price">
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </div>
            </div>
          );
        })
      ) : (
        !loading && <p>No orders found.</p>
      )}
    </div>
  );
};

export default Order;

