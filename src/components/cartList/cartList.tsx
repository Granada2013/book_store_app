import React from 'react';
import {ListGroup} from 'reactstrap';
import CartListItem from '../cartListItem//cartListItem';
import ErrorMessage from '../errorMessage/errorMessage';
import {Order} from '../app/app';


interface Props {
  orders: Array<Order>,
  onChangeAmount: (isbn: string, amount: number) => void,
  onDelete: (isbn: string) => void
};

interface State {
  error: boolean
}


export default class CartList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    error: false
  };

  componentDidCatch = (): void => {
    this.setState({
      error: true
    });
  };

  renderOrderItems = (orders: Array<Order>) => {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    }
    return orders.map((orderItem: Order) => {
      const {isbn13} = orderItem;
      return (
        <CartListItem key={isbn13}
          orderItem={orderItem}
          isValidAmount={orderItem.amount <= 3}
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
