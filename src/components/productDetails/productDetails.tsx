import React, {ChangeEvent, FormEvent, FunctionComponent} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button,
        Row, Col, ListGroup, ListGroupItem, Label} from 'reactstrap';
import Counter from '../counter/counter';
import AlertMessage from '../alertMessage/alertMessage';
import styled from 'styled-components';
import {Item, IState, ISelectedItem, ActionsType} from '../../types';
import {selectAmount, addToCart, toggleModal} from '../../actions';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';


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

interface Props {
  catalog: Array<Item>,
  selectedItem: ISelectedItem,
  isOpenModal: boolean
  toggle: () => void,
  onSelectAmount: (amount: number) => void,
  onAddToCart: (isbn13: string, amount: number) => void
}


const ProductDetails: FunctionComponent<Props> = props => {
  const {catalog, selectedItem, isOpenModal, toggle, onAddToCart, onSelectAmount} = props;
  const {isbn13, amount} = selectedItem as ISelectedItem;

  const thisItem:Item|undefined = catalog.find((item:Item) => item.isbn13 === isbn13);

  function onChangeAmount(event: ChangeEvent<HTMLInputElement>): void {
    const newAmount:number = +event.target.value;
    onSelectAmount(newAmount);
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (amount <= 3) {
      onAddToCart(isbn13, amount);
    }
  };

  const {title, subtitle, image, price, url} = thisItem as Item;

  return (
    <>
    <Modal isOpen={isOpenModal} toggle={toggle}>
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
          <form onSubmit={onFormSubmit}>
            <Label for="amount">Выберите количество</Label>
            <Counter amount={amount}
                     onChangeAmount={onChangeAmount}/>
            <Button type='submit' color='success'>В корзину</Button>
          </form>
        </Footer>
      <AlertMessage isValidAmount={amount <= 3}/>
    </Modal>
    </>
  );
}

const mapStateToProps = (state: IState) => ({
  catalog: state.catalog,
  isOpenModal: state.isOpenModal,
  selectedItem: state.selectedItem
});

const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  toggle() {
    dispatch(toggleModal())
  },
  onAddToCart(isbn13: string, amount: number) {
    dispatch(addToCart(isbn13, amount))
  },
  onSelectAmount(amount: number) {
    dispatch(selectAmount(amount))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
