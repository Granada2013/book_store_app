import {createStore, applyMiddleware} from 'redux';
import {IState} from './types';
import reducer from './reducers';
import C from './constants';
import {Middleware} from 'redux';


const {orders, total} = localStorage.cart ? JSON.parse(localStorage.cart):
                                            {orders: [], total: 0}

export const initialState: IState = {
  catalog: [],
  orders,
  total,
  selectedItem: null,
  isOpenModal: false,
  purchaseIsCompleted: false,
  loading: true,
  error: false
};

const localStorageMW: Middleware<{}, IState> = ({getState}) => (next) => (action) => {
  const {type} = action;
  const result = next(action);
  if (type === C.ADD_TO_CART || type === C.CHANGE_AMOUNT_IN_CART || type === C.DELETE_FROM_CART) {
    const {orders, total} = getState();
    localStorage.setItem('cart', JSON.stringify({orders, total}))
  }
  return result
}

const store = createStore(reducer, initialState, applyMiddleware(localStorageMW));
export default store;
