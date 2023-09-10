import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';
import Swal from 'sweetalert2';
import Carousel from 'react-bootstrap/Carousel';
import { CartContext } from '../../context/addtoCart/context';

function ProductPages() {

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); 
  const { _id } = useParams();
  const [review, setReview] = useState('');
  const [ratingstar, setRatingStar] = useState(0);

  const { cart_state, cart_dispatch } = useContext(CartContext);
  const checkCart = cart_state?.cart?.some((val) => val._id == product._id)



  const ratingChanged = (newRating) => {
    setRatingStar(newRating);
  };

  const submitReview = () => {
    const payload = {
      _id: _id,
      review: review,
      rating: ratingstar,
    };
    console.log(payload);

    Swal.fire({
      title: 'Successfully Submitted!',
      text: 'Thanks for reviewing our product',
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
    });

    setReview('');
    setRatingStar(0);
  };

  const addtoCart = () => {
    if (quantity > 0) {
      const payload = {
        ...product,
        quantity: quantity,
        totalPrice: product.price * quantity,
      };
      cart_dispatch({
        type: 'ADD_TO_CART',
        payload: {
          item: payload,
        },
      });

      console.log(payload);

      Swal.fire({
        title: 'Added to Cart!',
        text: 'Check your Cart for Check Out',
        icon: 'success',
        confirmButtonText: 'Continue Shopping',
      });
    } else {
      Swal.fire({
        title: 'Invalid Quantity!',
        text: 'Quantity should be at least 1',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };


  useEffect(() => {

    console.log(cart_state)
    axios
    
      .get(`http://localhost:1234/api/getproductbyid/${_id}`)
      .then((response) => {
        console.log('Product response:', response.data);
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.log('Error fetching product details:', error);
      });
  }, []);


  return (
    <div className="container">
      
      <div className="text-center my-5">
        <h1>
          {product.productName} - {product.price}$
        </h1>
        <p className="text-secondary">{product.description}</p>
        <div className="d-flex justify-content-center">
          <ReactStars count={5} size={24} edit={false} value={product.rating} color2={'#ffd700'} />
        </div>

        {!checkCart && (
          <div className="d-grid gap-4">
            <div className="d-flex justify-content-around align-items-center">
              <button className="btn btn-dark" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
              {quantity}
              <button className="btn btn-dark" onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                -
              </button>
            </div>
            <div className='d-flex justify-content-center'>
              <button className="btn btn-dark" type="button" onClick={addtoCart} style={{ width: '20%', }}>
                Add to Cart
              </button>
            </div>
          </div>
        )}



        {checkCart && <div> <button className="btn btn-dark" type="button"
          onClick={
            () => cart_dispatch({
              type: "REMOVE_ITEM",
              payload: {
                _id: product._id
              }
            })
          }>
          Remove from Cart</button></div>}
      </div>
      <div className="row">





        <div className="col-md-6">
          <div>
            <Carousel>
              {product?.images?.map((val, key) => (
                <Carousel.Item key={key}>
                  <img
                    className="d-block w-60 h-100"
                    src={product.thumbnail}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>



        <div className="col-md-6">

          <div className="container">
            <div className='mb-5'>
              <h2 className="text-center">Reviews Us</h2>
              <p className="text-center text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, sed.</p>
            </div>



            <div>


              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>

              <div className='mt-3'>

                Rate Us :
                <div className="d-flex align-items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={ratingstar}
                    onChange={ratingChanged}
                    color2={'#ffd700'}
                  />
                  <span className='ms-3'>({ratingstar})</span>
                </div>
              </div>
              <button className='my-3 btn btn-dark' onClick={submitReview}>Submit review</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPages;

