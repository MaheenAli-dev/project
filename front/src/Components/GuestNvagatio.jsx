import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function GuestNvagatio() {


  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" data-aos="from-top">
        <Container>
          <Link className='nav-link text-white' to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>M@hi'sCart</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav className="mx-auto">
              <Link className='nav-link' to="/">Home</Link>
                {/* <Link className='nav-link mx-2' to="/Home">Brands</Link> */}
                <Link className='nav-link mx-2' to="/CategorySec">Category</Link>
                <Link className='nav-link mx-2' to="/products">Products</Link>
              </Nav>
              < Link className='nav-link text-white' to='/Login'>Signup&Login</Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default GuestNvagatio;