import {IState, Item, OrderItem, ActionsType} from '.././types';
import C from '.././constants';

const reducer = (state:IState, action:ActionsType): IState => {
  switch (action.type) {
    case C.CATALOG_LOADED: {
      return {
        ...state,
        loading: false,
        catalog: action.payload,
      }
    }

    case C.CATALOG_ERROR: {
      return {
        ...state,
        error: true
      }
    }

    case C.SELECT_ITEM: {
      return {
        ...state,
        selectedItem: {
          isbn13: action.payload.isbn13,
          amount: 1
        },
        isOpenModal: !state.isOpenModal,
      };
    }

    case C.SELECT_AMOUNT: {
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          amount: action.payload.amount
        }
      }
    }

    case C.ADD_TO_CART: {
      const {isbn13, amount} = action.payload;
      const ind: number = state.orders.findIndex((order: OrderItem) => order.isbn13 === isbn13);
      let orders: Array<OrderItem>;
      if (ind === -1) {
        const selectedItem = state.catalog.find( (item:Item) => item.isbn13 === isbn13);
        orders = [...state.orders, {...selectedItem, amount}];
      } else {
        const newAmount: number = state.orders[ind].amount + amount;
        const updItem: OrderItem = {...state.orders[ind], amount: newAmount};
        orders = [...state.orders.slice(0, ind), updItem,
                                     ...state.orders.slice(ind + 1)];
      }
      return {
        ...state,
        orders,
        isOpenModal: !state.isOpenModal,
        selectedItem: null
      };
    }

    case C.DELETE_FROM_CART: {
      const {isbn13} = action.payload;
      return {
        ...state,
        orders: state.orders.filter( (item: OrderItem): boolean => item.isbn13 !== isbn13)
      };
    }

    case C.CHANGE_AMOUNT_IN_CART: {
      const {isbn13, newAmount} = action.payload;
      const ind: number = state.orders.findIndex((order: OrderItem): boolean => order.isbn13 === isbn13);
      const updItem: OrderItem = {...state.orders[ind], amount: newAmount};
      return {
        ...state,
        orders: [...state.orders.slice(0, ind), updItem, ...state.orders.slice(ind + 1)]
      };
    }

    case C.TOGGLE_MODAL: {
      return {
        ...state,
        isOpenModal: !state.isOpenModal,
        selectedItem: null
      };
    }
    default:
      return state;
  }
}

export default reducer;
