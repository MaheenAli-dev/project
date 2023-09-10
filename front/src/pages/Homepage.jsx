import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Homepage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const styling = {
    backgroundImage: `url(${`https://img.freepik.com/premium-photo/computer-notebook-laptop-table-electronics-department-store-shopping-mall-blur-background_293060-9010.jpg`})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: `100%`,
    height: `100vh`,
    color: `white`,
  };

  return (
    <>
      <div style={styling} data-aos="zoom-in">
        <div className='position-absolute top-50 start-50 translate-middle'>
          <h1 className="display-3 text-center" data-aos="fade-up">
            <b>Welcome To Our Store</b>
          </h1>
          <p className='text-center' data-aos="fade-up">
            Something from Your Wishlist
          </p>
          <div className="col-md-12 text-center">
            <button type='button' className='btn btn-warning' data-aos="zoom-in">
              <Link className='nav-link' to="/Products">Lets Explore The World</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
