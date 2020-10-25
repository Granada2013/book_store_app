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
    amount: this.props.orderItem.amount
  };
  onChangeAmount = event => {
    this.setState({
      amount: event.target.value});
  };

  render() {
    const {title, image, price, isbn13, amount} = this.props.orderItem;
    const total = amount * price;
      return (
        <ListItem>
          <div className="main-info">
            <img src={image} alt="img"/>
            <span>{title}</span>
          </div>
          <Counter amount={this.state.amount}
                   onChangeAmount={this.onChangeAmount}/>
          <span><strong>$ {total}</strong></span>
          <i className="fa fa-trash"
             onClick={() => this.props.onDelete(isbn13)}/>
        </ListItem>
      );
  }
};
