import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import CatalogList from '../catalogList';
import ShoppingCart from '../shoppingCart';
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

  constructor() {
    super();
    this.state = {
      order: []
    };
  }

  render() {
    const {order} = this.state;
    return (
      <>
      <NavBlock>
        <ShoppingCart number={order.length}/>
      </NavBlock>
        <Container>
        <Row>
          <Col md="8">
            <CatalogList/>
          </Col>
        </Row>
        </Container>
      </>
    );
  }
}
