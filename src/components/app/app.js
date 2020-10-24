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
    const {title, image, isbn13} = this.state.selectedItem;
    const sameItems = this.state.orders.filter(order => order.isbn13 == isbn13);
    if (sameItems.length == 0) {
      this.setState(state => {
        return {
          orders: [...state.orders, {title, image, isbn13, amount}],
          selectedItem: null
        };
      });
    }
    else {
      this.setState(state => {
        const ordersUpdated = state.orders.map(order => {
          if (order.isbn13 == isbn13) {
            order.amount += amount;
          }
          return {
            orders: ordersUpdated,
            selectedItem: null
          };
        });
      });
    }
    this.toggleModal();
    console.log(this.state.orders);
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
                  <CartList orders={orders}/>
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
