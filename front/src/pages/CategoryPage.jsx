import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CategoryPage() {
  const { CategoryName } = useParams();
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    axios.get(`http://localhost:1234/api/getproductbycategory/${CategoryName}`).then((json) => {
      console.log(json.data.products);
      AOS.init();
    });
  }, [CategoryName]);

  const groupProducts = () => {
    const grouped = [];
    for (let i = 0; i < products.length; i += 2) {
      grouped.push(products.slice(i, i + 2));
    }
    return grouped;
  };

  return (
    <>
      <div className="container">
        <div className="my-5 text-center">
          <h1>{CategoryName}</h1>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dicta alias ut id animi quaerat. Totam quia
            quod praesentium quidem consequatur. Ex non quis architecto provident optio adipisci aspernatur nulla!
            Voluptatum repellendus adipisci fugit in nostrum facilis odit totam voluptatem unde, veritatis aut est eveniet
            rem ab illum modi. Itaque possimus cumque dolore sint voluptate ab provident numquam debitis doloremque.
          </p>
        </div>

        {groupProducts().map((group, index) => (
          <div className="row row-cols-1 row-cols-md-2" key={index} data-aos="zoom-in">
            {group.map((val, key) => (
              <div className="col mb-4" key={key} data-aos="fade-up" data-aos-duration="800">
                <Link className="text-decoration-none" to={`/products/${val._id}`}>
                  <Card style={{ height: '100%' }}>
                    <Card.Img variant="top" src={val.thumbnail} style={{ height: '50%' }} />
                    <Card.Body style={{ height: '50%' }}>
                      <Card.Title>{val.CategoryName}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryPage;


