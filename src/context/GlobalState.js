import React, { createContext, useReducer, useEffect, useState } from 'react';
import AppReducer from './AppReducer';

// inital state
const initialState = {
  cartItem: [],
  placeOrder: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const [getData, setGetData] = useState([]);

  const getApi = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'
    );
    const data = await response.json();
    // console.log(data);
    setGetData(data);
  };

  useEffect(() => {
    getApi();
  }, []);

  // Actions

  function AddToCart(cartItem) {
    // console.log(cartItem);

    dispatch({
      type: 'ADD_TO_CART',
      payload: cartItem,
    });
  }
  function DeleteFromCart(id) {
    // console.log(id);
    dispatch({
      type: 'DELETE_ITEM',
      payload: id,
    });
  }

  function PlaceOrder(order) {
    // console.log('Place Order', order);
    dispatch({
      type: 'PLACE_ORDER',
      payload: order,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        cartItems: state.cartItem,
        placeOrder: state.placeOrder,
        getData,
        AddToCart,
        DeleteFromCart,
        PlaceOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
