import React, { useState, useEffect } from 'react';
import { getRequest } from '../axios'; 
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getRequest('/products');
      if (response.status === 200) {
        setProducts(response.data.sort((a, b) => a.selling_price - b.selling_price));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-listing">
      <div className="header">
        <h1>Product List</h1>
      </div>
      <div className="product-grid">
        {loading ? (
          Array(6)
            .fill()
            .map((_, idx) => <Skeleton key={idx} height={200} width={300} />)
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img src={product.productImage} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p>₹{product.selling_price}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
