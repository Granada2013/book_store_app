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
    const {selectedItem} = this.state;
    const newOrder = {item: selectedItem.title, amount};
    this.setState( state => {
      return {
        orders: [...state.orders, newOrder],
        selectedItem: null
      };
    });
    this.toggleModal();
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
