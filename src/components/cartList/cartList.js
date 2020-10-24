import React from 'react';
import {ListGroup} from 'reactstrap';
import CartListItem from '../cartListItem';

class CartList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOrderItems = arr => {
    return arr.map(orderItem => {
      const {isbn13} = orderItem;
      return (
        <CartListItem key={isbn13}
          orderItem={orderItem}/>
      );
    });
  };

  render() {
    const orderItems = this.renderOrderItems(this.props.orders);
    return (
      <ListGroup>
        {orderItems}
      </ListGroup>
    );
  }

};


export default CartList;
