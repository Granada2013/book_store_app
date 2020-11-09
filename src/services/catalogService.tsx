export default class CatalogService {

  _url: string = 'http://5d22b7fd4e05c600146ef4dd.mockapi.io/cupcake/books'

  getResource = async () => {
    const result = await fetch(`${this._url}`);
    if (!result.ok) {
      throw new Error(`Could not fetch ${`${this._url}`}, status: ${result.status}`);
    }
    return await result.json();
  };

  getAllProducts = async () => {
    const result = await this.getResource();
    const {books} = result;
    return books;
  };
}
