import {Item} from '../types';

interface IData {
  error: string,
  total: string,
  books: Array<Item>
};

export default class CatalogService {

  _url: string = 'http://5d22b7fd4e05c600146ef4dd.mockapi.io/cupcake/books';

  getAllProducts = async (): Promise<Array<Item>> => {
    const result = await fetch(`${this._url}`);
    if (!result.ok) {
      throw new Error(`Could not fetch ${`${this._url}`}, status: ${result.status}`);
    }
    const {books}: IData = await result.json();
    return books;
  }
}
