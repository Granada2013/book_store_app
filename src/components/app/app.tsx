import React, { FunctionComponent, useState } from 'react';
import {Container, Row, Col} from 'reactstrap';
import CatalogList from '../catalogList/catalogList';
import ProductDetails from '../productDetails/productDetails';
import CartList from '../cartList/cartList';
import Navbar from '../navbar/navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';


export interface Item {
  title: string,
  subtitle: string,
  image: string,
  isbn13: string,
  price: string,
  url: string
};

export interface Order {
  title: string,
  image: string,
  price: string,
  isbn13: string,
  amount: number
};


const App: FunctionComponent<{}> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item|null>(null);
  const [isOpenModal, setModal] = useState(false);

  function onSelectItem(selectedItem:Item): void {
    setSelectedItem(selectedItem);
    toggleModal();

  };

  function onAddToCart(amount: number): void {
    const {title, image, isbn13, price} = selectedItem as Item;
    const index: number = orders.findIndex((order: Order) => order.isbn13 === isbn13);
    if (index == -1) {
      setOrders([...orders, {title, image, price, isbn13, amount}]);
    }

    else {
      const amountUpdated: number = orders[index].amount + amount;
      onChangeAmount(isbn13, amountUpdated);
    }
    setSelectedItem(null);
    toggleModal();
  };

  function onChangeAmount(isbn: string, amount: number): void {
    const index: number = orders.findIndex((order: Order) => order.isbn13 === isbn);
    const orderUpdated: Order = orders[index];
    orderUpdated.amount = amount;

    setOrders([...orders.slice(0, index), orderUpdated,
                 ...orders.slice(index+1)]);
  };

  function onDeleteFormCart(isbn: string): void {
    const index: number = orders.findIndex((order: Order) => order.isbn13 === isbn);
    setOrders([...orders.slice(0, index), ...orders.slice(index+1)]);
  };

  function toggleModal(): void {
    setModal(!isOpenModal);
  };


  const modal: null | React.ReactElement = isOpenModal ? <ProductDetails
                                    selectedItem={selectedItem as Item}
                                    isOpen={isOpenModal}
                                    toggle={toggleModal}
                                    onAddToCart={onAddToCart}/> : null;
  return (
    <Router>
      <>
        <Navbar number={orders.length}/>
        <Container>
        <Row>
          <Col md="8" sm="12">
              <Route exact path="/">
                <CatalogList onSelectItem={onSelectItem}/>
              </Route>
              <Route path="/cart">
                <CartList
                  orders={orders}
                  onChangeAmount={onChangeAmount}
                  onDelete={onDeleteFormCart}/>
              </Route>
          </Col>
        </Row>
        {modal}
        </Container>
      </>
    </Router>
  );
}

export default App;
