import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import CartCanvas from './CartCanvas';
import { FaUserCircle } from 'react-icons/fa';
import { GlobalContext } from '../../usercontext/context';
import { decodeToken } from 'react-jwt';

function NavigatioBar() {
  const { contextData } = useContext(GlobalContext);
  const { state, dispatch } = useContext(GlobalContext)
  const data = decodeToken(state.token);

  const payload = {
    username: data.username,
    email: data.email,
  };
  const logOutUser = () => {
    dispatch(
      {
        type: "USER_LOGOUT"
      }
    )
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" data-aos="from-top">
        <Container>
          <div className="d-flex align-items-center"> 
            <Link className='nav-link text-white d-flex align-items-center' to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
              M@hi'sCart
            </Link>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="d-flex align-items-center"> 
                <Link className='nav-link' to="/">Home</Link>
                <Link className='nav-link' to="/products">Products</Link>
                <Link className='nav-link' to="/categories">Categories</Link>
            
                <CartCanvas />
                <Link className='nav-link text-white' to='/userprofile'>
                  <button className="btn btn-outline-light d-flex align-items-center"
                    style={{
                      background:'#212529',
                      color: 'white',
                      borderColor: 'white'
                    }}
                  >
                    <FaUserCircle size={25} color='white' style={{ marginRight: '7px' }} />
                    {capitalizeFirstLetter(payload.username)}
                  </button>
                </Link>
                <button className="btn btn-outline-light d-flex align-items-center"
                  onClick={logOutUser}
                  style={{
                    background:'#212529',
                    color: 'white',
                    borderColor: 'white'
                  }}
                >
                  LogOut
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavigatioBar;
