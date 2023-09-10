export const reducer = (cart_state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...cart_state, cart: [...cart_state.cart, action.payload.item] };
    case 'REMOVE_ITEM':
      const itemRemaining = cart_state.cart.filter((item) => item.id !== action.payload.id);
      return { ...cart_state, cart: itemRemaining };

    case 'CLEAR_CART':
      return { ...cart_state, cart: [] };
    default:
      return cart_state;
  }

};
