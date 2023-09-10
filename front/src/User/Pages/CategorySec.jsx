import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Spinner } from 'react-bootstrap';

function CategorySec() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get('http://localhost:1234/api/getallcategories')
      .then((json) => {
        setCategory(json.data.Category);
        setLoading(false); 
        AOS.init({
          duration: 1000,
          once: true,
          mirror: false,
          anchorPlacement: 'center-bottom',
        });
      })
      .catch(err => {
        setLoading(false); 
        alert(err.message);
      });
  }, []);

  return (
    <>
      <div className="container" data-aos="fade-right">
        {loading ? (
          <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'></span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="my-5 text-center">
              <h1>Categories</h1>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                omnis animi aliquam quidem rem, vitae rerum, architecto reiciendis mollitia aliquid dolor consequuntur eum!
              Ut sequi, maxime totam repellendus saepe sint incidunt ipsum quos in assumenda odio minus illo eaque
              veritatis facere delectus excepturi aspernatur iusto consequatur hic neque, voluptates cum deserunt molestias.
              Esse?
              </p>
            </div>
            <div className="row">
              {category?.map((val, key) => (
                <div className="col-md-4 my-3" key={key} data-aos="fade-up" data-aos-duration="800">
                  <Link className="text-decoration-none" to={`/products/category/${val.CategoryName}`}>
                    <Card>
                      <Card.Body>
                        <img src={val.CategoryImage} alt="" className='img-fluid' style={{ height: '38vh', objectFit: 'contain' }} />
                        <Card.Title >{val.CategoryName}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CategorySec;
