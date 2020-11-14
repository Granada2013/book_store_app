import React, {FunctionComponent} from 'react';
import {ListGroup} from 'reactstrap';
import CartListItem from '../cartListItem//cartListItem';
import {Order} from '../app/app';
import withErrorBoundary from '../errorBoundary/errorBoundary';


interface Props {
  orders: Array<Order>,
  onChangeAmount: (isbn: string, amount: number) => void,
  onDelete: (isbn: string) => void
};


const CartList: FunctionComponent<Props> = ({orders, onChangeAmount, onDelete}) => {

  function renderOrderItems(orders: Array<Order>): React.ReactNode {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    };

    return orders.map((orderItem: Order) => {
      const {isbn13} = orderItem;
      return (
        <CartListItem key={isbn13}
          orderItem={orderItem}
          isValidAmount={orderItem.amount <= 3}
          onChangeAmount={onChangeAmount}
          onDelete={onDelete}/>
      );
    });
  };

  const orderItems = renderOrderItems(orders);
  return (
    <>
    <h1>Корзина</h1>
    <ListGroup>
      {orderItems}
    </ListGroup>
    </>
  );
};

const WithErrorCartList = withErrorBoundary(CartList);
export default WithErrorCartList;
