import React, { useState, useMemo, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Dashboard.css';

const Dashboard = () => {
  const { data: products, setData, loading, error } = useFetch('https://frontend-assessment-server.onrender.com/api/dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = useMemo(() => {
    if (!products) return [];
  
    let sortedProducts = [...products];
    if (sortConfig.direction === 'ascending') {
      sortedProducts.sort((a, b) => {
        const idA = parseInt(a[sortConfig.key]);
        const idB = parseInt(b[sortConfig.key]);
        return idA - idB;
      });
    } else {
      sortedProducts.sort((a, b) => {
        const idA = parseInt(a[sortConfig.key]);
        const idB = parseInt(b[sortConfig.key]);
        return idB - idA;
      });
    }
    return sortedProducts;
  }, [products, sortConfig]);
  

  const filteredProducts = useMemo(() => {
    if (!sortedProducts) return [];
    
    return sortedProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
    );
  }, [sortedProducts, searchTerm]);

  const handleCheck = useCallback((id) => {
    if (!products) return;
    
    setData(products.filter(product => product.id !== id));
  }, [products, setData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar form-control" 
      />
      <table className="product-table table"> 
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              Product ID {sortConfig.key === 'id' && (
                <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (
                <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('selling_price')}>
              Selling Price {sortConfig.key === 'selling_price' && (
                <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.selling_price}</td>
              <td>
                <button onClick={() => handleCheck(product.id)}  >Check</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
