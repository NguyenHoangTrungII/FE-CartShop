// import { Cart } from '../../models/Cart';
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  // DES_CART_QUANTITY,
  RESET_CART,
  CART_LOADING,
  CART_FAILURE,
  MINUS_QTY_ITEM,
  ADD_QTY_ITEM,
  UPDATE_CART,
} from "../actions/cartAction";
// import { LOGOUT } from '../auth/authActions';

const emptyCart = {
  items: [],
};
const initialState = {
  cartItems: [],
  isLoading: false,
};

// const findIndex = (cartList = [], id) => {

//     const index = cartList.findIndex((cart) => {
//         return cart.product.id === id;
//     });
//     return index;
// };
const findIndex = (cartList = [], id) => {
  let foundIndex = -1;

  // console.log(cartList);
  // console.log(id);
  cartList.map((cart, index) => {
    console.log(cart._id);
    console.log(id);

    if (cart._id === id) {
      foundIndex = index;
    }
  });

  return foundIndex;
};

export const cartReducer = (state = initialState, action) => {
  const cartList = state.cartItems;
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CART:
      console.log(action);

      return {
        ...state,
        cartItems: [...action.carts],
        // total: action.total,
        // totalnoship: action.totalnoship,
        isLoading: false,
      };

    case ADD_CART:
      const id = action.cartItems._id;

      if (cartList.length !== 0) {
        const index = findIndex(cartList, id);

        console.log(index);
        if (index >= 0) {
          cartList[index].quantity = cartList[index].quantity + 1;
          console.log(cartList[index].quantity);
        } else {
          // const newItem = new Cart(action.cartItems, 1);
          cartList.push(action.cartItems);
          console.log(cartList);
        }
      } else {
        // const newItem = new Cart(action.cartItems, 1);
        cartList.push(action.cartItems);
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };
    case REMOVE_FROM_CART:
      const { itemId } = action;
      const indexItem = findIndex(cartList, itemId);
      cartList.splice(indexItem, 1);
      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };

    case UPDATE_CART: {
      console.log(cartList);
      console.log(action);
      const cartItemId = action.carts._id;
      const index = findIndex(cartList, cartItemId);
      console.log("index", index);
      cartList[index].quantity = action.carts.quantity;

      console.log(state.cartItems);
      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
