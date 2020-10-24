import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import CatalogList from '../catalogList';
import ProductDetails from '../productDetails';
import ShoppingCart from '../shoppingCart';
import CartList from '../cartList';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const NavBlock = styled.div`
  display: fixed;
  justify-content: flex-end;
  align-items: center;
  background: #242323;
  height: 60px;
  width: 100%;
  margin-bottom: 30px;
  a {
    text-decoration: none;
  }
`;

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
          orders: [...state.orders, {title, image, price, isbn13, amount}],
          selectedItem: null
        };
      });
    }
    else {
      this.setState(state => {
        const orderUpdated = {...orders[index]};
        orderUpdated.amount += amount;
        return {
          orders: [...state.orders.slice(0, index), orderUpdated,
                   ...state.orders.slice(index+1)],
          selectedItem: null
        };
      });
    }
    this.toggleModal();
  };

  onDeleteFormCart = (isbn) => {
    this.setState(state => {
      const index = state.orders.findIndex(order => order.isbn13 === isbn);
      const ordersUpdated = [...state.orders.slice(0, index),
                             ...state.orders.slice(index+1)];
      return {
        orders: ordersUpdated
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
          <NavBlock>
            <Container>
              <Link to="/">
                <span>Home</span>
              </Link>
              <Link to="/cart">
                <ShoppingCart
                  number={orders.length}/>
              </Link>
            </Container>
          </NavBlock>
          <Container>
          <Row>
            <Col md="8">
                <Route exact path="/">
                  <CatalogList onSelectItem={this.onSelectItem}/>
                </Route>
                <Route path="/cart">
                  <CartList
                    orders={orders}
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
