import React, { useState } from 'react';
import { postRequest } from '../axios'; 
import './AddProduct.css';

const AddProduct = ({ closeModal }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    allergen_info: '',
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append('name', productDetails.name);
    formData.append('description', productDetails.description);
    formData.append('allergen_info', productDetails.allergen_info);
    try {
      await postRequest('/products', formData, {
        contentType: 'multipart/form-data',
      });
      closeModal(); // Close the modal after adding the product
      alert('Product added successfully!'); // Show success alert
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };  
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Allergen Info</p>
        <input
          value={productDetails.allergen_info}
          onChange={changeHandler}
          type="text"
          name="allergen_info"
          placeholder="Type here"
        />
      </div>
      <button onClick={addProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
