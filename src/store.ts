import {createStore, applyMiddleware} from 'redux';
import {OrderItem, IState} from './types';
import reducer from './reducers';
import C from './constants';
import {Middleware} from 'redux';


const orders: Array<OrderItem> = localStorage.cart ?
                                 JSON.parse(localStorage.cart) : [];

export const initialState: IState = {
  catalog: [],
  orders,
  selectedItem: null,
  isOpenModal: false,
  loading: true,
  error: false
};

const localStorageMW: Middleware<{}, IState> = ({getState}) => (next) => (action) => {
  const {type} = action;
  const result = next(action);
  if (type === C.ADD_TO_CART || type === C.CHANGE_AMOUNT_IN_CART || type === C.DELETE_FROM_CART) {
    localStorage.setItem('cart', JSON.stringify(getState().orders));
  }
  return result
}

const store = createStore(reducer, initialState, applyMiddleware(localStorageMW));
export default store;
