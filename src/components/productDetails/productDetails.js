import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button,
        Row, Col, ListGroup, ListGroupItem, Label} from 'reactstrap';
import Counter from '../counter';
import AlertMessage from '../alertMessage';
import styled from 'styled-components';

const Header = styled(ModalHeader)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border-bottom: none;
  .close {
    outline: none;
  }
`;

const Body = styled(ModalBody)`
  line-height: normal;
  img {
    width: 100%;
    position: relative;
    bottom: 14.3%;
  }
  .title {
    font-size: 1.1em;
    font-weight: bold;
    color: rgb(33, 37, 41);
  }
  .subtitle {
    font-size: .9em;
    margin-top: 5px;
  }
`;

const Footer = styled(ModalFooter)`
  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const ListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
  border: none;
  border-bottom: .5px dotted #9d9d9d;
  font-size: .9em;
`;


export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    amount: 1,
    isValidAmount: true
  };

  onChangeAmount = event => {
    const amount = +event.target.value;
    if (amount <= 3) {
      this.setState({isValidAmount: true});
    } else {
      this.setState({isValidAmount: false});
    }
    this.setState({amount});
  };

  onFormSubmit = event => {
    event.preventDefault();
    const {amount, isValidAmount} = this.state;
    if (isValidAmount) {
      this.props.onAddToCart(amount);
    }
  };

  render() {
    const {selectedItem: {title, subtitle, image, price, isbn13, url},
          isOpen, toggle} = this.props;
    const {amount, isValidAmount} = this.state;
    return (
      <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Header>
          <Button close onClick={toggle}/>
        </Header>
        <Body>
          <Row>
            <Col md="5" className="pl-0 pr-0">
              <img src={image} alt="Book"/>
            </Col>
            <Col md="7" className="pr-4">
              <a href={url} className="title">{title}</a>
              <p className="subtitle">{subtitle}</p>
              <ListGroup>
                <ListItem >
                  <span>ISBN-13</span>
                  <span>{isbn13}</span>
                </ListItem>
                <ListItem>
                  <span>price</span>
                  <span><strong>$ {price}</strong></span>
                </ListItem>
              </ListGroup>
            </Col>
          </Row>
        </Body>
        <Footer>
          <form onSubmit={this.onFormSubmit}>
            <Label for="amount">Выберите количество</Label>
            <Counter amount={amount}
                     onChangeAmount={this.onChangeAmount}/>
            <Button type='submit' color='success'>В корзину</Button>
          </form>
        </Footer>
        <AlertMessage success={isValidAmount}/>
      </Modal>
      </>
    );
  }
}
