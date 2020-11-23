import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import styled from 'styled-components';
import CartListItem from '../cartListItem//cartListItem';
import {OrderItem, IState, ActionsType} from '../../types';
import {purchase} from '../../actions';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import withErrorBoundary from '../errorBoundary/errorBoundary';

const Total = styled(ListGroupItem)`
  display: flex;
  justify-content: flex-end;
  padding-right: 0;
  border: none;
  background: none;
  button {
    width: 150px
  }
  strong {
    font-size: 1.1em;
  }
`;
interface Props {
  orders: Array<OrderItem>,
  total: number,
  onPurchase: () => void
}

const CartList: React.FC<Props> = ({orders, total, onPurchase}) => {
  function renderOrderItems(orders: Array<OrderItem>): React.ReactNode {
    if (orders.length === 0) {
      return (<p>Ваша корзина пуста</p>);
    };

    return orders.map((orderItem: OrderItem) => {
      const {isbn13} = orderItem;
      return <CartListItem key={isbn13} orderItem={orderItem}/>
    });
  };

  const isValidCart = orders.filter(order => order.amount > 3).length === 0;

  return (
    <>
    <h1>Корзина</h1>
    <ListGroup>{renderOrderItems(orders)}</ListGroup>
    {total === 0 ? null:
      <Total>
        <Button color='success'
                disabled={isValidCart ? false:true}
                onClick={onPurchase}>Купить: <strong>${total}</strong></Button>
      </Total>
    }
    </>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    orders: state.orders,
    total: state.total
  }
};

const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  onPurchase(): void {
    dispatch(purchase())
  }
});

const WithErrorCartList = withErrorBoundary(CartList);
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorCartList);
