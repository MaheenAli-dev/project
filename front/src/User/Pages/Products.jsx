import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(`http://localhost:1234/api/allproducts`).then((json) => {
      setProducts(json.data.products);
      setLoading(false); 
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [products]);

  return (
    <div className='container d-flex flex-wrap justify-content-between'>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'></span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="my-5 text-center">
            <h1>Products</h1>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iusto sapiente fuga sunt possimus est sit
              omnis animi aliquam quidem rem, vitae rerum, architecto reiciendis mollitia aliquid dolor consequuntur eum!
              Ut sequi, maxime totam repellendus saepe sint incidunt ipsum quos in assumenda odio minus illo eaque
              veritatis facere delectus excepturi aspernatur iusto consequatur hic neque, voluptates cum deserunt molestias.
              Esse?
            </p>
          </div>

          {products?.map((val, key) => (
            <div
              className='col-md-4 my-4'
              key={key}
              style={{ flex: '0 0 calc(33.333% - 1rem)', marginBottom: '1rem' }}
              data-aos={key % 2 === 0 ? 'zoom-in' : 'zoom-out'}
            >
              <Link className='text-decoration-none' to={`/products/${val._id}`}>
                <Card style={{ height: '100%' }}>
                  <Card.Img variant='top' src={val.thumbnail} style={{ height: '50%', objectFit: 'cover' }} />
                  <Card.Body className='d-flex flex-column justify-content-between'>
                    <div>
                      <Card.Title>{val.productName} - {val.price}$</Card.Title>
                      <Card.Text>{val.description}</Card.Text>
                    </div>
                    <Button variant='warning'>See Products</Button>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </>
      )}

      <style>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .card-img-top {
          height: 50%;
          object-fit: cover;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}

export default Products;
