const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const PLACE_ORDER = 'PLACE_ORDER';

export default (state, action) => {
  // console.log('default', action.payload);

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [action.payload, ...state.cartItem],
      };
    case DELETE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((item) => item.id !== action.payload),
      };
    case PLACE_ORDER:
      return {
        ...state,
        placeOrder: [action.payload],
        cartItem: [],
      };

    default:
      return state;
  }
};
