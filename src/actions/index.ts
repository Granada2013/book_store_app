import C from '../constants';
// import * as I from '../types';
import {ActionWIthPayload, Item, Payload} from '../types';


export const catalogLoaded = (catalog: Array<Item>): ActionWIthPayload<Payload> => ({
  type: C.CATALOG_LOADED,
  payload: {catalog}
})

export const catalogError = (): ActionWIthPayload<Payload> => ({
  type: C.CATALOG_ERROR,
})

export const selectItem = (isbn13: string): ActionWIthPayload<Payload> => ({
  type: C.SELECT_ITEM,
  payload: {isbn13}
})

export const selectAmount = (amount: number): ActionWIthPayload<Payload> => ({
  type: C.SELECT_AMOUNT,
  payload: {amount}
})

export const addToCart = (isbn13: string, amount: number): ActionWIthPayload<Payload> =>( {
  type: C.ADD_TO_CART,
  payload: {isbn13, amount}
})

export const changeAmountInCart = (isbn13: string, amount: number): ActionWIthPayload<Payload> => ({
  type: C.CHANGE_AMOUNT_IN_CART,
  payload: {isbn13, amount}
})

export const deleteFromCart = (isbn13: string): ActionWIthPayload<Payload> =>( {
  type: C.DELETE_FROM_CART,
  payload: {isbn13}
})

export const purchase = (): ActionWIthPayload<Payload> => ({
  type: C.PURCHASE
})


export const toggleModal = (): ActionWIthPayload<Payload> => ({
  type: C.TOGGLE_MODAL
})
