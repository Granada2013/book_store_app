import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Counter from '../counter/counter';
import AlertMessage from '../alertMessage/alertMessage';
import {Order} from '../app/app';

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
  orderItem: Order,
  onChangeAmount: (isbn: string, amount: number) => void,
  onDelete: (isbn: string) => void,
  isValidAmount: boolean
};


const CartListItem: FunctionComponent<Props> = props => {
  const {orderItem, onChangeAmount, onDelete, isValidAmount: initial} = props;

  const [isValidAmount, setValid] = useState(initial);

  function onUpdateAmount(event: ChangeEvent<HTMLInputElement>): void {
    const {isbn13} = orderItem;
    const updatedAmount: number = +event.target.value;
    onChangeAmount(isbn13, updatedAmount);
    if (updatedAmount > 3) {
      setValid(false);
    } else {
       setValid(true);
    }
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
      <AlertMessage success={isValidAmount}/>
    </ListItem>
  )
}

export default CartListItem;
