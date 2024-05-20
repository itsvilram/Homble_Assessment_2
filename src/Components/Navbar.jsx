import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import AddProduct from '../screens/AddProduct';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="navbar-left">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/assets/logo_green.png`} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-right">
          <ul className="navbar-buttons">
            <li>
              <Button onClick={handleShowModal} className="btn btn-light">Add Product</Button>
            </li>
            <li>
              <Link to="/Dashboard">
                <button className="btn btn-light">Dashboard</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct closeModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
