import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://frontend-assessment-server.onrender.com/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.productImage} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> ₹{product.selling_price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <ExpandableSection title="Allergen Info">
          {product.allergen_info}
        </ExpandableSection>
        <ExpandableSection title="Usage Instructions">
          {product.cooking_instruction}
        </ExpandableSection>
      </div>
    </div>
  );
};

const ExpandableSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="expandable-section">
      <button onClick={() => setExpanded(!expanded)} className="expand-button">
        {expanded ? 'Hide' : 'Show'} {title}
      </button>
      {expanded && <div className="expandable-content">{children}</div>}
    </div>
  );
};

export default ProductDetails;
export { ExpandableSection };
