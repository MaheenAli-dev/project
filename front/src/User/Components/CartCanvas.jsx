import React, {  useState, useContext } from 'react'; 
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import ItemCards from './ItemCards';
import { CartContext } from '../../context/addtoCart/context';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { GlobalContext } from '../../usercontext/context';
import CheckoutForm from './CheckoutForm';
import Total from './Total';



export default function CartCanvas() {
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart_state, cart_dispatch } = useContext(CartContext);


  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <BsCreditCard2BackFill size={30} />  <Badge bg="secondary">
          {cart_state.cart?.length}
        </Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart
            <button className='ms-4 btn btn-danger'
              onClick={() =>
                cart_dispatch({
                  type: "CLEAR_CART"
                })
              }
            >Clear Cart</button>


          </Offcanvas.Title>
        </Offcanvas.Header>


        <Offcanvas.Body>

          <div>
            {
              cart_state.cart?.map((val, key) =>
                <ItemCards key={key} data={val} />)
            }
          </div>
       

        </Offcanvas.Body>
        <Offcanvas.Header>
      
          <div>
            <button
              className='ms-4 btn btn-success'
              style={{
                width: '300px',        
              }}><Total />
              </button>
            <button
              className='ms-4 btn btn-warning'
              style={{
                width: '300px',        
                marginTop: '20px'        
              }}
            ><CheckoutForm /></button>
          </div>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}