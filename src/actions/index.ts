import C from '../constants';
import {Item, ICatalogLoaded, ICatalogError, ISelectItem, ISelectAmount,
        IAddToCart, IDeleteFromCart, IChangeAmountInCart, IToggleModal} from '../types';



export const catalogLoaded = (catalog: Array<Item>): ICatalogLoaded => ({
  type: C.CATALOG_LOADED,
  payload: catalog
})

export const catalogError = (): ICatalogError => ({
  type: C.CATALOG_ERROR,
})

export const selectItem = (isbn13: string): ISelectItem => ({
  type: C.SELECT_ITEM,
  payload: {isbn13}
})

export const selectAmount = (amount: number): ISelectAmount => ({
  type: C.SELECT_AMOUNT,
  payload: {amount}
})

export const addToCart = (isbn13: string, amount: number): IAddToCart =>( {
  type: C.ADD_TO_CART,
  payload: {isbn13, amount}
})

export const deleteFromCart = (isbn13: string): IDeleteFromCart =>( {
  type: C.DELETE_FROM_CART,
  payload: {isbn13}
})

export const changeAmountInCart = (isbn13: string, newAmount: number): IChangeAmountInCart => ({
  type: C.CHANGE_AMOUNT_IN_CART,
  payload: {isbn13, newAmount}
})

export const toggleModal = (): IToggleModal => ({
  type: C.TOGGLE_MODAL
})
