import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Alert, Modal, Button, Table } from 'react-bootstrap';
import { CartContext } from '../../context/addtoCart/context';

export default function Orders() {
  const { cart_state } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [isMessageInputOpen, setIsMessageInputOpen] = useState(false);
  const [orderCancellationMessages, setOrderCancellationMessages] = useState({});

  const openCancellationMessageInput = () => {
    setIsMessageInputOpen(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get('http://localhost:1234/api/all-orders')
      .then((response) => {
        console.log(response.data);
        setOrders(response.data.orders);
      })
      .catch((error) => console.log(error));
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const sendDeliveryNotification = async () => {
    if (!selectedOrder) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:1234/api/sendEmail', {
        _id: selectedOrder._id,
        customerEmail: selectedOrder.customerEmail,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending delivery notification', error);
    }
  };

  const submitCancellationMessage = () => {
    if (!selectedOrder) {
      return;
    }

    setOrderCancellationMessages((prevState) => ({
      ...prevState,
      [selectedOrder._id]: cancellationMessage,
    }));

    setCancellationMessage('');
    setIsMessageInputOpen(false);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-warning my-2 p-2 rounded">
        <span className="fs-4 fw-bold text-white">Orders</span>
      </div>
      <div className="container">

        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Cust Name</th>
              <th scope="col">Cust Email</th>
              <th scope="col">Cust Address</th>
              <th scope="col">Cust Contact</th>
              <th scope="col">Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} onClick={() => openOrderModal(order)}>
                <th scope="row">{index + 1}</th>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.customerAddress}</td>
                <td>{order.customerContact}</td>
                <td>{order.totalBill}$</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={modalOpen} onHide={closeOrderModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {selectedOrder && (
              <div>
                <h5 style={{ marginBottom: '30px' }}>Order Items:</h5>
                {selectedOrder.items.map((item) => (
                  <table key={item._id} style={{ marginBottom: '15px' }}>
                    <tbody style={{ maxWidth: '100px', marginBottom: '15px' }}>
                      <tr>
                        <td>
                          <img
                            src={item.thumbnail}
                            className='img-fluid rounded-square border border-secondary'
                            style={{
                              height: '10vh',
                              width: '100vw',
                              aspectRatio: '1 / 1',
                              objectFit: 'contain',
                              borderBottom: '1px solid black',
                              marginBottom: '15px',
                            }}
                            alt=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><h6>Product Id :  {item._id}</h6></td>
                      </tr>
                      <tr>
                        <td><h6>Product Name : {item.productName}</h6></td>
                      </tr>
                      <tr>
                        <td><h6>Product Quantity : {item.quantity}</h6></td>
                      </tr>
                      <tr>
                        <td><h6>Product Category : {item.category}</h6></td>
                      </tr>
                      <tr>
                        <td><h6>Product Brand : {item.brand}</h6></td>
                      </tr>
                      <tr>
                        <td><h6>Product Price : {item.price}$</h6></td>
                      </tr>
                    </tbody>
                  </table>
                ))}
                <h5 style={{ marginTop: '30px', marginBottom: '30px' }}>Tracking ID: {selectedOrder._id}</h5>
                {orderCancellationMessages[selectedOrder._id] && (
                  <div>
                    <h5>Cancellation Message:</h5>
                    <p>{orderCancellationMessages[selectedOrder._id]}</p>
                  </div>
                )}
                {isMessageInputOpen && (
                  <div>
                    <h5>Order Status</h5>
                    <input
                      type="text"
                      value={cancellationMessage}
                      onChange={(e) => setCancellationMessage(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={submitCancellationMessage}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeOrderModal}>
              Close
            </Button>
            <Button variant="primary" onClick={sendDeliveryNotification}>
              Send Delivery
            </Button>
            <Button variant="secondary" onClick={openCancellationMessageInput}>
              Order Status
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
