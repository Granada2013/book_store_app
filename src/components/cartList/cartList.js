import React from 'react';
import {ListGroup, Button} from 'reactstrap';
import CartListItem from '../cartListItem';

export default class CartList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOrderItems = orders => {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    }
    return orders.map(orderItem => {
      const {isbn13} = orderItem;
      return (
        <CartListItem key={isbn13}
          orderItem={orderItem}
          onDelete={this.props.onDelete}/>
      );
    });
  };

  render() {
    const orderItems = this.renderOrderItems(this.props.orders);
    return (
      <>
      <h1>Корзина</h1>
      <ListGroup>
        {orderItems}
      </ListGroup>
      </>
    );
  }
}
