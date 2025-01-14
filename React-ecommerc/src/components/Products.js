import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import Header from './Header';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = Cookies.get('sessionToken') || uuidv4();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const postData = { clientId: "0", tracingId: "0", errorCode: "a", errorDesc: "a", token: token };
        const response = await axios.post('api/products/getAllProducts', postData);
        const productData = response.data.productDTO;

        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          throw new Error('data no array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    const storedCart = JSON.parse(Cookies.get('cart') || '[]');
    setCartProducts(storedCart);
  }, []);

  const addToCart = useCallback((product) => {
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    const existingProduct = cart.find(item => item.productId === product.productId);

    if (!existingProduct) {
      cart.push({ ...product, quantity: 1 });
      Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
      setCartProducts([...cart]);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) return <h2 className="Loading">Loading...</h2>;
  if (error) return <h2 className="Error">Error: {error}</h2>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container pt-3">
        <div className="row">
          {filteredProducts.map((product) => {
            const isInCart = cartProducts.some(item => item.productId === product.productId);
            return (
              <div className="col-md-4" key={product.productId}>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                    <button
                      className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => {
                        if (!isInCart) {
                          addToCart(product);
                        }
                      }}
                      disabled={isInCart}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    {isInCart && <span className="text-success ms-2">✔</span>} {}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
