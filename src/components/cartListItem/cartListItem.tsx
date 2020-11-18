import React, { ChangeEvent, FunctionComponent } from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Counter from '../counter/counter';
import AlertMessage from '../alertMessage/alertMessage';
import {OrderItem, ActionsType} from '../../types';
import {changeAmountInCart, deleteFromCart} from '../../actions';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

const ListItem = styled(ListGroupItem)`
  .main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      width: 70%;
      img {
        width: 70px;
      }
    }
    .fa {
      cursor: pointer;
      font-size: 1.2em;
      color: #e62020;
    }
  }
`;

interface Props {
  orderItem: OrderItem,
  onChangeAmount: (isbn: string, amount: number) => void,
  onDelete: (isbn: string) => void,
};


const CartListItem: FunctionComponent<Props> = props => {
  const {orderItem, onChangeAmount, onDelete} = props;

  function onUpdateAmount(event: ChangeEvent<HTMLInputElement>): void {
    const updatedAmount: number = +event.target.value;
    onChangeAmount(orderItem.isbn13, updatedAmount);
  };

  const {title, image, price, isbn13, amount} = orderItem;
  const total: string = (amount * +price).toFixed(2);

  return (
    <ListItem>
      <div className="main-info">
        <div className="title">
          <img src={image} alt="img"/>
          <span>{title}</span>
        </div>
        <Counter amount={amount}
                 onChangeAmount={onUpdateAmount}/>
        <span><strong>$ {total}</strong></span>
        <i className="fa fa-trash"
           onClick={() => onDelete(isbn13)}/>
      </div>
      <AlertMessage isValidAmount={amount <= 3}/>
    </ListItem>
  )
}


const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
  return {
    onChangeAmount(isbn13: string, newAmount: number): void {
      dispatch(changeAmountInCart(isbn13, newAmount))
    },
    onDelete(isbn13: string): void {
      dispatch(deleteFromCart(isbn13))
    }
  }
}

export default connect(null, mapDispatchToProps)(CartListItem);
