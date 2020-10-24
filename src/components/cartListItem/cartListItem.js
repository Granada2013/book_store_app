import React from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const ListItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .main-info {
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
`;

const CartListItem = (props) => {
  const {title, image, price, isbn13, amount} = props.orderItem;
  const total = amount * price;
    return (
      <ListItem>
        <div className="main-info">
          <img src={image} alt="img"/>
          <span>{title}</span>
        </div>
        <span>{amount} шт.</span>
        <span><strong>$ {total}</strong></span>
        <i className="fa fa-trash"
           onClick={() => props.onDelete(isbn13)}/>
      </ListItem>
    );
};

export default CartListItem;
