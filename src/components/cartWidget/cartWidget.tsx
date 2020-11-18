import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Badge} from 'reactstrap';
import {connect} from 'react-redux';
import {IState} from '../../types';


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

const CartWidget: FunctionComponent<{number: number}> = ({number}) => {
  return (
    <CartBlock>
      <i className="fa fa-shopping-cart"/>
      <CustomBadge color="success" pill>{number}</CustomBadge>
    </CartBlock>
  );
};

const mapStateToProps = (state: IState): {number: number} => {
  return {
    number: state.orders.length
  }
}

export default connect(mapStateToProps)(CartWidget);
