import React from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Counter from '../counter';

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

export default class CartListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isValid: true
  };

  onUpdateAmount = event => {
    const {isbn13, amount} = this.props.orderItem;
    const updatedAmount = +event.target.value;
    this.props.onChangeAmount({isbn: isbn13, amount: updatedAmount});
  };

  render() {
    const {title, image, price, isbn13, amount} = this.props.orderItem;
    const total = (amount * price).toFixed(2);
      return (
        <ListItem>
          <div className="main-info">
            <img src={image} alt="img"/>
            <span>{title}</span>
          </div>
          <Counter amount={amount}
                   onChangeAmount={this.onUpdateAmount}/>
          <span><strong>$ {total}</strong></span>
          <i className="fa fa-trash"
             onClick={() => this.props.onDelete(isbn13)}/>
        </ListItem>
      );
  }
};
