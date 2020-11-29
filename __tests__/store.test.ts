import reducer from '../src/reducers';
import {addToCart} from '../src/actions';
import {Store, createStore} from 'redux';
// const deepFreeze = require('deep-freeze');

describe("Add new item", () => {
  let store: Store;
  const catalog = [{
    title: "Machine Learning with Apache Spark Quick Start Guide","subtitle":"Uncover patterns, derive actionable insights, and learn from big data using MLlib",
    isbn13:"9781789346565",
    price:"29.99",
    image:"https://itbook.store/img/books/9781789346565.png",
    url:"https://itbook.store/books/9781789346565"}];

  const initialState = {
    catalog,
    orders: [],
    total: 0,
    selectedItem: null,
    isOpenModal: false,
    purchaseIsCompleted: false,
    loading: true,
    error: false
  };

  beforeAll(() => {
    store = createStore(reducer, initialState)
    store.dispatch(addToCart("9781789346565", 3))
  })

  it("Should add new item", () => {
    expect(store.getState().orders.length).toBe(1)
  })

  it("Should set amount to 3", () => {
    expect(store.getState().orders[0].amount).toBe(3)
  })

  it("Should recalculate total sum", () => {
    const {amount, price} = store.getState().orders[0];
    const total = amount * +price;
    expect(store.getState().total).toBe(total)
  })
})
