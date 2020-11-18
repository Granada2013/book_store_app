import React, {FunctionComponent} from 'react';
import {ListGroup} from 'reactstrap';
import CartListItem from '../cartListItem//cartListItem';
import {OrderItem, IState} from '../../types';
import {connect} from 'react-redux';
import withErrorBoundary from '../errorBoundary/errorBoundary';


const CartList: FunctionComponent<{orders: Array<OrderItem>}> = ({orders}) => {

  function renderOrderItems(orders: Array<OrderItem>): React.ReactNode {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    };

    return orders.map((orderItem: OrderItem) => {
      const {isbn13} = orderItem;
      return <CartListItem key={isbn13} orderItem={orderItem}/>
    });
  };
  return (
    <>
    <h1>Корзина</h1>
    <ListGroup>{renderOrderItems(orders)}</ListGroup>
    </>
  );
}

const mapStateToProps = (state: IState): {orders: Array<OrderItem>} => {
  return {
    orders: state.orders
  }
}
const WithErrorCartList = withErrorBoundary(CartList);
export default connect(mapStateToProps)(WithErrorCartList);
