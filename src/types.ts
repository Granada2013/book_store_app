import {Action} from 'redux';

//STATE
export interface Item {
  title: string,
  subtitle: string,
  image: string,
  isbn13: string,
  price: string,
  url: string
};


export interface OrderItem extends Item {
  amount: number
};

export interface ISelectedItem {
  isbn13: string,
  amount: number,
}

export interface IState {
  catalog: Array<Item>,
  orders: Array<OrderItem>,
  selectedItem: ISelectedItem|null,
  isOpenModal: boolean,
  purchaseIsCompleted: boolean,
  loading: boolean,
  error: boolean,
  total: number
}


//ACTIONS
export interface Payload {
  [propName: string]: any
};

export interface ActionWIthPayload<T> extends Action {
  payload?: T
}
