import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import { CartContext } from '../../context/addtoCart/context';
import { GlobalContext } from '../../usercontext/context';

function Total() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { cart_state, cart_dispatch } = useContext(CartContext);
    const { state, dispatch } = useContext(GlobalContext);
    const totalBill = cart_state.cart.reduce((total, item) => total + item.totalPrice, 0);
    const formattedTotalBill = `$${totalBill.toFixed(2)}`;
    console.log(state);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Total
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your Total Bill!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Bill: {formattedTotalBill}</div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Total;
