import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);



  return (
    <>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 "style={{maxHeight:'90vh'}}
            src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="First slide"
          />
         <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div>
              <h3 style={{ fontWeight: 'bold' }}>Welcome To Mahi's Cart</h3>
              <p>Some text for image 1</p>
              <button type="button" className="btn btn-warning" data-aos="zoom-in">
                <Link className="nav-link" to="/Products">
                  Let's Explore The World
                </Link>
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Second slide"
          />
          <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div>
              <h3 style={{ fontWeight: 'bold' }}>Welcome To Mahi's Cart</h3>
              <p>Some text for image 1</p>
              <button type="button" className="btn btn-warning" data-aos="zoom-in">
                <Link className="nav-link" to="/Products">
                  Let's Explore The World
                </Link>
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          />
          <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div>
              <h3 style={{ fontWeight: 'bold' }}>Welcome To Mahi's Cart</h3>
              <p>Some text for image 1</p>
              <button type="button" className="btn btn-warning" data-aos="zoom-in">
                <Link className="nav-link" to="/Products">
                  Let's Explore The World
                </Link>
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


    </>
  );
}

export default Home;
