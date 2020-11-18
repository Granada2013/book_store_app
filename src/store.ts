import {createStore} from 'redux';
import {OrderItem, IState} from './types';
import reducer from './reducers';


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

const store = createStore(reducer, initialState);

export default store;
