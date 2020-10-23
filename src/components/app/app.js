import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import CatalogList from '../catalogList';
import ShoppingCart from '../shoppingCart';
import ProductDetails from '../productDetails';
import styled from 'styled-components';

const NavBlock = styled.div`
  display: fixed;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
  background: #242323;
  height: 60px;
  width: 100%;
  margin-bottom: 30px;
`;

export default class App extends React.Component {

  state = {
      orders: [],
      selectedItem: null,
      isOpenModal: false
    };

  onSelectItem = (selectedItem) => {
    this.toggleModal();
    this.setState({selectedItem});
  };

  toggleModal = () => {
    const {isOpenModal} = this.state;
    this.setState({
      isOpenModal: !isOpenModal
    });
  };

  onAddToCart = (amount) => {
    const {title, isbn13} = this.state.selectedItem;
    const sameItems = this.state.orders.filter(order => order.isbn13 == isbn13);
    if (sameItems.length == 0) {
      this.setState(state => {
        return {
          orders: [...state.orders, {title, isbn13, amount}],
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
      <>
        <NavBlock>
          <ShoppingCart number={orders.length}/>
        </NavBlock>
        <Container>
        <Row>
          <Col md="8">
            <CatalogList onSelectItem={this.onSelectItem}/>
          </Col>
        </Row>
        {modal}
        </Container>
      </>
    );
  }
}
