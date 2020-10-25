import React from 'react';
import {ListGroup} from 'reactstrap';
import CartListItem from '../cartListItem';
import ErrorMessage from '../errorMessage';


export default class CartList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: false
  };

  componentDidCatch = () => {
    this.setState({
      error: true
    });
  };

  renderOrderItems = orders => {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    }
    return orders.map(orderItem => {
      const {isbn13} = orderItem;
      return (
        <CartListItem key={isbn13}
          orderItem={orderItem}
          onChangeAmount={this.props.onChangeAmount}
          onDelete={this.props.onDelete}/>
      );
    });
  };

  render() {
    if (this.state.error) return <ErrorMessage/>;
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
