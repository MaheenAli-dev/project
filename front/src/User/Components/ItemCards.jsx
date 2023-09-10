import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { CartContext } from '../../context/addtoCart/context';

export default function ItemCards({ data }) {

   const { cart_state, cart_dispatch } = useContext(CartContext);

  return (


    <Card>
  <button className='btn btn-danger'
    onClick={() => cart_dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: data.id 
      }
    })}
  >
    Remove
  </button>
  <Card.Img variant="top" src={data.thumbnail} /> 
  <Card.Body>
    <Card.Title>
    {data.productName} - {data.price} - {data.quantity} 
    </Card.Title>
    <Card.Text>
      {data.description?.length < 20 ? data.description : data.description?.substring(0, 20) + "..."} 
    </Card.Text>
  </Card.Body>
</Card>

   
  );
}

