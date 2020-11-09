import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Badge} from 'reactstrap';


const CartBlock = styled.div`
  display: inline-flex;
  align-items: center;
  color: #cbcbcb;
  .fa {
    font-size: 2.2em;
    margin-right: 10px;
  };
  :hover {
    color: #fff;
  }
`;

const CustomBadge = styled(Badge)`
  font-size: 1.2em;
  padding: 3px 10px;
  color: inherit;
  transition: none;
`;

interface Props {
  number: number
}

const CartWidget: FunctionComponent<Props> = ({number}) => {
  return (
    <CartBlock>
      <i className="fa fa-shopping-cart"/>
      <CustomBadge color="success" pill>{number}</CustomBadge>
    </CartBlock>
  );
};

export default CartWidget;
