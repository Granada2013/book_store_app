import C from '../constants';
import * as I from '../types';



export const catalogLoaded = (catalog: Array<I.Item>): I.ICatalogLoaded => ({
  type: C.CATALOG_LOADED,
  payload: catalog
})

export const catalogError = (): I.ICatalogError => ({
  type: C.CATALOG_ERROR,
})

export const selectItem = (isbn13: string): I.ISelectItem => ({
  type: C.SELECT_ITEM,
  payload: {isbn13}
})

export const selectAmount = (amount: number): I.ISelectAmount => ({
  type: C.SELECT_AMOUNT,
  payload: {amount}
})

export const addToCart = (isbn13: string, amount: number): I.IAddToCart =>( {
  type: C.ADD_TO_CART,
  payload: {isbn13, amount}
})

export const changeAmountInCart = (isbn13: string, newAmount: number): I.IChangeAmountInCart => ({
  type: C.CHANGE_AMOUNT_IN_CART,
  payload: {isbn13, newAmount}
})

export const deleteFromCart = (isbn13: string): I.IDeleteFromCart =>( {
  type: C.DELETE_FROM_CART,
  payload: {isbn13}
})

export const purchase = (): I.IPurchase => ({
  type: C.PURCHASE
})


export const toggleModal = (): I.IToggleModal => ({
  type: C.TOGGLE_MODAL
})
