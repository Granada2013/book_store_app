import {IState, Item, OrderItem, ActionsType} from '.././types';
import C from '.././constants';

const reducer = (state:IState, action:ActionsType): IState => {
  switch (action.type) {
    case C.CATALOG_LOADED: {
      return {
        ...state,
        loading: false,
        catalog: action.payload,
        purchaseIsCompleted: false
      }
    }

    case C.CATALOG_ERROR: {
      return {
        ...state,
        error: true,
        purchaseIsCompleted: false
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
      let total: number;
      if (ind === -1) {
        const selectedItem = state.catalog.find( (item:Item) => item.isbn13 === isbn13) as Item;
        orders = [...state.orders, {...selectedItem, amount}];
        total = +(state.total + amount * +selectedItem.price).toFixed(2);

      } else {
        const newAmount: number = state.orders[ind].amount + amount;
        const updItem: OrderItem = {...state.orders[ind], amount: newAmount};
        orders = [...state.orders.slice(0, ind), updItem,
                                     ...state.orders.slice(ind + 1)];
        total = state.total + amount * +updItem.price;
      }
      return {
        ...state,
        orders,
        isOpenModal: !state.isOpenModal,
        selectedItem: null,
        total: +total.toFixed(2)
      };
    }

    case C.DELETE_FROM_CART: {
      const {isbn13} = action.payload;
      const orders = state.orders.filter( (item: OrderItem) => item.isbn13 !== isbn13);
      const total = orders.reduce((sum: number, order: OrderItem) =>
                                   sum + (order.amount * +order.price), 0)
      return {
        ...state,
        orders,
        total: +total.toFixed(2)
      };
    }

    case C.CHANGE_AMOUNT_IN_CART: {
      const {isbn13, newAmount} = action.payload;
      const ind = state.orders.findIndex((order: OrderItem): boolean => order.isbn13 === isbn13);
      const delta = newAmount - state.orders[ind].amount;
      const updItem = {...state.orders[ind], amount: newAmount};

      return {
        ...state,
        orders: [...state.orders.slice(0, ind), updItem,
                 ...state.orders.slice(ind + 1)],
        total: +(state.total + delta * +updItem.price).toFixed(2)
      };
    }

    case C.PURCHASE: {
      return {
        ...state,
        orders: [],
        total: 0,
        purchaseIsCompleted: true
      }
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
