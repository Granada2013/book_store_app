import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import CatalogList from '../catalogList';
import ProductDetails from '../productDetails';
import CartList from '../cartList';
import Navbar from '../navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends React.Component {
  state = {
      orders: [],
      selectedItem: null,
      isOpenModal: false,
    };

  onSelectItem = (selectedItem) => {
    this.toggleModal();
    this.setState({selectedItem});
  };

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  };

  onAddToCart = (amount) => {
    const {orders} = this.state;
    const {title, image, isbn13, price} = this.state.selectedItem;
    const index = orders.findIndex(order => order.isbn13 === isbn13);
    if (index == -1) {
      this.setState(state => {
        return {
          orders: [...state.orders, {title, image, price, isbn13, amount}]
        };
      });
    }
    else {
      const amountUpdated = orders[index].amount + amount;
      this.onChangeAmount({isbn: isbn13, amount: amountUpdated});
    }

    this.setState({selectedItem: null});
    this.toggleModal();
  };

  onChangeAmount = ( {isbn, amount} ) => {
    const {orders} = this.state;
    const index = orders.findIndex(order => order.isbn13 === isbn);
    this.setState(state => {
      const orderUpdated = {...orders[index]};
      orderUpdated.amount = amount;
      return {
        orders: [...state.orders.slice(0, index), orderUpdated,
                 ...state.orders.slice(index+1)]
        };
    });
  };

  onDeleteFormCart = (isbn) => {
    this.setState(state => {
      const index = state.orders.findIndex(order => order.isbn13 === isbn);
      return {
        orders: [...state.orders.slice(0, index),
                 ...state.orders.slice(index+1)]
      };
    });
  };

  render() {
    const {orders, selectedItem, isOpenModal} = this.state;
    const modal = isOpenModal ? <ProductDetails
                                  selectedItem={selectedItem}
                                  isOpen={isOpenModal}
                                  toggle={this.toggleModal}
                                  onAddToCart={this.onAddToCart}/> : null;
    return (
      <Router>
        <>
          <Navbar number={orders.length}/>
          <Container>
          <Row>
            <Col md="8" sm="12">
                <Route exact path="/">
                  <CatalogList onSelectItem={this.onSelectItem}/>
                </Route>
                <Route path="/cart">
                  <CartList
                    orders={orders}
                    onChangeAmount={this.onChangeAmount}
                    onDelete={this.onDeleteFormCart}/>
                </Route>
            </Col>
          </Row>
          {modal}
          </Container>
        </>
      </Router>
    );
  }
}
