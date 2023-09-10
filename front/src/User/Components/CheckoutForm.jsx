import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartContext } from '../../context/addtoCart/context';
import { GlobalContext } from '../../usercontext/context';
import { decodeToken } from 'react-jwt';
import axios from 'axios';

function CheckoutForm() {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // State for showing the alert
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { cart_state } = useContext(CartContext);
    const { state } = useContext(GlobalContext);
    const { cart_dispatch } = useContext(CartContext);
    const [customerContact, setCustomerContact] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const totalBill = cart_state.cart.reduce((total, item) => total + item.totalPrice, 0);
    const formattedTotalBill = `$${totalBill.toFixed(2)}`;

    const addCheckOut = (e) => {
        e.preventDefault();

        const data = decodeToken(state.token);

        const payload = {
            customerName: data.username,
            customerEmail: data.email,
            customerAddress,
            customerContact,
            items: cart_state.cart,
            totalBill,
        };

        axios.post('http://localhost:1234/api/create-order', payload)
            .then((response) => {
                console.log('Order placed successfully:', response.data);
                setShow(false);
                setShowAlert(true); 

      
                cart_dispatch({ type: 'CLEAR_CART' });
            })
            .catch((error) => {
                console.error('Error placing order:', error);
            });
    };

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                CheckOut
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>CheckOut From Here!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <form onSubmit={addCheckOut}>
                        <div className="mb-3">
                            <label htmlFor="CustomerAddress" className="form-label">
                                Customer Address
                            </label>
                            <input
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                                type="text"
                                className="form-control"
                                id="CustomerAddress"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="CustomerContact" className="form-label">
                                Customer Contact
                            </label>
                            <input
                                value={customerContact}
                                onChange={(e) => setCustomerContact(e.target.value)}
                                type="number"
                                className="form-control"
                                id="CustomerContact"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Items" className="form-label">
                                Items in Cart
                            </label>
                            <ul>
                                {cart_state.cart?.map((item, index) => (
                                    <li key={index}>
                                        <img
                                            src={item.thumbnail}
                                            className='img-fluid rounded-circle border border-secondary'
                                            style={{
                                                height: '7vh',
                                                marginRight: '15px',
                                                aspectRatio: '1 / 1',
                                                objectFit: 'contain',
                                                borderBottom: '1px solid black',
                                                marginBottom: '15px',
                                            }}
                                            alt=""
                                        />
                                        {item.productName} _ Quantity -{item.quantity} _{item.price}$

                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="d-grid gap-2" style={{ marginBottom: '15px', marginTop: '15px', }}>
                            <button className="btn btn-success" type="button">Total Bill : {formattedTotalBill}$</button>
                        </div>
                      
                        <button type="submit" className="btn btn-info" style={{ marginTop: '15px' }}>
                            Checkout
                        </button>
                    </form>
                </Modal.Body>
            </Modal>

   
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Order added successfully!
                </div>
            )}
        </>
    );
}

export default CheckoutForm;
