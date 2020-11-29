import {IState, Item, OrderItem, ISelectedItem, ActionWIthPayload, Payload} from '.././types';
import C from '.././constants';

const reducer = (state:IState, action:ActionWIthPayload<Payload>): IState => {
  switch (action.type) {
    case C.CATALOG_LOADED: {
      const {catalog} = action.payload as Payload;
      return {
        ...state,
        catalog,
        loading: false,
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
      const {isbn13} = action.payload as Payload;
      return {
        ...state,
        selectedItem: {
          isbn13,
          amount: 1
        },
        isOpenModal: !state.isOpenModal,
      };
    }

    case C.SELECT_AMOUNT: {
      const {amount} = action.payload as Payload;
      const selectedItem = state.selectedItem as ISelectedItem;
      return {
        ...state,
        selectedItem: {
          ...selectedItem,
          amount
        }
      }
    }

    case C.ADD_TO_CART: {
      const {isbn13, amount} = action.payload as Payload;
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
      const {isbn13} = action.payload as Payload;
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
      const {isbn13, amount} = action.payload as Payload;
      const ind = state.orders.findIndex((order: OrderItem): boolean => order.isbn13 === isbn13);
      const delta = amount - state.orders[ind].amount;
      const updItem = {...state.orders[ind], amount};

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
