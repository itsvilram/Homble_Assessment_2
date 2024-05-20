import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListing from './screens/ProductListing';
import ProductDetails from './screens/ProductDetails';
import AddProduct from './screens/AddProduct';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRouter;
