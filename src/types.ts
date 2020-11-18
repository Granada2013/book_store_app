import C from './constants';

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
  loading: boolean,
  error: boolean
}


//ACTIONS
export interface ICatalogLoaded {
  type: typeof C.CATALOG_LOADED,
  payload: Array<Item>
}

export interface ICatalogError  {
  type: typeof C.CATALOG_ERROR,
}

export interface ISelectItem  {
  type: typeof C.SELECT_ITEM,
  payload: {isbn13: string}
}

export interface ISelectAmount {
  type: typeof C.SELECT_AMOUNT,
  payload: {amount: number}
}

export interface IAddToCart {
  type: typeof C.ADD_TO_CART,
  payload: {
    isbn13: string,
    amount: number}
}

export interface IDeleteFromCart {
  type: typeof C.DELETE_FROM_CART,
  payload: {isbn13: string}
}

export interface IChangeAmountInCart {
  type: typeof C.CHANGE_AMOUNT_IN_CART,
  payload: {
    isbn13: string,
    newAmount: number}
}

export interface IToggleModal {
  type: typeof C.TOGGLE_MODAL
}

export type ActionsType = ICatalogLoaded|ICatalogError|ISelectItem|ISelectAmount|
                          IAddToCart|IDeleteFromCart|IChangeAmountInCart|IToggleModal
