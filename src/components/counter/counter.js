import React from 'react';
import {Input} from 'reactstrap';
import styled from 'styled-components';

const CustomInput = styled(Input)`
  display: inline-block;
  padding-right: 0;
  width: 60px;
  margin-left: 7px;
  margin-right: 7px;
`;

const Counter = props => {
  return (
    <CustomInput id="amount" type="number" value={props.amount}
           min="1" max="50" required
           onInput={props.onChangeAmount}/>
  );
};
export default Counter;
