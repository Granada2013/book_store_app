import React from 'react';
import styled from 'styled-components';
import {Badge} from 'reactstrap';


const CartBlock = styled.div`
  display: inline-flex;
  align-items: center;
  .fa {
    font-size: 2.2em;
    color: #fff6f6;
    margin-right: 10px;
  }
`;

const CustomBadge = styled(Badge)`
  font-size: 1.2em;
  padding: 3px 10px;
`;

const ShoppingCart = (props) => {
  const {number} = props;
  return (
    <CartBlock>
      <i className="fa fa-shopping-cart"/>
      <CustomBadge color="success" pill>{number}</CustomBadge>
    </CartBlock>
  );
};

export default ShoppingCart;
